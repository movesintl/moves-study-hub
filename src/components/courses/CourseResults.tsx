import React from 'react';
import { BarChart3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { CourseGrid } from './CourseGrid';
import { CoursePagination } from './CoursePagination';

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

interface CourseResultsProps {
  courses: Course[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  savedCourseIds: Set<string>;
  onSaveToggle: (courseId: string) => void;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  coursesPerPage: number;
  hasActiveFilters: boolean;
  onPageChange: (page: number) => void;
  resetFilters: () => void;
}

export const CourseResults = ({
  courses,
  isLoading,
  viewMode,
  savedCourseIds,
  onSaveToggle,
  currentPage,
  totalPages,
  totalCount,
  coursesPerPage,
  hasActiveFilters,
  onPageChange,
  resetFilters
}: CourseResultsProps) => {
const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  const handleApplyNow = () => {
    navigate('/student-dashboard/applications');
  };
  const handleViewDetails = (courseSlug: string) => {
    navigate(`/courses/${courseSlug}`);
  };
  return (
    <>
      {/* Course Grid */}
      <CourseGrid 
        courses={courses}
        viewMode={viewMode}
        savedCourseIds={savedCourseIds}
        onSaveToggle={onSaveToggle}
        onApplyNow={handleApplyNow} 
        onViewDetails={handleViewDetails}      />

      {/* Pagination */}
      <CoursePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {/* Results Summary */}
      {courses.length > 0 && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-sm border">
            <span className="text-gray-600">
              Showing {((currentPage - 1) * coursesPerPage) + 1}-{Math.min(currentPage * coursesPerPage, totalCount)} of {totalCount} course{totalCount !== 1 ? 's' : ''}
              {hasActiveFilters && ' matching your criteria'}
            </span>
            {savedCourseIds.size > 0 && (
              <>
                <span className="mx-3 text-gray-300">•</span>
                <Link to="/course-comparison">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Compare {savedCourseIds.size} saved
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* No Results with Clear Filters */}
      {courses.length === 0 && !isLoading && hasActiveFilters && (
        <div className="text-center py-12">
          <Button onClick={resetFilters} variant="outline" size="lg">
            <X className="h-4 w-4 mr-2" />
            Clear all filters
          </Button>
        </div>
      )}
    </>
  );
};