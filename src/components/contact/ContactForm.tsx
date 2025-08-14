
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';
import { useRateLimit } from '@/hooks/useRateLimit';
import { useAuditLog } from '@/hooks/useAuditLog';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { toast } = useToast();
  const { checkRateLimit } = useRateLimit();
  const { logEvent } = useAuditLog();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Verify reCAPTCHA
      if (!recaptchaToken) {
        toast({
          title: "reCAPTCHA Required",
          description: "Please complete the reCAPTCHA verification.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Check rate limit (max 5 contact submissions per hour)
      const rateLimitAllowed = await checkRateLimit({
        action: 'contact_submission',
        maxRequests: 5,
        windowMinutes: 60
      });

      if (!rateLimitAllowed) {
        toast({
          title: "Rate limit exceeded",
          description: "You can only submit 5 contact forms per hour. Please try again later.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Verify reCAPTCHA with server
      const { data: verificationResult, error: verificationError } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token: recaptchaToken }
      });

      if (verificationError || !verificationResult?.success) {
        toast({
          title: "Verification Failed",
          description: "reCAPTCHA verification failed. Please try again.",
          variant: "destructive",
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setIsSubmitting(false);
        return;
      }

      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      };

      const { data: insertedData, error } = await supabase
        .from('contact_submissions')
        .insert([contactData])
        .select('id')
        .single();

      if (error) throw error;

      // Log the contact submission event
      await logEvent({
        action: 'contact_submission_created',
        tableName: 'contact_submissions',
        recordId: insertedData?.id,
        newValues: contactData
      });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      reset();
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white font-medium">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            {...register('name')}
            className={`focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white font-medium">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            className={`focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white font-medium">Phone Number</Label>
          <Input
            id="phone"
            placeholder="+977 xxx xxx xxx / +880 xxx xxx xxx"
            {...register('phone')}
            className="focus:ring-2 focus:ring-primary/20 focus:border-primary border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-white font-medium">Subject *</Label>
          <Input
            id="subject"
            placeholder="Course inquiry"
            {...register('subject')}
            className={`focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white font-medium">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your study abroad goals, questions, or how we can help you..."
          rows={6}
          {...register('message')}
          className={`focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfUk6UrAAAAAIoWzkz54uHyaR0cXY0H2DCQb7Nn"
          onChange={setRecaptchaToken}
          theme="dark"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-3 text-lg font-semibold transition-all duration-200"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-sm text-white/70 text-center">
        * Required fields. We respect your privacy and will never share your information.
      </p>
    </form>
  );
};

export default ContactForm;
