import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, FolderOpen, Upload, FileText, X } from 'lucide-react';
import { SectionProps, DocumentEntry } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DOCUMENT_CATEGORIES = [
  { category: 'passport', label: 'Passport', required: true },
  { category: 'academic_certificates', label: 'Academic Certificates', required: false },
  { category: 'academic_transcripts', label: 'Academic Transcripts', required: false },
  { category: 'english_test_result', label: 'English Test Result', required: false },
  { category: 'cv_resume', label: 'CV / Resume', required: false },
  { category: 'statement_of_purpose', label: 'Statement of Purpose', required: false },
];

export default function DocumentUploadsSection({ data, onSave, isLocked, isSaving }: SectionProps) {
  const { toast } = useToast();
  const [docs, setDocs] = useState<DocumentEntry[]>(data.documents || []);
  const [uploading, setUploading] = useState<string | null>(null);

  const getDoc = (category: string) => docs.find(d => d.category === category);

  const handleUpload = async (category: string, label: string, file: File) => {
    setUploading(category);
    const path = `student-profiles/${data.user_id}/docs-${category}-${Date.now()}-${file.name}`;
    const { data: uploaded, error } = await supabase.storage.from('media').upload(path, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } else {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(uploaded.path);
      const entry: DocumentEntry = { id: crypto.randomUUID(), category, label, url: publicUrl, name: file.name };
      setDocs(prev => [...prev.filter(d => d.category !== category), entry]);
    }
    setUploading(null);
  };

  const removeDoc = (category: string) => setDocs(prev => prev.filter(d => d.category !== category));

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-cyan-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <FolderOpen className="h-4 w-4 text-cyan-600" />
          </div>
          10. Document Uploads
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DOCUMENT_CATEGORIES.map(({ category, label, required }) => {
            const doc = getDoc(category);
            return (
              <div key={category}>
                <Label>{label} {required && '*'}</Label>
                {doc ? (
                  <div className="flex items-center gap-2 mt-1 p-2 bg-muted rounded-xl text-sm">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate flex-1">{doc.name}</span>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-xs shrink-0">View</a>
                    {!isLocked && <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeDoc(category)}><X className="h-3 w-3" /></Button>}
                  </div>
                ) : (
                  <label className={`flex items-center justify-center gap-2 mt-1 p-4 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 transition ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{uploading === category ? 'Uploading...' : 'Click to upload'}</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e => e.target.files?.[0] && handleUpload(category, label, e.target.files[0])} disabled={isLocked || uploading === category} />
                  </label>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end pt-2">
          <Button onClick={() => onSave({ documents: docs } as any)} disabled={isLocked || isSaving} className="rounded-xl gap-2">
            <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save Documents'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
