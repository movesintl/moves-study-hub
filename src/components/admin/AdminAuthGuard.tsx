
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authLoading) return;

      if (!user) {
        navigate('/admin/auth');
        return;
      }

      try {
        // Check if user has admin role
        const { data: userProfile, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          navigate('/admin/auth');
          return;
        }

        const hasAdminAccess = userProfile?.role === 'admin' || userProfile?.role === 'editor' || userProfile?.role === 'counselor';
        setIsAdmin(hasAdminAccess);

        if (!hasAdminAccess) {
          navigate('/admin/auth');
        }
      } catch (error) {
        console.error('Error in admin check:', error);
        setIsAdmin(false);
        navigate('/admin/auth');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will be redirected by useEffect
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
