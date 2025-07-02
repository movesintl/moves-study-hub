
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FAQItem {
  question: string;
  answer: string;
}

export const useBlogForm = () => {
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
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

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
      slug: autoGenerateSlug ? autoSlug : prev.slug
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, slug: e.target.value }));
  };

  const toggleAutoGenerateSlug = (checked: boolean) => {
    setAutoGenerateSlug(checked);
    if (checked && formData.title) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }));
    }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
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

  return {
    // State
    formData,
    selectedCategories,
    faqs,
    loading,
    autoGenerateSlug,
    isEditing,
    categories,
    // Handlers
    handleTitleChange,
    handleSlugChange,
    toggleAutoGenerateSlug,
    handleImageFileChange,
    addFAQ,
    removeFAQ,
    updateFAQ,
    handleCategoryChange,
    handleChange,
    handleContentChange,
    handleSubmit,
    navigate,
  };
};
