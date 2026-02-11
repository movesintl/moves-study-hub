import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Search, Clock, Eye, CheckCircle, XCircle } from 'lucide-react';

const AgentApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '', course_id: '', university_id: '', destination_id: '', notes: '',
  });

  const { data: agent } = useQuery({
    queryKey: ['agent-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('agents').select('id').eq('user_id', user!.id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: students = [] } = useQuery({
    queryKey: ['agent-students', agent?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('agent_students').select('*').eq('agent_id', agent!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!agent,
  });

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['agent-applications', agent?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select(`*, courses:course_id(title, level), universities:university_id(name), destinations:destination_id(name)`)
        .eq('agent_id', agent!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!agent,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['courses-list'],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('id, title, university, university_id, country, destination_id').order('title');
      if (error) throw error;
      return data;
    },
  });

  const submitApplication = useMutation({
    mutationFn: async () => {
      const student = students.find((s: any) => s.id === formData.student_id);
      const course = courses.find((c: any) => c.id === formData.course_id);
      if (!student || !course) throw new Error('Select a student and course');

      const { error } = await supabase.from('applications').insert({
        agent_id: agent!.id,
        student_name: student.student_name,
        student_email: student.student_email,
        student_phone: student.student_phone || '',
        course_id: course.id,
        university_id: course.university_id,
        destination_id: course.destination_id,
        nationality: student.nationality,
        date_of_birth: student.date_of_birth,
        address: student.address,
        notes: formData.notes || null,
        status: 'pending',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Application Submitted' });
      setIsFormOpen(false);
      setFormData({ student_id: '', course_id: '', university_id: '', destination_id: '', notes: '' });
      queryClient.invalidateQueries({ queryKey: ['agent-applications'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; icon: any }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      under_review: { color: 'bg-blue-100 text-blue-800', icon: Eye },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    const c = config[status] || config.pending;
    const Icon = c.icon;
    return <Badge className={c.color}><Icon className="h-3 w-3 mr-1" />{status.replace('_', ' ').toUpperCase()}</Badge>;
  };

  const filtered = applications.filter((app: any) =>
    app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.courses?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Submit and track student applications</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />New Application</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Student *</Label>
                <Select value={formData.student_id} onValueChange={(v) => setFormData({ ...formData, student_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select a student" /></SelectTrigger>
                  <SelectContent>
                    {students.map((s: any) => (
                      <SelectItem key={s.id} value={s.id}>{s.student_name} ({s.student_email})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {students.length === 0 && <p className="text-sm text-gray-500 mt-1">Add a student profile first.</p>}
              </div>
              <div>
                <Label>Course *</Label>
                <Select value={formData.course_id} onValueChange={(v) => setFormData({ ...formData, course_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select a course" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>{c.title} — {c.university}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notes</Label>
                <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Optional notes..." />
              </div>
              <Button onClick={() => submitApplication.mutate()} disabled={!formData.student_id || !formData.course_id || submitApplication.isPending} className="w-full">
                {submitApplication.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search applications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No applications yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((app: any) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.student_name}</TableCell>
                      <TableCell>{app.courses?.title || '—'}</TableCell>
                      <TableCell>{app.universities?.name || '—'}</TableCell>
                      <TableCell>{app.destinations?.name || '—'}</TableCell>
                      <TableCell>{getStatusBadge(app.status || 'pending')}</TableCell>
                      <TableCell>{new Date(app.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentApplications;
