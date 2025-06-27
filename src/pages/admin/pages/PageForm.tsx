
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus } from 'lucide-react';
import MediaSelector from '@/components/admin/MediaSelector';

interface PageData {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  feature_image_url?: string;
  content: string | null;
  page_description?: string;
  content_image_url?: string;
  content_video_url?: string;
  cta_text?: string;
  cta_button_text?: string;
  cta_button_link?: string;
  body_content?: string;
  faqs?: Array<{ question: string; answer: string }>;
  related_blog_category_id?: string;
  show_counselling_form?: boolean;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface BlogCategory {
  id: string;
  name: string;
}

const PageForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = React.useState({
    title: '',
    slug: '',
    subtitle: '',
    feature_image_url: '',
    content: '',
    page_description: '',
    content_image_url: '',
    content_video_url: '',
    cta_text: '',
    cta_button_text: '',
    cta_button_link: '',
    body_content: '',
    faqs: [] as Array<{ question: string; answer: string }>,
    related_blog_category_id: '',
    show_counselling_form: true,
    meta_title: '',
    meta_description: '',
    published: false,
  });
  
  const [autoGenerateSlug, setAutoGenerateSlug] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const { data: page, isLoading } = useQuery({
    queryKey: ['page', id],
    queryFn: async (): Promise<PageData | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Transform the data to ensure faqs is properly typed
      return {
        ...data,
        faqs: Array.isArray(data.faqs) ? data.faqs : []
      };
    },
    enabled: isEditing,
  });

  const { data: blogCategories = [] } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async (): Promise<BlogCategory[]> => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  React.useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        subtitle: page.subtitle || '',
        feature_image_url: page.feature_image_url || '',
        content: page.content || '',
        page_description: page.page_description || '',
        content_image_url: page.content_image_url || '',
        content_video_url: page.content_video_url || '',
        cta_text: page.cta_text || '',
        cta_button_text: page.cta_button_text || '',
        cta_button_link: page.cta_button_link || '',
        body_content: page.body_content || '',
        faqs: page.faqs || [],
        related_blog_category_id: page.related_blog_category_id || '',
        show_counselling_form: page.show_counselling_form ?? true,
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
    const newAutoGenerate = !autoGenerateSlug;
    setAutoGenerateSlug(newAutoGenerate);
    if (newAutoGenerate && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.title)
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pageData = {
        title: formData.title,
        slug: formData.slug,
        subtitle: formData.subtitle,
        feature_image_url: formData.feature_image_url,
        content: formData.content,
        page_description: formData.page_description,
        content_image_url: formData.content_image_url,
        content_video_url: formData.content_video_url,
        cta_text: formData.cta_text,
        cta_button_text: formData.cta_button_text,
        cta_button_link: formData.cta_button_link,
        body_content: formData.body_content,
        faqs: formData.faqs,
        related_blog_category_id: formData.related_blog_category_id || null,
        show_counselling_form: formData.show_counselling_form,
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
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
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
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="mt-1"
                placeholder="Page subtitle for hero section"
              />
            </div>

            <MediaSelector
              label="Featured Image"
              value={formData.feature_image_url}
              onChange={(value) => setFormData(prev => ({ ...prev, feature_image_url: value }))}
              placeholder="Featured image URL"
            />

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
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <Card>
          <CardHeader>
            <CardTitle>Main Content Area</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="page_description">Page Description (Rich Text)</Label>
              <Textarea
                id="page_description"
                name="page_description"
                value={formData.page_description}
                onChange={handleChange}
                rows={8}
                className="mt-1"
                placeholder="Main page description content..."
              />
            </div>

            <MediaSelector
              label="Content Image"
              value={formData.content_image_url}
              onChange={(value) => setFormData(prev => ({ ...prev, content_image_url: value }))}
              placeholder="Content image URL"
            />

            <div>
              <Label htmlFor="content_video_url">Video URL</Label>
              <Input
                id="content_video_url"
                name="content_video_url"
                value={formData.content_video_url}
                onChange={handleChange}
                className="mt-1"
                placeholder="YouTube/Vimeo video URL"
              />
            </div>

            <div>
              <Label htmlFor="cta_text">Call to Action Text</Label>
              <Textarea
                id="cta_text"
                name="cta_text"
                value={formData.cta_text}
                onChange={handleChange}
                rows={3}
                className="mt-1"
                placeholder="Call to action description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cta_button_text">CTA Button Text</Label>
                <Input
                  id="cta_button_text"
                  name="cta_button_text"
                  value={formData.cta_button_text}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Get Started"
                />
              </div>
              <div>
                <Label htmlFor="cta_button_link">CTA Button Link</Label>
                <Input
                  id="cta_button_link"
                  name="cta_button_link"
                  value={formData.cta_button_link}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="/contact or https://example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body Content */}
        <Card>
          <CardHeader>
            <CardTitle>Body Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="body_content">Body Content (Rich Text)</Label>
              <Textarea
                id="body_content"
                name="body_content"
                value={formData.body_content}
                onChange={handleChange}
                rows={10}
                className="mt-1"
                placeholder="Additional body content..."
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              FAQ Section (Optional)
              <Button type="button" onClick={addFaq} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add FAQ
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Label>FAQ {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFaq(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Label>Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) => updateFaq(index, 'question', e.target.value)}
                    placeholder="Enter question..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Answer</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                    placeholder="Enter answer..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}
            {formData.faqs.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No FAQs added yet. Click "Add FAQ" to create one.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Related Content & Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Related Content & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="related_blog_category">Related Blog Category</Label>
              <Select
                value={formData.related_blog_category_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, related_blog_category_id: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select blog category to show related posts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No related blogs</SelectItem>
                  {blogCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="show_counselling_form"
                checked={formData.show_counselling_form}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, show_counselling_form: !!checked }))
                }
              />
              <Label htmlFor="show_counselling_form">Show Free Counselling Form</Label>
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

        {/* Legacy Content (for backward compatibility) */}
        <Card>
          <CardHeader>
            <CardTitle>Legacy Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="content">Legacy Page Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="mt-1"
                placeholder="Legacy content field (for backward compatibility)..."
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
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
