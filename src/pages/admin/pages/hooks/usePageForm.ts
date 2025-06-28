
import React from 'react';
import { usePageData } from './usePageData';
import { usePageFormState } from './usePageFormState';
import { usePageSubmit } from './usePageSubmit';

export const usePageForm = () => {
  const { page, isLoading, isEditing, blogCategories } = usePageData();
  const {
    formData,
    setFormData,
    autoGenerateSlug,
    setAutoGenerateSlug,
    loading,
    setLoading,
    initializeFormData,
    generateSlug,
    toggleAutoGenerateSlug,
  } = usePageFormState();
  const { handleSubmit: submitForm, navigate } = usePageSubmit();

  React.useEffect(() => {
    if (page) {
      initializeFormData(page);
    }
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData, setLoading);
  };

  return {
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
    toggleAutoGenerateSlug,
  };
};
