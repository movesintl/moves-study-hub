
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CourseFormData {
  title: string;
  slug: string;
  description: string;
  study_area: string;
  study_area_id: string;
  level: string;
  study_level_id: string;
  country: string;
  university: string;
  university_id: string;
  destination_id: string;
  tuition_fee_min: number;
  tuition_fee_max: number;
  currency: string;
  duration_months: number;
  intake_dates: string[];
  eligibility: string;
  requirements: string;
  application_link: string;
  thumbnail_url: string;
  featured: boolean;
}

export const useCourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    slug: '',
    description: '',
    study_area: '',
    study_area_id: '',
    level: '',
    study_level_id: '',
    country: '',
    university: '',
    university_id: '',
    destination_id: '',
    tuition_fee_min: 0,
    tuition_fee_max: 0,
    currency: 'AUD',
    duration_months: 12,
    intake_dates: [],
    eligibility: '',
    requirements: '',
    application_link: '',
    thumbnail_url: '',
    featured: false
  });

  // Fetch reference data
  const { data: universities = [] } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('universities').select('*');
      if (error) throw error;
      return data;
    }
  });

  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('destinations').select('*');
      if (error) throw error;
      return data;
    }
  });

  const { data: studyAreas = [] } = useQuery({
    queryKey: ['study-areas'],
    queryFn: async () => {
      const { data, error } = await supabase.from('course_study_areas').select('*');
      if (error) throw error;
      return data;
    }
  });

  const { data: studyLevels = [] } = useQuery({
    queryKey: ['study-levels'],
    queryFn: async () => {
      const { data, error } = await supabase.from('course_study_levels').select('*');
      if (error) throw error;
      return data;
    }
  });

  // Fetch course data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchCourse = async () => {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch course data",
            variant: "destructive"
          });
          return;
        }

        setFormData({
          ...data,
          intake_dates: data.intake_dates || []
        });
      };

      fetchCourse();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      tuition_fee_min: Number(formData.tuition_fee_min),
      tuition_fee_max: Number(formData.tuition_fee_max),
      duration_months: Number(formData.duration_months)
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Course updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('courses')
          .insert(courseData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Course created successfully"
        });
      }

      navigate('/admin/courses');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save course",
        variant: "destructive"
      });
    }
  };

  return {
    formData,
    setFormData,
    isEditing,
    handleSubmit,
    navigate,
    universities,
    destinations,
    studyAreas,
    studyLevels
  };
};
