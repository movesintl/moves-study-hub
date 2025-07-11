import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useServiceForm } from '@/hooks/useServiceForm';
import BasicInfoSection from '@/components/admin/services/BasicInfoSection';
import FAQSection from '@/pages/admin/pages/components/FAQSection';
import HowItWorksSection from '@/components/admin/services/HowItWorksSection';

const ServiceForm = () => {
  const {
    formData,
    loading,
    isEditing,
    handleSubmit,
    updateFormData,
    navigate,
  } = useServiceForm();

  const addFaq = () => {
    updateFormData({
      faqs: [...formData.faqs, { question: '', answer: '' }]
    });
  };

  const removeFaq = (index: number) => {
    updateFormData({
      faqs: formData.faqs.filter((_, i) => i !== index)
    });
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    updateFormData({
      faqs: formData.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    });
  };

  const addHowItWorksBlurb = () => {
    updateFormData({
      how_it_works_blurbs: [...formData.how_it_works_blurbs, { icon: '', title: '', description: '' }]
    });
  };

  const removeHowItWorksBlurb = (index: number) => {
    updateFormData({
      how_it_works_blurbs: formData.how_it_works_blurbs.filter((_, i) => i !== index)
    });
  };

  const updateHowItWorksBlurb = (index: number, field: 'icon' | 'title' | 'description', value: string) => {
    updateFormData({
      how_it_works_blurbs: formData.how_it_works_blurbs.map((blurb, i) => 
        i === index ? { ...blurb, [field]: value } : blurb
      )
    });
  };


  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Service' : 'Add New Service'}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <BasicInfoSection
              formData={formData}
              onUpdate={updateFormData}
            />

            <HowItWorksSection
              title={formData.how_it_works_title}
              description={formData.how_it_works_description}
              featureImageUrl={formData.how_it_works_feature_image_url}
              blurbs={formData.how_it_works_blurbs}
              onTitleChange={(value) => updateFormData({ how_it_works_title: value })}
              onDescriptionChange={(value) => updateFormData({ how_it_works_description: value })}
              onFeatureImageChange={(value) => updateFormData({ how_it_works_feature_image_url: value })}
              onAddBlurb={addHowItWorksBlurb}
              onRemoveBlurb={removeHowItWorksBlurb}
              onUpdateBlurb={updateHowItWorksBlurb}
            />

            <FAQSection
              faqs={formData.faqs}
              onAddFaq={addFaq}
              onRemoveFaq={removeFaq}
              onUpdateFaq={updateFaq}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/services')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceForm;
