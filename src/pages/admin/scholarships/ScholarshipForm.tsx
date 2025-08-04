import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import MediaSelector from '@/components/admin/MediaSelector';

const ScholarshipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_description: '',
    eligibility_criteria: '',
    application_process: '',
    required_documents: '',
    scholarship_amount: '',
    currency: 'AUD',
    deadline: '',
    start_date: '',
    end_date: '',
    university_id: '',
    course_id: '',
    destination_country: '',
    scholarship_type: '',
    application_link: '',
    contact_email: '',
    contact_phone: '',
    is_published: false,
    is_featured: false,
    featured_image_url: '',
    meta_title: '',
    meta_description: ''
  });

  // Fetch scholarship data if editing
  const { data: scholarship } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isEditing
  });

  // Fetch universities
  const { data: universities } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  // Fetch courses
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('title');
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (scholarship) {
      setFormData({
        title: scholarship.title || '',
        short_description: scholarship.short_description || '',
        full_description: scholarship.full_description || '',
        eligibility_criteria: scholarship.eligibility_criteria || '',
        application_process: scholarship.application_process || '',
        required_documents: scholarship.required_documents || '',
        scholarship_amount: scholarship.scholarship_amount || '',
        currency: scholarship.currency || 'AUD',
        deadline: scholarship.deadline ? scholarship.deadline.split('T')[0] : '',
        start_date: scholarship.start_date ? scholarship.start_date.split('T')[0] : '',
        end_date: scholarship.end_date ? scholarship.end_date.split('T')[0] : '',
        university_id: scholarship.university_id || '',
        course_id: scholarship.course_id || '',
        destination_country: scholarship.destination_country || '',
        scholarship_type: scholarship.scholarship_type || '',
        application_link: scholarship.application_link || '',
        contact_email: scholarship.contact_email || '',
        contact_phone: scholarship.contact_phone || '',
        is_published: scholarship.is_published || false,
        is_featured: scholarship.is_featured || false,
        featured_image_url: scholarship.featured_image_url || '',
        meta_title: scholarship.meta_title || '',
        meta_description: scholarship.meta_description || ''
      });
    }
  }, [scholarship]);

  const saveScholarship = useMutation({
    mutationFn: async (data: typeof formData) => {
      const baseData = {
        title: data.title,
        short_description: data.short_description,
        full_description: data.full_description,
        eligibility_criteria: data.eligibility_criteria,
        application_process: data.application_process,
        required_documents: data.required_documents,
        scholarship_amount: data.scholarship_amount,
        currency: data.currency,
        deadline: data.deadline ? new Date(data.deadline).toISOString() : null,
        start_date: data.start_date ? new Date(data.start_date).toISOString() : null,
        end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
        university_id: data.university_id || null,
        course_id: data.course_id || null,
        destination_country: data.destination_country,
        scholarship_type: data.scholarship_type,
        application_link: data.application_link,
        contact_email: data.contact_email,
        contact_phone: data.contact_phone,
        is_published: data.is_published,
        is_featured: data.is_featured,
        featured_image_url: data.featured_image_url,
        meta_title: data.meta_title,
        meta_description: data.meta_description
      };

      if (isEditing) {
        const { error } = await supabase
          .from('scholarships')
          .update(baseData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('scholarships')
          .insert(baseData as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-scholarships'] });
      toast({ title: `Scholarship ${isEditing ? 'updated' : 'created'} successfully` });
      navigate('/admin/scholarships');
    },
    onError: (error) => {
      toast({ 
        title: `Error ${isEditing ? 'updating' : 'creating'} scholarship`, 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveScholarship.mutate(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Scholarship' : 'Add New Scholarship'}</h1>
        <p className="text-gray-600">Fill in the scholarship details below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="scholarship_type">Scholarship Type *</Label>
                <Select value={formData.scholarship_type} onValueChange={(value) => handleInputChange('scholarship_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="merit">Merit-based</SelectItem>
                    <SelectItem value="need-based">Need-based</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="academic">Academic Excellence</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                value={formData.short_description}
                onChange={(e) => handleInputChange('short_description', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="full_description">Full Description</Label>
              <Textarea
                id="full_description"
                value={formData.full_description}
                onChange={(e) => handleInputChange('full_description', e.target.value)}
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scholarship Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scholarship_amount">Scholarship Amount</Label>
                <Input
                  id="scholarship_amount"
                  value={formData.scholarship_amount}
                  onChange={(e) => handleInputChange('scholarship_amount', e.target.value)}
                  placeholder="e.g., $10,000 or Full Tuition"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUD">AUD</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange('start_date', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange('end_date', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="university_id">University</Label>
                <Select value={formData.university_id} onValueChange={(value) => handleInputChange('university_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select university" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities?.map((university) => (
                      <SelectItem key={university.id} value={university.id}>
                        {university.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="course_id">Course (Optional)</Label>
                <Select value={formData.course_id} onValueChange={(value) => handleInputChange('course_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="destination_country">Destination Country</Label>
              <Input
                id="destination_country"
                value={formData.destination_country}
                onChange={(e) => handleInputChange('destination_country', e.target.value)}
                placeholder="e.g., Australia, United States"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="eligibility_criteria">Eligibility Criteria</Label>
              <Textarea
                id="eligibility_criteria"
                value={formData.eligibility_criteria}
                onChange={(e) => handleInputChange('eligibility_criteria', e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="application_process">Application Process</Label>
              <Textarea
                id="application_process"
                value={formData.application_process}
                onChange={(e) => handleInputChange('application_process', e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="required_documents">Required Documents</Label>
              <Textarea
                id="required_documents"
                value={formData.required_documents}
                onChange={(e) => handleInputChange('required_documents', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="application_link">Application Link</Label>
                <Input
                  id="application_link"
                  type="url"
                  value={formData.application_link}
                  onChange={(e) => handleInputChange('application_link', e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media & SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Featured Image</Label>
              <MediaSelector
                label="Featured Image"
                value={formData.featured_image_url}
                onChange={(value) => handleInputChange('featured_image_url', value)}
                accept="image/*"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => handleInputChange('meta_title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => handleInputChange('is_published', checked)}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
              />
              <Label htmlFor="is_featured">Featured</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/scholarships')}>
            Cancel
          </Button>
          <Button type="submit" disabled={saveScholarship.isPending}>
            {isEditing ? 'Update Scholarship' : 'Create Scholarship'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScholarshipForm;