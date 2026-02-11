import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  nationality: '', address: '', current_education_level: '', english_test_score: '', work_experience: '',
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
      current_education_level: student.current_education_level || '',
      english_test_score: student.english_test_score || '',
      work_experience: student.work_experience || '',
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
          <p className="text-gray-600">Manage your student profiles</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(open) => { setIsFormOpen(open); if (!open) { setEditingId(null); setFormData(emptyForm); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Student</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Full Name *</Label>
                  <Input value={formData.student_name} onChange={(e) => updateField('student_name', e.target.value)} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={formData.student_email} onChange={(e) => updateField('student_email', e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={formData.student_phone} onChange={(e) => updateField('student_phone', e.target.value)} />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" value={formData.date_of_birth} onChange={(e) => updateField('date_of_birth', e.target.value)} />
                </div>
                <div>
                  <Label>Nationality</Label>
                  <Input value={formData.nationality} onChange={(e) => updateField('nationality', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <Input value={formData.address} onChange={(e) => updateField('address', e.target.value)} />
                </div>
                <div>
                  <Label>Current Education Level</Label>
                  <Input value={formData.current_education_level} onChange={(e) => updateField('current_education_level', e.target.value)} placeholder="e.g. Bachelor's Degree" />
                </div>
                <div>
                  <Label>English Test Score</Label>
                  <Input value={formData.english_test_score} onChange={(e) => updateField('english_test_score', e.target.value)} placeholder="e.g. IELTS 7.0" />
                </div>
                <div className="col-span-2">
                  <Label>Work Experience</Label>
                  <Input value={formData.work_experience} onChange={(e) => updateField('work_experience', e.target.value)} placeholder="e.g. 2 years in IT" />
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={saveMutation.isPending} className="w-full">
                {saveMutation.isPending ? 'Saving...' : editingId ? 'Update Student' : 'Add Student'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Students ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No students yet. Add your first student above.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Nationality</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.student_name}</TableCell>
                      <TableCell>{student.student_email}</TableCell>
                      <TableCell>{student.student_phone || '—'}</TableCell>
                      <TableCell>{student.nationality || '—'}</TableCell>
                      <TableCell>{student.current_education_level || '—'}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => openEdit(student)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm"><Trash2 className="h-3 w-3 text-red-500" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Student?</AlertDialogTitle>
                                <AlertDialogDescription>This will permanently delete {student.student_name}'s profile.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteMutation.mutate(student.id)} className="bg-red-600">Delete</AlertDialogAction>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentStudents;
