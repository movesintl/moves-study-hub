import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AgentAuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [isAgent, setIsAgent] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAgentStatus = async () => {
      if (authLoading) return;
      if (!user) { navigate('/auth'); return; }

      try {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error || profile?.role !== 'agent') {
          setIsAgent(false);
          navigate('/auth');
          return;
        }

        // Check if agent is active
        const { data: agent } = await supabase
          .from('agents')
          .select('is_active')
          .eq('user_id', user.id)
          .single();

        if (!agent?.is_active) {
          setIsAgent(false);
          navigate('/auth');
          return;
        }

        setIsAgent(true);
      } catch {
        setIsAgent(false);
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    checkAgentStatus();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Verifying agent access...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAgent) return null;
  return <>{children}</>;
};

export default AgentAuthGuard;
