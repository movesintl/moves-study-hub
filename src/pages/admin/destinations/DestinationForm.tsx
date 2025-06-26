
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import MediaSelector from '@/components/admin/MediaSelector';
import { Plus, Trash2 } from 'lucide-react';

const DestinationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    featured_image_url: '',
    visa_info: '',
    lifestyle_info: '',
    slug: '',
    why_study_points: [] as string[],
    job_market_points: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  // Type guard to check if a value is an array of strings
  const isStringArray = (value: any): value is string[] => {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
  };

  const { data: destination } = useQuery({
    queryKey: ['destination', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (destination) {
      setFormData({
        name: destination.name || '',
        description: destination.description || '',
        featured_image_url: destination.featured_image_url || '',
        visa_info: destination.visa_info || '',
        lifestyle_info: destination.lifestyle_info || '',
        slug: destination.slug || '',
        why_study_points: isStringArray(destination.why_study_points) ? destination.why_study_points : [],
        job_market_points: isStringArray(destination.job_market_points) ? destination.job_market_points : [],
      });
    }
  }, [destination]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Auto-generate slug if not provided
      const slug = formData.slug || generateSlug(formData.name);
      
      const dataToSubmit = {
        ...formData,
        slug,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('destinations')
          .update(dataToSubmit)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Destination updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('destinations')
          .insert([dataToSubmit]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Destination created successfully",
        });
      }

      navigate('/admin/destinations');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} destination`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Auto-generate slug when name changes
      ...(name === 'name' && !prev.slug ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleImageChange = (value: string) => {
    setFormData(prev => ({ ...prev, featured_image_url: value }));
  };

  const addWhyStudyPoint = () => {
    setFormData(prev => ({
      ...prev,
      why_study_points: [...prev.why_study_points, '']
    }));
  };

  const removeWhyStudyPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      why_study_points: prev.why_study_points.filter((_, i) => i !== index)
    }));
  };

  const updateWhyStudyPoint = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      why_study_points: prev.why_study_points.map((point, i) => i === index ? value : point)
    }));
  };

  const addJobMarketPoint = () => {
    setFormData(prev => ({
      ...prev,
      job_market_points: [...prev.job_market_points, '']
    }));
  };

  const removeJobMarketPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      job_market_points: prev.job_market_points.filter((_, i) => i !== index)
    }));
  };

  const updateJobMarketPoint = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      job_market_points: prev.job_market_points.map((point, i) => i === index ? value : point)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Destination' : 'Add New Destination'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., australia, united-kingdom"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be auto-generated from the name if left empty
              </p>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                placeholder="Brief description of the destination..."
              />
            </div>

            <MediaSelector
              value={formData.featured_image_url}
              onChange={handleImageChange}
              label="Featured Image"
              placeholder="https://example.com/image.jpg"
            />
          </CardContent>
        </Card>

        {/* Why Study Points */}
        <Card>
          <CardHeader>
            <CardTitle>Why Study in {formData.name || 'This Destination'}?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.why_study_points.map((point, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={point}
                  onChange={(e) => updateWhyStudyPoint(index, e.target.value)}
                  placeholder="Enter a reason to study here..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeWhyStudyPoint(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addWhyStudyPoint}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Why Study Point
            </Button>
          </CardContent>
        </Card>

        {/* Job Market Points */}
        <Card>
          <CardHeader>
            <CardTitle>Job Market & Career Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.job_market_points.map((point, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={point}
                  onChange={(e) => updateJobMarketPoint(index, e.target.value)}
                  placeholder="Enter job market information..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeJobMarketPoint(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addJobMarketPoint}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Job Market Point
            </Button>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="visa_info">Visa Information</Label>
              <textarea
                id="visa_info"
                name="visa_info"
                value={formData.visa_info}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                placeholder="Visa requirements and information..."
              />
            </div>

            <div>
              <Label htmlFor="lifestyle_info">Lifestyle Information</Label>
              <textarea
                id="lifestyle_info"
                name="lifestyle_info"
                value={formData.lifestyle_info}
                onChange={handleChange}
                rows={4}
                className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                placeholder="Lifestyle and cultural information..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update Destination' : 'Create Destination')}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/destinations')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
