import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const jobApplicationSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  cv: z.any().refine((file) => {
    if (!file || file.length === 0) return false;
    return file[0]?.size <= MAX_FILE_SIZE;
  }, 'CV file is required and must be less than 5MB')
  .refine((file) => {
    if (!file || file.length === 0) return false;
    return ACCEPTED_FILE_TYPES.includes(file[0]?.type);
  }, 'CV must be a PDF or Word document'),
  cover_letter: z.any().optional()
});

type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

interface JobApplicationModalProps {
  careerId: string;
  jobTitle: string;
  children: React.ReactNode;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ 
  careerId, 
  jobTitle, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema)
  });

  const uploadFile = async (file: File, fileName: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${Date.now()}-${fileName}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('job-applications')
      .upload(filePath, file);

    if (error) {
      console.error('File upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('job-applications')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (data: JobApplicationFormData) => {
    setIsSubmitting(true);

    try {
      // Upload CV file
      const cvFile = data.cv[0];
      const cvUrl = await uploadFile(cvFile, `${data.full_name.replace(/\s+/g, '-')}-cv`);

      if (!cvUrl) {
        throw new Error('Failed to upload CV');
      }

      // Upload cover letter if provided
      let coverLetterUrl = null;
      if (data.cover_letter && data.cover_letter.length > 0) {
        const coverLetterFile = data.cover_letter[0];
        coverLetterUrl = await uploadFile(coverLetterFile, `${data.full_name.replace(/\s+/g, '-')}-cover-letter`);
      }

      // Submit application to database
      const { error } = await supabase
        .from('job_applications')
        .insert({
          career_id: careerId,
          full_name: data.full_name,
          email: data.email,
          phone: data.phone || null,
          cv_file_url: cvUrl,
          cover_letter_file_url: coverLetterUrl
        });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      reset();
      toast({
        title: 'Application Submitted Successfully',
        description: 'Thank you for your interest! We will review your application and get back to you soon.',
      });
      
      // Close modal after a delay
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsSubmitted(false);
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for applying to {jobTitle}. We've received your application and will be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                {...register('full_name')}
                placeholder="Enter your full name"
              />
              {errors.full_name && (
                <p className="text-sm text-destructive">{errors.full_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv">CV/Resume *</Label>
              <div className="relative">
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register('cv')}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                />
                <Upload className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
              {errors.cv && (
                <p className="text-sm text-destructive">{String(errors.cv.message)}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover_letter">Cover Letter (Optional)</Label>
              <div className="relative">
                <Input
                  id="cover_letter"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register('cover_letter')}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                />
                <Upload className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};