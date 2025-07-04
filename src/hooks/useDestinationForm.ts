
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  description: string;
  featured_image_url: string;
  visa_info: string;
  lifestyle_info: string;
  slug: string;
  why_study_points: string[];
  job_market_points: string[];
  average_fee: string;
  flag_icon_url: string;
  cost_of_living_info: string;
  more_information: string;
  faqs: { question: string; answer: string; }[];
}

// Type guard to check if a value is an array of strings
const isStringArray = (value: any): value is string[] => {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
};

// Type guard to check if a value is an array of FAQ objects
const isFAQArray = (value: any): value is { question: string; answer: string; }[] => {
  return Array.isArray(value) && value.every(item => 
    typeof item === 'object' && 
    item !== null && 
    typeof item.question === 'string' && 
    typeof item.answer === 'string'
  );
};

export const useDestinationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    featured_image_url: '',
    visa_info: '',
    lifestyle_info: '',
    slug: '',
    why_study_points: [],
    job_market_points: [],
    average_fee: '',
    flag_icon_url: '',
    cost_of_living_info: '',
    more_information: '',
    faqs: [],
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
        slug: destination.slug || '',
        why_study_points: isStringArray(destination.why_study_points) ? destination.why_study_points : [],
        job_market_points: isStringArray(destination.job_market_points) ? destination.job_market_points : [],
        average_fee: destination.average_fee || '',
        flag_icon_url: destination.flag_icon_url || '',
        cost_of_living_info: destination.cost_of_living_info || '',
        more_information: destination.more_information || '',
        faqs: isFAQArray(destination.faqs) ? destination.faqs : [],
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

  const handleRichTextChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Why Study Points handlers
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

  // Job Market Points handlers
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

  // FAQ handlers
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq)
    }));
  };

  return {
    formData,
    loading,
    isEditing,
    handleSubmit,
    handleChange,
    handleImageChange,
    handleRichTextChange,
    addWhyStudyPoint,
    removeWhyStudyPoint,
    updateWhyStudyPoint,
    addJobMarketPoint,
    removeJobMarketPoint,
    updateJobMarketPoint,
    addFAQ,
    removeFAQ,
    updateFAQ,
    navigate,
  };
};
