
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
    <section className="relative py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-r from-blue-300/30 to-indigo-300/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-xl">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm"></div>
            </div>
          </div>
          <Badge variant="outline" className="mb-6 bg-white/70 backdrop-blur-sm border-indigo-200/50">Related Content</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Continue Your Journey
          </h2>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Discover more insights and stories that align with your interests
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedBlogs.map((blog, index) => (
            <article key={blog.id} className="group relative">
              {/* Card */}
              <div className="h-full bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                {/* Image */}
                {blog.featured_image_url && (
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={blog.featured_image_url} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-slate-700 shadow-lg">
                        Article {index + 1}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="p-8 space-y-6">
                  {/* Date */}
                  <div className="flex items-center text-sm text-slate-500">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(blog.created_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                    <a href={`/blogs/${blog.slug}`} className="hover:underline">
                      {blog.title}
                    </a>
                  </h3>
                  
                  {/* Description */}
                  {blog.meta_description && (
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.meta_description}
                    </p>
                  )}
                  
                  {/* Read More Link */}
                  <div className="pt-2">
                    <a 
                      href={`/blogs/${blog.slug}`} 
                      className="inline-flex items-center text-indigo-600 font-semibold hover:text-purple-600 transition-all duration-300 group/link"
                    >
                      <span className="relative">
                        Read Full Article
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageViewRelatedBlogs;
