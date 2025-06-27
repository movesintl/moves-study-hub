
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SEOSectionProps {
  formData: {
    meta_title: string;
    meta_description: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SEOSection: React.FC<SEOSectionProps> = ({
  formData,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="meta_title">Meta Title</Label>
          <Input
            id="meta_title"
            name="meta_title"
            value={formData.meta_title}
            onChange={onChange}
            className="mt-1"
            placeholder="SEO title for search engines"
          />
        </div>

        <div>
          <Label htmlFor="meta_description">Meta Description</Label>
          <Textarea
            id="meta_description"
            name="meta_description"
            value={formData.meta_description}
            onChange={onChange}
            rows={3}
            className="mt-1"
            placeholder="SEO description for search engines"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOSection;
