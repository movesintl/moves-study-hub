import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Search, Users, Send } from 'lucide-react';

interface MarketingContact {
  id: string;
  student_name: string;
  student_email: string;
  student_phone?: string;
  source: string;
  consent_date: string;
  is_active: boolean;
}

const ContactManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const { data: contacts, isLoading, refetch } = useQuery({
    queryKey: ['marketing-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketing_consents')
        .select('*')
        .eq('is_active', true)
        .order('consent_date', { ascending: false });
      
      if (error) throw error;
      return data as MarketingContact[];
    },
  });

  const filteredContacts = contacts?.filter(contact =>
    contact.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.student_email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(filteredContacts.map(c => c.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContacts(prev => [...prev, contactId]);
    } else {
      setSelectedContacts(prev => prev.filter(id => id !== contactId));
    }
  };

  const sendBulkEmail = async () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No Contacts Selected",
        description: "Please select at least one contact to send emails to.",
        variant: "destructive",
      });
      return;
    }

    const selectedContactsData = contacts?.filter(c => selectedContacts.includes(c.id)) || [];

    try {
      const { error } = await supabase.functions.invoke('send-bulk-email', {
        body: {
          recipients: selectedContactsData.map(contact => ({
            email: contact.student_email,
            name: contact.student_name,
          })),
          subject: 'Important Update from Moves International',
          content: 'Thank you for your interest in studying abroad!',
          template: 'newsletter'
        }
      });

      if (error) throw error;

      toast({
        title: "Emails Sent Successfully",
        description: `Email sent to ${selectedContacts.length} contacts.`,
      });

      setSelectedContacts([]);
    } catch (error) {
      console.error('Error sending bulk email:', error);
      toast({
        title: "Error",
        description: "Failed to send emails. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading contacts...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {filteredContacts.length} contacts
          </Badge>
          {selectedContacts.length > 0 && (
            <Button onClick={sendBulkEmail} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send to Selected ({selectedContacts.length})
            </Button>
          )}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-4 border-b">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="font-medium">Select All</span>
          </div>
        </div>

        <div className="divide-y">
          {filteredContacts.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No marketing contacts found</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div key={contact.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-medium">{contact.student_name}</p>
                    <p className="text-sm text-muted-foreground">{contact.student_email}</p>
                  </div>
                  <div>
                    <p className="text-sm">{contact.student_phone || 'No phone'}</p>
                  </div>
                  <div>
                    <Badge variant="outline">{contact.source}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(contact.consent_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactManager;