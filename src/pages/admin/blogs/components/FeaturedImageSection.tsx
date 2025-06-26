
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface FeaturedImageSectionProps {
  formData: {
    featured_image_url: string;
    featured_image_alt: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FeaturedImageSection: React.FC<FeaturedImageSectionProps> = ({
  formData,
  onChange,
  onImageFileChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="image-upload">Upload Image</Label>
          <div className="mt-2 flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Choose Image
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={onImageFileChange}
              className="hidden"
            />
            {formData.featured_image_url && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <ImageIcon className="h-4 w-4" />
                Image selected
              </div>
            )}
          </div>
        </div>

        {formData.featured_image_url && (
          <div className="space-y-2">
            <img
              src={formData.featured_image_url}
              alt="Featured image preview"
              className="w-48 h-32 object-cover rounded-md border"
            />
            <div>
              <Label htmlFor="featured_image_alt">Alt Text</Label>
              <Input
                id="featured_image_alt"
                name="featured_image_alt"
                value={formData.featured_image_alt}
                onChange={onChange}
                placeholder="Describe the image for accessibility"
                className="mt-1"
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="featured_image_url">Or paste image URL</Label>
          <Input
            id="featured_image_url"
            name="featured_image_url"
            type="url"
            value={formData.featured_image_url}
            onChange={onChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};
