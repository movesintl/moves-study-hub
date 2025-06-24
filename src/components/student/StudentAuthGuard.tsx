
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface StudentAuthGuardProps {
  children: React.ReactNode;
}

const StudentAuthGuard: React.FC<StudentAuthGuardProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStudentAccess = async () => {
      if (authLoading) return;

      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Check if user has a role defined
        const { data: userProfile, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "not found" error, which is acceptable for new users
          console.error('Error checking user role:', error);
          setIsAuthorized(true); // Allow access if we can't determine role
        } else {
          const userRole = userProfile?.role;
          
          // Allow access if user has no role (default user) or explicitly has user role
          // Block access if user is admin or editor
          const hasStudentAccess = !userRole || userRole === 'user';
          setIsAuthorized(hasStudentAccess);

          if (!hasStudentAccess && (userRole === 'admin' || userRole === 'editor')) {
            // Redirect admin/editor users to admin panel
            navigate('/admin');
          }
        }
      } catch (error) {
        console.error('Error in student access check:', error);
        setIsAuthorized(true); // Allow access on error
      } finally {
        setLoading(false);
      }
    };

    checkStudentAccess();
  }, [user, authLoading, navigate]);

  // Auto-assign user role to new users who don't have a profile
  useEffect(() => {
    const createUserProfile = async () => {
      if (!user || authLoading) return;

      try {
        const { data: existingProfile, error: checkError } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (checkError && checkError.code === 'PGRST116') {
          // User doesn't have a profile, create one with 'user' role
          const { error: insertError } = await supabase
            .from('user_profiles')
            .insert([
              {
                user_id: user.id,
                role: 'user'
              }
            ]);

          if (insertError) {
            console.error('Error creating user profile:', insertError);
          }
        }
      } catch (error) {
        console.error('Error in profile creation:', error);
      }
    };

    createUserProfile();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return null; // Will be redirected by useEffect
  }

  return <>{children}</>;
};

export default StudentAuthGuard;
