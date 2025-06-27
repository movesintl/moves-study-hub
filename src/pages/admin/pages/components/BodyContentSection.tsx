
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface BodyContentSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const BodyContentSection: React.FC<BodyContentSectionProps> = ({
  value,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RichTextEditor
          label="Body Content (Rich Text)"
          value={value}
          onChange={onChange}
          placeholder="Additional body content..."
          height="400px"
        />
      </CardContent>
    </Card>
  );
};

export default BodyContentSection;
