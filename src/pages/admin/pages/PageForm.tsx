
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageForm } from './hooks/usePageForm';
import HeroSection from './components/HeroSection';
import MainContentSection from './components/MainContentSection';
import BodyContentSection from './components/BodyContentSection';
import LegacyContentSection from './components/LegacyContentSection';
import FAQSection from './components/FAQSection';
import SettingsSection from './components/SettingsSection';
import SEOSection from './components/SEOSection';

const PageForm = () => {
  const {
    formData,
    setFormData,
    autoGenerateSlug,
    loading,
    isLoading,
    isEditing,
    blogCategories,
    handleSubmit,
    generateSlug,
    navigate,
    toggleAutoGenerateSlug,
  } = usePageForm();

  const handleFormDataChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug when title changes
    if (name === 'title' && autoGenerateSlug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Page' : 'Create New Page'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/pages')}
        >
          Back to Pages
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <HeroSection
          formData={formData}
          autoGenerateSlug={autoGenerateSlug}
          onChange={handleInputChange}
          onToggleAutoSlug={toggleAutoGenerateSlug}
        />

        {/* Main Content Section */}
        <MainContentSection
          formData={formData}
          onChange={handleInputChange}
        />

        {/* Body Content Section */}
        <BodyContentSection
          value={formData.body_content}
          onChange={(value) => handleFormDataChange('body_content', value)}
        />

        {/* Legacy Content Section */}
        <LegacyContentSection
          value={formData.content}
          onChange={handleInputChange}
        />

        {/* FAQ Section */}
        <FAQSection
          faqs={formData.faqs}
          onAddFaq={handleAddFaq}
          onRemoveFaq={handleRemoveFaq}
          onUpdateFaq={handleUpdateFaq}
        />

        {/* Settings Section */}
        <SettingsSection
          formData={formData}
          blogCategories={blogCategories}
          onFormDataChange={handleFormDataChange}
        />

        {/* SEO Section */}
        <SEOSection
          formData={formData}
          onChange={handleInputChange}
        />

        {/* Submit Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/pages')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEditing ? 'Update Page' : 'Create Page')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PageForm;
