import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import MediaSelector from '@/components/admin/MediaSelector';
import RichTextEditor from '@/components/admin/RichTextEditor';

const UniversityForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: '',
    website_url: '',
    logo_url: '',
    overview_content: '',
  });

  const [loading, setLoading] = useState(false);

  const { data: university } = useQuery({
    queryKey: ['university', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  const { data: destinations = [] } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name || '',
        location: university.location || '',
        country: university.country || '',
        website_url: university.website_url || '',
        logo_url: university.logo_url || '',
        overview_content: university.overview_content || '',
      });
    }
  }, [university]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('universities')
          .update(formData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "University updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('universities')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "University created successfully",
        });
      }

      navigate('/admin/universities');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} university`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (value: string) => {
    setFormData(prev => ({ ...prev, logo_url: value }));
  };

  const handleOverviewChange = (value: string) => {
    setFormData(prev => ({ ...prev, overview_content: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit University' : 'Add New University'}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>University Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">University Name *</Label>
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
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Sydney, Australia"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={handleCountryChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                  {destinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.name}>
                      {destination.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                name="website_url"
                type="url"
                value={formData.website_url}
                onChange={handleChange}
                placeholder="https://university.edu"
                className="mt-1"
              />
            </div>

            <MediaSelector
              value={formData.logo_url}
              onChange={handleLogoChange}
              label="University Logo"
              placeholder="https://example.com/logo.png"
            />

            <RichTextEditor
              label="University Overview"
              value={formData.overview_content}
              onChange={handleOverviewChange}
              placeholder="Enter university overview and description..."
              height="300px"
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEditing ? 'Update University' : 'Create University')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/universities')}
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

export default UniversityForm;
