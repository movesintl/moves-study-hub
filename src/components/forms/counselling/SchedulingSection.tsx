
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface SchedulingSectionProps {
  formData: {
    preferred_date: string;
    preferred_time: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const SchedulingSection: React.FC<SchedulingSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="preferred_date">Preferred Date</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="preferred_date"
            type="date"
            value={formData.preferred_date}
            onChange={(e) => onInputChange('preferred_date', e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferred_time">Preferred Time</Label>
        <Select onValueChange={(value) => onInputChange('preferred_time', value)}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</SelectItem>
            <SelectItem value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</SelectItem>
            <SelectItem value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
