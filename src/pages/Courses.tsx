import React, { useState, useEffect } from 'react';
import { Filter, BarChart3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Hooks
import { useCourseFilters } from '@/hooks/useCourseFilters';
import { useCoursePagination } from '@/hooks/useCoursePagination';
import { useSavedCourses } from '@/hooks/useSavedCourses';

// Components
import { CourseSearchBar } from '@/components/courses/CourseSearchBar';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { CoursePagination } from '@/components/courses/CoursePagination';
import { CourseViewToggle } from '@/components/courses/CourseViewToggle';

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

  // Reset page when filters change
  useEffect(() => {
    resetPage();
  }, [filters, resetPage]);

  // Fetch total count for pagination
  const { data: totalCount = 0 } = useQuery({
    queryKey: ['courses-count', filters],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      // Apply same filters for count
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,university.ilike.%${filters.search}%`);
      }
      if (filters.study_area && filters.study_area !== 'all') {
        query = query.eq('study_area', filters.study_area);
      }
      if (filters.level && filters.level !== 'all') {
        query = query.eq('level', filters.level);
      }
      if (filters.country && filters.country !== 'all') {
        query = query.eq('country', filters.country);
      }

      const { count, error } = await query;
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses', filters, currentPage],
    queryFn: async () => {
      const { from, to } = getQueryRange();

      let query = supabase
        .from('courses')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .range(from, to);

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,university.ilike.%${filters.search}%`);
      }
      if (filters.study_area && filters.study_area !== 'all') {
        query = query.eq('study_area', filters.study_area);
      }
      if (filters.level && filters.level !== 'all') {
        query = query.eq('level', filters.level);
      }
      if (filters.country && filters.country !== 'all') {
        query = query.eq('country', filters.country);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Course[];
    }
  });

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
      {/* Modern Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Courses</h1>
              <p className="text-gray-600 mt-1">
                {totalCount} course{totalCount !== 1 ? 's' : ''} available
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </p>
            </div>

            {/* Search Bar */}
            <CourseSearchBar filters={filters} setFilters={setFilters} />

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <CourseViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

              {/* Filter Toggle */}
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-4"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {/* Compare Button */}
              {savedCourseIds.size > 0 && (
                <Link to="/course-comparison">
                  <Button className="h-12 px-4 bg-accent hover:bg-accent/90">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Compare ({savedCourseIds.size})
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <CourseFilters 
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}
        </div>
      </div>

      {/* Course Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
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
        ) : (
          <>
            {/* Course Grid */}
            <CourseGrid 
              courses={courses}
              viewMode={viewMode}
              savedCourseIds={savedCourseIds}
              onSaveToggle={toggleSaveCourse}
            />

            {/* Pagination */}
            <CoursePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
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
        )}
      </div>
    </div>
  );
};

export default Courses;
