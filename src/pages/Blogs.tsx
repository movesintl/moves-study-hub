import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  User, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Clock,
  Eye,
  Heart,
  TrendingUp,
  Filter,
  Grid3X3,
  List,
  Star
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
          blog_categories:category_id(name)
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
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             blog.blog_categories?.name === selectedCategory;
      
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
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  const getReadingTime = (content: string) => {
    if (!content) return 0;
    const words = content.split(' ').length;
    return Math.ceil(words / 200);
  };

  // Featured blog (first blog)
  const featuredBlog = processedBlogs[0];
  const regularBlogs = processedBlogs.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Latest Insights & Stories</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Stories & Insights
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of carefully crafted articles, expert insights, and inspiring stories 
              that will keep you informed and engaged.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search articles, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur border-0 rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredBlog && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-2 mb-8">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Article</h2>
          </div>
          
          <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/80">
            <div className="grid lg:grid-cols-2 gap-0">
              {featuredBlog.featured_image_url && (
                <div className="relative h-80 lg:h-full overflow-hidden">
                  <img 
                    src={featuredBlog.featured_image_url} 
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {featuredBlog.blog_categories && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        {featuredBlog.blog_categories.name}
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  {featuredBlog.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{featuredBlog.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredBlog.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{getReadingTime(featuredBlog.content || '')} min read</span>
                  </div>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                  {featuredBlog.title}
                </h3>
                
                {featuredBlog.content && (
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {truncateContent(featuredBlog.content.replace(/<[^>]*>/g, ''), 200)}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>2.1k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>156 likes</span>
                    </div>
                  </div>
                  
                  <Button size="lg" className="group-hover:translate-x-1 transition-transform" asChild>
                    <Link to={`/blogs/${featuredBlog.slug || featuredBlog.id}`}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Filters & Controls */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">All Articles</h2>
            <p className="text-muted-foreground">
              {blogsLoading ? 'Loading...' : `${processedBlogs.length} article(s) found`}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 h-auto p-1">
                <TabsTrigger value="all" className="px-4 py-2">All</TabsTrigger>
                {categories?.slice(0, 3).map((category) => (
                  <TabsTrigger key={category.id} value={category.name} className="px-4 py-2">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            {/* Sort Options */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border rounded-lg bg-background"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </select>
            
            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid/List */}
      <section className="container mx-auto px-4 pb-16">
        {blogsLoading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : processedBlogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Check back later for new articles.'}
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {regularBlogs.map((blog) => (
              <Card key={blog.id} className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                viewMode === 'list' ? 'flex flex-row' : ''
              }`}>
                {blog.featured_image_url && (
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-48'
                  }`}>
                    <img 
                      src={blog.featured_image_url} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    {blog.blog_categories && (
                      <Badge variant="secondary" className="text-xs">
                        {blog.blog_categories.name}
                      </Badge>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(blog.created_at)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  {blog.content && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {truncateContent(blog.content.replace(/<[^>]*>/g, ''))}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {blog.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {blog.author}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getReadingTime(blog.content || '')} min
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group-hover:text-primary p-0" asChild>
                      <Link to={`/blogs/${blog.slug || blog.id}`}>
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest articles, insights, and exclusive content delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email address" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur"
            />
            <Button variant="secondary" size="lg" className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
