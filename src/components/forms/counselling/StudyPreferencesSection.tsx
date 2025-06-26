
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Globe } from 'lucide-react';

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
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="preferred_destination">Destination Country *</Label>
          <Select onValueChange={(value) => onInputChange('preferred_destination', value)}>
            <SelectTrigger className="h-12">
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-gray-400" />
                <SelectValue placeholder="Select destination" />
              </div>
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
          <Label htmlFor="study_level">Study Level</Label>
          <Select onValueChange={(value) => onInputChange('study_level', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select study level" />
            </SelectTrigger>
            <SelectContent>
              {studyLevels?.map((level) => (
                <SelectItem key={level.id} value={level.name}>
                  {level.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="course_interest">Course Interest</Label>
          <Input
            id="course_interest"
            value={formData.course_interest}
            onChange={(e) => onInputChange('course_interest', e.target.value)}
            placeholder="e.g., MBA, Engineering, IT"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="current_education_level">Current Education Level</Label>
          <Select onValueChange={(value) => onInputChange('current_education_level', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select current level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High School">High School</SelectItem>
              <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
              <SelectItem value="Master's Degree">Master's Degree</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
              <SelectItem value="Diploma">Diploma</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="english_test_score">English Test Score</Label>
          <Input
            id="english_test_score"
            value={formData.english_test_score}
            onChange={(e) => onInputChange('english_test_score', e.target.value)}
            placeholder="e.g., IELTS 7.0, TOEFL 100"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="work_experience">Work Experience</Label>
          <Input
            id="work_experience"
            value={formData.work_experience}
            onChange={(e) => onInputChange('work_experience', e.target.value)}
            placeholder="e.g., 2 years in IT"
            className="h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => onInputChange('message', e.target.value)}
          placeholder="Tell us more about your study goals..."
          className="min-h-[100px]"
        />
      </div>
    </>
  );
};
