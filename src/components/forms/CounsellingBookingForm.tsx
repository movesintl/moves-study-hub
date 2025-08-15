
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { useCounsellingBookingForm } from '@/hooks/useCounsellingBookingForm';
import { PersonalInfoSection } from './counselling/PersonalInfoSection';
import { StudyPreferencesSection } from './counselling/StudyPreferencesSection';
import { SchedulingSection } from './counselling/SchedulingSection';
import { useAuth } from '@/contexts/AuthContext';

interface CounsellingBookingFormProps {
  defaultDestination?: string;
  onSuccess?: () => void;
}

const CounsellingBookingForm = ({ defaultDestination, onSuccess }: CounsellingBookingFormProps) => {
  const { user } = useAuth();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit,
  } = useCounsellingBookingForm(defaultDestination, onSuccess, recaptchaToken, recaptchaRef);

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 ease-out hover:ring-gray-300/50">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoSection
            formData={formData}
            onInputChange={handleInputChange}
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

          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfUk6UrAAAAAIoWzkz54uHyaR0cXY0H2DCQb7Nn"
              onChange={setRecaptchaToken}
              theme="light"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-lg bg-accent hover:bg-accent/90">
            {loading ? 'Submitting...' : 'Book Free Counselling'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CounsellingBookingForm;
