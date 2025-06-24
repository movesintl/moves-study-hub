
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, Calendar, User, ChevronDown, ChevronUp, Share2, BookOpen, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface FAQItem {
  question: string;
  answer: string;
}

const BlogDetails = () => {
  const { id } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const { data, error } = await supabase
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
      
      if (error) throw error;
      return data;
    }
  });

  // Calculate reading time (rough estimate: 200 words per minute)
  const getReadingTime = (content: string) => {
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.meta_description || blog?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-600">Blog post not found</h1>
          <Button asChild>
            <Link to="/blogs">Return to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const categories = blog.blog_category_assignments?.map((assignment: any) => assignment.blog_categories) || [];
  const faqs = (blog.faqs && Array.isArray(blog.faqs)) ? blog.faqs as FAQItem[] : [];
  const readingTime = blog.content ? getReadingTime(blog.content) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-6">
          <Button variant="ghost" asChild className="mb-4 hover:bg-gray-100">
            <Link to="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blogs" className="hover:text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Featured Image */}
            {blog.featured_image_url && (
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img 
                  src={blog.featured_image_url} 
                  alt={blog.featured_image_alt || blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category: any) => (
                      <Badge key={category.id} variant="secondary" className="bg-white/90 text-gray-800">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                    {blog.title}
                  </h1>
                </div>
              </div>
            )}

            {/* Article Header (for posts without featured image) */}
            {!blog.featured_image_url && (
              <div className="p-8 border-b">
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((category: any) => (
                    <Badge key={category.id} variant="secondary">
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  {blog.title}
                </h1>
              </div>
            )}

            {/* Article Meta */}
            <div className="px-8 py-6 bg-gray-50 border-b">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={sharePost}
                  className="flex items-center gap-2 ml-auto"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Tag className="h-4 w-4 text-gray-500" />
                  {blog.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="p-8">
              {blog.content ? (
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No content available for this post.</p>
                </div>
              )}
            </div>
          </article>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <Card className="mt-8">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 mt-2">
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
                      <CollapsibleTrigger className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 pr-4">
                            {faq.question}
                          </h3>
                          {openFaqIndex === index ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-6 pb-6">
                        <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                          {faq.answer}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Posts Section */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Continue Reading</h2>
              <Button variant="outline" asChild>
                <Link to="/blogs">View All Posts</Link>
              </Button>
            </div>
            <p className="text-gray-600 mt-2 mb-6">
              Discover more insights and resources on our blog
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
