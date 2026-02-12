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
import { Plus, Search, Clock, Eye, CheckCircle, XCircle, FileText } from 'lucide-react';
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

  const statusConfig: Record<string, { class: string; icon: any; dot: string }> = {
    pending: { class: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock, dot: 'bg-amber-500' },
    under_review: { class: 'bg-blue-50 text-blue-700 border-blue-200', icon: Eye, dot: 'bg-blue-500' },
    approved: { class: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle, dot: 'bg-emerald-500' },
    rejected: { class: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, dot: 'bg-red-500' },
  };

  const getStatusBadge = (status: string) => {
    const c = statusConfig[status] || statusConfig.pending;
    return (
      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border", c.class)}>
        <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const filtered = applications.filter((app: any) =>
    app.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.courses?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(195,100%,20%)] flex items-center justify-center shadow-lg">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Applications</h1>
            <p className="text-xs text-muted-foreground">Submit and track student applications</p>
          </div>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
              <Plus className="h-4 w-4" />New Application
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg">Submit Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground">Student *</Label>
                <Select value={formData.student_id} onValueChange={(v) => setFormData({ ...formData, student_id: v })}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select a student" /></SelectTrigger>
                  <SelectContent>
                    {students.map((s: any) => (
                      <SelectItem key={s.id} value={s.id}>{s.student_name} ({s.student_email})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {students.length === 0 && <p className="text-xs text-muted-foreground mt-1">Add a student profile first.</p>}
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground">Course *</Label>
                <Select value={formData.course_id} onValueChange={(v) => setFormData({ ...formData, course_id: v })}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select a course" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>{c.title} — {c.university}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground">Notes</Label>
                <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Optional notes..." className="rounded-xl" />
              </div>
              <Button
                onClick={() => submitApplication.mutate()}
                disabled={!formData.student_id || !formData.course_id || submitApplication.isPending}
                className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {submitApplication.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by student or course..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 rounded-xl bg-card border-border" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
        {isLoading ? (
          <div className="text-center py-16 text-sm text-muted-foreground">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No applications yet</p>
            <p className="text-xs text-muted-foreground">Submit your first application to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Student</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Course</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">University</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Destination</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((app: any) => (
                  <TableRow key={app.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-medium text-sm text-foreground">{app.student_name}</TableCell>
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
