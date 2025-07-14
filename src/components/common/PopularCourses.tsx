
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import PopularCoursesLoading from './popular-courses/PopularCoursesLoading';
import PopularCoursesHeader from './popular-courses/PopularCoursesHeader';
import PopularCoursesGrid from './popular-courses/PopularCoursesGrid';
import PopularCoursesEmpty from './popular-courses/PopularCoursesEmpty';
import PopularCoursesAction from './popular-courses/PopularCoursesAction';

interface Course {
  id: string;
  title: string;
  university: string;
  country: string;
  study_area: string;
  level: string;
  duration_months: number;
  tuition_fee?: number;
  currency?: string;
  thumbnail_url?: string;
  featured?: boolean;
  description?: string;
  intake_dates?: string[];
  eligibility?: string;
  requirements?: string;
  image_url?: string;
}

const PopularCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchPopularCourses();
  }, []);

  // Fetch saved courses - only if user is logged in
  const { data: savedCourses, refetch: refetchSaved } = useQuery({
    queryKey: ['saved-courses-ids', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('saved_courses')
        .select('course_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(item => item.course_id);
    },
    enabled: !!user?.id
  });

  useEffect(() => {
    if (savedCourses) {
      setSavedCourseIds(new Set(savedCourses));
    }
  }, [savedCourses]);

  const fetchPopularCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('featured', true)
        .limit(6)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching popular courses:', error);
      toast({
        title: "Error",
        description: "Failed to load popular courses.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  const handleSaveToggle = async (courseId: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save courses.",
        variant: "destructive"
      });
      return;
    }

    const isSaved = savedCourseIds.has(courseId);
    
    if (isSaved) {
      const { error } = await supabase
        .from('saved_courses')
        .delete()
        .eq('course_id', courseId)
        .eq('user_id', user.id);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove course from saved list",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
        toast({
          title: "Success",
          description: "Course removed from saved list"
        });
        refetchSaved();
      }
    } else {
      const { error } = await supabase
        .from('saved_courses')
        .insert({ 
          course_id: courseId, 
          user_id: user.id 
        });
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to save course",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => new Set(prev).add(courseId));
        toast({
          title: "Success",
          description: "Course saved successfully"
        });
        refetchSaved();
      }
    }
  };

  if (loading) {
    return <PopularCoursesLoading />;
  }

  return (
    <section className="py-20 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PopularCoursesHeader />

        {courses.length > 0 ? (
          <PopularCoursesGrid 
            courses={courses} 
            onViewDetails={handleViewDetails}
            savedCourseIds={savedCourseIds}
            onSaveToggle={handleSaveToggle}
          />
        ) : (
          <PopularCoursesEmpty />
        )}

        <PopularCoursesAction onViewAllCourses={handleViewAllCourses} />
      </div>
    </section>
  );
};

export default PopularCourses;
