
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PageForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = React.useState({
    title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    published: false,
  });
  
  const [autoGenerateSlug, setAutoGenerateSlug] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  React.useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        published: page.published || false,
      });
      setAutoGenerateSlug(false);
    }
  }, [page]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: autoGenerateSlug ? generateSlug(newTitle) : prev.slug
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      slug: generateSlug(e.target.value)
    }));
  };

  const toggleAutoGenerateSlug = () => {
    setAutoGenerateSlug(!autoGenerateSlug);
    if (!autoGenerateSlug && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title)
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pageData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        published: formData.published,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('pages')
          .insert([pageData]);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Page created successfully',
        });
      }

      navigate('/admin/pages');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save page',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading page...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Page' : 'Create New Page'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  disabled={autoGenerateSlug}
                  className="flex-1"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="auto-slug"
                    checked={autoGenerateSlug}
                    onCheckedChange={toggleAutoGenerateSlug}
                  />
                  <Label htmlFor="auto-slug" className="text-sm">
                    Auto-generate
                  </Label>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                URL: /pages/{formData.slug || 'your-page-slug'}
              </p>
            </div>

            <div>
              <Label htmlFor="content">Page Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                className="mt-1"
                placeholder="Write your page content here..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="published"
                name="published"
                checked={formData.published}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, published: !!checked }))
                }
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                className="mt-1"
                placeholder="SEO title for search engines"
              />
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                rows={3}
                className="mt-1"
                placeholder="SEO description for search engines"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update Page' : 'Create Page')}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/pages')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;
