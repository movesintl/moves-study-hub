import { supabase } from '@/integrations/supabase/client';
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 py-8">
  {/* Header */}
  <div className="flex justify-between items-center mb-10">
    <div>
      <h1 className="text-3xl font-bold text-primary mb-2">Latest Updates</h1>
      <p className="text-primary/60">Explore our latest insights on smart textile technology, industry trends, and innovation.</p>
    </div>
    <a href="/blogs" className="flex gap-2 border px-4 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition">
      View All Posts <span><ArrowRight className='w-4 h-4 mt-0.5'/></span>
    </a>
  </div>

  {/* Grid Layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
    {blogs.map((blog) => (
      <div key={blog.id} className="bg-white flex flex-col justify-between rounded-lg curor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full" >
        <div className="relative h-48">
          <img
            src={blog.featured_image_url }
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-3 left-3">
            <span className="bg-white text-xs font-medium text-gray-800 px-2 py-1 rounded-full shadow">
              {getCategoryName(blog.category_id)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-1">{formatDate(blog.created_at)}</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.content}
          </p>
          <a href={`/blogs/${blog.slug}`} className="text-sm font-medium text-primary hover:underline">
           <button className="group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold">
                 <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:scale-[100.8]"></div>
                   <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                     Read More
                   </span>
                 </div>
                 <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                   <span>Read More</span>
                   <ArrowRight />
                 </div>
               </button>
          </a>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default BlogsHomePage;