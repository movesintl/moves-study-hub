
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useRateLimit } from '@/hooks/useRateLimit';
import { useAuditLog } from '@/hooks/useAuditLog';
import { sanitizeText, sanitizeEmail } from '@/utils/sanitization';

interface FormData {
  student_name: string;
  student_email: string;
  student_phone: string;
  preferred_destination: string;
  study_level: string;
  course_interest: string;
  current_education_level: string;
  english_test_score: string;
  work_experience: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  agrees_to_terms: boolean;
  agrees_to_contact: boolean;
  agrees_to_marketing: boolean;
}

export const useCounsellingBookingForm = (defaultDestination?: string, onSuccess?: () => void) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { checkRateLimit } = useRateLimit();
  const { logEvent } = useAuditLog();

  const [formData, setFormData] = useState<FormData>({
    student_name: '',
    student_email: user?.email || '',
    student_phone: '',
    preferred_destination: defaultDestination || '',
    study_level: '',
    course_interest: '',
    current_education_level: '',
    english_test_score: '',
    work_experience: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
    agrees_to_terms: false,
    agrees_to_contact: false,
    agrees_to_marketing: false,
  });

  // Fetch destinations
  const { data: destinations } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  // Fetch study levels
  const { data: studyLevels } = useQuery({
    queryKey: ['study-levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_study_levels')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    let sanitizedValue = value;
    
    // Apply input sanitization for text fields
    if (typeof value === 'string') {
      if (field === 'student_email') {
        sanitizedValue = sanitizeEmail(value);
      } else {
        sanitizedValue = sanitizeText(value);
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate and sanitize required fields
    const sanitizedName = sanitizeText(formData.student_name).trim();
    const sanitizedEmail = sanitizeEmail(formData.student_email).trim();
    const sanitizedPhone = sanitizeText(formData.student_phone).trim();
    
    if (!sanitizedName || !sanitizedEmail || !sanitizedPhone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid data (name, email, phone).",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Additional email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Validate mandatory fields
    if (!formData.agrees_to_terms) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the Terms and Privacy Policy to continue.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Check rate limit (max 3 counselling bookings per hour)
      const rateLimitAllowed = await checkRateLimit({
        action: 'counselling_booking',
        maxRequests: 3,
        windowMinutes: 60
      });

      if (!rateLimitAllowed) {
        toast({
          title: "Rate limit exceeded",
          description: "You can only submit 3 counselling requests per hour. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Prepare data for counselling_bookings table with sanitized values
      const bookingData = {
        student_name: sanitizedName,
        student_email: sanitizedEmail,
        student_phone: sanitizedPhone,
        preferred_destination: formData.preferred_destination,
        study_level: formData.study_level,
        course_interest: formData.course_interest,
        current_education_level: formData.current_education_level,
        english_test_score: formData.english_test_score,
        work_experience: formData.work_experience,
        preferred_date: formData.preferred_date || null,
        preferred_time: formData.preferred_time || null,
        message: formData.message,
        agrees_to_terms: formData.agrees_to_terms,
        agrees_to_contact: formData.agrees_to_contact,
        agrees_to_marketing: formData.agrees_to_marketing,
        status: 'pending'
      };

      console.log('Submitting booking data:', bookingData);

      const { data: insertedData, error } = await supabase
        .from('counselling_bookings')
        .insert([bookingData])
        .select('id')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Log the counselling booking event
      await logEvent({
        action: 'counselling_booking_created',
        tableName: 'counselling_bookings',
        recordId: insertedData?.id,
        newValues: bookingData
      });

      // If user agreed to marketing, add them to marketing_consents table
      if (formData.agrees_to_marketing) {
        const marketingData = {
          student_email: sanitizedEmail,
          student_name: sanitizedName,
          student_phone: sanitizedPhone || null,
          source: 'counselling_form'
        };

        const { error: marketingError } = await supabase
          .from('marketing_consents')
          .insert([marketingData]);

        if (marketingError) {
          console.error('Marketing consent error:', marketingError);
          // Don't throw error here, as the main booking was successful
        }
      }

      toast({
        title: "Success!",
        description: "Your counselling request has been submitted successfully. We'll contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        student_name: '',
        student_email: user?.email || '',
        student_phone: '',
        preferred_destination: defaultDestination || '',
        study_level: '',
        course_interest: '',
        current_education_level: '',
        english_test_score: '',
        work_experience: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
        agrees_to_terms: false,
        agrees_to_contact: false,
        agrees_to_marketing: false,
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit,
  };
};
