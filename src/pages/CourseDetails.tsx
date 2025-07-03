
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Clock, DollarSign, Calendar, ArrowLeft, GraduationCap, BookOpen, Users, Award, CheckCircle, Globe, BarChart3, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import HowToApply from '@/components/common/HowToApply';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const CourseDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities:university_id(name, location, logo_url, website_url, slug),
          destinations:destination_id(name, featured_image_url)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: isSaved = false } = useQuery({
    queryKey: ['saved-course', course?.id, user?.id],
    queryFn: async () => {
      if (!user?.id || !course?.id) return false;
      
      const { data, error } = await supabase
        .from('saved_courses')
        .select('id')
        .eq('course_id', course.id)
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    },
    enabled: !!user && !!course,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id || !course?.id) throw new Error('User not authenticated');
      
      if (isSaved) {
        const { error } = await supabase
          .from('saved_courses')
          .delete()
          .eq('course_id', course.id)
          .eq('user_id', user.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('saved_courses')
          .insert({ course_id: course.id, user_id: user.id });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-course', course?.id, user?.id] });
      toast({
        title: isSaved ? "Course removed from saved list" : "Course saved successfully",
        description: isSaved ? "You can find it in your saved courses." : "You can view it in your saved courses.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update saved courses. Please try again.",
        variant: "destructive",
      });
      console.error('Save course error:', error);
    },
  });

  const handleSaveCourse = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save courses.",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate();
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-60 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {course.featured && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    ✨ Featured
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {course.study_area}
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {course.level}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="font-medium">{course.universities?.name || course.university}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>{course.destinations?.name || course.country}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{formatDuration(course.duration_months)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white/80 text-sm mb-1">Tuition Fee</div>
              <div className="text-2xl font-bold">
                {course.currency} {course.tuition_fee?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Image */}
            {course.thumbnail_url && (
              <Card className="overflow-hidden shadow-lg">
                <img 
                  src={course.thumbnail_url} 
                  alt={course.title}
                  className="w-full h-80 object-cover"
                />
              </Card>
            )}

            {/* Course Description */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <BookOpen className="h-6 w-6 mr-3 text-primary" />
                  Course Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {course.description || 'No description available for this course.'}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <div className="grid md:grid-cols-2 gap-6">
              {course.eligibility && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Eligibility Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{course.eligibility}</p>
                  </CardContent>
                </Card>
              )}

              {course.requirements && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-blue-500" />
                      Additional Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line">{course.requirements}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - Course Info & Actions */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-xl">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Study Level</div>
                    <div className="font-semibold">{course.level}</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <Clock className="h-8 w-8 text-accent mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold">{formatDuration(course.duration_months)}</div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Tuition Fee</div>
                      <div className="text-xl font-bold text-primary">
                        {course.currency} {course.tuition_fee?.toLocaleString()}
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary/40" />
                  </div>
                </div>

                {course.intake_dates && course.intake_dates.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      Intake Dates
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.intake_dates.map((date, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {date}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* University Info */}
            {course.universities && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    University
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.universities.logo_url && (
                      <div className="flex justify-center">
                        <img 
                          src={course.universities.logo_url} 
                          alt={course.universities.name}
                          className="h-16 object-contain"
                        />
                      </div>
                    )}
                    <div className="text-center">
                      <h4 className="font-semibold text-lg">{course.universities.name}</h4>
                      {course.universities.location && (
                        <p className="text-gray-600 mt-1">{course.universities.location}</p>
                      )}
                    </div>
                    {course.universities.slug && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to={`/universities/${course.universities.slug}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View University Details
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {course.application_link ? (
                <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg" asChild>
                  <a href={course.application_link} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="h-5 w-5 ml-2" />
                  </a>
                </Button>
              ) : (
                <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg">
                  Contact Us to Apply
                </Button>
              )}
              
              <Button 
                variant={isSaved ? "default" : "outline"} 
                className={`w-full h-12 font-semibold border-2 ${isSaved ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
                onClick={handleSaveCourse}
                disabled={saveMutation.isPending}
              >
                <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                {saveMutation.isPending ? 'Saving...' : isSaved ? 'Remove from Saved' : 'Save Course'}
              </Button>
              
              <Button variant="outline" className="w-full h-12 font-semibold border-2" asChild>
                <Link to="/course-comparison">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Compare Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* How to Apply Section */}
      <HowToApply />
      
      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default CourseDetails;
