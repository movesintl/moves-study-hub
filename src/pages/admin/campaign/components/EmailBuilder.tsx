import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import EmailCanvas from '@/components/email-builder/EmailCanvas';
import EmailTemplateSelector from '@/components/email-builder/EmailTemplateSelector';
import { ArrowLeft, Save, Send } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: 'newsletter' | 'promotional' | 'announcement' | 'welcome' | 'transactional';
  thumbnail: string;
  content: string;
  isCustom?: boolean;
}

interface EmailData {
  subject: string;
  content: string;
  template: 'newsletter' | 'announcement' | 'promotional';
  html?: string;
  css?: string;
}

const EmailBuilder = () => {
  const [currentStep, setCurrentStep] = useState<'template' | 'builder'>('template');
  const [emailData, setEmailData] = useState<EmailData>({
    subject: '',
    content: '',
    template: 'newsletter'
  });
  const { toast } = useToast();

  const handleTemplateSelect = (template: EmailTemplate) => {
    setEmailData(prev => ({ 
      ...prev, 
      content: template.content,
      template: template.category as 'newsletter' | 'announcement' | 'promotional'
    }));
    setCurrentStep('builder');
  };

  const handleStartBlank = () => {
    setEmailData(prev => ({ 
      ...prev, 
      content: ''
    }));
    setCurrentStep('builder');
  };

  const handleContentChange = (content: string) => {
    setEmailData(prev => ({ ...prev, content }));
  };

  const handleSave = (data: { html: string; css: string; components: any }) => {
    setEmailData(prev => ({ 
      ...prev, 
      content: data.html,
      html: data.html,
      css: data.css
    }));
    
    toast({
      title: "Campaign Saved",
      description: "Your email campaign has been saved successfully.",
    });
  };

  const sendCampaign = () => {
    if (!emailData.subject.trim()) {
      toast({
        title: "Subject Required",
        description: "Please enter an email subject before sending.",
        variant: "destructive",
      });
      return;
    }

    if (!emailData.content.trim()) {
      toast({
        title: "Content Required",
        description: "Please add content to your email before sending.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campaign Sent",
      description: "Your email campaign has been sent successfully.",
    });
  };

  if (currentStep === 'template') {
    return (
      <EmailTemplateSelector
        onSelectTemplate={handleTemplateSelect}
        onStartBlank={handleStartBlank}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep('template')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <Label htmlFor="subject" className="text-sm font-medium">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject..."
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-80"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="template" className="text-sm font-medium">Template Type</Label>
                <Select 
                  value={emailData.template} 
                  onValueChange={(value: 'newsletter' | 'announcement' | 'promotional') => 
                    setEmailData(prev => ({ ...prev, template: value }))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave({ html: emailData.content, css: '', components: null })}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Campaign
          </Button>
          <Button onClick={sendCampaign}>
            <Send className="h-4 w-4 mr-2" />
            Send Campaign
          </Button>
        </div>
      </div>

      {/* Email Builder Canvas */}
      <div className="h-[calc(100vh-240px)]">
        <EmailCanvas
          initialContent={emailData.content}
          onSave={handleSave}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default EmailBuilder;