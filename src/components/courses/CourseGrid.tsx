import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Calendar, GraduationCap, Heart, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
  slug: string;
}

interface CourseGridProps {
  courses: Course[];
  viewMode: 'grid' | 'list';
  savedCourseIds: Set<string>;
  onSaveToggle: (courseId: string) => void;
}

export const CourseGrid = ({ courses, viewMode, savedCourseIds, onSaveToggle }: CourseGridProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
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

  if (courses.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We couldn't find any courses matching your criteria. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {courses.map((course) => (
        <Card key={course.id} className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative overflow-hidden bg-white/80 backdrop-blur-sm ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
          {/* Featured Badge */}
          {course.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg">
                ✨ Featured
              </Badge>
            </div>
          )}
          
          {/* Save Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full h-10 w-10 p-0 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
            onClick={() => onSaveToggle(course.id)}
          >
            <Heart className={`h-5 w-5 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
          </Button>

          {/* Course Image */}
          <div className={`${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : ''}`}>
            <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
              <GraduationCap className="h-16 w-16 text-primary/60 relative z-10" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
            </div>
          </div>
          
          <div className="flex-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {course.title}
              </CardTitle>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                <span className="font-medium truncate">{course.university}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500">{course.country}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-5">
              <p className="text-gray-600 line-clamp-2 leading-relaxed">{course.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="font-medium bg-primary/5 text-primary border-primary/20">
                  {course.level}
                </Badge>
                <Badge variant="outline" className="font-medium bg-accent/5 text-accent border-accent/20">
                  {course.study_area}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">{formatDuration(course.duration_months)}</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="truncate">Intakes: {course.intake_dates?.join(', ')}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 rounded-xl border border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 font-medium">Tuition Fee</div>
                    <div className="font-bold text-lg text-primary">
                      {course.currency} {course.tuition_fee?.toLocaleString()}
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary/40" />
                </div>
              </div>

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
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};