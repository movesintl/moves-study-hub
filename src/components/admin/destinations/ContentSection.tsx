import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface ContentSectionProps {
  formData: {
    more_information: string;
  };
  onRichTextChange: (field: string, value: string) => void;
}

const ContentSection = ({ formData, onRichTextChange }: ContentSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Sections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RichTextEditor
          label="More Information"
          value={formData.more_information}
          onChange={(value) => onRichTextChange('more_information', value)}
          placeholder="Additional information about studying in this destination..."
          height="300px"
        />
      </CardContent>
    </Card>
  );
};

export default ContentSection;