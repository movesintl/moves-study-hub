import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ServiceFormData {
  title: string;
  short_description: string;
  full_details: string;
  icon_url: string;
  feature_image_url: string;
  feature_image_alt: string;
  faqs: Array<{ question: string; answer: string }>;
  how_it_works_title: string;
  how_it_works_description: string;
  how_it_works_feature_image_url: string;
  how_it_works_blurbs: Array<{ icon: string; title: string; description: string }>;
}

export const useServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    short_description: '',
    full_details: '',
    icon_url: '',
    feature_image_url: '',
    feature_image_alt: '',
    faqs: [],
    how_it_works_title: '',
    how_it_works_description: '',
    how_it_works_feature_image_url: '',
    how_it_works_blurbs: [],
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
        faqs: Array.isArray(service.faqs) ? service.faqs as Array<{ question: string; answer: string }> : [],
        how_it_works_title: service.how_it_works_title || '',
        how_it_works_description: service.how_it_works_description || '',
        how_it_works_feature_image_url: service.how_it_works_feature_image_url || '',
        how_it_works_blurbs: Array.isArray(service.how_it_works_blurbs) ? service.how_it_works_blurbs as Array<{ icon: string; title: string; description: string }> : [],
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

  const updateFormData = (updates: Partial<ServiceFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return {
    formData,
    loading,
    isEditing,
    handleSubmit,
    updateFormData,
    navigate,
  };
};