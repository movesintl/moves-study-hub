import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Shield, Users, Activity, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface SecurityEvent {
  id: string;
  action: string;
  table_name?: string;
  user_id?: string;
  ip_address?: string;
  created_at: string;
  old_values?: any;
  new_values?: any;
}

const SecurityMonitor: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('24h');

  // Query recent security events
  const { data: securityEvents, isLoading } = useQuery({
    queryKey: ['security-events', timeRange],
    queryFn: async () => {
      const hours = timeRange === '1h' ? 1 : timeRange === '24h' ? 24 : 168;
      const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data as SecurityEvent[];
    }
  });

  // Get security metrics
  const securityMetrics = React.useMemo(() => {
    if (!securityEvents) return null;

    const roleChanges = securityEvents.filter(e => e.action.includes('role'));
    const failedAttempts = securityEvents.filter(e => e.action.includes('failed') || e.action.includes('unauthorized'));
    const loginEvents = securityEvents.filter(e => e.action.includes('login') || e.action.includes('auth'));

    return {
      totalEvents: securityEvents.length,
      roleChanges: roleChanges.length,
      failedAttempts: failedAttempts.length,
      loginEvents: loginEvents.length,
      uniqueUsers: new Set(securityEvents.map(e => e.user_id).filter(Boolean)).size
    };
  }, [securityEvents]);

  const getSeverityLevel = (action: string): 'low' | 'medium' | 'high' => {
    if (action.includes('unauthorized') || action.includes('failed') || action.includes('admin_role_removal')) {
      return 'high';
    }
    if (action.includes('role_changed') || action.includes('login')) {
      return 'medium';
    }
    return 'low';
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Metrics */}
      {securityMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Total Events</p>
                  <p className="text-2xl font-bold">{securityMetrics.totalEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Role Changes</p>
                  <p className="text-2xl font-bold">{securityMetrics.roleChanges}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Failed Attempts</p>
                  <p className="text-2xl font-bold">{securityMetrics.failedAttempts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Active Users</p>
                  <p className="text-2xl font-bold">{securityMetrics.uniqueUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Events
            </div>
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as typeof timeRange)}>
              <TabsList>
                <TabsTrigger value="1h">1 Hour</TabsTrigger>
                <TabsTrigger value="24h">24 Hours</TabsTrigger>
                <TabsTrigger value="7d">7 Days</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents && securityEvents.length > 0 ? (
              securityEvents.map((event) => {
                const severity = getSeverityLevel(event.action);
                return (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant={getSeverityColor(severity)}>
                        {severity.toUpperCase()}
                      </Badge>
                      <div>
                        <p className="font-medium">{event.action.replace(/_/g, ' ').toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.table_name && `Table: ${event.table_name}`}
                          {event.ip_address && ` • IP: ${event.ip_address}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(event.created_at), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No security events found for the selected time range.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMonitor;