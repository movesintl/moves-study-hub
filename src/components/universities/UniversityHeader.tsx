import React from 'react';
import { Filter, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UniversitySearchBar } from './UniversitySearchBar';
import { UniversityFilters } from './UniversityFilters';
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
}: UniversityHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Universities</h1>
            </div>
            <p className="text-gray-600">
              {totalCount} universit{totalCount !== 1 ? 'ies' : 'y'} available
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
          </div>

          {/* Search Bar */}
          <UniversitySearchBar filters={filters} setFilters={setFilters} />

          <div className="flex items-center gap-3">
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
  );
};