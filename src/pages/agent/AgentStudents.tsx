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
import { Plus, Edit, Trash2, Search, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Combobox } from '@/components/ui/combobox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const emptyForm = {
  student_name: '', student_email: '', student_phone: '', date_of_birth: '',
  nationality: '', address: '',
};

const NATIONALITIES = [
  "Afghan","Albanian","Algerian","American","Andorran","Angolan","Argentine","Armenian","Australian","Austrian",
  "Azerbaijani","Bahamian","Bahraini","Bangladeshi","Barbadian","Belarusian","Belgian","Belizean","Beninese","Bhutanese",
  "Bolivian","Bosnian","Brazilian","British","Bruneian","Bulgarian","Burkinabe","Burmese","Burundian","Cambodian",
  "Cameroonian","Canadian","Cape Verdean","Central African","Chadian","Chilean","Chinese","Colombian","Comorian","Congolese",
  "Costa Rican","Croatian","Cuban","Cypriot","Czech","Danish","Djiboutian","Dominican","Dutch","Ecuadorian",
  "Egyptian","Emirati","Equatorial Guinean","Eritrean","Estonian","Ethiopian","Fijian","Filipino","Finnish","French",
  "Gabonese","Gambian","Georgian","German","Ghanaian","Greek","Grenadian","Guatemalan","Guinean","Guyanese",
  "Haitian","Honduran","Hungarian","Icelandic","Indian","Indonesian","Iranian","Iraqi","Irish","Israeli",
  "Italian","Ivorian","Jamaican","Japanese","Jordanian","Kazakh","Kenyan","Kiribati","Korean","Kuwaiti",
  "Kyrgyz","Lao","Latvian","Lebanese","Liberian","Libyan","Lithuanian","Luxembourgish","Macedonian","Malagasy",
  "Malawian","Malaysian","Maldivian","Malian","Maltese","Marshallese","Mauritanian","Mauritian","Mexican","Micronesian",
  "Moldovan","Monegasque","Mongolian","Montenegrin","Moroccan","Mozambican","Namibian","Nauruan","Nepalese","New Zealander",
  "Nicaraguan","Nigerian","Nigerien","Norwegian","Omani","Pakistani","Palauan","Palestinian","Panamanian","Papua New Guinean",
  "Paraguayan","Peruvian","Polish","Portuguese","Qatari","Romanian","Russian","Rwandan","Saint Lucian","Salvadoran",
  "Samoan","Saudi","Senegalese","Serbian","Seychellois","Sierra Leonean","Singaporean","Slovak","Slovenian","Solomon Islander",
  "Somali","South African","South Sudanese","Spanish","Sri Lankan","Sudanese","Surinamese","Swazi","Swedish","Swiss",
  "Syrian","Taiwanese","Tajik","Tanzanian","Thai","Timorese","Togolese","Tongan","Trinidadian","Tunisian",
  "Turkish","Turkmen","Tuvaluan","Ugandan","Ukrainian","Uruguayan","Uzbek","Vanuatuan","Venezuelan","Vietnamese",
  "Yemeni","Zambian","Zimbabwean"
].map(n => ({ value: n, label: n }));

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

  // Fetch student profiles linked to this agent
  const { data: studentProfiles = [] } = useQuery({
    queryKey: ['agent-student-profiles', agent?.id],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('student_profiles')
        .select('id, email, first_name, last_name')
        .eq('agent_id', agent!.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!agent,
  });

  const getProfileId = (email: string) => {
    const p = studentProfiles.find((sp: any) => sp.email === email);
    return p?.id || null;
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(195,100%,20%)] flex items-center justify-center shadow-lg">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Students</h1>
            <p className="text-xs text-muted-foreground">Manage your student profiles</p>
          </div>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(open) => { setIsFormOpen(open); if (!open) { setEditingId(null); setFormData(emptyForm); } }}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
              <Plus className="h-4 w-4" />Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg">{editingId ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label className="text-xs font-semibold text-muted-foreground">Full Name *</Label>
                  <Input value={formData.student_name} onChange={(e) => updateField('student_name', e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground">Email *</Label>
                  <Input type="email" value={formData.student_email} onChange={(e) => updateField('student_email', e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground">Phone</Label>
                  <Input value={formData.student_phone} onChange={(e) => updateField('student_phone', e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground">Date of Birth</Label>
                  <Input type="date" value={formData.date_of_birth} onChange={(e) => updateField('date_of_birth', e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground">Nationality</Label>
                  <Combobox
                    options={NATIONALITIES}
                    value={formData.nationality}
                    onSelect={(val) => updateField('nationality', val)}
                    placeholder="Select nationality..."
                    searchPlaceholder="Type to search..."
                    emptyText="No nationality found."
                    className="w-full rounded-xl"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs font-semibold text-muted-foreground">Address</Label>
                  <Input value={formData.address} onChange={(e) => updateField('address', e.target.value)} className="rounded-xl" />
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={saveMutation.isPending} className="w-full rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground">
                {saveMutation.isPending ? 'Saving...' : editingId ? 'Update Student' : 'Add Student'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 rounded-xl bg-card border-border" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
        {isLoading ? (
          <div className="text-center py-16 text-sm text-muted-foreground">Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No students yet</p>
            <p className="text-xs text-muted-foreground">Add your first student to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40 border-b border-border">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Name</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Email</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Phone</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Nationality</TableHead>
                   <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((student: any) => (
                  <TableRow key={student.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(195,100%,20%)] flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {student.student_name?.charAt(0)?.toUpperCase()}
                        </div>
                        {getProfileId(student.student_email) ? (
                          <Link to={`/agent/students/${getProfileId(student.student_email)}`} className="font-medium text-sm text-primary hover:underline">
                            {student.student_name}
                          </Link>
                        ) : (
                          <span className="font-medium text-sm text-foreground">{student.student_name}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.student_email}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.student_phone || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.nationality || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        {getProfileId(student.student_email) && (
                          <Link to={`/agent/students/${getProfileId(student.student_email)}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 hover:text-primary">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => openEdit(student)} className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10 hover:text-primary">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-destructive/10 text-destructive hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Student?</AlertDialogTitle>
                              <AlertDialogDescription>This will permanently delete {student.student_name}'s profile.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteMutation.mutate(student.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl">Delete</AlertDialogAction>
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
