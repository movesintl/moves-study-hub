import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FAQItem {
  question: string;
  answer: string;
}

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    featured_image_url: '',
    featured_image_alt: '',
    tags: '',
    published: false,
    meta_title: '',
    meta_description: '',
    focus_keywords: '',
    slug: '',
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch blog categories
  const { data: categories } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch existing blog data if editing
  const { data: blog } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          blog_category_assignments (
            category_id
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        author: blog.author || '',
        featured_image_url: blog.featured_image_url || '',
        featured_image_alt: blog.featured_image_alt || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        published: blog.published || false,
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        focus_keywords: blog.focus_keywords ? blog.focus_keywords.join(', ') : '',
        slug: blog.slug || '',
      });

      // Set selected categories
      if (blog.blog_category_assignments) {
        setSelectedCategories(blog.blog_category_assignments.map((assignment: any) => assignment.category_id));
      }

      // Set FAQs - properly handle the Json type conversion
      if (blog.faqs && Array.isArray(blog.faqs)) {
        setFaqs(blog.faqs as unknown as FAQItem[]);
      } else {
        setFaqs([]);
      }
    }
  }, [blog]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const autoSlug = generateSlug(title);
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || autoSlug // Only auto-generate if slug is empty
    }));
  };

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    // For now, we'll use a placeholder URL since storage isn't set up
    // In a real implementation, you'd upload to Supabase storage
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, featured_image_url: imageUrl }));
    
    toast({
      title: "Image uploaded",
      description: "Featured image has been set",
    });
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  const addFAQ = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare FAQ data as Json compatible format
      const faqsJson = faqs.filter(faq => faq.question.trim() && faq.answer.trim());
      
      const blogData = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        featured_image_url: formData.featured_image_url,
        featured_image_alt: formData.featured_image_alt,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        published: formData.published,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        focus_keywords: formData.focus_keywords ? formData.focus_keywords.split(',').map(kw => kw.trim()).filter(Boolean) : [],
        slug: formData.slug || generateSlug(formData.title),
        faqs: faqsJson as any, // Cast to any to satisfy Json type
      };

      let blogId = id;

      if (isEditing) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('blogs')
          .insert([blogData])
          .select()
          .single();

        if (error) throw error;
        blogId = data.id;
      }

      // Handle category assignments
      if (blogId) {
        // Remove existing category assignments
        await supabase
          .from('blog_category_assignments')
          .delete()
          .eq('blog_id', blogId);

        // Add new category assignments
        if (selectedCategories.length > 0) {
          const assignments = selectedCategories.map(categoryId => ({
            blog_id: blogId,
            category_id: categoryId,
          }));

          await supabase
            .from('blog_category_assignments')
            .insert(assignments);
        }
      }

      toast({
        title: "Success",
        description: `Blog post ${isEditing ? 'updated' : 'created'} successfully`,
      });

      navigate('/admin/blogs');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? 'update' : 'create'} blog post`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
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
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                placeholder="Write your blog post content here..."
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="study abroad, australia, education"
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="rounded"
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories?.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                  />
                  <Label htmlFor={category.id} className="text-sm font-normal">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Image */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Upload Image</Label>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Choose Image
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                {formData.featured_image_url && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <ImageIcon className="h-4 w-4" />
                    Image selected
                  </div>
                )}
              </div>
            </div>

            {formData.featured_image_url && (
              <div className="space-y-2">
                <img
                  src={formData.featured_image_url}
                  alt="Featured image preview"
                  className="w-48 h-32 object-cover rounded-md border"
                />
                <div>
                  <Label htmlFor="featured_image_alt">Alt Text</Label>
                  <Input
                    id="featured_image_alt"
                    name="featured_image_alt"
                    value={formData.featured_image_alt}
                    onChange={handleChange}
                    placeholder="Describe the image for accessibility"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="featured_image_url">Or paste image URL</Label>
              <Input
                id="featured_image_url"
                name="featured_image_url"
                type="url"
                value={formData.featured_image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              FAQ Section
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFAQ}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add FAQ
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Add FAQ items to provide additional information on the blog page.
              </p>
            ) : (
              faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">FAQ {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFAQ(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                      placeholder="Enter the question"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Answer</Label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                      placeholder="Enter the answer"
                      rows={3}
                      className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <p className="text-sm text-gray-600">
              Optional fields to improve search engine visibility
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="slug">Custom URL Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="custom-url-slug"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Auto-generated from title. Edit to customize.
              </p>
            </div>

            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                placeholder="SEO optimized title"
                className="mt-1"
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 50-60 characters
              </p>
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <textarea
                id="meta_description"
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                placeholder="Brief description for search results"
                rows={3}
                maxLength={160}
                className="mt-1 w-full px-3 py-2 border border-input rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 150-160 characters
              </p>
            </div>

            <div>
              <Label htmlFor="focus_keywords">Focus Keywords</Label>
              <Input
                id="focus_keywords"
                name="focus_keywords"
                value={formData.focus_keywords}
                onChange={handleChange}
                placeholder="keyword1, keyword2, keyword3"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Comma-separated keywords for SEO targeting
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update Blog Post' : 'Create Blog Post')}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/blogs')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
