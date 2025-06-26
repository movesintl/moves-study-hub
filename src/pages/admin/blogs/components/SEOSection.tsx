
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface SEOSectionProps {
  formData: {
    slug: string;
    meta_title: string;
    meta_description: string;
    focus_keywords: string;
  };
  autoGenerateSlug: boolean;
  onSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleAutoGenerateSlug: (checked: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const SEOSection: React.FC<SEOSectionProps> = ({
  formData,
  autoGenerateSlug,
  onSlugChange,
  onToggleAutoGenerateSlug,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <p className="text-sm text-gray-600">
          Optional fields to improve search engine visibility
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="slug">Custom URL Slug</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="auto-slug"
                checked={autoGenerateSlug}
                onCheckedChange={onToggleAutoGenerateSlug}
              />
              <Label htmlFor="auto-slug" className="text-sm font-normal">
                Auto-generate from title
              </Label>
            </div>
          </div>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={onSlugChange}
            placeholder="custom-url-slug"
            className="mt-1"
            disabled={autoGenerateSlug}
          />
          <p className="text-xs text-gray-500 mt-1">
            {autoGenerateSlug 
              ? 'Automatically generated from title' 
              : 'Enter a custom URL slug'}
          </p>
        </div>

        <div>
          <Label htmlFor="meta_title">Meta Title</Label>
          <Input
            id="meta_title"
            name="meta_title"
            value={formData.meta_title}
            onChange={onChange}
            placeholder="SEO optimized title"
            className="mt-1"
            maxLength={60}
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended: 50-60 characters
          </p>
        </div>

        <div>
          <Label htmlFor="meta_description">Meta Description</Label>
          <textarea
            id="meta_description"
            name="meta_description"
            value={formData.meta_description}
            onChange={onChange}
            placeholder="Brief description for search results"
            rows={3}
            maxLength={160}
            className="mt-1 w-full px-3 py-2 border border-input rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended: 150-160 characters
          </p>
        </div>

        <div>
          <Label htmlFor="focus_keywords">Focus Keywords</Label>
          <Input
            id="focus_keywords"
            name="focus_keywords"
            value={formData.focus_keywords}
            onChange={onChange}
            placeholder="keyword1, keyword2, keyword3"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Comma-separated keywords for SEO targeting
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
