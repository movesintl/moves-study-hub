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
import { FeaturedImageSection } from '@/pages/admin/blogs/components/FeaturedImageSection';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    full_details: '',
    icon_url: '',
    feature_image_url: '',
    feature_image_alt: '',
  });

  const [loading, setLoading] = useState(false);

  const { data: service } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        short_description: service.short_description || '',
        full_details: service.full_details || '',
        icon_url: service.icon_url || '',
        feature_image_url: service.feature_image_url || '',
        feature_image_alt: service.feature_image_alt || '',
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Service updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Service created successfully",
        });
      }

      navigate('/admin/services');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} service`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconChange = (value: string) => {
    setFormData(prev => ({ ...prev, icon_url: value }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ 
          ...prev, 
          feature_image_url: event.target?.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Service' : 'Add New Service'}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <Label htmlFor="full_details">Full Details</Label>
              <textarea
                id="full_details"
                name="full_details"
                value={formData.full_details}
                onChange={handleChange}
                rows={6}
                className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                placeholder="Complete details about the service..."
              />
            </div>

            <MediaSelector
              value={formData.icon_url}
              onChange={handleIconChange}
              label="Service Icon"
              placeholder="https://example.com/icon.svg"
            />

            <FeaturedImageSection
              formData={{
                featured_image_url: formData.feature_image_url,
                featured_image_alt: formData.feature_image_alt,
              }}
              onChange={handleChange}
              onImageFileChange={handleImageFileChange}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/services')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceForm;
