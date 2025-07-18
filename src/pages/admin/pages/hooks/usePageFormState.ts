
import React from 'react';
import { PageData } from './usePageData';

export interface PageFormData {
  title: string;
  slug: string;
  subtitle: string;
  feature_image_url: string;
  content: string;
  page_description: string;
  content_image_url: string;
  content_video_url: string;
  cta_text: string;
  cta_button_text: string;
  cta_button_link: string;
  body_content: string;
  faqs: Array<{ question: string; answer: string }>;
  related_blog_category_id: string;
  show_counselling_form: boolean;
  meta_title: string;
  meta_description: string;
  published: boolean;
  visual_builder_enabled: boolean;
  visual_builder_data: string;
  visual_builder_version: string;
}

export const usePageFormState = () => {
  const [formData, setFormData] = React.useState<PageFormData>({
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
    faqs: [],
    related_blog_category_id: '',
    show_counselling_form: true,
    meta_title: '',
    meta_description: '',
    published: false,
    visual_builder_enabled: false,
    visual_builder_data: '{}',
    visual_builder_version: '1.0',
  });
  
  const [autoGenerateSlug, setAutoGenerateSlug] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const initializeFormData = (page: PageData) => {
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
      visual_builder_enabled: page.visual_builder_enabled || false,
      visual_builder_data: page.visual_builder_data || '{}',
      visual_builder_version: page.visual_builder_version || '1.0',
    });
    setAutoGenerateSlug(false);
  };

  const generateSlug = (title: string): string => {
    // Handle edge cases
    if (!title || typeof title !== 'string') {
      return '';
    }

    return title
      .toLowerCase()
      .trim() // Remove leading/trailing spaces
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace multiple spaces with single hyphen
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const toggleAutoGenerateSlug = () => {
    setAutoGenerateSlug(prev => {
      const newValue = !prev;
      if (newValue && formData.title) {
        // Generate slug from current title when enabling auto-generation
        const newSlug = generateSlug(formData.title);
        setFormData(prevData => ({
          ...prevData,
          slug: newSlug
        }));
      }
      return newValue;
    });
  };

  return {
    formData,
    setFormData,
    autoGenerateSlug,
    setAutoGenerateSlug,
    loading,
    setLoading,
    initializeFormData,
    generateSlug,
    toggleAutoGenerateSlug,
  };
};
