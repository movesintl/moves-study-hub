import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Application, Document } from '@/types/applications';

export const useStudentApplications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['student-applications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          courses(title, university),
          universities(name),
          destinations(name)
        `)
        .eq('student_email', user.email)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match our Application interface
      return (data || []).map(app => ({
        ...app,
        documents: ((app.documents as unknown as Document[]) || []).map(doc => ({
          ...doc,
          category: doc.category || 'other'
        }))
      })) as Application[];
    },
    enabled: !!user?.id
  });
};