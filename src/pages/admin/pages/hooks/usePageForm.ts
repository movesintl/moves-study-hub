import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PageData {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  feature_image_url?: string;
  content: string | null;
  page_description?: string;
  content_image_url?: string;
  content_video_url?: string;
  cta_text?: string;
  cta_button_text?: string;
  cta_button_link?: string;
  body_content?: string;
  faqs?: Array<{ question: string; answer: string }>;
  related_blog_category_id?: string;
  show_counselling_form?: boolean;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface BlogCategory {
  id: string;
  name: string;
}

export const usePageForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = React.useState({
    title: '',
    slug: '',
    subtitle: '',
    feature_image_url: '',
    content: '',
    page_description: '',
    content_image_url: '',
    content_video_url: '',
    cta_text: '',
    cta_button_text: '',
    cta_button_link: '',
    body_content: '',
    faqs: [] as Array<{ question: string; answer: string }>,
    related_blog_category_id: '',
    show_counselling_form: true,
    meta_title: '',
    meta_description: '',
    published: false,
  });
  
  const [autoGenerateSlug, setAutoGenerateSlug] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', id],
    queryFn: async (): Promise<PageData | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        faqs: Array.isArray(data.faqs) ? 
          (data.faqs as any[]).filter((faq: any) => 
            typeof faq === 'object' && faq !== null && faq.question && faq.answer
          ).map((faq: any) => ({
            question: String(faq.question),
            answer: String(faq.answer)
          })) : []
      };
    },
    enabled: isEditing,
  });

  const { data: blogCategories = [] } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async (): Promise<BlogCategory[]> => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  React.useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        subtitle: page.subtitle || '',
        feature_image_url: page.feature_image_url || '',
        content: page.content || '',
        page_description: page.page_description || '',
        content_image_url: page.content_image_url || '',
        content_video_url: page.content_video_url || '',
        cta_text: page.cta_text || '',
        cta_button_text: page.cta_button_text || '',
        cta_button_link: page.cta_button_link || '',
        body_content: page.body_content || '',
        faqs: page.faqs || [],
        related_blog_category_id: page.related_blog_category_id || '',
        show_counselling_form: page.show_counselling_form ?? true,
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        published: page.published || false,
      });
      setAutoGenerateSlug(false);
    }
  }, [page]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const toggleAutoGenerateSlug = () => {
    const newAutoGenerate = !autoGenerateSlug;
    setAutoGenerateSlug(newAutoGenerate);
    if (newAutoGenerate && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pageData = {
        title: formData.title,
        slug: formData.slug,
        subtitle: formData.subtitle,
        feature_image_url: formData.feature_image_url,
        content: formData.content,
        page_description: formData.page_description,
        content_image_url: formData.content_image_url,
        content_video_url: formData.content_video_url,
        cta_text: formData.cta_text,
        cta_button_text: formData.cta_button_text,
        cta_button_link: formData.cta_button_link,
        body_content: formData.body_content,
        faqs: formData.faqs,
        related_blog_category_id: formData.related_blog_category_id || null,
        show_counselling_form: formData.show_counselling_form,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        published: formData.published,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('pages')
          .insert([pageData]);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page created successfully',
        });
      }

      navigate('/admin/pages');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save page',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    autoGenerateSlug,
    setAutoGenerateSlug,
    loading,
    isLoading,
    isEditing,
    blogCategories,
    handleSubmit,
    generateSlug,
    navigate,
    toggleAutoGenerateSlug,
  };
};
