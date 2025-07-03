import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Hooks
import { useCourseFilters } from '@/hooks/useCourseFilters';
import { useCoursePagination } from '@/hooks/useCoursePagination';
import { useSavedCourses } from '@/hooks/useSavedCourses';
import { useCourseQueries } from '@/hooks/useCourseQueries';

// Components
import { CourseHeader } from '@/components/courses/CourseHeader';
import { CourseResults } from '@/components/courses/CourseResults';

const Courses = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Custom hooks
  const { filters, setFilters, resetFilters, hasActiveFilters } = useCourseFilters();
  const { currentPage, setCurrentPage, resetPage, getTotalPages, getQueryRange, coursesPerPage } = useCoursePagination();
  const { savedCourseIds, toggleSaveCourse } = useSavedCourses();
  
  // Local state
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Course queries
  const { courses, totalCount, isLoading, error } = useCourseQueries(filters, currentPage, getQueryRange);

  // Reset page when filters change (but not on initial load)
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    resetPage();
  }, [filters.search, filters.study_area, filters.level, filters.country]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Check for pending course application after login
  useEffect(() => {
    if (user) {
      const pendingCourseId = sessionStorage.getItem('pendingCourseApplication');
      if (pendingCourseId) {
        sessionStorage.removeItem('pendingCourseApplication');
        toast({
          title: "Ready to Apply",
          description: "You can now complete your course application.",
        });
        navigate('/student-dashboard/applications', { 
          state: { preselectedCourseId: pendingCourseId } 
        });
      }
    }
  }, [user, navigate, toast]);

  const totalPages = getTotalPages(totalCount);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600">Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <CourseHeader
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        savedCourseIds={savedCourseIds}
      />

      {/* Course Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseResults
          courses={courses}
          isLoading={isLoading}
          viewMode={viewMode}
          savedCourseIds={savedCourseIds}
          onSaveToggle={toggleSaveCourse}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          coursesPerPage={coursesPerPage}
          hasActiveFilters={hasActiveFilters}
          onPageChange={setCurrentPage}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
};

export default Courses;