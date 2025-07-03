
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for counselling_bookings table
      const bookingData = {
        student_name: formData.student_name,
        student_email: formData.student_email,
        student_phone: formData.student_phone,
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

      const { error } = await supabase
        .from('counselling_bookings')
        .insert([bookingData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // If user agreed to marketing, add them to marketing_consents table
      if (formData.agrees_to_marketing) {
        const marketingData = {
          student_email: formData.student_email,
          student_name: formData.student_name,
          student_phone: formData.student_phone || null,
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
