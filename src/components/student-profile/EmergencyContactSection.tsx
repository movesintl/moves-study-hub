import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Save, ShieldAlert } from 'lucide-react';
import { SectionProps, COUNTRIES } from './types';

export default function EmergencyContactSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const [form, setForm] = useState({
    emergency_name: data.emergency_name || '',
    emergency_relationship: data.emergency_relationship || '',
    emergency_phone: data.emergency_phone || '',
    emergency_email: data.emergency_email || '',
    emergency_country: data.emergency_country || '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-indigo-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <ShieldAlert className="h-4 w-4 text-indigo-600" />
          </div>
          9. Emergency Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <Input value={form.emergency_name} onChange={e => update('emergency_name', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Relationship *</Label>
          <Input value={form.emergency_relationship} onChange={e => update('emergency_relationship', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Phone Number *</Label>
          <Input value={form.emergency_phone} onChange={e => update('emergency_phone', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Email *</Label>
          <Input type="email" value={form.emergency_email} onChange={e => update('emergency_email', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Country *</Label>
          <Combobox options={COUNTRIES} value={form.emergency_country} onSelect={v => update('emergency_country', v)} placeholder="Select country..." className="w-full rounded-xl" />
        </div>
        <div className="md:col-span-2 flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Emergency Contact'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
