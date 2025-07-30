
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PageViewHero from './components/PageViewHero';
import PageViewContent from './components/PageViewContent';
import PageViewFAQ from './components/PageViewFAQ';
import PageViewRelatedBlogs from './components/PageViewRelatedBlogs';
import PageViewSkeleton from './components/PageViewSkeleton';
import PageViewError from './components/PageViewError';
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
  featured_image_url: string;
  content: string;
  created_at: string;
}

const PageView = () => {
  const { slug } = useParams<{ slug: string }>();

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
      
      return {
        ...data,
        faqs: Array.isArray(data.faqs) ? 
          (data.faqs as any[]).filter((faq: any) => 
            typeof faq === 'object' && faq !== null && faq.question && faq.answer
          ).map((faq: any) => ({
            question: String(faq.question),
            answer: String(faq.answer)
          })) : [],
        visual_builder_data: typeof data.visual_builder_data === 'string' ? 
          data.visual_builder_data : 
          JSON.stringify(data.visual_builder_data || {})
      };
    },
    enabled: !!slug,
  });

  const { data: relatedBlogs = [] } = useQuery({
    queryKey: ['related-blogs', page?.related_blog_category_id],
    queryFn: async (): Promise<BlogData[]> => {
      if (!page?.related_blog_category_id) return [];
      
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, slug, featured_image_url, content, created_at')
        .eq('category_id', page.related_blog_category_id)
        .eq('published', true)
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    enabled: !!page?.related_blog_category_id,
  });

  if (isLoading) return <PageViewSkeleton />;
  if (error || !page) return <PageViewError />;

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
      </Helmet>
      
      <div className="min-h-screen bg-background">
        {/* Clean Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                    {page.title}
                  </h1>
                  
                  {page.subtitle && (
                    <h2 className="text-2xl lg:text-3xl text-muted-foreground font-medium">
                      {page.subtitle}
                    </h2>
                  )}
                  
                  {page.page_description && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {page.page_description}
                    </p>
                  )}
                </div>
                
                {page.cta_button_text && page.cta_button_link && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={page.cta_button_link}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300"
                    >
                      {page.cta_button_text}
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Right Content - Feature Image */}
              {page.feature_image_url && (
                <div className="relative">
                  <div className="aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xl">
                    <img 
                      src={page.feature_image_url} 
                      alt={page.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {page.visual_builder_enabled && page.visual_builder_data ? (
              <PageRenderer data={page.visual_builder_data} />
            ) : (
              <div className="bg-card rounded-2xl border border-border p-12 shadow-lg">
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
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="relative py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need to know about this topic
                </p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <PageViewFAQ faqs={page.faqs} />
              </div>
            </div>
          </div>
        )}

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <div className="relative bg-muted/30 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Related Articles
                </h2>
                <p className="text-lg text-muted-foreground">
                  Continue exploring with these related topics
                </p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <PageViewRelatedBlogs relatedBlogs={relatedBlogs} />
              </div>
            </div>
          </div>
        )}

        {/* Lead Enquiry Form */}
        {page.show_counselling_form && (
          <div className="relative py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Get in Touch
                </h2>
                <p className="text-lg text-muted-foreground">
                  Ready to start your journey? Let's talk!
                </p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <LeadEnquiryForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PageView;
