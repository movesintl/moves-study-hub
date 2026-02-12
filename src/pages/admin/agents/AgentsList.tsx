import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Search, UserPlus, Edit, Trash2, ToggleLeft, ToggleRight, Users } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const LOVABLE_FUNCTIONS_URL = "https://hhzjzbxpdnehbgwvmimm.supabase.co/functions/v1";

const AgentsList = () => {
  const { toast } = useToast();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    contact_person: '',
    company_name: '',
    phone: '',
  });

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const inviteAgent = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(`${LOVABLE_FUNCTIONS_URL}/invite-agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      toast({ title: 'Agent Invited', description: 'Invitation email sent successfully.' });
      setIsInviteOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const updateAgent = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { error } = await (supabase as any).from('agents').update(updates).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Agent Updated', description: 'Agent details updated successfully.' });
      setEditingAgent(null);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteAgent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('agents').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Agent Deleted', description: 'Agent removed successfully.' });
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const toggleAgentStatus = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await (supabase as any).from('agents').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Status Updated' });
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const resetForm = () => {
    setFormData({ email: '', contact_person: '', company_name: '', phone: '' });
  };

  const handleInvite = () => {
    inviteAgent.mutate(formData);
  };

  const handleEdit = () => {
    if (!editingAgent) return;
    updateAgent.mutate({
      id: editingAgent.id,
      contact_person: formData.contact_person,
      company_name: formData.company_name,
      phone: formData.phone,
    });
  };

  const openEdit = (agent: any) => {
    setEditingAgent(agent);
    setFormData({
      email: agent.email,
      contact_person: agent.contact_person,
      company_name: agent.company_name || '',
      phone: agent.phone || '',
    });
  };

  const filteredAgents = agents.filter((agent: any) =>
    agent.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agents Management</h1>
          <p className="text-gray-600 mt-2">Invite and manage education agents</p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={(open) => { setIsInviteOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><UserPlus className="h-4 w-4 mr-2" />Invite Agent</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Email *</Label>
                <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="agent@example.com" />
              </div>
              <div>
                <Label>Contact Person *</Label>
                <Input value={formData.contact_person} onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} placeholder="Full name" />
              </div>
              <div>
                <Label>Company Name</Label>
                <Input value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} placeholder="Agency name" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+61..." />
              </div>
              <Button onClick={handleInvite} disabled={!formData.email || !formData.contact_person || inviteAgent.isPending} className="w-full">
                {inviteAgent.isPending ? 'Sending Invitation...' : 'Send Invitation'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingAgent} onOpenChange={(open) => { if (!open) { setEditingAgent(null); resetForm(); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Email</Label>
              <Input value={formData.email} disabled className="bg-gray-50" />
            </div>
            <div>
              <Label>Contact Person *</Label>
              <Input value={formData.contact_person} onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} />
            </div>
            <div>
              <Label>Company Name</Label>
              <Input value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <Button onClick={handleEdit} disabled={updateAgent.isPending} className="w-full">
              {updateAgent.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search agents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Agents ({filteredAgents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading agents...</div>
          ) : filteredAgents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No agents found. Invite your first agent above.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invited</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent: any) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.contact_person}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.company_name || '—'}</TableCell>
                      <TableCell>{agent.phone || '—'}</TableCell>
                      <TableCell>
                        <Badge className={agent.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {agent.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        {agent.activated_at && (
                          <Badge variant="outline" className="ml-1 text-xs">Activated</Badge>
                        )}
                      </TableCell>
                      <TableCell>{new Date(agent.invited_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" onClick={() => openEdit(agent)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAgentStatus.mutate({ id: agent.id, is_active: !agent.is_active })}
                          >
                            {agent.is_active ? <ToggleRight className="h-3 w-3 text-green-600" /> : <ToggleLeft className="h-3 w-3 text-red-600" />}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm"><Trash2 className="h-3 w-3 text-red-500" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Agent?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete {agent.contact_person}'s agent account and all their data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteAgent.mutate(agent.id)} className="bg-red-600 hover:bg-red-700">
                                  Delete
                                </AlertDialogAction>
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

export default AgentsList;
