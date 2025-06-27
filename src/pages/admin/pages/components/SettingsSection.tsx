
import React from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BlogCategory {
  id: string;
  name: string;
}

interface SettingsSectionProps {
  formData: {
    related_blog_category_id: string;
    show_counselling_form: boolean;
    published: boolean;
  };
  blogCategories: BlogCategory[];
  onFormDataChange: (field: string, value: string | boolean) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  formData,
  blogCategories,
  onFormDataChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Content & Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="related_blog_category">Related Blog Category</Label>
          <Select
            value={formData.related_blog_category_id}
            onValueChange={(value) => onFormDataChange('related_blog_category_id', value === 'none' ? '' : value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select blog category to show related posts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No related blogs</SelectItem>
              {blogCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="show_counselling_form"
            checked={formData.show_counselling_form}
            onCheckedChange={(checked) => 
              onFormDataChange('show_counselling_form', !!checked)
            }
          />
          <Label htmlFor="show_counselling_form">Show Free Counselling Form</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            name="published"
            checked={formData.published}
            onCheckedChange={(checked) => 
              onFormDataChange('published', !!checked)
            }
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsSection;
