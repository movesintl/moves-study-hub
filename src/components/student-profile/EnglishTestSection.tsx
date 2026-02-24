import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Languages, Upload, FileText, X } from 'lucide-react';
import { SectionProps } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function EnglishTestSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    english_test_taken: data.english_test_taken || '',
    english_test_date: data.english_test_date || '',
    english_overall_score: data.english_overall_score || '',
    english_listening: data.english_listening || '',
    english_reading: data.english_reading || '',
    english_writing: data.english_writing || '',
    english_speaking: data.english_speaking || '',
    english_trf_number: data.english_trf_number || '',
    english_result_url: data.english_result_url || '',
  });
  const [uploading, setUploading] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  const showScores = form.english_test_taken && form.english_test_taken !== 'not_yet';

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

  const handleUpload = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast({ title: 'File too large', description: 'Maximum file size is 2 MB.', variant: 'destructive' });
      return;
    }
    setUploading(true);
    const path = `student-profiles/${data.user_id}/english-result-${Date.now()}-${file.name}`;
    const { data: uploaded, error } = await supabase.storage.from('media').upload(path, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } else {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(uploaded.path);
      update('english_result_url', publicUrl);
    }
    setUploading(false);
  };

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-orange-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Languages className="h-4 w-4 text-orange-600" />
          </div>
          5. English Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-sm">
          <Label>Have you taken an English test? *</Label>
          <Select value={form.english_test_taken} onValueChange={v => update('english_test_taken', v)} disabled={isLocked}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select test type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ielts">IELTS</SelectItem>
              <SelectItem value="pte">PTE</SelectItem>
              <SelectItem value="toefl">TOEFL</SelectItem>
              <SelectItem value="duolingo">Duolingo</SelectItem>
              <SelectItem value="not_yet">Not yet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {showScores && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Test Date</Label>
              <Input type="date" value={form.english_test_date} onChange={e => update('english_test_date', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Overall Score</Label>
              <Input value={form.english_overall_score} onChange={e => update('english_overall_score', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Listening</Label>
              <Input value={form.english_listening} onChange={e => update('english_listening', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Reading</Label>
              <Input value={form.english_reading} onChange={e => update('english_reading', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Writing</Label>
              <Input value={form.english_writing} onChange={e => update('english_writing', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Speaking</Label>
              <Input value={form.english_speaking} onChange={e => update('english_speaking', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>TRF / Registration Number</Label>
              <Input value={form.english_trf_number} onChange={e => update('english_trf_number', e.target.value)} disabled={isLocked} className="rounded-xl" />
            </div>
            <div>
              <Label>Upload Result</Label>
              {form.english_result_url ? (
                <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-xl text-sm">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  <a href={form.english_result_url} target="_blank" rel="noopener noreferrer" className="truncate text-primary underline flex-1">View file</a>
                  {!isLocked && <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => update('english_result_url', '')}><X className="h-3 w-3" /></Button>}
                </div>
              ) : (
                <label className={`flex items-center justify-center gap-2 mt-1 p-3 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 transition ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{uploading ? 'Uploading...' : 'Upload'}</span>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} disabled={isLocked || uploading} />
                </label>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-end pt-2">
          <Button onClick={() => onSave(form)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save English Test'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
