
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
  tuition_fee: number;
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
    tuition_fee: 0,
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

        // Auto-sync foreign key IDs if missing
        const syncedData = { ...data };
        
        // Sync study_area_id if missing
        if (!syncedData.study_area_id && syncedData.study_area) {
          const matchingArea = studyAreas.find(area => area.name === syncedData.study_area);
          if (matchingArea) syncedData.study_area_id = matchingArea.id;
        }

        // Sync study_level_id if missing
        if (!syncedData.study_level_id && syncedData.level) {
          const matchingLevel = studyLevels.find(level => level.name === syncedData.level);
          if (matchingLevel) syncedData.study_level_id = matchingLevel.id;
        }

        // Sync destination_id if missing
        if (!syncedData.destination_id && syncedData.country) {
          const matchingDestination = destinations.find(dest => dest.name === syncedData.country);
          if (matchingDestination) syncedData.destination_id = matchingDestination.id;
        }

        // Sync university_id if missing
        if (!syncedData.university_id && syncedData.university) {
          const matchingUniversity = universities.find(uni => uni.name === syncedData.university);
          if (matchingUniversity) syncedData.university_id = matchingUniversity.id;
        }

        setFormData({
          ...syncedData,
          intake_dates: syncedData.intake_dates || [],
          slug: syncedData.slug || ''
        });
      };

      fetchCourse();
    }
  }, [id, isEditing, toast, studyAreas, studyLevels, destinations, universities]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      tuition_fee: Number(formData.tuition_fee),
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
