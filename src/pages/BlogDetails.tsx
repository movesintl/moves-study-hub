import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { BlogDetailsSidebar } from '@/components/blog/BlogDetailsSidebar';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  BookOpen, 
  Clock, 
  Tag,
  Eye,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FAQItem {
  question: string;
  answer: string;
}

const BlogDetails = () => {
  const { id } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const [isLiked, setIsLiked] = React.useState(false);

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) throw new Error('No blog identifier provided');
      
      // First try to fetch by slug, then by ID
      let query = supabase
        .from('blogs')
        .select(`
          *,
          blog_category_assignments!inner(
            blog_categories(name, id)
          )
        `)
        .eq('published', true);

      // Check if the id looks like a UUID (contains hyphens)
      if (id.includes('-')) {
        query = query.eq('id', id);
      } else {
        query = query.eq('slug', id);
      }

      const { data, error } = await query.single();
      
      if (error) {
        // If slug lookup fails, try ID lookup as fallback
        if (!id.includes('-')) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('blogs')
            .select(`
              *,
              blog_category_assignments!inner(
                blog_categories(name, id)
              )
            `)
            .eq('id', id)
            .eq('published', true)
            .single();
          
          if (fallbackError) throw fallbackError;
          return fallbackData;
        }
        throw error;
      }
      
      return data;
    }
  });

  // Fetch related blogs
  const { data: relatedBlogs } = useQuery({
    queryKey: ['related-blogs', blog?.id],
    queryFn: async () => {
      if (!blog) return [];
      
      const categories = blog.blog_category_assignments?.map((assignment: any) => assignment.blog_categories.id) || [];
      
      if (categories.length === 0) return [];
      
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          id,
          title,
          slug,
          featured_image_url,
          created_at,
          blog_category_assignments!inner(
            blog_categories(name, id)
          )
        `)
        .eq('published', true)
        .neq('id', blog.id)
        .in('blog_category_assignments.blog_categories.id', categories)
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!blog
  });

  // Calculate reading time (rough estimate: 200 words per minute)
  const getReadingTime = (content: string) => {
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
  };

  const sharePost = async (platform?: string) => {
    const url = window.location.href;
    const title = blog?.title || '';
    const text = blog?.meta_description || blog?.title || '';

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    } else if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
    } else {
      if (navigator.share) {
        navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-3xl font-bold text-muted-foreground">Blog post not found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/blogs">Return to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const categories = blog.blog_category_assignments?.map((assignment: any) => assignment.blog_categories) || [];
  const faqs = (blog.faqs && Array.isArray(blog.faqs)) ? blog.faqs as unknown as FAQItem[] : [];
  const readingTime = blog.content ? getReadingTime(blog.content) : 0;

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Sidebar */}
          <BlogDetailsSidebar blog={blog} relatedBlogs={relatedBlogs || []} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/blogs" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Back to Blog</span>
                    </Link>
                  </Button>
                </div>

                {/* Share buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="hidden sm:inline ml-1">Like</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => sharePost()}>
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">Share</span>
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto">
              {/* Hero Section */}
              <div className="relative">
                {blog.featured_image_url && (
                  <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                    <img 
                      src={blog.featured_image_url} 
                      alt={blog.featured_image_alt || blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <div className="container max-w-4xl">
                        {/* Category badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {categories.map((category: any) => (
                            <Badge key={category.id} variant="secondary" className="bg-white/20 text-white border-white/30">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                          {blog.title}
                        </h1>
                        
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm">
                          {blog.author && (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span className="font-medium">{blog.author}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                          </div>
                          {readingTime > 0 && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{readingTime} min read</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>1.2k views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Fallback header for posts without featured image */}
                {!blog.featured_image_url && (
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 md:py-16">
                    <div className="container max-w-4xl px-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map((category: any) => (
                          <Badge key={category.id} variant="secondary">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                        {blog.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground text-sm">
                        {blog.author && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{blog.author}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        {readingTime > 0 && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{readingTime} min read</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="container max-w-4xl py-8 md:py-12 px-4">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8 p-4 bg-muted/50 rounded-lg">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {blog.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Content */}
                <article className="prose prose-lg max-w-none mb-8 md:mb-12">
                  {blog.content ? (
                    <div 
                      className="text-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">No content available for this post.</p>
                    </div>
                  )}
                </article>

                {/* Social Share Section */}
                <div className="mb-8 md:mb-12 p-4 md:p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" onClick={() => sharePost('facebook')}>
                      <Facebook className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Facebook</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost('twitter')}>
                      <Twitter className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Twitter</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost('linkedin')}>
                      <Linkedin className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost('copy')}>
                      <LinkIcon className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Copy Link</span>
                    </Button>
                  </div>
                </div>

                {/* FAQ Section */}
                {faqs.length > 0 && (
                  <Card className="mb-8 md:mb-12">
                    <div className="p-4 md:p-6 border-b">
                      <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        Frequently Asked Questions
                      </h2>
                      <p className="text-muted-foreground mt-2 text-sm md:text-base">
                        Find answers to common questions about this topic
                      </p>
                    </div>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {faqs.map((faq, index) => (
                          <Collapsible
                            key={index}
                            open={openFaqIndex === index}
                            onOpenChange={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                          >
                            <CollapsibleTrigger className="w-full p-4 md:p-6 text-left hover:bg-muted/50 transition-colors">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold pr-4 text-sm md:text-base">
                                  {faq.question}
                                </h3>
                                {openFaqIndex === index ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                )}
                              </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-4 md:px-6 pb-4 md:pb-6">
                              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                                {faq.answer}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 md:pt-8 border-t">
                  <Button variant="outline" asChild>
                    <Link to="/blogs">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      All Articles
                    </Link>
                  </Button>
                  <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Back to Top
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default BlogDetails;