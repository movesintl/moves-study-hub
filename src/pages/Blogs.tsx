import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  User, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Clock,
  TrendingUp,
  Grid3X3,
  List,
  Sparkles,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');

  // Fetch blogs
  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          blog_category_assignments!inner(
            blog_categories(name, id)
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch blog categories
  const { data: categories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Filter and sort blogs
  const processedBlogs = React.useMemo(() => {
    let filtered = blogs?.filter(blog => {
      const categories = blog.blog_category_assignments?.map((assignment: any) => assignment.blog_categories) || [];
      
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             categories.some((cat: any) => cat.name === selectedCategory);
      
      return matchesSearch && matchesCategory;
    }) || [];

    // Sort blogs
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'popular') {
      // Mock popularity - in real app you'd have view counts
      filtered.sort(() => Math.random() - 0.5);
    }

    return filtered;
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (!content) return '';
    const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const getReadingTime = (content: string) => {
    if (!content) return 0;
    const words = content.split(' ').length;
    return Math.ceil(words / 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Discover Knowledge</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Insights & Stories
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Explore thoughtfully crafted articles, expert insights, and inspiring stories that inform, educate, and inspire.
            </p>
            
            {/* Enhanced Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search articles, topics, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 pr-6 py-6 text-lg bg-card/50 backdrop-blur border-border/50 focus:border-primary/50 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 mb-8">
        <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">Filter & Sort</span>
              <Badge variant="outline" className="ml-2">
                {blogsLoading ? 'Loading...' : `${processedBlogs.length} articles`}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-background/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Sort Options */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40 bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
              
              {/* View Mode Toggle */}
              <div className="flex bg-background/50 rounded-lg p-1 border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-9 px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-9 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 pb-20">
        {blogsLoading ? (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse bg-card/30 border-border/50">
                <div className="h-56 bg-muted/50 rounded-t-xl"></div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted/50 rounded w-20"></div>
                    <div className="h-6 bg-muted/50 rounded w-full"></div>
                    <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                    <div className="h-4 bg-muted/50 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : processedBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-20 w-20 text-muted-foreground/50 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-3">No articles found</h3>
              <p className="text-muted-foreground mb-8">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search criteria or browse all articles.' 
                  : 'Check back soon for new content.'}
              </p>
              <Button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="hover:scale-105 transition-transform"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {processedBlogs.map((blog, index) => {
              const categories = blog.blog_category_assignments?.map((assignment: any) => assignment.blog_categories) || [];
              const isFirstPost = index === 0;
              
              return (
                <Card 
                  key={blog.id} 
                  className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur border-border/50 overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  } ${isFirstPost && viewMode === 'grid' ? 'md:col-span-2 lg:col-span-3' : ''}`}
                >
                  {blog.featured_image_url && (
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-72 flex-shrink-0' : 
                      isFirstPost && viewMode === 'grid' ? 'h-72' : 'h-56'
                    }`}>
                      <img 
                        src={blog.featured_image_url} 
                        alt={blog.featured_image_alt || blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      
                      {/* Category Badge */}
                      {categories.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 text-foreground backdrop-blur">
                            {categories[0].name}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <CardContent className={`p-6 flex-1 ${isFirstPost && viewMode === 'grid' ? 'lg:p-8' : ''}`}>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      {blog.author && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{blog.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{getReadingTime(blog.content || '')} min read</span>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 ${
                      isFirstPost && viewMode === 'grid' ? 'text-3xl lg:text-4xl' : 'text-xl'
                    }`}>
                      {blog.title}
                    </h3>
                    
                    {/* Content Preview */}
                    {blog.content && (
                      <p className={`text-muted-foreground leading-relaxed mb-6 line-clamp-3 ${
                        isFirstPost && viewMode === 'grid' ? 'text-lg' : 'text-sm'
                      }`}>
                        {truncateContent(blog.content, isFirstPost && viewMode === 'grid' ? 200 : 120)}
                      </p>
                    )}
                    
                    {/* Read More Button */}
                    <Button 
                      variant="ghost" 
                      className="group-hover:text-primary group-hover:translate-x-1 transition-all p-0 h-auto font-semibold" 
                      asChild
                    >
                      <Link to={`/blogs/${blog.slug || blog.id}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest articles and insights delivered to your inbox. No spam, just quality content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Input 
                placeholder="Enter your email address" 
                className="bg-background/50 backdrop-blur border-border/50 focus:border-primary/50 rounded-xl"
              />
              <Button size="lg" className="rounded-xl hover:scale-105 transition-transform">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
