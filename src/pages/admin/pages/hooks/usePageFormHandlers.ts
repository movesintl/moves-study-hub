
import React from 'react';
import { PageFormData } from './usePageFormState';

export const usePageFormHandlers = (
  formData: PageFormData,
  setFormData: React.Dispatch<React.SetStateAction<PageFormData>>,
  autoGenerateSlug: boolean,
  generateSlug: (title: string) => string
) => {
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      title: value
    }));
    
    // Auto-generate slug when title changes
    if (autoGenerateSlug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      slug: value
    }));
  };

  const handleToggleVisualBuilder = (enabled: boolean) => {
    setFormData(prev => ({
      ...prev,
      visual_builder_enabled: enabled
    }));
  };

  const handleVisualBuilderDataChange = (data: string) => {
    setFormData(prev => ({
      ...prev,
      visual_builder_data: data
    }));
  };

  return {
    handleFormDataChange,
    handleInputChange,
    handleTitleChange,
    handleSlugChange,
    handleToggleVisualBuilder,
    handleVisualBuilderDataChange,
  };
};
