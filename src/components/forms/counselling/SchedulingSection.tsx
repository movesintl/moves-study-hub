
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

interface SchedulingSectionProps {
  formData: {
    preferred_date: string;
    preferred_time: string;
    message: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const SchedulingSection = ({ formData, onInputChange }: SchedulingSectionProps) => {
  return (
    <>
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
          <Select 
            value={formData.preferred_time} 
            onValueChange={(value) => onInputChange('preferred_time', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
              <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => onInputChange('message', e.target.value)}
          placeholder="Tell us about your study goals and any specific questions"
          rows={4}
          className="resize-none"
        />
      </div>
    </>
  );
};

export default SchedulingSection;
