import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MarketingConsent } from '../types';

type TemplateType = 'newsletter' | 'announcement' | 'promotional';

interface BulkEmailDialogProps {
  selectedCount: number;
  selectedConsents: string[];
  consents: MarketingConsent[] | undefined;
  onEmailSent: () => void;
}

const BulkEmailDialog = ({
  selectedCount,
  selectedConsents,
  consents,
  onEmailSent,
}: BulkEmailDialogProps) => {
  const { toast } = useToast();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('newsletter');
  const [isSending, setIsSending] = useState(false);

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
          template: selectedTemplate,
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
      onEmailSent();
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

  return (
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
            <Label htmlFor="template">Email Template</Label>
            <Select value={selectedTemplate} onValueChange={(value: TemplateType) => setSelectedTemplate(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newsletter">Newsletter - Professional & Clean</SelectItem>
                <SelectItem value="announcement">Announcement - Important Updates</SelectItem>
                <SelectItem value="promotional">Promotional - Marketing & Offers</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
              placeholder="Enter email content. Use double line breaks (press Enter twice) to create new paragraphs."
              rows={8}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Tip: The content will be automatically formatted based on your selected template.
            </p>
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
  );
};

export default BulkEmailDialog;