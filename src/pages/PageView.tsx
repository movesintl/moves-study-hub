import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import PageViewSkeleton from './components/PageViewSkeleton';
import PageViewError from './components/PageViewError';
import PageViewHero from './components/PageViewHero';
import PageViewContent from './components/PageViewContent';
import PageViewFAQ from './components/PageViewFAQ';
import PageViewRelatedBlogs from './components/PageViewRelatedBlogs';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import { PageRenderer } from '@/components/visual-builder/PageRenderer';

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
  visual_builder_enabled?: boolean;
  visual_builder_data?: string;
  visual_builder_version?: string;
}

interface BlogData {
  id: string;
  title: string;
  slug: string;
  featured_image_url?: string;
  meta_description?: string;
  created_at: string;
}

const PageView = () => {
  const { slug } = useParams();

  const { data: page, isLoading, error } = useQuery({
    queryKey: ['page', slug],
    queryFn: async (): Promise<PageData> => {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      
      // Transform the data to ensure faqs is properly typed
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
    }
  });

  const { data: relatedBlogs = [] } = useQuery({
    queryKey: ['related-blogs', page?.related_blog_category_id],
    queryFn: async (): Promise<BlogData[]> => {
      if (!page?.related_blog_category_id) return [];
      
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          id,
          title,
          slug,
          featured_image_url,
          meta_description,
          created_at
        `)
        .eq('published', true)
        .in('category_id', [page.related_blog_category_id])
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!page?.related_blog_category_id
  });

  if (isLoading) {
    return <PageViewSkeleton />;
  }

  if (error || !page) {
    return <PageViewError />;
  }

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {page.visual_builder_enabled && page.visual_builder_data ? (
          <div className="container mx-auto py-8">
            <PageRenderer data={page.visual_builder_data} />
          </div>
        ) : (
          <>
            <PageViewHero 
              title={page.title}
              subtitle={page.subtitle}
              featureImageUrl={page.feature_image_url}
            />

            <PageViewContent
              pageDescription={page.page_description}
              contentImageUrl={page.content_image_url}
              contentVideoUrl={page.content_video_url}
              ctaText={page.cta_text}
              ctaButtonText={page.cta_button_text}
              ctaButtonLink={page.cta_button_link}
              bodyContent={page.body_content}
              content={page.content}
            />

            <PageViewFAQ faqs={page.faqs || []} />

            <PageViewRelatedBlogs relatedBlogs={relatedBlogs} />
          </>
        )}

        <LeadEnquiryForm />
      </div>
    </>
  );
};

export default PageView;
