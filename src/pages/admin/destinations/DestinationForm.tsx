
import React from 'react';
import { Button } from '@/components/ui/button';
import BasicInfoSection from '@/components/admin/destinations/BasicInfoSection';
import WhyStudyPointsSection from '@/components/admin/destinations/WhyStudyPointsSection';
import JobMarketPointsSection from '@/components/admin/destinations/JobMarketPointsSection';
import AdditionalInfoSection from '@/components/admin/destinations/AdditionalInfoSection';
import ContentSection from '@/components/admin/destinations/ContentSection';
import CostOfLivingSection from '@/components/admin/destinations/CostOfLivingSection';
import FAQSection from '@/components/admin/destinations/FAQSection';
import { useDestinationForm } from '@/hooks/useDestinationForm';

const DestinationForm = () => {
  const {
    formData,
    loading,
    isEditing,
    handleSubmit,
    handleChange,
    handleImageChange,
    handleRichTextChange,
    addWhyStudyPoint,
    removeWhyStudyPoint,
    updateWhyStudyPoint,
    addJobMarketPoint,
    removeJobMarketPoint,
    updateJobMarketPoint,
    addFAQ,
    removeFAQ,
    updateFAQ,
    navigate,
  } = useDestinationForm();

  // Parse cost of living data from string to array
  const costOfLivingData = React.useMemo(() => {
    if (!formData.cost_of_living_info) return [];
    try {
      return JSON.parse(formData.cost_of_living_info);
    } catch {
      return [];
    }
  }, [formData.cost_of_living_info]);

  const handleCostOfLivingChange = (data: { category: string; amount: string; }[]) => {
    handleRichTextChange('cost_of_living_info', JSON.stringify(data));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? 'Edit Destination' : 'Add New Destination'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection
          formData={formData}
          onChange={handleChange}
          onImageChange={handleImageChange}
        />

        <WhyStudyPointsSection
          destinationName={formData.name}
          points={formData.why_study_points}
          onAddPoint={addWhyStudyPoint}
          onRemovePoint={removeWhyStudyPoint}
          onUpdatePoint={updateWhyStudyPoint}
        />

        <JobMarketPointsSection
          points={formData.job_market_points}
          onAddPoint={addJobMarketPoint}
          onRemovePoint={removeJobMarketPoint}
          onUpdatePoint={updateJobMarketPoint}
        />

        <AdditionalInfoSection
          formData={formData}
          onChange={handleChange}
        />

        <ContentSection
          formData={formData}
          onRichTextChange={handleRichTextChange}
        />

        <CostOfLivingSection
          costOfLivingData={costOfLivingData}
          onCostOfLivingChange={handleCostOfLivingChange}
        />

        <FAQSection
          faqs={formData.faqs}
          onAddFAQ={addFAQ}
          onRemoveFAQ={removeFAQ}
          onUpdateFAQ={updateFAQ}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update Destination' : 'Create Destination')}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/destinations')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
