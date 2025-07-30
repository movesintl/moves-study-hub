
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
      
      <div className="min-h-screen bg-background relative">
        {/* Modern Hero Section */}
        <div className="relative overflow-hidden">
          {/* Geometric Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rotate-45 rounded-xl"></div>
              <div className="absolute top-40 right-32 w-24 h-24 bg-accent/10 rounded-full"></div>
              <div className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-accent/20 rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-28 h-28 bg-primary/10 rotate-12 rounded-lg"></div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Article
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  {page.title}
                </span>
              </h1>
              
              {page.subtitle && (
                <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium mb-8">
                  {page.subtitle}
                </h2>
              )}
              
              {page.page_description && (
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {page.page_description}
                </p>
              )}
            </div>

            {/* Feature Image */}
            {page.feature_image_url && (
              <div className="max-w-5xl mx-auto mb-16">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-card rounded-2xl overflow-hidden border border-border">
                    <img 
                      src={page.feature_image_url} 
                      alt={page.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {page.cta_button_text && page.cta_button_link && (
              <div className="text-center">
                <a 
                  href={page.cta_button_link}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 hover-scale shadow-lg"
                >
                  {page.cta_button_text}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative bg-muted/30 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {page.visual_builder_enabled && page.visual_builder_data ? (
              <PageRenderer data={page.visual_builder_data} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
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

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Quick Info Card */}
                  <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-foreground mb-4">Quick Info</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Published:</span>
                        <span>{new Date(page.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Updated:</span>
                        <span>{new Date(page.updated_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="text-primary font-medium">Article</span>
                      </div>
                    </div>
                  </div>

                  {/* Related Action Card */}
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get expert guidance on your journey
                    </p>
                    <button className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors">
                      Contact Us
                    </button>
                  </div>
                </div>
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
