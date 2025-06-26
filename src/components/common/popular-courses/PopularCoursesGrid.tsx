
import React from 'react';
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onViewDetails={onViewDetails}
          isSaved={savedCourseIds.has(course.id)}
          onSaveToggle={() => onSaveToggle?.(course.id)}
        />
      ))}
    </div>
  );
};

export default PopularCoursesGrid;
