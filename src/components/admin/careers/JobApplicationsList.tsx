import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, Eye, MoreHorizontal, Users } from 'lucide-react';
import { format } from 'date-fns';

interface JobApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  cv_file_url: string | null;
  cover_letter_file_url: string | null;
  created_at: string;
}

interface JobApplicationsListProps {
  careerId: string;
  jobTitle: string;
}

export const JobApplicationsList: React.FC<JobApplicationsListProps> = ({ 
  careerId, 
  jobTitle 
}) => {
  const { data: applications, isLoading } = useQuery({
    queryKey: ['job-applications', careerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('career_id', careerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as JobApplication[];
    }
  });

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    const { error } = await supabase
      .from('job_applications')
      .update({ status: newStatus })
      .eq('id', applicationId);

    if (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'reviewing': 'bg-blue-100 text-blue-800',
      'interviewed': 'bg-purple-100 text-purple-800',
      'accepted': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No applications received yet for this position.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Users className="h-4 w-4 mr-2" />
          View Applications ({applications.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Applications for {jobTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Files</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{application.full_name}</div>
                      <div className="text-sm text-muted-foreground">{application.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {application.phone || 'Not provided'}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(application.created_at), 'PPp')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {application.cv_file_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(application.cv_file_url!, '_blank')}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          CV
                        </Button>
                      )}
                      {application.cover_letter_file_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(application.cover_letter_file_url!, '_blank')}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Cover Letter
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onClick={() => updateApplicationStatus(application.id, 'reviewing')}
                        >
                          Mark as Reviewing
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => updateApplicationStatus(application.id, 'interviewed')}
                        >
                          Mark as Interviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => updateApplicationStatus(application.id, 'accepted')}
                        >
                          Accept Application
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        >
                          Reject Application
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};