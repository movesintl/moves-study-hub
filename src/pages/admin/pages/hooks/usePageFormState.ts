
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
    });
    setAutoGenerateSlug(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const toggleAutoGenerateSlug = () => {
    setAutoGenerateSlug(prev => !prev);
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
