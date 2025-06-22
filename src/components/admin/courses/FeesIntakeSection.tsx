
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface FeesIntakeSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const FeesIntakeSection = ({ formData, setFormData }: FeesIntakeSectionProps) => {
  const handleIntakeDatesChange = (value: string) => {
    const dates = value.split(',').map(date => date.trim()).filter(date => date);
    setFormData({ ...formData, intake_dates: dates });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fees & Intake</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AUD">AUD</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="NZD">NZD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tuition_fee_min">Minimum Fee</Label>
            <Input
              id="tuition_fee_min"
              type="number"
              value={formData.tuition_fee_min}
              onChange={(e) => setFormData({ ...formData, tuition_fee_min: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tuition_fee_max">Maximum Fee</Label>
            <Input
              id="tuition_fee_max"
              type="number"
              value={formData.tuition_fee_max}
              onChange={(e) => setFormData({ ...formData, tuition_fee_max: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="intake_dates">Intake Dates (comma-separated)</Label>
          <Input
            id="intake_dates"
            value={formData.intake_dates.join(', ')}
            onChange={(e) => handleIntakeDatesChange(e.target.value)}
            placeholder="February, July, November"
          />
        </div>
      </CardContent>
    </Card>
  );
};
