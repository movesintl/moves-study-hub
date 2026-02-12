import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Users, FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const AgentHome = () => {
  const { user } = useAuth();

  const { data: agent } = useQuery({
    queryKey: ['agent-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('agents')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: studentCount = 0 } = useQuery({
    queryKey: ['agent-student-count', agent?.id],
    queryFn: async () => {
      const { count, error } = await (supabase as any)
        .from('agent_students')
        .select('*', { count: 'exact', head: true })
        .eq('agent_id', agent!.id);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!agent,
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['agent-applications', agent?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('applications')
        .select('status')
        .eq('agent_id', agent!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!agent,
  });

  const pendingCount = applications.filter((a: any) => a.status === 'pending').length;
  const approvedCount = applications.filter((a: any) => a.status === 'approved').length;

  const stats = [
    { label: 'My Students', value: studentCount, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Applications', value: applications.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: pendingCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Approved', value: approvedCount, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back, {agent?.contact_person || 'Agent'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {agent?.company_name && <>{agent.company_name} · </>}Here's your overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-4 lg:p-5 hover:shadow-soft transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions placeholder */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Quick Tip</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Use the sidebar to navigate between your students, applications, and browse available courses and universities.
        </p>
      </div>
    </div>
  );
};

export default AgentHome;
