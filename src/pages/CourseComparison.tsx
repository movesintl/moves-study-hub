
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, MapPin, Clock, DollarSign, Calendar, GraduationCap, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  study_area: string;
  level: string;
  country: string;
  university: string;
  tuition_fee: number;
  currency: string;
  duration_months: number;
  intake_dates: string[];
  eligibility: string;
  requirements: string;
  image_url: string;
  featured: boolean;
}

const CourseComparison = () => {
  const { toast } = useToast();

  const { data: savedCourses = [], isLoading, refetch } = useQuery({
    queryKey: ['saved-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_courses')
        .select(`
          id,
          course_id,
          courses (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map(item => ({ ...item.courses, saved_id: item.id })) as (Course & { saved_id: string })[];
    }
  });

  const removeCourse = async (savedId: string) => {
    const { error } = await supabase
      .from('saved_courses')
      .delete()
      .eq('id', savedId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove course from comparison",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Course removed from comparison"
      });
      refetch();
    }
  };

  const formatTuitionFee = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
    if (min === max) {
      return `${currency} ${formatNumber(min)}`;
    }
    return `${currency} ${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading saved courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Comparison</h1>
              <p className="text-gray-600 mt-2">Compare your saved courses side by side</p>
            </div>
            <Link to="/courses">
              <Button variant="outline">
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {savedCourses.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved courses</h3>
            <p className="text-gray-600 mb-6">
              You haven't saved any courses for comparison yet. Browse our courses and save the ones you're interested in.
            </p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Comparing {savedCourses.length} course{savedCourses.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Mobile View - Stacked Cards */}
          <div className="lg:hidden space-y-6">
            {savedCourses.map((course) => (
              <Card key={course.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeCourse(course.saved_id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <CardHeader>
                  <CardTitle className="text-lg pr-8">{course.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {course.university}, {course.country}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Level:</span> {course.level}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {formatDuration(course.duration_months)}
                    </div>
                    <div>
                      <span className="font-medium">Study Area:</span> {course.study_area}
                    </div>
                    <div>
                      <span className="font-medium">Tuition:</span> {course.currency} {course.tuition_fee?.toLocaleString()}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-sm">Intakes:</span>
                    <p className="text-sm text-gray-600">{course.intake_dates?.join(', ')}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium text-sm">Eligibility:</span>
                    <p className="text-sm text-gray-600">{course.eligibility}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop View - Comparison Table */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${savedCourses.length}, 1fr)` }}>
              {/* Header Row */}
              <div className="font-semibold text-gray-900 py-4">Course</div>
              {savedCourses.map((course) => (
                <Card key={`header-${course.id}`} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => removeCourse(course.saved_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CardHeader>
                    <CardTitle className="text-lg pr-8">{course.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {course.university}, {course.country}
                    </div>
                  </CardHeader>
                </Card>
              ))}

              {/* Level Row */}
              <div className="font-medium text-gray-700 py-3 border-t">Level</div>
              {savedCourses.map((course) => (
                <div key={`level-${course.id}`} className="py-3 border-t">
                  <span className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                    {course.level}
                  </span>
                </div>
              ))}

              {/* Duration Row */}
              <div className="font-medium text-gray-700 py-3 border-t">Duration</div>
              {savedCourses.map((course) => (
                <div key={`duration-${course.id}`} className="py-3 border-t">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {formatDuration(course.duration_months)}
                  </span>
                </div>
              ))}

              {/* Study Area Row */}
              <div className="font-medium text-gray-700 py-3 border-t">Study Area</div>
              {savedCourses.map((course) => (
                <div key={`area-${course.id}`} className="py-3 border-t">
                  {course.study_area}
                </div>
              ))}

              {/* Tuition Row */}
              <div className="font-medium text-gray-700 py-3 border-t">Tuition Fees</div>
              {savedCourses.map((course) => (
                <div key={`tuition-${course.id}`} className="py-3 border-t">
                  <span className="flex items-center font-semibold text-primary">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {course.currency} {course.tuition_fee?.toLocaleString()}
                  </span>
                </div>
              ))}

              {/* Intakes Row */}
              <div className="font-medium text-gray-700 py-3 border-t">Intake Dates</div>
              {savedCourses.map((course) => (
                <div key={`intakes-${course.id}`} className="py-3 border-t">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {course.intake_dates?.join(', ')}
                  </span>
                </div>
              ))}

              {/* Eligibility Row */}
              <div className="font-medium text-gray-700 py-3 border-t">Eligibility</div>
              {savedCourses.map((course) => (
                <div key={`eligibility-${course.id}`} className="py-3 border-t text-sm text-gray-600">
                  {course.eligibility}
                </div>
              ))}

              {/* Action Row */}
              <div className="font-medium text-gray-700 py-3 border-t">Actions</div>
              {savedCourses.map((course) => (
                <div key={`actions-${course.id}`} className="py-3 border-t">
                  <Button asChild className="w-full bg-accent hover:bg-accent/90">
                    <Link to="/student-dashboard/applications">
                      Apply Now
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseComparison;
