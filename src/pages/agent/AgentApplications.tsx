import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { cn } from '@/lib/utils';

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
      const { data, error } = await (supabase as any).from('agents').select('id').eq('user_id', user!.id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: students = [] } = useQuery({
    queryKey: ['agent-students', agent?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from('agent_students').select('*').eq('agent_id', agent!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!agent,
  });

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['agent-applications', agent?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
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

      const { error } = await (supabase as any).from('applications').insert({
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

  const statusConfig: Record<string, { class: string; icon: any }> = {
    pending: { class: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
    under_review: { class: 'bg-blue-50 text-blue-700 border-blue-200', icon: Eye },
    approved: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
    rejected: { class: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
  };

  const getStatusBadge = (status: string) => {
    const c = statusConfig[status] || statusConfig.pending;
    const Icon = c.icon;
    return (
      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border", c.class)}>
        <Icon className="h-3 w-3" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const filtered = applications.filter((app: any) =>
    app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.courses?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Applications</h1>
          <p className="text-sm text-muted-foreground">Submit and track student applications</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />New Application</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-xs">Student *</Label>
                <Select value={formData.student_id} onValueChange={(v) => setFormData({ ...formData, student_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select a student" /></SelectTrigger>
                  <SelectContent>
                    {students.map((s: any) => (
                      <SelectItem key={s.id} value={s.id}>{s.student_name} ({s.student_email})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {students.length === 0 && <p className="text-xs text-muted-foreground mt-1">Add a student profile first.</p>}
              </div>
              <div>
                <Label className="text-xs">Course *</Label>
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
                <Label className="text-xs">Notes</Label>
                <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Optional notes..." />
              </div>
              <Button onClick={() => submitApplication.mutate()} disabled={!formData.student_id || !formData.course_id || submitApplication.isPending} className="w-full">
                {submitApplication.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by student or course..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-card" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-sm text-muted-foreground">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-foreground">No applications yet</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs font-medium">Student</TableHead>
                  <TableHead className="text-xs font-medium">Course</TableHead>
                  <TableHead className="text-xs font-medium">University</TableHead>
                  <TableHead className="text-xs font-medium">Destination</TableHead>
                  <TableHead className="text-xs font-medium">Status</TableHead>
                  <TableHead className="text-xs font-medium">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((app: any) => (
                  <TableRow key={app.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-sm">{app.student_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.courses?.title || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.universities?.name || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.destinations?.name || '—'}</TableCell>
                    <TableCell>{getStatusBadge(app.status || 'pending')}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentApplications;
