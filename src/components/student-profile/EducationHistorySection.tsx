import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import { Save, GraduationCap, Plus, Trash2, Upload, FileText, X } from 'lucide-react';
import { SectionProps, EducationEntry, COUNTRIES } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const emptyEntry = (): EducationEntry => ({
  id: crypto.randomUUID(),
  qualification_level: '',
  course_name: '',
  institution_name: '',
  country: '',
  start_date: '',
  end_date: '',
  completed: false,
  certificate_url: '',
});

export default function EducationHistorySection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const { toast } = useToast();
  const [entries, setEntries] = useState<EducationEntry[]>(
    (data.education_history && data.education_history.length > 0) ? data.education_history : [emptyEntry()]
  );
  const [uploading, setUploading] = useState<string | null>(null);

  const updateEntry = (id: string, field: string, value: any) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addEntry = () => setEntries(prev => [...prev, emptyEntry()]);
  const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id));

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

  const handleUpload = async (entryId: string, file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast({ title: 'File too large', description: 'Maximum file size is 2 MB.', variant: 'destructive' });
      return;
    }
    setUploading(entryId);
    const path = `student-profiles/${data.user_id}/education-${entryId}-${file.name}`;
    const { data: uploaded, error } = await supabase.storage.from('media').upload(path, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } else {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(uploaded.path);
      updateEntry(entryId, 'certificate_url', publicUrl);
    }
    setUploading(null);
  };

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-emerald-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-emerald-600" />
          </div>
          4. Education History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {entries.map((entry, idx) => (
          <div key={entry.id} className="border rounded-xl p-4 space-y-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Education #{idx + 1}</span>
              {entries.length > 1 && !isLocked && (
                <Button variant="ghost" size="sm" onClick={() => removeEntry(entry.id)} className="text-destructive h-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Qualification Level</Label>
                <Select value={entry.qualification_level} onValueChange={v => updateEntry(entry.id, 'qualification_level', v)} disabled={isLocked}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Course Name</Label>
                <Input value={entry.course_name} onChange={e => updateEntry(entry.id, 'course_name', e.target.value)} disabled={isLocked} className="rounded-xl" />
              </div>
              <div>
                <Label>Institution Name</Label>
                <Input value={entry.institution_name} onChange={e => updateEntry(entry.id, 'institution_name', e.target.value)} disabled={isLocked} className="rounded-xl" />
              </div>
              <div>
                <Label>Country</Label>
                <Combobox options={COUNTRIES} value={entry.country} onSelect={v => updateEntry(entry.id, 'country', v)} placeholder="Select country..." className="w-full rounded-xl" />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input type="date" value={entry.start_date} onChange={e => updateEntry(entry.id, 'start_date', e.target.value)} disabled={isLocked} className="rounded-xl" />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" value={entry.end_date} onChange={e => updateEntry(entry.id, 'end_date', e.target.value)} disabled={isLocked} className="rounded-xl" />
              </div>
              <div>
                <Label>Completed?</Label>
                <Select value={entry.completed ? 'yes' : 'no'} onValueChange={v => updateEntry(entry.id, 'completed', v === 'yes')} disabled={isLocked}>
                  <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Certificate / Transcript</Label>
                {entry.certificate_url ? (
                  <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-xl text-sm">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <a href={entry.certificate_url} target="_blank" rel="noopener noreferrer" className="truncate text-primary underline flex-1">View file</a>
                    {!isLocked && <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateEntry(entry.id, 'certificate_url', '')}><X className="h-3 w-3" /></Button>}
                  </div>
                ) : (
                  <label className={`flex items-center justify-center gap-2 mt-1 p-3 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 transition ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{uploading === entry.id ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => e.target.files?.[0] && handleUpload(entry.id, e.target.files[0])} disabled={isLocked || uploading === entry.id} />
                  </label>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          {!isLocked && (
            <Button variant="outline" onClick={addEntry} className="rounded-xl gap-2">
              <Plus className="h-4 w-4" /> Add Education
            </Button>
          )}
          <Button onClick={() => onSave({ education_history: entries } as any)} disabled={isLocked || isSaving} className="rounded-xl gap-2 ml-auto">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Education History'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
