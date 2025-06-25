
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, BookOpen, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const formatFee = (min?: number, max?: number, currency: string = 'AUD') => {
    if (!min && !max) return 'Contact for pricing';
    if (min && max && min !== max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    const fee = min || max;
    return `${currency} ${fee?.toLocaleString()}`;
  };

  const handleViewDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
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
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Popular Courses
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Top Courses
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> This Season</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the most sought-after programs that are shaping careers worldwide. 
            From cutting-edge technology to business innovation.
          </p>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className="group hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:-translate-y-2"
              >
                <CardHeader className="pb-4 relative">
                  {/* Course Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    {course.thumbnail_url ? (
                      <img 
                        src={course.thumbnail_url} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-primary/30" />
                    )}
                  </div>

                  {/* Featured Badge */}
                  {course.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-accent to-orange-500 text-white border-0 shadow-lg">
                        Popular
                      </Badge>
                    </div>
                  )}

                  <CardTitle className="text-lg leading-tight line-clamp-2 text-gray-900 group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-between pt-0">
                  <div className="space-y-3">
                    {/* University & Location */}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span className="truncate">{course.university}, {course.country}</span>
                    </div>
                    
                    {/* Duration & Level */}
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-accent" />
                      <span>{course.duration_months} months • {course.level}</span>
                    </div>
                    
                    {/* Tuition Fee */}
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                      <span>{formatFee(course.tuition_fee_min, course.tuition_fee_max, course.currency)}</span>
                    </div>

                    {/* Study Area Badge */}
                    <div className="pt-2">
                      <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                        {course.study_area}
                      </Badge>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleViewDetails(course.id)}
                    className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
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
            className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 text-white px-12 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Explore All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
