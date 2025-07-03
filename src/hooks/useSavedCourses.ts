import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useSavedCourses = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());

  // Fetch saved courses - only if user is logged in
  const { data: savedCourses, refetch: refetchSaved } = useQuery({
    queryKey: ['saved-courses-ids', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('saved_courses')
        .select('course_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(item => item.course_id);
    },
    enabled: !!user?.id
  });

  useEffect(() => {
    if (savedCourses) {
      setSavedCourseIds(new Set(savedCourses));
    }
  }, [savedCourses]);

  const toggleSaveCourse = async (courseId: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save courses.",
        variant: "destructive"
      });
      return;
    }

    const isSaved = savedCourseIds.has(courseId);
    
    if (isSaved) {
      const { error } = await supabase
        .from('saved_courses')
        .delete()
        .eq('course_id', courseId)
        .eq('user_id', user.id);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove course from saved list",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
        toast({
          title: "Success",
          description: "Course removed from saved list"
        });
        refetchSaved();
      }
    } else {
      const { error } = await supabase
        .from('saved_courses')
        .insert({ 
          course_id: courseId, 
          user_id: user.id 
        });
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to save course",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => new Set(prev).add(courseId));
        toast({
          title: "Success",
          description: "Course saved successfully"
        });
        refetchSaved();
      }
    }
  };

  return {
    savedCourseIds,
    toggleSaveCourse
  };
};