import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { Save, BookOpen } from 'lucide-react';
import { SectionProps, COUNTRIES } from './types';

export default function StudyPreferencesSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const [form, setForm] = useState({
    preferred_country: data.preferred_country || '',
    preferred_city: data.preferred_city || '',
    preferred_study_level: data.preferred_study_level || '',
    preferred_course: data.preferred_course || '',
    preferred_intake: data.preferred_intake || '',
    has_relatives_australia: data.has_relatives_australia ?? false,
    accommodation_preference: data.accommodation_preference || '',
  });

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-teal-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-teal-600" />
          </div>
          7. Study Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Preferred Country *</Label>
          <Combobox options={COUNTRIES} value={form.preferred_country} onSelect={v => update('preferred_country', v)} placeholder="Select country..." className="w-full rounded-xl" />
        </div>
        <div>
          <Label>Preferred City</Label>
          <Input value={form.preferred_city} onChange={e => update('preferred_city', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Preferred Study Level *</Label>
          <Select value={form.preferred_study_level} onValueChange={v => update('preferred_study_level', v)} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="bachelors">Bachelor's</SelectItem>
              <SelectItem value="masters">Master's</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Preferred Course / Field *</Label>
          <Input value={form.preferred_course} onChange={e => update('preferred_course', e.target.value)} disabled={isLocked} className="rounded-xl" placeholder="e.g. Computer Science" />
        </div>
        <div>
          <Label>Preferred Intake</Label>
          <Input value={form.preferred_intake} onChange={e => update('preferred_intake', e.target.value)} disabled={isLocked} className="rounded-xl" placeholder="e.g. February 2026" />
        </div>
        <div>
          <Label>Do you have relatives in Australia?</Label>
          <Select value={form.has_relatives_australia ? 'yes' : 'no'} onValueChange={v => update('has_relatives_australia', v === 'yes')} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Accommodation Preference</Label>
          <Select value={form.accommodation_preference} onValueChange={v => update('accommodation_preference', v)} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select preference" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="on_campus">On Campus</SelectItem>
              <SelectItem value="off_campus">Off Campus</SelectItem>
              <SelectItem value="with_relatives">With Relatives</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2 flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Study Preferences'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
