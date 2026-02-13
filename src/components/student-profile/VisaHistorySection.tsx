import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Stamp } from 'lucide-react';
import { SectionProps } from './types';

export default function VisaHistorySection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const [form, setForm] = useState({
    applied_australian_visa: data.applied_australian_visa ?? false,
    refused_visa: data.refused_visa ?? false,
    deported: data.deported ?? false,
    current_australian_visa: data.current_australian_visa ?? false,
    visa_details: data.visa_details || '',
  });

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const anyYes = form.applied_australian_visa || form.refused_visa || form.deported || form.current_australian_visa;

  const YesNoField = ({ label, field }: { label: string; field: string }) => (
    <div>
      <Label>{label}</Label>
      <Select value={form[field as keyof typeof form] ? 'yes' : 'no'} onValueChange={v => update(field, v === 'yes')} disabled={isLocked}>
        <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-rose-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
            <Stamp className="h-4 w-4 text-rose-600" />
          </div>
          6. Visa History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <YesNoField label="Applied for Australian visa before?" field="applied_australian_visa" />
          <YesNoField label="Refused visa before? (Any country)" field="refused_visa" />
          <YesNoField label="Deported from any country?" field="deported" />
          <YesNoField label="Currently hold Australian visa?" field="current_australian_visa" />
        </div>
        {anyYes && (
          <div>
            <Label>Please provide details</Label>
            <Textarea value={form.visa_details} onChange={e => update('visa_details', e.target.value)} disabled={isLocked} className="rounded-xl" rows={4} placeholder="Provide details about your visa history..." />
          </div>
        )}
        <div className="flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Visa History'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
