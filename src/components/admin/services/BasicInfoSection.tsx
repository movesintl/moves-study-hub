import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MediaSelector from '@/components/admin/MediaSelector';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { ServiceFormData } from '@/hooks/useServiceForm';

interface BasicInfoSectionProps {
  formData: ServiceFormData;
  onUpdate: (updates: Partial<ServiceFormData>) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Service Title *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="short_description">Short Description</Label>
        <textarea
          id="short_description"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full px-3 py-2 border border-input rounded-md"
          placeholder="Brief description of the service..."
        />
      </div>

      <RichTextEditor
        label="Full Details"
        value={formData.full_details}
        onChange={(value) => onUpdate({ full_details: value })}
        placeholder="Complete details about the service..."
        height="300px"
      />

      <MediaSelector
        value={formData.icon_url}
        onChange={(value) => onUpdate({ icon_url: value })}
        label="Service Icon"
        placeholder="https://example.com/icon.svg"
      />

      <MediaSelector
        value={formData.feature_image_url}
        onChange={(value) => onUpdate({ feature_image_url: value })}
        label="Featured Image"
        placeholder="https://example.com/featured-image.jpg"
      />

      {formData.feature_image_url && (
        <div>
          <Label htmlFor="feature_image_alt">Featured Image Alt Text</Label>
          <Input
            id="feature_image_alt"
            name="feature_image_alt"
            value={formData.feature_image_alt}
            onChange={handleChange}
            placeholder="Describe the image for accessibility"
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default BasicInfoSection;