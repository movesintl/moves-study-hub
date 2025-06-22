
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface AdditionalDetailsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const AdditionalDetailsSection = ({ formData, setFormData }: AdditionalDetailsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eligibility">Eligibility Requirements</Label>
          <Textarea
            id="eligibility"
            value={formData.eligibility}
            onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Additional Requirements</Label>
          <Textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="application_link">Application Link</Label>
            <Input
              id="application_link"
              type="url"
              value={formData.application_link}
              onChange={(e) => setFormData({ ...formData, application_link: e.target.value })}
              placeholder="https://university.edu/apply"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail_url">Thumbnail Image URL</Label>
            <Input
              id="thumbnail_url"
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
