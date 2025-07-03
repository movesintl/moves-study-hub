import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Filters } from '@/hooks/useCourseFilters';

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

export const useCourseQueries = (filters: Filters, currentPage: number, getQueryRange: () => { from: number; to: number }) => {
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

  // Fetch courses with pagination
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses', filters, currentPage],
    queryFn: async () => {
      const { from, to } = getQueryRange();
      console.log('Pagination Debug:', { currentPage, from, to });

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

  return {
    courses,
    totalCount,
    isLoading,
    error
  };
};