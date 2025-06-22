
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CourseFormData {
  title: string;
  description: string;
  study_area: string;
  study_area_id: string;
  level: string;
  study_level_id: string;
  country: string;
  university: string;
  university_id: string;
  destination_id: string;
  tuition_fee_min: number;
  tuition_fee_max: number;
  currency: string;
  duration_months: number;
  intake_dates: string[];
  eligibility: string;
  requirements: string;
  application_link: string;
  thumbnail_url: string;
  featured: boolean;
}

const CourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    study_area: '',
    study_area_id: '',
    level: '',
    study_level_id: '',
    country: '',
    university: '',
    university_id: '',
    destination_id: '',
    tuition_fee_min: 0,
    tuition_fee_max: 0,
    currency: 'AUD',
    duration_months: 12,
    intake_dates: [],
    eligibility: '',
    requirements: '',
    application_link: '',
    thumbnail_url: '',
    featured: false
  });

  // Fetch universities and destinations
  const { data: universities = [] } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('universities').select('*');
      if (error) throw error;
      return data;
    }
  });

  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('destinations').select('*');
      if (error) throw error;
      return data;
    }
  });

  // Fetch study areas and levels
  const { data: studyAreas = [] } = useQuery({
    queryKey: ['study-areas'],
    queryFn: async () => {
      const { data, error } = await supabase.from('course_study_areas').select('*');
      if (error) throw error;
      return data;
    }
  });

  const { data: studyLevels = [] } = useQuery({
    queryKey: ['study-levels'],
    queryFn: async () => {
      const { data, error } = await supabase.from('course_study_levels').select('*');
      if (error) throw error;
      return data;
    }
  });

  // Fetch course data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchCourse = async () => {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch course data",
            variant: "destructive"
          });
          return;
        }

        setFormData({
          ...data,
          intake_dates: data.intake_dates || []
        });
      };

      fetchCourse();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      tuition_fee_min: Number(formData.tuition_fee_min),
      tuition_fee_max: Number(formData.tuition_fee_max),
      duration_months: Number(formData.duration_months)
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Course updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('courses')
          .insert(courseData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Course created successfully"
        });
      }

      navigate('/admin/courses');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save course",
        variant: "destructive"
      });
    }
  };

  const handleIntakeDatesChange = (value: string) => {
    const dates = value.split(',').map(date => date.trim()).filter(date => date);
    setFormData({ ...formData, intake_dates: dates });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Course' : 'Add New Course'}</h1>
        <p className="text-gray-600">Fill in the course details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Institution & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university_id">University</Label>
                <Select value={formData.university_id} onValueChange={(value) => {
                  const selectedUni = universities.find(u => u.id === value);
                  setFormData({ 
                    ...formData, 
                    university_id: value,
                    university: selectedUni?.name || ''
                  });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni.id} value={uni.id}>{uni.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination_id">Destination</Label>
                <Select value={formData.destination_id} onValueChange={(value) => {
                  const selectedDest = destinations.find(d => d.id === value);
                  setFormData({ 
                    ...formData, 
                    destination_id: value,
                    country: selectedDest?.name || ''
                  });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id}>{dest.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fees & Intake</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUD">AUD</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="NZD">NZD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tuition_fee_min">Minimum Fee</Label>
                <Input
                  id="tuition_fee_min"
                  type="number"
                  value={formData.tuition_fee_min}
                  onChange={(e) => setFormData({ ...formData, tuition_fee_min: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tuition_fee_max">Maximum Fee</Label>
                <Input
                  id="tuition_fee_max"
                  type="number"
                  value={formData.tuition_fee_max}
                  onChange={(e) => setFormData({ ...formData, tuition_fee_max: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intake_dates">Intake Dates (comma-separated)</Label>
              <Input
                id="intake_dates"
                value={formData.intake_dates.join(', ')}
                onChange={(e) => handleIntakeDatesChange(e.target.value)}
                placeholder="February, July, November"
              />
            </div>
          </CardContent>
        </Card>

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

        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/courses')}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
