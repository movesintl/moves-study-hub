
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface InstitutionLocationSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  universities: any[];
  destinations: any[];
}

export const InstitutionLocationSection = ({ formData, setFormData, universities, destinations }: InstitutionLocationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Institution & Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="university_id">University</Label>
            <Select value={formData.university_id} onValueChange={(value) => {
              const selectedUni = universities.find(u => u.id === value);
              setFormData({ 
                ...formData, 
                university_id: value,
                university: selectedUni?.name || ''
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select university" />
              </SelectTrigger>
              <SelectContent>
                {universities.map((uni) => (
                  <SelectItem key={uni.id} value={uni.id}>{uni.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination_id">Destination</Label>
            <Select value={formData.destination_id} onValueChange={(value) => {
              const selectedDest = destinations.find(d => d.id === value);
              setFormData({ 
                ...formData, 
                destination_id: value,
                country: selectedDest?.name || ''
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest.id} value={dest.id}>{dest.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
