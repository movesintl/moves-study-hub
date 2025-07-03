import React from 'react';
import { Filter, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CourseSearchBar } from './CourseSearchBar';
import { CourseFilters } from './CourseFilters';
import { CourseViewToggle } from './CourseViewToggle';
import { Filters } from '@/hooks/useCourseFilters';

interface CourseHeaderProps {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  savedCourseIds: Set<string>;
}

export const CourseHeader = ({
  totalCount,
  currentPage,
  totalPages,
  filters,
  setFilters,
  resetFilters,
  hasActiveFilters,
  showFilters,
  setShowFilters,
  viewMode,
  setViewMode,
  savedCourseIds
}: CourseHeaderProps) => {
  return (
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
  );
};