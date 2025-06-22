
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const BlogDetails = () => {
  const { id } = useParams();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          blog_categories:category_id(name)
        `)
        .eq('id', id)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Blog post not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        {blog.featured_image_url && (
          <div className="mb-8">
            <img 
              src={blog.featured_image_url} 
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {blog.blog_categories && (
              <Badge variant="secondary">
                {blog.blog_categories.name}
              </Badge>
            )}
            {blog.tags && blog.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold leading-tight">{blog.title}</h1>

          <div className="flex items-center gap-6 text-gray-600">
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            {blog.content ? (
              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            ) : (
              <p className="text-gray-500">No content available.</p>
            )}
          </CardContent>
        </Card>
      </article>
    </div>
  );
};

export default BlogDetails;
