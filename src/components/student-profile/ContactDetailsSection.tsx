import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Save, Phone } from 'lucide-react';
import { SectionProps, COUNTRIES } from './types';

export default function ContactDetailsSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const [form, setForm] = useState({
    phone: data.phone || '',
    alternate_phone: data.alternate_phone || '',
    street: data.street || '',
    city: data.city || '',
    state: data.state || '',
    postcode: data.postcode || '',
    country: data.country || '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-sky-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
            <Phone className="h-4 w-4 text-sky-600" />
          </div>
          2. Contact Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Email (read-only)</Label>
          <Input value={data.email || ''} disabled className="rounded-xl bg-muted" />
        </div>
        <div>
          <Label>Phone Number *</Label>
          <Input value={form.phone} onChange={e => update('phone', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Alternate Phone</Label>
          <Input value={form.alternate_phone} onChange={e => update('alternate_phone', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div className="md:col-span-2"><Label className="text-muted-foreground text-xs uppercase tracking-wider">Current Address</Label></div>
        <div className="md:col-span-2">
          <Label>Street *</Label>
          <Input value={form.street} onChange={e => update('street', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>City *</Label>
          <Input value={form.city} onChange={e => update('city', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>State</Label>
          <Input value={form.state} onChange={e => update('state', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Postcode</Label>
          <Input value={form.postcode} onChange={e => update('postcode', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Country *</Label>
          <Combobox options={COUNTRIES} value={form.country} onSelect={v => update('country', v)} placeholder="Select country..." searchPlaceholder="Type to search..." className="w-full rounded-xl" />
        </div>
        <div className="md:col-span-2 flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Contact Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
