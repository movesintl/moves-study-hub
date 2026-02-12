import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const emptyForm = {
  student_name: '', student_email: '', student_phone: '', date_of_birth: '',
  nationality: '', address: '', education_level: '', english_test_score: '',
};

const AgentStudents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const { data: agent } = useQuery({
    queryKey: ['agent-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('agents').select('id').eq('user_id', user!.id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['agent-students', agent?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agent_students')
        .select('*')
        .eq('agent_id', agent!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!agent,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingId) {
        const { error } = await supabase.from('agent_students').update(data).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('agent_students').insert({ ...data, agent_id: agent!.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: editingId ? 'Student Updated' : 'Student Created' });
      setIsFormOpen(false);
      setEditingId(null);
      setFormData(emptyForm);
      queryClient.invalidateQueries({ queryKey: ['agent-students'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('agent_students').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Student Deleted' });
      queryClient.invalidateQueries({ queryKey: ['agent-students'] });
    },
  });

  const openEdit = (student: any) => {
    setEditingId(student.id);
    setFormData({
      student_name: student.student_name,
      student_email: student.student_email,
      student_phone: student.student_phone || '',
      date_of_birth: student.date_of_birth || '',
      nationality: student.nationality || '',
      address: student.address || '',
      education_level: student.education_level || '',
      english_test_score: student.english_test_score || '',
    });
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.student_name || !formData.student_email) return;
    const payload: any = { ...formData };
    if (!payload.date_of_birth) delete payload.date_of_birth;
    saveMutation.mutate(payload);
  };

  const filtered = students.filter((s: any) =>
    s.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateField = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My Students</h1>
          <p className="text-sm text-muted-foreground">Manage your student profiles</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(open) => { setIsFormOpen(open); if (!open) { setEditingId(null); setFormData(emptyForm); } }}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Add Student</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label className="text-xs">Full Name *</Label>
                  <Input value={formData.student_name} onChange={(e) => updateField('student_name', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Email *</Label>
                  <Input type="email" value={formData.student_email} onChange={(e) => updateField('student_email', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Phone</Label>
                  <Input value={formData.student_phone} onChange={(e) => updateField('student_phone', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Date of Birth</Label>
                  <Input type="date" value={formData.date_of_birth} onChange={(e) => updateField('date_of_birth', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Nationality</Label>
                  <Input value={formData.nationality} onChange={(e) => updateField('nationality', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Address</Label>
                  <Input value={formData.address} onChange={(e) => updateField('address', e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Education Level</Label>
                  <Input value={formData.education_level} onChange={(e) => updateField('education_level', e.target.value)} placeholder="e.g. Bachelor's Degree" />
                </div>
                <div>
                  <Label className="text-xs">English Test Score</Label>
                  <Input value={formData.english_test_score} onChange={(e) => updateField('english_test_score', e.target.value)} placeholder="e.g. IELTS 7.0" />
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={saveMutation.isPending} className="w-full">
                {saveMutation.isPending ? 'Saving...' : editingId ? 'Update Student' : 'Add Student'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-card" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-sm text-muted-foreground">Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-foreground">No students yet. Add your first student above.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs font-medium">Name</TableHead>
                  <TableHead className="text-xs font-medium">Email</TableHead>
                  <TableHead className="text-xs font-medium">Phone</TableHead>
                  <TableHead className="text-xs font-medium">Nationality</TableHead>
                  <TableHead className="text-xs font-medium">Education</TableHead>
                  <TableHead className="text-xs font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student: any) => (
                  <TableRow key={student.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-sm">{student.student_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.student_email}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.student_phone || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.nationality || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.education_level || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(student)} className="h-8 w-8 p-0">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Student?</AlertDialogTitle>
                              <AlertDialogDescription>This will permanently delete {student.student_name}'s profile.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteMutation.mutate(student.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
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

export default AgentStudents;
