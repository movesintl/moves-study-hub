
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface BasicInfoSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  studyAreas: any[];
  studyLevels: any[];
}

export const BasicInfoSection = ({ formData, setFormData, studyAreas, studyLevels }: BasicInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Auto-generated from title"
            />
            <p className="text-xs text-gray-500">Leave empty to auto-generate from title</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="study_area_id">Study Area</Label>
          <Select value={formData.study_area_id} onValueChange={(value) => {
            const selectedArea = studyAreas.find(area => area.id === value);
            setFormData({ 
              ...formData, 
              study_area_id: value,
              study_area: selectedArea?.name || ''
            });
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select study area" />
            </SelectTrigger>
            <SelectContent>
              {studyAreas.map((area) => (
                <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="study_level_id">Study Level</Label>
            <Select value={formData.study_level_id} onValueChange={(value) => {
              const selectedLevel = studyLevels.find(level => level.id === value);
              setFormData({ 
                ...formData, 
                study_level_id: value,
                level: selectedLevel?.name || ''
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {studyLevels.map((level) => (
                  <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration_months">Duration (Months)</Label>
            <Input
              id="duration_months"
              type="number"
              value={formData.duration_months}
              onChange={(e) => setFormData({ ...formData, duration_months: Number(e.target.value) })}
              required
            />
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Featured Course</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
