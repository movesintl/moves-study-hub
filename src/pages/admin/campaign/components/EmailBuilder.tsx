import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Save, Send, Eye, Palette, Type, Image, Layout } from 'lucide-react';

interface EmailTemplate {
  subject: string;
  content: string;
  template: 'newsletter' | 'announcement' | 'promotional';
}

const EmailBuilder = () => {
  const { toast } = useToast();
  const [emailData, setEmailData] = useState<EmailTemplate>({
    subject: '',
    content: '',
    template: 'newsletter'
  });
  const [isPreview, setIsPreview] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleContentChange = (content: string) => {
    setEmailData(prev => ({ ...prev, content }));
  };

  const insertElement = (elementType: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    let elementHtml = '';
    switch (elementType) {
      case 'heading':
        elementHtml = '<h2 style="color: #333; font-size: 24px; margin: 20px 0;">Your Heading Here</h2>';
        break;
      case 'paragraph':
        elementHtml = '<p style="color: #666; font-size: 16px; line-height: 1.6; margin: 15px 0;">Your content here...</p>';
        break;
      case 'button':
        elementHtml = '<div style="text-align: center; margin: 30px 0;"><a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Click Here</a></div>';
        break;
      case 'image':
        elementHtml = '<div style="text-align: center; margin: 20px 0;"><img src="https://via.placeholder.com/400x200" alt="Image" style="max-width: 100%; height: auto; border-radius: 4px;" /></div>';
        break;
      case 'divider':
        elementHtml = '<hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />';
        break;
    }

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(range.createContextualFragment(elementHtml));
    } else {
      editor.innerHTML += elementHtml;
    }

    handleContentChange(editor.innerHTML);
  };

  const saveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "Your email template has been saved successfully.",
    });
  };

  const sendCampaign = () => {
    if (!emailData.subject || !emailData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and content before sending.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campaign Sent",
      description: "Your email campaign has been sent to selected contacts.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Email Builder Controls */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={emailData.subject}
                onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter email subject..."
              />
            </div>

            <div>
              <Label htmlFor="template">Template Type</Label>
              <Select value={emailData.template} onValueChange={(value: any) => setEmailData(prev => ({ ...prev, template: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Elements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => insertElement('heading')}
            >
              <Type className="h-4 w-4 mr-2" />
              Heading
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => insertElement('paragraph')}
            >
              <Type className="h-4 w-4 mr-2" />
              Paragraph
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => insertElement('button')}
            >
              <Layout className="h-4 w-4 mr-2" />
              Button
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => insertElement('image')}
            >
              <Image className="h-4 w-4 mr-2" />
              Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => insertElement('divider')}
            >
              <Layout className="h-4 w-4 mr-2" />
              Divider
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button onClick={saveTemplate} className="w-full" variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
          <Button onClick={() => setIsPreview(!isPreview)} className="w-full" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button onClick={sendCampaign} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Campaign
          </Button>
        </div>
      </div>

      {/* Email Editor */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
          </CardHeader>
          <CardContent>
            {isPreview ? (
              <div className="border rounded-lg p-4 min-h-[500px] bg-white">
                <div className="border-b pb-4 mb-4">
                  <strong>Subject:</strong> {emailData.subject || 'No subject'}
                </div>
                <div 
                  dangerouslySetInnerHTML={{ __html: emailData.content || '<p>No content</p>' }}
                  className="prose max-w-none"
                />
              </div>
            ) : (
              <div
                ref={editorRef}
                contentEditable
                onInput={(e) => handleContentChange(e.currentTarget.innerHTML)}
                className="border rounded-lg p-4 min-h-[500px] focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ backgroundColor: '#fff' }}
                dangerouslySetInnerHTML={{ __html: emailData.content }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailBuilder;