
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PageFormData } from './usePageFormState';

export const usePageSubmit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const handleSubmit = async (formData: PageFormData, setLoading: (loading: boolean) => void) => {
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
        visual_builder_enabled: formData.visual_builder_enabled,
        visual_builder_data: formData.visual_builder_data,
        visual_builder_version: formData.visual_builder_version,
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
    handleSubmit,
    navigate,
    isEditing,
  };
};
