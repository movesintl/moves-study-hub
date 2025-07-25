import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  Tag,
  ArrowRight,
  List,
  Share2,
  Heart,
  MessageCircle
} from 'lucide-react';

interface BlogDetailsSidebarProps {
  blog: any;
  relatedBlogs: any[];
}

export function BlogDetailsSidebar({ blog, relatedBlogs }: BlogDetailsSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Extract table of contents from blog content (simple implementation)
  const getTableOfContents = (content: string) => {
    if (!content) return [];
    
    const headings = content.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi) || [];
    return headings.map((heading, index) => {
      const level = parseInt(heading.match(/<h([2-4])/)?.[1] || '2');
      const text = heading.replace(/<[^>]*>/g, '');
      const id = `heading-${index}`;
      return { level, text, id };
    });
  };

  const tableOfContents = getTableOfContents(blog?.content || '');
  const categories = blog?.blog_category_assignments?.map((assignment: any) => assignment.blog_categories) || [];

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-80"} variant="sidebar">
      <SidebarContent>
        <ScrollArea className="h-full">
          {/* Blog Info */}
          {!isCollapsed && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-semibold">Article Info</SidebarGroupLabel>
              <SidebarGroupContent>
                <Card className="border-0 shadow-none">
                  <CardContent className="p-4 space-y-4">
                    {/* Categories */}
                    {categories.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Categories</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {categories.map((category: any) => (
                            <Badge key={category.id} variant="secondary" className="text-xs">
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Author & Date */}
                    <div className="space-y-2">
                      {blog?.author && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{blog.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(blog?.created_at || '')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    {/* Engagement */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-xs">24</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">8</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Share2 className="h-4 w-4 mr-1" />
                          <span className="text-xs">Share</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Table of Contents */}
          {!isCollapsed && tableOfContents.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-semibold">Table of Contents</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tableOfContents.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        onClick={() => scrollToHeading(item.id)}
                        className={`text-sm cursor-pointer ${
                          item.level === 3 ? 'ml-4' : item.level === 4 ? 'ml-8' : ''
                        }`}
                      >
                        <span className="truncate">{item.text}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Quick Actions */}
          {isCollapsed && (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton title="Article Info">
                      <BookOpen className="h-4 w-4" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton title="Table of Contents">
                      <List className="h-4 w-4" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton title="Related Articles">
                      <ArrowRight className="h-4 w-4" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Related Articles */}
          {!isCollapsed && relatedBlogs.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-semibold">Related Articles</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-3">
                  {relatedBlogs.map((relatedBlog) => (
                    <Card key={relatedBlog.id} className="border-0 shadow-none hover:bg-muted/50 transition-colors">
                      <CardContent className="p-3">
                        <Link to={`/blogs/${relatedBlog.slug || relatedBlog.id}`} className="block">
                          {relatedBlog.featured_image_url && (
                            <div className="relative h-20 mb-2 rounded overflow-hidden">
                              <img 
                                src={relatedBlog.featured_image_url} 
                                alt={relatedBlog.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <h4 className="text-sm font-medium line-clamp-2 mb-1">
                            {relatedBlog.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(relatedBlog.created_at)}</span>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Tags */}
          {!isCollapsed && blog?.tags && blog.tags.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-semibold">Tags</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="flex flex-wrap gap-1 p-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Newsletter Signup */}
          {!isCollapsed && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-semibold">Stay Updated</SidebarGroupLabel>
              <SidebarGroupContent>
                <Card className="border-0 shadow-none bg-primary/5">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Get the latest articles and insights delivered to your inbox.
                    </p>
                    <Button size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}