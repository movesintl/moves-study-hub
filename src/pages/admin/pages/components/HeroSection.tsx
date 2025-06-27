
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import MediaSelector from '@/components/admin/MediaSelector';

interface HeroSectionProps {
  formData: {
    title: string;
    subtitle: string;
    feature_image_url: string;
    slug: string;
  };
  autoGenerateSlug: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleAutoSlug: () => void;
  onFormDataChange: (field: string, value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  formData,
  autoGenerateSlug,
  onTitleChange,
  onSlugChange,
  onToggleAutoSlug,
  onFormDataChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Page Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={onTitleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={(e) => onFormDataChange('subtitle', e.target.value)}
            className="mt-1"
            placeholder="Page subtitle for hero section"
          />
        </div>

        <MediaSelector
          label="Featured Image"
          value={formData.feature_image_url}
          onChange={(value) => onFormDataChange('feature_image_url', value)}
          placeholder="Featured image URL"
        />

        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={onSlugChange}
              disabled={autoGenerateSlug}
              className="flex-1"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="auto-slug"
                checked={autoGenerateSlug}
                onCheckedChange={onToggleAutoSlug}
              />
              <Label htmlFor="auto-slug" className="text-sm">
                Auto-generate
              </Label>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            URL: /pages/{formData.slug || 'your-page-slug'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
