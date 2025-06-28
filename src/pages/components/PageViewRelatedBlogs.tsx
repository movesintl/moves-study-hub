
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogData {
  id: string;
  title: string;
  slug: string;
  featured_image_url?: string;
  meta_description?: string;
  created_at: string;
}

interface PageViewRelatedBlogsProps {
  relatedBlogs: BlogData[];
}

const PageViewRelatedBlogs = ({ relatedBlogs }: PageViewRelatedBlogsProps) => {
  if (!relatedBlogs || relatedBlogs.length === 0) {
    return null;
  }

  return (
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
  );
};

export default PageViewRelatedBlogs;
