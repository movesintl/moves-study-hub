
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BlogsList = () => {
  const { toast } = useToast();

  const { data: blogs, isLoading, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      refetch();
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('blogs')
      .update({ published: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update blog status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Blog ${!currentStatus ? 'published' : 'unpublished'} successfully`,
      });
      refetch();
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading blogs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link to="/admin/blogs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Blog Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs?.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {blog.featured_image_url && (
                        <img src={blog.featured_image_url} alt={blog.title} className="w-8 h-8 rounded object-cover" />
                      )}
                      <div className="max-w-xs truncate">{blog.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{blog.author || 'Anonymous'}</TableCell>
                  <TableCell>
                    <Button 
                      variant={blog.published ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePublished(blog.id, blog.published || false)}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/admin/blogs/${blog.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {blogs?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No blog posts found. Create your first blog post to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogsList;
