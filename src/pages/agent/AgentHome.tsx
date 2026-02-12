import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Users, FileText, Clock, CheckCircle, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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
    { label: 'Students', value: studentCount, icon: Users, gradient: 'from-primary to-[hsl(195,100%,20%)]', link: '/agent/students' },
    { label: 'Applications', value: applications.length, icon: FileText, gradient: 'from-blue-600 to-blue-500', link: '/agent/applications' },
    { label: 'Pending', value: pendingCount, icon: Clock, gradient: 'from-amber-500 to-orange-400', link: '/agent/applications' },
    { label: 'Approved', value: approvedCount, icon: CheckCircle, gradient: 'from-emerald-600 to-emerald-400', link: '/agent/applications' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-[hsl(195,100%,20%)] p-6 lg:p-8 text-primary-foreground">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium text-accent">Agent Dashboard</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">
            Welcome back, {agent?.contact_person || 'Agent'}
          </h1>
          <p className="text-sm text-primary-foreground/70 max-w-md">
            {agent?.company_name && <>{agent.company_name} · </>}Manage students, track applications, and discover courses.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="group relative overflow-hidden bg-card rounded-2xl border border-border p-5 hover:shadow-elegant transition-all duration-300"
          >
            <div className={cn("absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br opacity-10 -translate-y-1/3 translate-x-1/3 group-hover:opacity-20 transition-opacity", stat.gradient)} />
            <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg", stat.gradient)}>
              <stat.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-0.5">{stat.value}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/agent/students"
          className="group bg-card rounded-2xl border border-border p-5 hover:shadow-elegant hover:border-primary/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Manage Students</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">Add, edit, and manage your student profiles and their details.</p>
        </Link>

        <Link
          to="/agent/courses"
          className="group bg-card rounded-2xl border border-border p-5 hover:shadow-elegant hover:border-accent/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-accent" />
            </div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">Browse Courses</h3>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">Explore available courses and find the perfect match for your students.</p>
        </Link>
      </div>
    </div>
  );
};

export default AgentHome;
