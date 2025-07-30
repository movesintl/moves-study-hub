
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
      
      <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Section with Split Design */}
        <div className="relative min-h-screen flex items-center bg-gradient-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Side - Text Content */}
              <div className="text-white space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Page Details</span>
                  </div>
                  
                  <h1 className="text-6xl lg:text-7xl font-black leading-none">
                    <span className="block text-white">
                      {page.title}
                    </span>
                    {page.subtitle && (
                      <span className="block text-white/80 text-4xl lg:text-5xl mt-2">
                        {page.subtitle}
                      </span>
                    )}
                  </h1>
                </div>
                
                {page.page_description && (
                  <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                    {page.page_description}
                  </p>
                )}
                
                {/* CTA Button */}
                {page.cta_button_text && page.cta_button_link && (
                  <div className="pt-4">
                    <a 
                      href={page.cta_button_link}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all duration-300 hover-scale shadow-elegant"
                    >
                      {page.cta_button_text}
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Right Side - Feature Image or Content */}
              <div className="relative animate-scale-in">
                {page.feature_image_url ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-xl"></div>
                    <div className="relative glass rounded-3xl overflow-hidden border border-white/20 shadow-elegant backdrop-blur-xl">
                      <img 
                        src={page.feature_image_url} 
                        alt={page.title}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-xl"></div>
                    <div className="relative glass rounded-3xl p-10 border border-white/20 shadow-elegant backdrop-blur-xl">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Learn More</h3>
                        <p className="text-white/90">Discover detailed information about this topic</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {page.visual_builder_enabled && page.visual_builder_data ? (
          <div className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PageRenderer data={page.visual_builder_data} />
            </div>
          </div>
        ) : (
          <div className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative backdrop-blur-xl rounded-3xl p-12 border border-border shadow-elegant bg-background mb-16">
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
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative backdrop-blur-xl rounded-3xl p-12 border border-border shadow-elegant bg-background mb-16">
                <PageViewFAQ faqs={page.faqs} />
              </div>
            </div>
          </div>
        )}

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <div className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative backdrop-blur-xl rounded-3xl p-12 border border-border shadow-elegant bg-background mb-16">
                <PageViewRelatedBlogs relatedBlogs={relatedBlogs} />
              </div>
            </div>
          </div>
        )}

        {/* Lead Enquiry Form */}
        {page.show_counselling_form && (
          <div className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative backdrop-blur-xl rounded-3xl p-12 border border-border shadow-elegant bg-background">
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
