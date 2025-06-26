
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface StudyPreferencesSectionProps {
  formData: {
    preferred_destination: string;
    study_level: string;
    course_interest: string;
    current_education_level: string;
    english_test_score: string;
    work_experience: string;
    message: string;
  };
  destinations?: Array<{ id: string; name: string }>;
  studyLevels?: Array<{ id: string; name: string }>;
  onInputChange: (field: string, value: string) => void;
}

export const StudyPreferencesSection: React.FC<StudyPreferencesSectionProps> = ({
  formData,
  destinations,
  studyLevels,
  onInputChange,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferred_destination" className="text-sm font-medium text-gray-700">
            Your preferred study destination*
          </Label>
          <Select onValueChange={(value) => onInputChange('preferred_destination', value)}>
            <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {destinations?.map((destination) => (
                <SelectItem key={destination.id} value={destination.name}>
                  {destination.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="study_level" className="text-sm font-medium text-gray-700">
            When would you like to start?*
          </Label>
          <Select onValueChange={(value) => onInputChange('study_level', value)}>
            <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Immediately">Immediately</SelectItem>
              <SelectItem value="Within 3 months">Within 3 months</SelectItem>
              <SelectItem value="Within 6 months">Within 6 months</SelectItem>
              <SelectItem value="Within 12 months">Within 12 months</SelectItem>
              <SelectItem value="More than 12 months">More than 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="counselling_mode" className="text-sm font-medium text-gray-700">
            Preferred mode of counselling*
          </Label>
          <Select onValueChange={(value) => onInputChange('course_interest', value)}>
            <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Phone Call">Phone Call</SelectItem>
              <SelectItem value="Video Call">Video Call</SelectItem>
              <SelectItem value="In-Person">In-Person</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nearest_office" className="text-sm font-medium text-gray-700">
            Nearest Moves International Office*
          </Label>
          <Select onValueChange={(value) => onInputChange('current_education_level', value)}>
            <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sydney">Sydney</SelectItem>
              <SelectItem value="Melbourne">Melbourne</SelectItem>
              <SelectItem value="Brisbane">Brisbane</SelectItem>
              <SelectItem value="Perth">Perth</SelectItem>
              <SelectItem value="Adelaide">Adelaide</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
