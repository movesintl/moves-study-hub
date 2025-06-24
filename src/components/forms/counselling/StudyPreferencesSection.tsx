
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen } from 'lucide-react';

interface StudyPreferencesSectionProps {
  formData: {
    preferred_destination: string;
    study_level: string;
    course_interest: string;
    current_education_level: string;
    english_test_score: string;
    work_experience: string;
  };
  onInputChange: (field: string, value: string) => void;
  destinations?: Array<{ id: string; name: string }>;
  studyLevels?: Array<{ id: string; name: string }>;
}

const StudyPreferencesSection = ({ 
  formData, 
  onInputChange, 
  destinations, 
  studyLevels 
}: StudyPreferencesSectionProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="preferred_destination">Preferred Destination *</Label>
          <Select 
            value={formData.preferred_destination} 
            onValueChange={(value) => onInputChange('preferred_destination', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select destination" />
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
          <Select 
            value={formData.study_level} 
            onValueChange={(value) => onInputChange('study_level', value)}
          >
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

      <div className="space-y-2">
        <Label htmlFor="course_interest">Course Interest</Label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="course_interest"
            value={formData.course_interest}
            onChange={(e) => onInputChange('course_interest', e.target.value)}
            className="pl-10 h-12"
            placeholder="e.g., MBA, Computer Science, Engineering"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="current_education_level">Current Education Level</Label>
          <Select 
            value={formData.current_education_level} 
            onValueChange={(value) => onInputChange('current_education_level', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select current level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="english_test_score">English Test Score</Label>
          <Input
            id="english_test_score"
            value={formData.english_test_score}
            onChange={(e) => onInputChange('english_test_score', e.target.value)}
            className="h-12"
            placeholder="e.g., IELTS 7.0, TOEFL 100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="work_experience">Work Experience</Label>
        <Input
          id="work_experience"
          value={formData.work_experience}
          onChange={(e) => onInputChange('work_experience', e.target.value)}
          className="h-12"
          placeholder="e.g., 2 years in IT industry"
        />
      </div>
    </>
  );
};

export default StudyPreferencesSection;
