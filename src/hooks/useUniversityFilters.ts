import { useState } from 'react';

export interface UniversityFilters {
  search: string;
  country: string;
}

export const useUniversityFilters = () => {
  const [filters, setFilters] = useState<UniversityFilters>({
    search: '',
    country: 'all',
  });

  const resetFilters = () => {
    setFilters({
      search: '',
      country: 'all',
    });
  };

  const hasActiveFilters = filters.search !== '' || filters.country !== 'all';

  return {
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters,
  };
};