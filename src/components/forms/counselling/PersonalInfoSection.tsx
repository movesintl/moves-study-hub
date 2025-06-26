
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Phone, Mail, User } from 'lucide-react';

interface PersonalInfoSectionProps {
  formData: {
    student_name: string;
    student_email: string;
    student_phone: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
            First name*
          </Label>
          <Input
            id="first_name"
            value={formData.student_name.split(' ')[0] || ''}
            onChange={(e) => {
              const lastName = formData.student_name.split(' ').slice(1).join(' ');
              onInputChange('student_name', `${e.target.value} ${lastName}`.trim());
            }}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
            placeholder=""
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
            Last name*
          </Label>
          <Input
            id="last_name"
            value={formData.student_name.split(' ').slice(1).join(' ') || ''}
            onChange={(e) => {
              const firstName = formData.student_name.split(' ')[0] || '';
              onInputChange('student_name', `${firstName} ${e.target.value}`.trim());
            }}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
            placeholder=""
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="student_email" className="text-sm font-medium text-gray-700">
          Email address*
        </Label>
        <Input
          id="student_email"
          type="email"
          value={formData.student_email}
          onChange={(e) => onInputChange('student_email', e.target.value)}
          required
          className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
          placeholder=""
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="student_phone" className="text-sm font-medium text-gray-700">
          Mobile number*
        </Label>
        <div className="flex gap-2">
          <div className="w-20">
            <Input
              value="+61 AU"
              readOnly
              className="h-10 border-gray-200 bg-gray-50 text-center rounded-lg font-medium text-xs"
            />
          </div>
          <Input
            id="student_phone"
            type="tel"
            value={formData.student_phone}
            onChange={(e) => onInputChange('student_phone', e.target.value)}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg flex-1"
            placeholder=""
          />
        </div>
      </div>
    </>
  );
};
