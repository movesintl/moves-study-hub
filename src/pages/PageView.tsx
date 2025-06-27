import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CounsellingBookingForm from '@/components/forms/CounsellingBookingForm';

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

  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    return url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
          {page.feature_image_url && (
            <div className="absolute inset-0">
              <img 
                src={page.feature_image_url} 
                alt={page.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          )}
          
          <div className="relative z-10 container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">
                {page.title}
              </h1>
              {page.subtitle && (
                <p className="text-xl text-gray-200 leading-relaxed">
                  {page.subtitle}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        {(page.page_description || page.content_image_url || page.content_video_url || page.cta_text) && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  {page.page_description && (
                    <div className="prose prose-lg max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ __html: page.page_description }}
                      />
                    </div>
                  )}
                  
                  {page.cta_text && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">{page.cta_text}</p>
                      {page.cta_button_text && page.cta_button_link && (
                        <Button asChild>
                          <a href={page.cta_button_link} className="inline-block">
                            {page.cta_button_text}
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  {page.content_video_url ? (
                    <div className="aspect-video">
                      <iframe 
                        src={getVideoEmbedUrl(page.content_video_url) || ''}
                        className="w-full h-full rounded-lg"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  ) : page.content_image_url ? (
                    <img 
                      src={page.content_image_url} 
                      alt="Content illustration"
                      className="w-full rounded-lg shadow-md"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Body Content */}
        {page.body_content && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: page.body_content }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Legacy Content (for backward compatibility) */}
        {page.content && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: page.content }}
                  className="whitespace-pre-wrap"
                />
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {page.faqs && page.faqs.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {page.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div 
                        dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br>') }}
                        className="text-gray-600"
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Related Articles
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((blog) => (
                  <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {blog.featured_image_url && (
                      <img 
                        src={blog.featured_image_url} 
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        <a href={`/blogs/${blog.slug}`} className="hover:text-primary">
                          {blog.title}
                        </a>
                      </h3>
                      {blog.meta_description && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {blog.meta_description}
                        </p>
                      )}
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        <a 
                          href={`/blogs/${blog.slug}`} 
                          className="text-primary hover:underline"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Free Counselling Form */}
        {page.show_counselling_form && (
          <section className="py-16 bg-primary/5">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-gray-600">
                  Get personalized guidance from our expert counsellors
                </p>
              </div>
              
              <CounsellingBookingForm />
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default PageView;
