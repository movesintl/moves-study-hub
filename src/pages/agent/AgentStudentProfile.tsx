import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StudentProfile, calculateProgress, getStatusFromProgress } from '@/components/student-profile/types';
import ProfileHeader from '@/components/student-profile/ProfileHeader';
import PersonalDetailsSection from '@/components/student-profile/PersonalDetailsSection';
import ContactDetailsSection from '@/components/student-profile/ContactDetailsSection';
import PassportSection from '@/components/student-profile/PassportSection';
import EducationHistorySection from '@/components/student-profile/EducationHistorySection';
import EnglishTestSection from '@/components/student-profile/EnglishTestSection';
import VisaHistorySection from '@/components/student-profile/VisaHistorySection';
import StudyPreferencesSection from '@/components/student-profile/StudyPreferencesSection';
import FinancialSponsorSection from '@/components/student-profile/FinancialSponsorSection';
import EmergencyContactSection from '@/components/student-profile/EmergencyContactSection';
import DocumentUploadsSection from '@/components/student-profile/DocumentUploadsSection';

export default function AgentStudentProfile() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  const { data: agent } = useQuery({
    queryKey: ['agent-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('agents').select('id').eq('user_id', user!.id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['agent-student-profile', studentId],
    queryFn: async () => {
      // Try student_profiles first
      const { data: sp } = await (supabase as any)
        .from('student_profiles')
        .select('*')
        .eq('id', studentId)
        .eq('agent_id', agent!.id)
        .maybeSingle();
      if (sp) return { ...sp, _source: 'student_profiles' } as StudentProfile & { _source: string };

      // Fallback: load from agent_students
      const { data: as_, error } = await supabase
        .from('agent_students')
        .select('*')
        .eq('id', studentId!)
        .eq('agent_id', agent!.id)
        .single();
      if (error) throw error;
      return {
        ...as_,
        first_name: as_.student_name?.split(' ')[0] || '',
        last_name: as_.student_name?.split(' ').slice(1).join(' ') || '',
        email: as_.student_email,
        phone: as_.student_phone,
        status: 'invited',
        education_history: [],
        documents: [],
        _source: 'agent_students',
      } as unknown as StudentProfile & { _source: string };
    },
    enabled: !!agent && !!studentId,
  });

  const handleSave = async (fields: Partial<StudentProfile>) => {
    if (!profile || !studentId) return;
    setIsSaving(true);
    try {
      if (profile._source === 'student_profiles') {
        // Update student_profiles
        const newStatus = getStatusFromProgress({ ...profile, ...fields } as StudentProfile);
        const { error } = await (supabase as any)
          .from('student_profiles')
          .update({ ...fields, status: newStatus })
          .eq('id', studentId);
        if (error) throw error;
      } else {
        // Update agent_students basic fields
        const mapped: Record<string, any> = {};
        if (fields.first_name !== undefined || fields.last_name !== undefined) {
          mapped.student_name = `${fields.first_name || profile.first_name || ''} ${fields.last_name || profile.last_name || ''}`.trim();
        }
        if (fields.phone !== undefined) mapped.student_phone = fields.phone;
        if (fields.nationality !== undefined) mapped.nationality = fields.nationality;
        if (fields.date_of_birth !== undefined) mapped.date_of_birth = fields.date_of_birth;
        if ((fields as any).street !== undefined || (fields as any).city !== undefined || (fields as any).country !== undefined) {
          mapped.address = [(fields as any).street || profile.street, (fields as any).city || profile.city, (fields as any).country || profile.country].filter(Boolean).join(', ');
        }
        if (Object.keys(mapped).length > 0) {
          const { error } = await supabase.from('agent_students').update(mapped).eq('id', studentId);
          if (error) throw error;
        }
      }
      toast({ title: 'Saved', description: 'Changes saved successfully.' });
      queryClient.invalidateQueries({ queryKey: ['agent-student-profile', studentId] });
    } catch (err: any) {
      toast({ title: 'Save failed', description: err.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Student profile not found or not yet created.</p>
        <Button variant="outline" className="mt-4 rounded-xl" onClick={() => navigate('/agent/students')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Students
        </Button>
      </div>
    );
  }

  const isLocked = profile.status === 'application_submitted';
  const progress = calculateProgress(profile);
  const isFullProfile = profile._source === 'student_profiles';

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      <Button variant="ghost" className="rounded-xl gap-2" onClick={() => navigate('/agent/students')}>
        <ArrowLeft className="h-4 w-4" /> Back to Students
      </Button>

      <ProfileHeader progress={progress} status={profile.status} />

      {!isFullProfile && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-700 text-sm">
          This student hasn't started their profile yet. You can update basic details below. Full editing will be available once the student creates their profile.
        </div>
      )}

      <PersonalDetailsSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <ContactDetailsSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />

      {isFullProfile && (
        <>
          <PassportSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
          <EducationHistorySection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
          <EnglishTestSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
          <VisaHistorySection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
          <StudyPreferencesSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
          <FinancialSponsorSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
          <EmergencyContactSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
          <DocumentUploadsSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
        </>
      )}
    </div>
  );
}
