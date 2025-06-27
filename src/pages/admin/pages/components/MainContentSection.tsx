
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MediaSelector from '@/components/admin/MediaSelector';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface MainContentSectionProps {
  formData: {
    page_description: string;
    content_image_url: string;
    content_video_url: string;
    cta_text: string;
    cta_button_text: string;
    cta_button_link: string;
  };
  onFormDataChange: (field: string, value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({
  formData,
  onFormDataChange,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Content Area</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RichTextEditor
          label="Page Description (Rich Text)"
          value={formData.page_description}
          onChange={(value) => onFormDataChange('page_description', value)}
          placeholder="Main page description content..."
          height="300px"
        />

        <MediaSelector
          label="Content Image"
          value={formData.content_image_url}
          onChange={(value) => onFormDataChange('content_image_url', value)}
          placeholder="Content image URL"
        />

        <div>
          <Label htmlFor="content_video_url">Video URL</Label>
          <Input
            id="content_video_url"
            name="content_video_url"
            value={formData.content_video_url}
            onChange={onChange}
            className="mt-1"
            placeholder="YouTube/Vimeo video URL"
          />
        </div>

        <div>
          <Label htmlFor="cta_text">Call to Action Text</Label>
          <Textarea
            id="cta_text"
            name="cta_text"
            value={formData.cta_text}
            onChange={onChange}
            rows={3}
            className="mt-1"
            placeholder="Call to action description..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cta_button_text">CTA Button Text</Label>
            <Input
              id="cta_button_text"
              name="cta_button_text"
              value={formData.cta_button_text}
              onChange={onChange}
              className="mt-1"
              placeholder="Get Started"
            />
          </div>
          <div>
            <Label htmlFor="cta_button_link">CTA Button Link</Label>
            <Input
              id="cta_button_link"
              name="cta_button_link"
              value={formData.cta_button_link}
              onChange={onChange}
              className="mt-1"
              placeholder="/contact or https://example.com"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainContentSection;
