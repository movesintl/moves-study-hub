import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Hooks
import { useUniversityFilters } from '@/hooks/useUniversityFilters';
import { useUniversityPagination } from '@/hooks/useUniversityPagination';

// Components
import { UniversityHeader } from '@/components/universities/UniversityHeader';
import { UniversityGrid } from '@/components/universities/UniversityGrid';
import { UniversityPagination } from '@/components/universities/UniversityPagination';

const Universities = () => {
  // Custom hooks
  const { filters, setFilters, resetFilters, hasActiveFilters } = useUniversityFilters();
  const { currentPage, setCurrentPage, resetPage, getTotalPages, getQueryRange, universitiesPerPage } = useUniversityPagination();
  
  // Local state
  const [showFilters, setShowFilters] = useState(false);

  // University queries with filtering and pagination
  const { data: universitiesData, isLoading, error } = useQuery({
    queryKey: ['universities', filters, currentPage],
    queryFn: async () => {
      let query = supabase
        .from('universities')
        .select(`
          *,
          courses:courses(count)
        `, { count: 'exact' });

      // Apply search filter
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
      }

      // Apply country filter
      if (filters.country !== 'all') {
        query = query.eq('country', filters.country);
      }

      // Apply pagination
      const { from, to } = getQueryRange();
      query = query.range(from, to).order('name');
      
      const { data, error, count } = await query;
      
      if (error) throw error;
      return { universities: data || [], totalCount: count || 0 };
    },
  });

  const universities = universitiesData?.universities || [];
  const totalCount = universitiesData?.totalCount || 0;

  // Reset page when filters change (but not on initial load)
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    resetPage();
  }, [filters.search, filters.country]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = getTotalPages(totalCount);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Universities</h2>
          <p className="text-gray-600">Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <UniversityHeader
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* University Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-200 h-32"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : universities.length > 0 ? (
          <>
            <UniversityGrid universities={universities} />
            <UniversityPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Building2 className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {hasActiveFilters ? 'No Universities Found' : 'No Universities Available'}
              </h3>
              <p className="text-muted-foreground mb-8">
                {hasActiveFilters 
                  ? 'Try adjusting your search criteria or filters to find universities.' 
                  : 'There are no universities available at the moment. Check back later for updates.'
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;