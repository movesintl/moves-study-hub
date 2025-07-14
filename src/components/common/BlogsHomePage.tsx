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
    // You might want to fetch categories separately or map them
    const categoryMap = {
      1: 'Study in Australia',
      2: 'Visa Information',
      3: 'University Guide',
      // Add more categories as needed
    };
    return categoryMap[categoryId] || 'Study in Australia';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Blogs</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Get first 2 blogs for featured section
  const featuredBlogs = blogs.slice(0, 2);
  // Get next 4 blogs for side section
  const sideBlogs = blogs.slice(2, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Blogs</h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Featured Blog Cards */}
        {featuredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Blog Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-200 to-orange-200">
              <img 
                src={blog.featured_image_url || '/api/placeholder/400/200'} 
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/api/placeholder/400/200';
                }}
              />
              {/* Overlay with Australia theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-orange-500/25"></div>
              <div className="absolute top-3 left-3">
                <div className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                  {getCategoryName(blog.category_id)}
                </div>
              </div>
            </div>
            
            {/* Blog Content */}
            <div className="p-4">
              <div className="mb-1">
                <span className="text-xs text-gray-500 font-medium">
                  {getCategoryName(blog.category_id)}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {blog.title}
              </h2>
              <div className="flex items-center text-xs text-gray-500">
                <span>{blog.author}</span>
                <span className="mx-2">-</span>
                <span>{formatDate(blog.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Blogs - Two Rows */}
      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideBlogs.slice(0, 2).map((blog) => (
            <div key={blog.id} className="flex bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              {/* Small Blog Image */}
              <div className="relative w-24 h-20 flex-shrink-0 bg-gradient-to-br from-blue-100 to-orange-100">
                <img 
                  src={blog.featured_image_url || '/api/placeholder/100/80'} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/api/placeholder/100/80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-orange-400/15"></div>
                <div className="absolute top-1 left-1">
                  <div className="bg-white px-1 py-0.5 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    {getCategoryName(blog.category_id)}
                  </div>
                </div>
              </div>
              
              {/* Small Blog Content */}
              <div className="p-3 flex-1">
                <div className="mb-1">
                  <span className="text-xs text-gray-500 font-medium">
                    {getCategoryName(blog.category_id)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{blog.author}</span>
                  <span className="mx-1">-</span>
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideBlogs.slice(2, 4).map((blog) => (
            <div key={blog.id} className="flex bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              {/* Small Blog Image */}
              <div className="relative w-24 h-20 flex-shrink-0 bg-gradient-to-br from-blue-100 to-orange-100">
                <img 
                  src={blog.featured_image_url || '/api/placeholder/100/80'} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/api/placeholder/100/80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 to-orange-400/15"></div>
                <div className="absolute top-1 left-1">
                  <div className="bg-white px-1 py-0.5 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    {getCategoryName(blog.category_id)}
                  </div>
                </div>
              </div>
              
              {/* Small Blog Content */}
              <div className="p-3 flex-1">
                <div className="mb-1">
                  <span className="text-xs text-gray-500 font-medium">
                    {getCategoryName(blog.category_id)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{blog.author}</span>
                  <span className="mx-1">-</span>
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsHomePage;