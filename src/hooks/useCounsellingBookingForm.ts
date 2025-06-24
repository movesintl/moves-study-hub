
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('counselling_bookings')
        .insert([formData]);

      if (error) throw error;

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
