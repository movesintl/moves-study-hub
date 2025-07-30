
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
        {/* Diagonal Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-accent">
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Diagonal Cut */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-background" style={{
            clipPath: 'polygon(0 100%, 100% 0%, 100% 100%)'
          }}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center text-white">
              <div className="inline-block mb-8">
                <div className="h-1 w-20 bg-white/60 mb-4 mx-auto"></div>
                <span className="text-sm uppercase tracking-wider font-medium opacity-90">
                  {page.subtitle || 'Information Page'}
                </span>
                <div className="h-1 w-20 bg-white/60 mt-4 mx-auto"></div>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-none">
                {page.title}
              </h1>
              
              {page.page_description && (
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
                  {page.page_description}
                </p>
              )}
              
              {page.cta_button_text && page.cta_button_link && (
                <a 
                  href={page.cta_button_link}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  {page.cta_button_text}
                  <ArrowRight className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Feature Image Section */}
        {page.feature_image_url && (
          <div className="relative -mt-16 z-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl"></div>
                <img 
                  src={page.feature_image_url} 
                  alt={page.title}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 ring-1 ring-white/20 rounded-3xl"></div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="relative py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Content Cards Layout */}
            <div className="space-y-16">
              
              {/* Main Content */}
              {page.visual_builder_enabled && page.visual_builder_data ? (
                <div className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-12 border border-border/50 shadow-xl backdrop-blur-sm">
                  <PageRenderer data={page.visual_builder_data} />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-card to-card/50 rounded-3xl p-12 border border-border/50 shadow-xl backdrop-blur-sm">
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

              {/* FAQ Section */}
              {page.faqs && page.faqs.length > 0 && (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-card rounded-3xl p-12 border border-border shadow-xl">
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                        <CheckCircle className="h-4 w-4" />
                        Questions & Answers
                      </div>
                      <h2 className="text-4xl font-bold text-foreground">
                        Everything You Need to Know
                      </h2>
                    </div>
                    <PageViewFAQ faqs={page.faqs} />
                  </div>
                </div>
              )}

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div className="bg-muted/30 rounded-3xl p-12 border border-border/50">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                      Continue Reading
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Explore more related content
                    </p>
                  </div>
                  <PageViewRelatedBlogs relatedBlogs={relatedBlogs} />
                </div>
              )}

              {/* Contact Form */}
              {page.show_counselling_form && (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-card rounded-3xl p-12 border border-border shadow-xl">
                    <div className="text-center mb-12">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ArrowRight className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-4xl font-bold text-foreground mb-4">
                        Let's Get Started
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        Ready to take the next step? Get in touch with us
                      </p>
                    </div>
                    <LeadEnquiryForm />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageView;
