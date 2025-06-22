
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  });

  const [loading, setLoading] = useState(false);

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
      });
    }
  }, [destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('destinations')
          .update(formData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Destination updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('destinations')
          .insert([formData]);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Destination' : 'Add New Destination'}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Destination Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <Label htmlFor="featured_image_url">Featured Image URL</Label>
              <Input
                id="featured_image_url"
                name="featured_image_url"
                type="url"
                value={formData.featured_image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default DestinationForm;
