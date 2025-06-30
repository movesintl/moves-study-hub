
import React from 'react';
import { PageFormData } from './usePageFormState';

export const usePageFAQHandlers = (
  setFormData: React.Dispatch<React.SetStateAction<PageFormData>>
) => {
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

  return {
    handleAddFaq,
    handleRemoveFaq,
    handleUpdateFaq,
  };
};
