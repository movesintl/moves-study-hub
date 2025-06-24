
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { useCounsellingBookingForm } from '@/hooks/useCounsellingBookingForm';
import PersonalInfoSection from './counselling/PersonalInfoSection';
import StudyPreferencesSection from './counselling/StudyPreferencesSection';
import SchedulingSection from './counselling/SchedulingSection';
import { useAuth } from '@/contexts/AuthContext';

interface CounsellingBookingFormProps {
  defaultDestination?: string;
  onSuccess?: () => void;
}

const CounsellingBookingForm = ({ defaultDestination, onSuccess }: CounsellingBookingFormProps) => {
  const { user } = useAuth();
  const {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit,
  } = useCounsellingBookingForm(defaultDestination, onSuccess);

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Book Free Counselling
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoSection
            formData={formData}
            onInputChange={handleInputChange}
            isEmailDisabled={!!user?.email}
          />

          <StudyPreferencesSection
            formData={formData}
            onInputChange={handleInputChange}
            destinations={destinations}
            studyLevels={studyLevels}
          />

          <SchedulingSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-accent hover:bg-accent/90">
            {loading ? 'Submitting...' : 'Book Free Counselling'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CounsellingBookingForm;
