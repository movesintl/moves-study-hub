// CourseGrid.tsx
import React, { useState } from 'react';
import { Heart, MapPin, Clock, DollarSign, Calendar, GraduationCap, Eye, University, ChevronUp, ChevronDown, Sparkles, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
  universities?: {
    logo_url: string;
  }
  slug?: string;
}

interface CourseGridProps {
  courses: Course[];
  viewMode: 'grid' | 'list';
  onViewDetails: (courseId: string) => void;
  savedCourseIds?: Set<string>;
  onSaveToggle?: (courseId: string) => void;
  onApplyNow?: () => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  viewMode,
  onViewDetails,
  onApplyNow,
  savedCourseIds = new Set(),
  onSaveToggle
}) => {
  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  const [expandedFees, setExpandedFees] = useState<Set<string>>(new Set());

  const toggleFeeExpansion = (courseId: string) => {
    setExpandedFees((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  // Grid View Card

const renderGridView = (course: Course) => (
  <div className="h-full">
    <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 rounded-xl h-full">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-black/5 pointer-events-none"></div>
      
      {/* Featured badge */}
      <div className="absolute top-2 left-2 z-20">
        <div className="flex items-center gap-1 bg-gradient-to-r from-[#fa8500] to-[#023047] text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg">
          <Sparkles className="h-2.5 w-2.5" />
          Featured
        </div>
      </div>

      {/* Image Section with reduced height */}
      <div className="relative h-28 bg-gradient-to-br from-slate-100 via-[#023047]/5 to-[#fa8500]/10 overflow-hidden">
        <img
          src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/all/placeholder_image.jpg"
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* University logo with bigger size */}
        <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          {course.universities?.logo_url ? (
            <img
              src={course.universities.logo_url}
              alt={`${course.university} logo`}
              className='w-28 h-auto object-cover'
            />
          ) : (
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#023047] to-[#fa8500] flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        {/* Save Button with compact design */}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg rounded-full h-8 w-8 p-0 border-0 transition-all duration-300 hover:scale-110 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
          onClick={() => onSaveToggle?.(course.id)}
        >
          <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Content Section with reduced spacing */}
      <div className="p-4 space-y-3 relative z-10">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-300 cursor-pointer">
            {course.title}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            <span className="text-sm font-medium">{course.country}</span>
          </div>
        </div>

        {/* Description - only show if not expanded */}
        {course.description && !expandedFees.has(course.id) && (
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        )}

        {/* Compact Badges */}
        <div className="flex flex-wrap gap-1.5">
          <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
            {course.level}
          </Badge>
          <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white border-0 px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
            {course.study_area}
          </Badge>
        </div>

        {/* Separator with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* Course Details with compact styling */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                <Clock className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Duration</span>
            </div>
            <span className="text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md shadow-sm">
              {formatDuration(course.duration_months)}
            </span>
          </div>

          {course.intake_dates?.length > 0 && (
            <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Intakes</span>
              </div>
              <span className="text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md shadow-sm truncate ml-2">
                {course.intake_dates.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Compact View More button */}
        {!expandedFees.has(course.id) && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1.5 font-semibold text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200"
            onClick={() => toggleFeeExpansion(course.id)}
          >
            View Pricing <ChevronDown className="h-3.5 w-3.5 ml-1" />
          </Button>
        )}

        {/* Compact Tuition Fee section */}
        {expandedFees.has(course.id) && (
          <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-3 rounded-xl border border-indigo-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-sm text-indigo-600 font-semibold">Tuition Fee</span>
                </div>
                <div className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {course.tuition_fee && course.currency
                    ? `${course.currency} ${course.tuition_fee.toLocaleString()}`
                    : 'Contact for pricing'}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0.5 mt-1 text-xs text-indigo-600 hover:bg-transparent hover:text-indigo-700"
                  onClick={() => toggleFeeExpansion(course.id)}
                >
                  Show Less <ChevronUp className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-xl shadow-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Compact Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 h-10 font-semibold border-2 border-orange-200 text-orange-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
            onClick={() => onViewDetails(course.slug || '')}
          >
            View Details
          </Button>
          <Button
            className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            onClick={onApplyNow}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  </div>
);


// List View Card
  const renderListView = (course: Course) => (
    <Card key={course.id} className="group relative overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl mb-4">
      <div className="flex flex-col md:flex-row">
        {/* University Logo - Left Side */}
      <div className="md:w-1/5 p-4 flex items-center justify-center bg-gray-50">
        {course.universities?.logo_url ? (
          <img
            src={course.universities.logo_url}
            alt={`${course.university} logo`}
            className="w-full max-w-[120px] h-auto max-h-[80px] object-contain"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-gray-500" />
          </div>
        )}
      </div>
        <div className="md:w-3/4 p-5 space-y-3">
          <div className="flex justify-between items-start">
            {/* University logo and basic info */}
            <div className="flex items-start space-x-4">
              

              <div>
                <h3 className="text-lg font-bold text-gray-900 underline cursor-pointer leading-tight group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <University className="h-4 w-4 mr-1.5 text-gray-400" />
                  <span className="text-sm font-medium">{course.university}</span>
                  <span className='text-gray-500 mx-2'>|</span>
                  <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                  <span className="text-gray-700 text-sm font-medium">{course.country}</span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full h-10 w-10 p-0 border-0 transition-all duration-300 hover:scale-110 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
              onClick={() => onSaveToggle?.(course.id)}
            >
              <Heart className={`transition-all duration-300 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Description */}
          {course.description && (
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          )}

          {/* Badges and details */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="text-xs font-medium bg-blue-50 text-blue-500 border-blue-200 px-2.5 py-0.5">
              {course.level}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium bg-purple-50 text-orange-500 border-purple-200 px-2.5 py-0.5">
              {course.study_area}
            </Badge>

          </div>


        <div className="mb-2 border-b-2 bg-black"></div>


            <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center text-sm text-gray-600 ml-2">
              <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{formatDuration(course.duration_months)}</span>
            </div>

            {course.intake_dates?.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                <span>{course.intake_dates.join(', ')}</span>
              </div>
            )}
            </div>
          {/* Tuition fee and actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-2 gap-3">
            <div className="flex items-center">
              {course.tuition_fee && course.currency ? (
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1.5 text-primary" />
                  <span className="font-semibold text-primary">
                    {course.currency} {course.tuition_fee.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-500">Contact for fee information</span>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-9 font-semibold border-2 hover:bg-orange-500 hover:border-2 hover:border-orange-500 border-primary text-primary hover:text-white transition-all duration-100"
                onClick={() => onViewDetails(course.slug || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button
                onClick={onApplyNow}
                className="from-primary hover:bg-orange-500 text-white font-semibold h-9 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className={`${viewMode === 'grid' ? 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}`}>
      {courses.map((course) => (
        viewMode === 'grid' ? renderGridView(course) : renderListView(course)
      ))}
    </div>
  );
};