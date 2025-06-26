
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdditionalInfoSectionProps {
  formData: {
    visa_info: string;
    lifestyle_info: string;
  };
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AdditionalInfoSection = ({ formData, onChange }: AdditionalInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="visa_info">Visa Information</Label>
          <Textarea
            id="visa_info"
            name="visa_info"
            value={formData.visa_info}
            onChange={onChange}
            rows={4}
            className="mt-1"
            placeholder="Visa requirements and information..."
          />
        </div>

        <div>
          <Label htmlFor="lifestyle_info">Lifestyle Information</Label>
          <Textarea
            id="lifestyle_info"
            name="lifestyle_info"
            value={formData.lifestyle_info}
            onChange={onChange}
            rows={4}
            className="mt-1"
            placeholder="Lifestyle and cultural information..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoSection;
