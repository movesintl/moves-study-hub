import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Heart, Clock, Calendar, DollarSign, MapPin, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

interface Course {
  id: string;
  title: string;
  description?: string;
  study_area: string;
  level: string;
  duration_months: number;
  tuition_fee?: number;
  currency?: string;
  featured?: boolean;
  slug?: string;
  university?: string;
  country?: string;
  intake_dates?: string[];
}

interface UniversityCoursesProps {
  university: {
    name: string;
  };
  courses: Course[];
}

export const UniversityCourses = ({ university, courses }: UniversityCoursesProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());

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

  const toggleSaveCourse = async (courseId: string) => {
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

  const handleApplyNow = (courseId: string) => {
    if (!user) {
      // Store the course ID in sessionStorage so we can redirect back after login
      sessionStorage.setItem('pendingCourseApplication', courseId);
      toast({
        title: "Login Required",
        description: "Please log in to apply for this course.",
      });
      navigate('/auth');
      return;
    }

    // User is logged in, redirect to student dashboard applications page
    navigate('/student-dashboard/applications', { 
      state: { preselectedCourseId: courseId } 
    });
  };
  return (
    <section className="py-16 lg:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {courses.length > 0 ? (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Available Programs
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore the diverse range of programs offered by {university.name}
                </p>
                <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative overflow-hidden bg-white/80 backdrop-blur-sm">
                    {/* Featured Badge */}
                    {course.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg rounded-full px-3 py-1">
                          ✨ Featured
                        </Badge>
                      </div>
                    )}
                    
                    {/* Save Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full h-10 w-10 p-0 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                      onClick={() => toggleSaveCourse(course.id)}
                    >
                      <Heart className={`h-5 w-5 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
                    {/* Course Image */}
                    <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
                      <GraduationCap className="h-16 w-16 text-primary/60 relative z-10" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Course Title */}
                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 text-card-foreground">
                          {course.title}
                        </h3>
                        
                        {/* University & Location */}
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="font-medium truncate">{course.university}</span>
                          <span className="mx-2">•</span>
                          <span>{course.country}</span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-muted-foreground line-clamp-2 leading-relaxed">{course.description}</p>
                        
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="font-medium bg-primary/5 text-primary border-primary/20 rounded-full">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="font-medium bg-accent/5 text-accent border-accent/20 rounded-full">
                            {course.study_area}
                          </Badge>
                        </div>

                        {/* Duration & Intakes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{Math.floor(course.duration_months / 12)} year{Math.floor(course.duration_months / 12) !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="truncate">Intakes: {course.intake_dates?.join(', ') || 'February,...'}</span>
                          </div>
                        </div>

                        {/* Tuition Fee */}
                        {course.tuition_fee && (
                          <div className="bg-muted/50 p-4 rounded-xl border">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-muted-foreground font-medium">Tuition Fee</div>
                                <div className="font-bold text-lg text-foreground">
                                  {course.currency} {course.tuition_fee?.toLocaleString()}
                                </div>
                              </div>
                              <DollarSign className="h-8 w-8 text-muted-foreground/40" />
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Link to={`/courses/${course.slug}`} className="flex-1">
                            <Button variant="outline" className="w-full h-11 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <Button 
                            onClick={() => handleApplyNow(course.id)}
                            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8">
                    Browse All Programs
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="bg-secondary rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No Programs Available</h3>
                <p className="text-muted-foreground mb-8">
                  This university doesn't have any programs listed yet. Check back later or contact us for more information.
                </p>
                <Link to="/contact">
                  <Button size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};