
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CourseCard } from '@/components/courses/CourseCard';

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
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular Courses
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Featured Programs
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after courses that are shaping the future of education
          </p>
        </div>

        {/* Courses Grid - 2 rows x 4 columns */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Popular Courses Yet</h3>
            <p className="text-gray-600">Check back soon for featured courses.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            onClick={handleViewAllCourses}
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
