
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface BasicInfoSectionProps {
  formData: {
    title: string;
    author: string;
    content: string;
    tags: string;
    published: boolean;
  };
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onContentChange: (value: string) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  onTitleChange,
  onChange,
  onContentChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
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
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={onChange}
            className="mt-1"
          />
        </div>

        <RichTextEditor
          label="Content"
          value={formData.content}
          onChange={onContentChange}
          placeholder="Write your blog post content here..."
          height="400px"
        />

        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={onChange}
            placeholder="study abroad, australia, education"
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={onChange}
            className="rounded"
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>
      </CardContent>
    </Card>
  );
};
