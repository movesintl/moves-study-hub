import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { Save, User } from 'lucide-react';
import { SectionProps, NATIONALITIES, COUNTRIES } from './types';

export default function PersonalDetailsSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const [form, setForm] = useState({
    first_name: data.first_name || '',
    last_name: data.last_name || '',
    gender: data.gender || '',
    date_of_birth: data.date_of_birth || '',
    country_of_birth: data.country_of_birth || '',
    nationality: data.nationality || '',
    marital_status: data.marital_status || '',
    has_dependents: data.has_dependents ?? false,
    number_of_dependents: data.number_of_dependents ?? 0,
  });

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          1. Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>First Name (as passport) *</Label>
          <Input value={form.first_name} onChange={e => update('first_name', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Last Name (as passport) *</Label>
          <Input value={form.last_name} onChange={e => update('last_name', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Gender *</Label>
          <Select value={form.gender} onValueChange={v => update('gender', v)} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Date of Birth *</Label>
          <Input type="date" value={form.date_of_birth} onChange={e => update('date_of_birth', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Country of Birth *</Label>
          <Combobox options={COUNTRIES} value={form.country_of_birth} onSelect={v => update('country_of_birth', v)} placeholder="Select country..." searchPlaceholder="Type to search..." className="w-full rounded-xl" />
        </div>
        <div>
          <Label>Nationality *</Label>
          <Combobox options={NATIONALITIES} value={form.nationality} onSelect={v => update('nationality', v)} placeholder="Select nationality..." searchPlaceholder="Type to search..." className="w-full rounded-xl" />
        </div>
        <div>
          <Label>Marital Status *</Label>
          <Select value={form.marital_status} onValueChange={v => update('marital_status', v)} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Do you have dependents?</Label>
          <Select value={form.has_dependents ? 'yes' : 'no'} onValueChange={v => update('has_dependents', v === 'yes')} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {form.has_dependents && (
          <div>
            <Label>Number of Dependents</Label>
            <Input type="number" min={0} value={form.number_of_dependents} onChange={e => update('number_of_dependents', parseInt(e.target.value) || 0)} disabled={isLocked} className="rounded-xl" />
          </div>
        )}
        <div className="md:col-span-2 flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Personal Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
