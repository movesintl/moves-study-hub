
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
}

interface PopularCoursesGridProps {
  courses: Course[];
  onViewDetails: (courseId: string) => void;
}

const PopularCoursesGrid: React.FC<PopularCoursesGridProps> = ({ courses, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default PopularCoursesGrid;
