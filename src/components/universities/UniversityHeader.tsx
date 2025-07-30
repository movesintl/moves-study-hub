import React from 'react';
import { Filter, Building2, MapPin, Users, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UniversitySearchBar } from './UniversitySearchBar';
import { UniversityFilters } from './UniversityFilters';
import { UniversityViewToggle } from './UniversityViewToggle';
import { UniversityFilters as UniversityFiltersType } from '@/hooks/useUniversityFilters';

interface UniversityHeaderProps {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: UniversityFiltersType;
  setFilters: (filters: UniversityFiltersType) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const UniversityHeader = ({
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
}: UniversityHeaderProps) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-brand overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -left-8 w-40 h-40 bg-white/20 rounded-full"></div>
          <div className="absolute top-32 right-16 w-24 h-24 bg-accent/30 rounded-full"></div>
          <div className="absolute bottom-16 left-32 w-20 h-20 bg-white/15 rounded-full"></div>
          <div className="absolute top-16 left-1/3 w-16 h-16 bg-accent/20 rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Building2 className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              World-Class
              <span className="block text-accent">Universities</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Connect with prestigious universities across the globe. 
              Find the perfect institution for your academic journey.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{totalCount}+</div>
                <div className="text-white/80">Partner Universities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">40+</div>
                <div className="text-white/80">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-white/80">Success Rate</div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mb-8">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                <span>Top Rankings</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span>Global Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span>Expert Guidance</span>
              </div>
            </div>

            {/* Search prompt */}
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Search className="h-5 w-5" />
              <span>Search universities below</span>
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
                {totalCount} universit{totalCount !== 1 ? 'ies' : 'y'} available
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </p>
            </div>

            {/* Search Bar */}
            <UniversitySearchBar filters={filters} setFilters={setFilters} />

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <UniversityViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

              {/* Filter Toggle */}
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-4"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <UniversityFilters 
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