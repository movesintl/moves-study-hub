import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { Save, Wallet } from 'lucide-react';
import { SectionProps, COUNTRIES } from './types';

export default function FinancialSponsorSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const [form, setForm] = useState({
    financial_sponsor: data.financial_sponsor || '',
    sponsor_name: data.sponsor_name || '',
    sponsor_relationship: data.sponsor_relationship || '',
    sponsor_occupation: data.sponsor_occupation || '',
    sponsor_income: data.sponsor_income || '',
    sponsor_country: data.sponsor_country || '',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  const showSponsorDetails = form.financial_sponsor && form.financial_sponsor !== 'self';

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-amber-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-amber-600" />
          </div>
          8. Financial Sponsor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-sm">
          <Label>Who will fund your studies? *</Label>
          <Select value={form.financial_sponsor} onValueChange={v => update('financial_sponsor', v)} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select sponsor" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="self">Self</SelectItem>
              <SelectItem value="parents">Parents</SelectItem>
              <SelectItem value="spouse">Spouse</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {showSponsorDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Sponsor Full Name</Label>
              <Input value={form.sponsor_name} onChange={e => update('sponsor_name', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Relationship</Label>
              <Input value={form.sponsor_relationship} onChange={e => update('sponsor_relationship', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Occupation</Label>
              <Input value={form.sponsor_occupation} onChange={e => update('sponsor_occupation', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Annual Income</Label>
              <Input value={form.sponsor_income} onChange={e => update('sponsor_income', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Country</Label>
              <Combobox options={COUNTRIES} value={form.sponsor_country} onSelect={v => update('sponsor_country', v)} placeholder="Select country..." className="w-full rounded-xl" />
            </div>
          </div>
        )}
        <div className="flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Financial Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
