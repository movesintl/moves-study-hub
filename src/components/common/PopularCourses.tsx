
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, BookOpen, TrendingUp, Heart, Eye, Calendar } from 'lucide-react';
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
  intake_dates?: string[];
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

  const formatDuration = (months: number) => {
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
      }
      return `${years}.${Math.round((remainingMonths / 12) * 10)} years`;
    }
    return `${months} months`;
  };

  const getNextIntake = (intakeDates?: string[]) => {
    if (!intakeDates || intakeDates.length === 0) return 'Contact for intake';
    // Simplified logic - just show the first intake
    return `Intake: ${intakeDates[0]}...`;
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
              <Card 
                key={course.id} 
                className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  {course.thumbnail_url ? (
                    <img 
                      src={course.thumbnail_url} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-16 w-16 text-gray-400" />
                  )}
                  
                  {/* Heart Icon */}
                  <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </button>
                  
                  {/* Featured Badge */}
                  {course.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        ✨ Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="flex-1 flex flex-col p-6">
                  {/* Course Title */}
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
                    {course.title}
                  </CardTitle>

                  {/* University & Location */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{course.university} • {course.country}</span>
                  </div>

                  {/* Course Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    Advanced program with specialization options
                  </p>

                  {/* Level and Study Area Badges */}
                  <div className="flex gap-2 mb-6">
                    <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                      {course.level}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                      {course.study_area}
                    </Badge>
                  </div>

                  {/* Duration and Intake */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDuration(course.duration_months)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-xs">{getNextIntake(course.intake_dates)}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    {/* Tuition Fee Box */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tuition Fee</p>
                          <p className="text-lg font-bold text-gray-900">
                            {formatFee(course.tuition_fee_min, course.tuition_fee_max, course.currency)}
                          </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-gray-300" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleViewDetails(course.id)}
                        variant="outline"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleViewDetails(course.id)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
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
