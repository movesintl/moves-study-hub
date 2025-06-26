
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  tuition_fee_min?: number;
  tuition_fee_max?: number;
  currency?: string;
  thumbnail_url?: string;
  featured?: boolean;
}

const PopularCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchPopularCourses();
  }, []);

  const fetchPopularCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('featured', true)
        .limit(8)
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

  if (loading) {
    return <PopularCoursesLoading />;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PopularCoursesHeader />

        {courses.length > 0 ? (
          <PopularCoursesGrid courses={courses} onViewDetails={handleViewDetails} />
        ) : (
          <PopularCoursesEmpty />
        )}

        <PopularCoursesAction onViewAllCourses={handleViewAllCourses} />
      </div>
    </section>
  );
};

export default PopularCourses;
