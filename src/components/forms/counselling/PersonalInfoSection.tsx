
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Mail, Phone } from 'lucide-react';

interface PersonalInfoSectionProps {
  formData: {
    student_name: string;
    student_email: string;
    student_phone: string;
  };
  onInputChange: (field: string, value: string) => void;
  isEmailDisabled?: boolean;
}

const PersonalInfoSection = ({ formData, onInputChange, isEmailDisabled }: PersonalInfoSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="student_name">Full Name *</Label>
        <Input
          id="student_name"
          value={formData.student_name}
          onChange={(e) => onInputChange('student_name', e.target.value)}
          required
          className="h-12"
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="student_email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="student_email"
              type="email"
              value={formData.student_email}
              onChange={(e) => onInputChange('student_email', e.target.value)}
              required
              className="pl-10 h-12"
              placeholder="your.email@example.com"
              disabled={isEmailDisabled}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="student_phone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="student_phone"
              type="tel"
              value={formData.student_phone}
              onChange={(e) => onInputChange('student_phone', e.target.value)}
              required
              className="pl-10 h-12"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoSection;
