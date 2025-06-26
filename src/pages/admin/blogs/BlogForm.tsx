
import React from 'react';
import { Button } from '@/components/ui/button';
import { BasicInfoSection } from './components/BasicInfoSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedImageSection } from './components/FeaturedImageSection';
import { FAQSection } from './components/FAQSection';
import { SEOSection } from './components/SEOSection';
import { useBlogForm } from './hooks/useBlogForm';

const BlogForm = () => {
  const {
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
    handleSubmit,
    navigate,
  } = useBlogForm();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection
          formData={formData}
          onTitleChange={handleTitleChange}
          onChange={handleChange}
        />

        <CategoriesSection
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />

        <FeaturedImageSection
          formData={formData}
          onChange={handleChange}
          onImageFileChange={handleImageFileChange}
        />

        <FAQSection
          faqs={faqs}
          onAddFAQ={addFAQ}
          onRemoveFAQ={removeFAQ}
          onUpdateFAQ={updateFAQ}
        />

        <SEOSection
          formData={formData}
          autoGenerateSlug={autoGenerateSlug}
          onSlugChange={handleSlugChange}
          onToggleAutoGenerateSlug={toggleAutoGenerateSlug}
          onChange={handleChange}
        />

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
