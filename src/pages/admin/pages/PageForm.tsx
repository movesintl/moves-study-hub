
import React from 'react';
import { usePageForm } from './hooks/usePageForm';
import { usePageFormHandlers } from './hooks/usePageFormHandlers';
import { usePageFAQHandlers } from './hooks/usePageFAQHandlers';
import { PageFormHeader } from './components/PageFormHeader';
import { PageFormSkeleton } from './components/PageFormSkeleton';
import { PageFormActions } from './components/PageFormActions';
import HeroSection from './components/HeroSection';
import MainContentSection from './components/MainContentSection';
import BodyContentSection from './components/BodyContentSection';
import LegacyContentSection from './components/LegacyContentSection';
import FAQSection from './components/FAQSection';
import SettingsSection from './components/SettingsSection';
import SEOSection from './components/SEOSection';
import { VisualBuilderSection } from './components/VisualBuilderSection';

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

  const {
    handleFormDataChange,
    handleInputChange,
    handleTitleChange,
    handleSlugChange,
    handleToggleVisualBuilder,
    handleVisualBuilderDataChange,
  } = usePageFormHandlers(formData, setFormData, autoGenerateSlug, generateSlug);

  const {
    handleAddFaq,
    handleRemoveFaq,
    handleUpdateFaq,
  } = usePageFAQHandlers(setFormData);

  const handleBackClick = () => navigate('/admin/pages');

  if (isLoading) {
    return <PageFormSkeleton />;
  }

  return (
    <div className="w-full space-y-6">
      <PageFormHeader 
        isEditing={isEditing}
        onBackClick={handleBackClick}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Always show Hero Section */}
        <HeroSection
          formData={formData}
          autoGenerateSlug={autoGenerateSlug}
          onTitleChange={handleTitleChange}
          onSlugChange={handleSlugChange}
          onToggleAutoSlug={toggleAutoGenerateSlug}
          onFormDataChange={handleFormDataChange}
        />

        <VisualBuilderSection
          visualBuilderEnabled={formData.visual_builder_enabled}
          visualBuilderData={formData.visual_builder_data}
          onToggleVisualBuilder={handleToggleVisualBuilder}
          onVisualBuilderDataChange={handleVisualBuilderDataChange}
        />

        {!formData.visual_builder_enabled && (
          <>
            <MainContentSection
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onChange={handleInputChange}
            />

            <BodyContentSection
              value={formData.body_content}
              onChange={(value) => handleFormDataChange('body_content', value)}
            />

            <LegacyContentSection
              value={formData.content}
              onChange={handleInputChange}
            />
          </>
        )}

        {/* Always show FAQ, Settings, and SEO sections */}
        <FAQSection
          faqs={formData.faqs}
          onAddFaq={handleAddFaq}
          onRemoveFaq={handleRemoveFaq}
          onUpdateFaq={handleUpdateFaq}
        />

        <SettingsSection
          formData={formData}
          blogCategories={blogCategories}
          onFormDataChange={handleFormDataChange}
        />

        <SEOSection
          formData={formData}
          onChange={handleInputChange}
        />

        <PageFormActions
          loading={loading}
          isEditing={isEditing}
          onCancel={handleBackClick}
        />
      </form>
    </div>
  );
};

export default PageForm;
