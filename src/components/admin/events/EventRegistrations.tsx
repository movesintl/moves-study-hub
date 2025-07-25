import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Mail, Phone, Building, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface EventRegistrationsProps {
  eventId: string;
  eventTitle: string;
}

const EventRegistrations: React.FC<EventRegistrationsProps> = ({ eventId, eventTitle }) => {
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: registrations, isLoading } = useQuery({
    queryKey: ['event-registrations', eventId, filter],
    queryFn: async () => {
      let query = supabase
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('registration_date', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const updateRegistrationStatus = useMutation({
    mutationFn: async ({ registrationId, status }: { registrationId: string; status: string }) => {
      const { error } = await supabase
        .from('event_registrations')
        .update({ status })
        .eq('id', registrationId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-registrations'] });
      toast({ title: 'Registration status updated successfully' });
    },
    onError: (error) => {
      toast({ title: 'Error updating status', description: error.message, variant: 'destructive' });
    }
  });

  const exportToCSV = () => {
    if (!registrations || registrations.length === 0) {
      toast({ title: 'No registrations to export', variant: 'destructive' });
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Company', 'Designation', 'Registration Date', 'Status', 'Message'];
    const csvContent = [
      headers.join(','),
      ...registrations.map(reg => [
        reg.name,
        reg.email,
        reg.phone || '',
        reg.company || '',
        reg.designation || '',
        format(new Date(reg.registration_date), 'yyyy-MM-dd HH:mm'),
        reg.status,
        (reg.message || '').replace(/,/g, ';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_registrations.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Event Registrations - {eventTitle}</CardTitle>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {registrations?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No registrations found for this event.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations?.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{registration.name}</span>
                        </div>
                        {registration.message && (
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span className="text-sm text-gray-600 line-clamp-2">
                              {registration.message}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a 
                            href={`mailto:${registration.email}`}
                            className="text-primary hover:underline"
                          >
                            {registration.email}
                          </a>
                        </div>
                        {registration.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a 
                              href={`tel:${registration.phone}`}
                              className="text-primary hover:underline"
                            >
                              {registration.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {registration.company && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <span>{registration.company}</span>
                          </div>
                        )}
                        {registration.designation && (
                          <div className="text-sm text-gray-600">
                            {registration.designation}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(registration.registration_date), 'PPp')}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(registration.status)}>
                        {registration.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={registration.status}
                        onValueChange={(status) =>
                          updateRegistrationStatus.mutate({
                            registrationId: registration.id,
                            status
                          })
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventRegistrations;