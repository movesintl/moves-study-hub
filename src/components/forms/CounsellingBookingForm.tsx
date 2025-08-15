import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCounsellingBookingForm } from '@/hooks/useCounsellingBookingForm';
import { PersonalInfoSection } from './counselling/PersonalInfoSection';
import { StudyPreferencesSection } from './counselling/StudyPreferencesSection';
import { SchedulingSection } from './counselling/SchedulingSection';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      enterprise?: any;
    };
  }
}

interface CounsellingBookingFormProps {
  defaultDestination?: string;
  onSuccess?: () => void;
}

const CounsellingBookingForm = ({ defaultDestination, onSuccess }: CounsellingBookingFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useCounsellingBookingForm(defaultDestination, onSuccess);

  // Use environment variables in production
  const RECAPTCHA_SITE_KEY = process.env.NODE_ENV === 'development'
    ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // v3 TEST key - works everywhere
    : 'YOUR_ACTUAL_V3_SITE_KEY'; // Replace with your real v3 key

  useEffect(() => {
    // Skip if already loaded
    if (window.grecaptcha) {
      setRecaptchaLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Double-check grecaptcha is available
      if (window.grecaptcha) {
        setRecaptchaLoaded(true);
      } else {
        console.error('reCAPTCHA script loaded but not available');
        toast({
          title: "Security Error",
          description: "Could not load security verification",
          variant: "destructive",
        });
      }
    };
    script.onerror = () => {
      toast({
        title: "Security Error",
        description: "Failed to load security verification",
        variant: "destructive",
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [RECAPTCHA_SITE_KEY, toast]);

  const getRecaptchaToken = async (): Promise<string> => {
    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA not loaded');
    }

    try {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'counselling_booking'
      });
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!recaptchaLoaded) {
        toast({
          title: "Security Check",
          description: "Please wait while security verification loads",
          variant: "destructive",
        });
        return;
      }

      const token = await getRecaptchaToken();
      await originalHandleSubmit(e, token);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Verification Failed",
        description: "Please complete the security check",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 ease-out hover:ring-gray-300/50">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your form sections remain the same */}
          <PersonalInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <StudyPreferencesSection
            formData={formData}
            onInputChange={handleInputChange}
            destinations={destinations}
            studyLevels={studyLevels}
          />

          <SchedulingSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <Button 
            type="submit" 
            disabled={loading || !recaptchaLoaded}
            className="w-full h-12 text-lg bg-accent hover:bg-accent/90"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Submitting...
              </span>
            ) : (
              'Book Free Counselling'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CounsellingBookingForm;