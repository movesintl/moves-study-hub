import { supabase } from '@/integrations/supabase/client';
import React, { useState, useEffect } from 'react';

const BlogsHomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, content, featured_image_url, author, category_id, tags, published, slug, created_at')
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching blogs:', error);
        } else {
          setBlogs(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId) => {
    const categoryMap = {
      1: 'Study in Australia',
      2: 'Visa Information',
      3: 'University Guide',
    };
    return categoryMap[categoryId] || 'Study in Australia';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">Our Blogs</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Split blogs into two columns
  const leftColumnBlogs = blogs.slice(0, 3); // First 3 blogs for left column
  const rightColumnBlogs = blogs.slice(3, 6); // Next 3 blogs for right column

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Blogs</h1>
        <p className="text-gray-600">Latest updates and information for students</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {leftColumnBlogs.map((blog, index) => (
            <div key={blog.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${index === 0 ? 'mb-4' : ''}`}>
              {/* Featured Blog (First in each column) */}
              {index === 0 ? (
                <>
                  <div className="relative h-48 bg-gradient-to-br from-blue-200 to-orange-200">
                    <img 
                      src={blog.featured_image_url || '/api/placeholder/800/450'} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/800/450';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-orange-500/25"></div>
                    <div className="absolute top-3 left-3">
                      <div className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                        {getCategoryName(blog.category_id)}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {blog.content}...
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>By {blog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Smaller Blog Items - Using PopularCourses styling */
                <div className="flex items-start h-32 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-32 h-full flex-shrink-0 bg-gradient-to-br from-blue-100 to-orange-100">
                    <img 
                      src={blog.featured_image_url || '/api/placeholder/300/225'} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/300/225';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-orange-400/15"></div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col h-full">
                    <div className="mb-1">
                      <span className="text-xs font-medium text-blue-600">
                        {getCategoryName(blog.category_id)}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    <div className="mt-auto">
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{blog.author}</span>
                        <span className="mx-1">•</span>
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {rightColumnBlogs.map((blog, index) => (
            <div key={blog.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${index === 0 ? 'mb-4' : ''}`}>
              {/* Featured Blog (First in each column) */}
              {index === 0 ? (
                <>
                  <div className="relative h-48 bg-gradient-to-br from-blue-200 to-orange-200">
                    <img 
                      src={blog.featured_image_url || '/api/placeholder/800/450'} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/800/450';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-orange-500/25"></div>
                    <div className="absolute top-3 left-3">
                      <div className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                        {getCategoryName(blog.category_id)}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {blog.content}...
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>By {blog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Smaller Blog Items - Using PopularCourses styling */
                <div className="flex items-start h-32 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-32 h-full flex-shrink-0 bg-gradient-to-br from-blue-100 to-orange-100">
                    <img 
                      src={blog.featured_image_url || '/api/placeholder/300/225'} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/300/225';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-orange-400/15"></div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col h-full">
                    <div className="mb-1">
                      <span className="text-xs font-medium text-blue-600">
                        {getCategoryName(blog.category_id)}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                    <div className="mt-auto">
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{blog.author}</span>
                        <span className="mx-1">•</span>
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsHomePage;