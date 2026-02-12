import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Users, FileText, Clock, CheckCircle } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {agent?.contact_person || 'Agent'}
        </h1>
        <p className="text-gray-600 mt-1">
          {agent?.company_name ? `${agent.company_name} • ` : ''}Agent Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">My Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentHome;
