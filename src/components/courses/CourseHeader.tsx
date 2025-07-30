import React from 'react';
import { Filter, BarChart3, GraduationCap, Search, Sparkles } from 'lucide-react';
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
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-brand overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/20 rounded-full"></div>
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent/30 rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/15 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Discover Your
              <span className="block text-accent">Perfect Course</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Explore thousands of courses from top universities worldwide. 
              Find the program that matches your career goals and aspirations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{totalCount}+</div>
                <div className="text-white/80">Available Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80">Universities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-white/80">Study Areas</div>
              </div>
            </div>

            {/* Search highlight */}
            <div className="flex items-center justify-center gap-2 text-white/80 mb-8">
              <Search className="h-5 w-5" />
              <span>Start your search below</span>
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls Bar */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-muted-foreground">
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
    </>
  );
};