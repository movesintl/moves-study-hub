
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MediaSelector from '@/components/admin/MediaSelector';

interface BasicInfoSectionProps {
  formData: {
    name: string;
    slug: string;
    description: string;
    featured_image_url: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (value: string) => void;
}

const BasicInfoSection = ({ formData, onChange, onImageChange }: BasicInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Destination Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={onChange}
            className="mt-1"
            placeholder="e.g., australia, united-kingdom"
          />
          <p className="text-sm text-gray-500 mt-1">
            This will be auto-generated from the name if left empty
          </p>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            rows={4}
            className="mt-1"
            placeholder="Brief description of the destination..."
          />
        </div>

        <MediaSelector
          value={formData.featured_image_url}
          onChange={onImageChange}
          label="Featured Image"
          placeholder="https://example.com/image.jpg"
        />
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
