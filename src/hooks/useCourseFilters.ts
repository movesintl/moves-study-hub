import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface Filters {
  search: string;
  study_area: string;
  level: string;
  country: string;
}

export const useCourseFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    study_area: searchParams.get('study_area') || 'all',
    level: searchParams.get('level') || 'all',
    country: searchParams.get('country') || 'all'
  });

  // Update URL when filters change (with debounce to prevent excessive updates)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.study_area !== 'all') params.set('study_area', filters.study_area);
      if (filters.level !== 'all') params.set('level', filters.level);
      if (filters.country !== 'all') params.set('country', filters.country);
      
      setSearchParams(params, { replace: true });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, setSearchParams]);

  const resetFilters = () => {
    setFilters({
      search: '',
      study_area: 'all',
      level: 'all',
      country: 'all'
    });
  };

  const hasActiveFilters = Boolean(filters.search || filters.study_area !== 'all' || filters.level !== 'all' || filters.country !== 'all');

  return {
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters
  };
};