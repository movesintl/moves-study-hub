
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LegacyContentSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const LegacyContentSection: React.FC<LegacyContentSectionProps> = ({
  value,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legacy Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="content">Legacy Page Content</Label>
          <Textarea
            id="content"
            name="content"
            value={value}
            onChange={onChange}
            rows={8}
            className="mt-1"
            placeholder="Legacy content field (for backward compatibility)..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LegacyContentSection;
