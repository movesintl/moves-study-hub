import React, { useState } from 'react';
import { Heart, MapPin, Clock, DollarSign, Calendar, GraduationCap, Eye, ChevronDown, ChevronUp, CircleDot, University } from 'lucide-react';
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
  slug?: string;
  university_logo_url?: string;
}

interface PopularCoursesGridProps {
  courses: Course[];
  onViewDetails: (courseSlug: string) => void;
  onApplyNow: () => void;
  savedCourseIds?: Set<string>;
  onSaveToggle?: (courseId: string) => void;
}

const PopularCoursesGrid: React.FC<PopularCoursesGridProps> = ({
  courses,
  onViewDetails,
  onApplyNow,
  savedCourseIds = new Set(),
  onSaveToggle
}) => {
  const [expandedFees, setExpandedFees] = useState<Set<string>>(new Set());

  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  const toggleFeeExpansion = (courseId: string) => {
    setExpandedFees(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="group relative overflow-hidden bg-white border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 rounded-3xl">
          {/* Image Section */}
          <div className="relative h-12 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
            {course.image_url || course.thumbnail_url ? (
              <img
                src={course.image_url || course.thumbnail_url}
                alt={course.title}
                className="w-full h-1 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-slate-400" />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Content Section */}
          <div className="p-5 space-y-4">

            {/* Badge */}
            <div className="absolute flex items-center gap-4 drop-shadow-sm top-3 mt-5 left-0  bg-white/95 rounded-lg p-6 py-2 shadow-sm">
              {course.university_logo_url ? (
                <img
                  src={course.university_logo_url}
                  alt={`${course.university} logo`}
                  className='w-full h-8 object-cover'
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                </div>
              )}
              
            </div>

            {/* Save Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`absolute top-3 mt-5 right-8 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full h-12 w-12 p-0 border-0 transition-all duration-300 hover:scale-110 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
              onClick={() => onSaveToggle?.(course.id)}
            >
              <Heart className={`transition-all duration-300 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
            </Button>

            {/* Title and University */}
            <div className="space-y-2">
              <h3 className="text-lg mt-8 font-bold text-gray-900 underline cursor-pointer line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                {course.title}
              </h3>
              <div className="flex items-center text-gray-600">
                <University className="h-3.5 mb-1 w-3.5 mr-1.5 text-gray-400" />
                <span className="text-sm font-medium truncate">{course.university}</span>
                <span className='text-gray-500 mx-2'>|</span>
                <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                <span className="text-gray-700 text-sm font-medium">{course.country}</span>
              </div>
            </div>

            {/* Description */}
            {course.description && (
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {course.description}
              </p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs font-medium bg-blue-50 text-blue-500 border-blue-200 px-2.5 py-0.5">
                {course.level}
              </Badge>
              <Badge variant="outline" className="text-xs font-medium bg-purple-50 text-orange-500 border-purple-200 px-2.5 py-0.5">
                {course.study_area}
              </Badge>
            </div>

            <div className="mb-2 border-b-2 bg-black"></div>
            {/* Course Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Duration</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatDuration(course.duration_months)}</span>
              </div>

              {course.intake_dates && course.intake_dates.length > 0 && (
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Intakes</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 truncate ml-2">
                    {course.intake_dates.join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Tuition Fee View More button - shown when collapsed */}
            {!expandedFees.has(course.id) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 font-bold text-lg text-orange-600 hover:text-orange-600 hover:bg-transparent"
                onClick={() => toggleFeeExpansion(course.id)}
              >
                View More <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            )}

            {/* Tuition Fee section - shown only when expanded */}
            {expandedFees.has(course.id) && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 font-medium mb-1">Tuition Fee</div>
                    <div className="font-bold text-lg text-primary">
                      {course.tuition_fee && course.currency
                        ? `${course.currency} ${course.tuition_fee.toLocaleString()}`
                        : 'Contact for fee'}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs text-primary hover:bg-transparent hover:text-primary"
                      onClick={() => toggleFeeExpansion(course.id)}
                    >
                      Show Less <ChevronUp className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="bg-indigo-100 p-2.5 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-11 font-semibold border-2 hover:bg-orange-500 hover:border-0 border-primary text-primary hover:text-white transition-all duration-100"
                onClick={() => onViewDetails(course.slug || '')}
              >
                View Details
              </Button>
              <Button
                className="flex-1 from-primary hover:bg-orange-500 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all duration-300" onClick={onApplyNow}
              >
                Apply Now
              </Button>
            </div>

          </div>
        </Card>
      ))}
    </div>
  );
};

export default PopularCoursesGrid;
