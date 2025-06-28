
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye, Share2, ArrowRight, Play } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-6">
          <div className="text-6xl font-bold text-gray-300">404</div>
          <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
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
      
      <div className="min-h-screen bg-white">
        {/* Redesigned Hero Section */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Title and Subtitle */}
              <div className="text-white space-y-6">
                {/* Page Meta */}
                <div className="flex items-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(page.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>Popular</span>
                  </div>
                </div>

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {page.title}
                </h1>
                
                {page.subtitle && (
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    {page.subtitle}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Right Column - Featured Image */}
              <div className="relative">
                {page.feature_image_url ? (
                  <div className="relative group">
                    <img 
                      src={page.feature_image_url} 
                      alt={page.title}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ) : (
                  <div className="w-full h-64 md:h-80 lg:h-96 bg-white/10 rounded-2xl border-2 border-white/20 flex items-center justify-center">
                    <div className="text-white/60 text-center">
                      <Eye className="h-12 w-12 mx-auto mb-2" />
                      <p>No featured image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        {(page.page_description || page.content_image_url || page.content_video_url || page.cta_text) && (
          <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  {page.page_description && (
                    <div className="prose prose-lg prose-primary max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ __html: page.page_description }}
                        className="text-gray-700 leading-relaxed"
                      />
                    </div>
                  )}
                  
                  {page.cta_text && (
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10">
                      <p className="text-gray-700 mb-6 text-lg leading-relaxed">{page.cta_text}</p>
                      {page.cta_button_text && page.cta_button_link && (
                        <Button asChild size="lg" className="shadow-lg">
                          <a href={page.cta_button_link} className="inline-flex items-center">
                            {page.cta_button_text}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  {page.content_video_url ? (
                    <div className="aspect-video relative group cursor-pointer">
                      <iframe 
                        src={getVideoEmbedUrl(page.content_video_url) || ''}
                        className="w-full h-full rounded-2xl shadow-2xl"
                        frameBorder="0"
                        allowFullScreen
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Play className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ) : page.content_image_url ? (
                    <div className="relative group">
                      <img 
                        src={page.content_image_url} 
                        alt="Content illustration"
                        className="w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Body Content */}
        {page.body_content && (
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="prose prose-lg prose-primary max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: page.body_content }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            </div>
          </section>
        )}

        {/* Legacy Content (for backward compatibility) */}
        {page.content && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="prose prose-lg prose-primary max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: page.content }}
                  className="whitespace-pre-wrap text-gray-700 leading-relaxed"
                />
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {page.faqs && page.faqs.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">FAQ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 text-lg">
                  Find answers to common questions about our services
                </p>
              </div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {page.faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left px-6 py-4 hover:no-underline">
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div 
                        dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br>') }}
                        className="text-gray-600 leading-relaxed"
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
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4">Related Content</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Related Articles
                </h2>
                <p className="text-gray-600 text-lg">
                  Explore more content that might interest you
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((blog) => (
                  <article key={blog.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {blog.featured_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={blog.featured_image_url} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        <a href={`/blogs/${blog.slug}`}>
                          {blog.title}
                        </a>
                      </h3>
                      
                      {blog.meta_description && (
                        <p className="text-gray-600 line-clamp-3">
                          {blog.meta_description}
                        </p>
                      )}
                      
                      <div className="pt-2">
                        <a 
                          href={`/blogs/${blog.slug}`} 
                          className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
                        >
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default PageView;
