
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCourseForm } from '@/hooks/useCourseForm';
import { BasicInfoSection } from '@/components/admin/courses/BasicInfoSection';
import { InstitutionLocationSection } from '@/components/admin/courses/InstitutionLocationSection';
import { FeesIntakeSection } from '@/components/admin/courses/FeesIntakeSection';
import { AdditionalDetailsSection } from '@/components/admin/courses/AdditionalDetailsSection';
import { DataConsistencyChecker } from '@/components/admin/courses/DataConsistencyChecker';

const CourseForm = () => {
  const {
    formData,
    setFormData,
    isEditing,
    handleSubmit,
    navigate,
    universities,
    destinations,
    studyAreas,
    studyLevels
  } = useCourseForm();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Course' : 'Add New Course'}</h1>
        <p className="text-gray-600">Fill in the course details below</p>
      </div>

      {!isEditing && <DataConsistencyChecker />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection 
          formData={formData}
          setFormData={setFormData}
          studyAreas={studyAreas}
          studyLevels={studyLevels}
        />

        <InstitutionLocationSection 
          formData={formData}
          setFormData={setFormData}
          universities={universities}
          destinations={destinations}
        />

        <FeesIntakeSection 
          formData={formData}
          setFormData={setFormData}
        />

        <AdditionalDetailsSection 
          formData={formData}
          setFormData={setFormData}
        />

        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/courses')}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
