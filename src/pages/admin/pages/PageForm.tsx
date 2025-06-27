
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePageForm } from './hooks/usePageForm';
import HeroSection from './components/HeroSection';
import MainContentSection from './components/MainContentSection';
import BodyContentSection from './components/BodyContentSection';
import FAQSection from './components/FAQSection';
import SettingsSection from './components/SettingsSection';
import LegacyContentSection from './components/LegacyContentSection';
import SEOSection from './components/SEOSection';

const PageForm = () => {
  const {
    formData,
    setFormData,
    autoGenerateSlug,
    setAutoGenerateSlug,
    loading,
    isLoading,
    isEditing,
    blogCategories,
    handleSubmit,
    generateSlug,
    navigate,
  } = usePageForm();

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

  const handleFormDataChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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

  if (isLoading) {
    return <div className="p-8">Loading page...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Page' : 'Create New Page'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <HeroSection
          formData={formData}
          autoGenerateSlug={autoGenerateSlug}
          onTitleChange={handleTitleChange}
          onSlugChange={handleSlugChange}
          onToggleAutoSlug={toggleAutoGenerateSlug}
          onFormDataChange={handleFormDataChange}
        />

        <MainContentSection
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onChange={handleChange}
        />

        <BodyContentSection
          value={formData.body_content}
          onChange={(value) => handleFormDataChange('body_content', value)}
        />

        <FAQSection
          faqs={formData.faqs}
          onAddFaq={addFaq}
          onRemoveFaq={removeFaq}
          onUpdateFaq={updateFaq}
        />

        <SettingsSection
          formData={formData}
          blogCategories={blogCategories}
          onFormDataChange={handleFormDataChange}
        />

        <LegacyContentSection
          value={formData.content}
          onChange={handleChange}
        />

        <SEOSection
          formData={formData}
          onChange={handleChange}
        />

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
