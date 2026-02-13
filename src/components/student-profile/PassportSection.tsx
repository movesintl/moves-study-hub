import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Save, FileText, Upload, X } from 'lucide-react';
import { SectionProps, COUNTRIES } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function PassportSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    passport_number: data.passport_number || '',
    passport_expiry: data.passport_expiry || '',
    passport_issue_country: data.passport_issue_country || '',
    passport_bio_url: data.passport_bio_url || '',
    national_id_url: data.national_id_url || '',
    birth_certificate_url: data.birth_certificate_url || '',
  });
  const [uploading, setUploading] = useState<string | null>(null);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleUpload = async (field: string, file: File) => {
    setUploading(field);
    const path = `student-profiles/${data.user_id}/${field}-${Date.now()}-${file.name}`;
    const { data: uploaded, error } = await supabase.storage.from('media').upload(path, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } else {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(uploaded.path);
      update(field, publicUrl);
    }
    setUploading(null);
  };

  const FileUploadField = ({ label, field, required }: { label: string; field: string; required?: boolean }) => (
    <div>
      <Label>{label} {required && '*'}</Label>
      {form[field as keyof typeof form] ? (
        <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-xl text-sm">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          <a href={form[field as keyof typeof form]} target="_blank" rel="noopener noreferrer" className="truncate text-primary underline flex-1">View file</a>
          {!isLocked && <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => update(field, '')}><X className="h-3 w-3" /></Button>}
        </div>
      ) : (
        <label className={`flex items-center justify-center gap-2 mt-1 p-4 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 transition ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{uploading === field ? 'Uploading...' : 'Click to upload'}</span>
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => e.target.files?.[0] && handleUpload(field, e.target.files[0])} disabled={isLocked || uploading === field} />
        </label>
      )}
    </div>
  );

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-violet-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <FileText className="h-4 w-4 text-violet-600" />
          </div>
          3. Passport & Identity
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Passport Number *</Label>
          <Input value={form.passport_number} onChange={e => update('passport_number', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Passport Expiry Date *</Label>
          <Input type="date" value={form.passport_expiry} onChange={e => update('passport_expiry', e.target.value)} disabled={isLocked} className="rounded-xl" />
        </div>
        <div>
          <Label>Passport Issue Country *</Label>
          <Combobox options={COUNTRIES} value={form.passport_issue_country} onSelect={v => update('passport_issue_country', v)} placeholder="Select country..." searchPlaceholder="Type to search..." className="w-full rounded-xl" />
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileUploadField label="Passport Bio Page" field="passport_bio_url" required />
          <FileUploadField label="National ID" field="national_id_url" />
          <FileUploadField label="Birth Certificate" field="birth_certificate_url" />
        </div>
        <div className="md:col-span-2 flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Passport Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
