
import React from 'react';
import { Heart, MapPin, Clock, DollarSign, Calendar, GraduationCap, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface PopularCoursesGridProps {
  courses: Course[];
  onViewDetails: (courseId: string) => void;
  savedCourseIds?: Set<string>;
  onSaveToggle?: (courseId: string) => void;
}

const PopularCoursesGrid: React.FC<PopularCoursesGridProps> = ({ 
  courses, 
  onViewDetails, 
  savedCourseIds = new Set(),
  onSaveToggle 
}) => {
  const formatTuitionFee = (min?: number, max?: number, currency: string = 'AUD') => {
    const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
    if (!min && !max) return 'Fee information not available';
    if (min && max && min !== max) {
      return `${currency} ${formatNumber(min)} - ${formatNumber(max)}`;
    }
    const fee = min || max;
    return `${currency} ${fee ? formatNumber(fee) : 'N/A'}`;
  };

  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  const handleApplyNow = (courseId: string) => {
    // For now, just redirect to course details
    onViewDetails(courseId);
  };

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative overflow-hidden bg-white/80 backdrop-blur-sm">
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
            onClick={() => onSaveToggle?.(course.id)}
          >
            <Heart className={`h-5 w-5 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
          </Button>

          {/* Course Image */}
          <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
            <GraduationCap className="h-16 w-16 text-primary/60 relative z-10" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
          </div>
          
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
            {course.description && (
              <p className="text-gray-600 line-clamp-2 leading-relaxed">{course.description}</p>
            )}
            
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
              {course.intake_dates && course.intake_dates.length > 0 && (
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="truncate">Intakes: {course.intake_dates.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 rounded-xl border border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 font-medium">Tuition Fee</div>
                  <div className="font-bold text-lg text-primary">
                    {course.tuition_fee && course.currency && `${course.currency} ${course.tuition_fee.toLocaleString()}`}
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-primary/40" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 h-11 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => onViewDetails(course.id)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button 
                onClick={() => handleApplyNow(course.id)}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PopularCoursesGrid;
