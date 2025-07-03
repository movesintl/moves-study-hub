import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, Mail, Users } from 'lucide-react';

interface MarketingConsent {
  id: string;
  student_email: string;
  student_name: string;
  student_phone: string | null;
  consent_date: string;
  is_active: boolean;
  source: string | null;
}

const MarketingConsents = () => {
  const { toast } = useToast();
  const [selectedConsents, setSelectedConsents] = useState<string[]>([]);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { data: consents, isLoading, refetch } = useQuery({
    queryKey: ['marketing-consents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_consents')
        .select('*')
        .order('consent_date', { ascending: false });
      
      if (error) throw error;
      return data as MarketingConsent[];
    },
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked && consents) {
      setSelectedConsents(consents.filter(c => c.is_active).map(c => c.id));
    } else {
      setSelectedConsents([]);
    }
  };

  const handleSelectConsent = (consentId: string, checked: boolean) => {
    if (checked) {
      setSelectedConsents(prev => [...prev, consentId]);
    } else {
      setSelectedConsents(prev => prev.filter(id => id !== consentId));
    }
  };

  const handleSendBulkEmail = async () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both subject and content",
        variant: "destructive",
      });
      return;
    }

    if (selectedConsents.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one recipient",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const selectedEmails = consents
        ?.filter(c => selectedConsents.includes(c.id))
        .map(c => ({ email: c.student_email, name: c.student_name })) || [];

      const { data, error } = await supabase.functions.invoke('send-bulk-email', {
        body: {
          recipients: selectedEmails,
          subject: emailSubject,
          content: emailContent,
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Email campaign sent to ${selectedEmails.length} recipients`,
      });
      
      setIsEmailDialogOpen(false);
      setEmailSubject('');
      setEmailContent('');
      setSelectedConsents([]);
    } catch (error) {
      console.error('Error sending bulk email:', error);
      toast({
        title: "Error",
        description: "Failed to send email campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const activeConsents = consents?.filter(c => c.is_active) || [];
  const selectedCount = selectedConsents.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading marketing consents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing Consents</h1>
          <p className="text-muted-foreground">
            Manage users who have consented to receive marketing communications
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{activeConsents.length} active consents</span>
          </div>
          
          {selectedCount > 0 && (
            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Send Campaign ({selectedCount})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Send Email Campaign</DialogTitle>
                  <DialogDescription>
                    Send an email campaign to {selectedCount} selected recipients
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Enter email subject..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      placeholder="Enter email content..."
                      rows={6}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendBulkEmail} disabled={isSending}>
                    {isSending ? 'Sending...' : 'Send Campaign'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Marketing Consent Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!consents || consents.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No marketing consents yet</h3>
              <p className="text-muted-foreground">
                Marketing consents will appear here when users opt-in to receive updates.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedCount === activeConsents.length && activeConsents.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Consent Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consents.map((consent) => (
                    <TableRow key={consent.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedConsents.includes(consent.id)}
                          onCheckedChange={(checked) => 
                            handleSelectConsent(consent.id, checked as boolean)
                          }
                          disabled={!consent.is_active}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {consent.student_name}
                      </TableCell>
                      <TableCell>{consent.student_email}</TableCell>
                      <TableCell>{consent.student_phone || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {consent.source || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(consent.consent_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={consent.is_active ? 'default' : 'secondary'}>
                          {consent.is_active ? 'Active' : 'Inactive'}
                        </Badge>
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

export default MarketingConsents;