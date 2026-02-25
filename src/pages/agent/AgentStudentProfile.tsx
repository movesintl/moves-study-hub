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
      // Build a full StudentProfile-shaped object with defaults
      return {
        id: as_.id,
        user_id: '',
        agent_id: as_.agent_id,
        first_name: as_.student_name?.split(' ')[0] || '',
        last_name: as_.student_name?.split(' ').slice(1).join(' ') || '',
        email: as_.student_email,
        phone: as_.student_phone,
        alternate_phone: null,
        gender: null,
        date_of_birth: as_.date_of_birth || null,
        country_of_birth: null,
        nationality: as_.nationality || null,
        marital_status: null,
        has_dependents: null,
        number_of_dependents: null,
        street: null,
        city: null,
        state: null,
        postcode: null,
        country: null,
        passport_number: null,
        passport_expiry: null,
        passport_issue_country: null,
        passport_bio_url: null,
        national_id_url: null,
        birth_certificate_url: null,
        education_history: [],
        english_test_taken: null,
        english_test_date: null,
        english_overall_score: null,
        english_listening: null,
        english_reading: null,
        english_writing: null,
        english_speaking: null,
        english_trf_number: null,
        english_result_url: null,
        applied_australian_visa: null,
        refused_visa: null,
        deported: null,
        current_australian_visa: null,
        visa_details: null,
        preferred_country: null,
        preferred_city: null,
        preferred_study_level: null,
        preferred_course: null,
        preferred_intake: null,
        has_relatives_australia: null,
        accommodation_preference: null,
        financial_sponsor: null,
        sponsor_name: null,
        sponsor_relationship: null,
        sponsor_occupation: null,
        sponsor_income: null,
        sponsor_country: null,
        emergency_name: null,
        emergency_relationship: null,
        emergency_phone: null,
        emergency_email: null,
        emergency_country: null,
        documents: [],
        status: 'invited',
        submitted_at: null,
        created_at: as_.created_at || '',
        updated_at: as_.updated_at || '',
        _source: 'agent_students',
      } as StudentProfile & { _source: string };
    },
    enabled: !!agent && !!studentId,
  });

  const handleSave = async (fields: Partial<StudentProfile>) => {
    if (!profile || !studentId || !agent) return;
    setIsSaving(true);
    try {
      if (profile._source === 'student_profiles') {
        // Update existing student_profiles record
        const merged = { ...profile, ...fields };
        const newStatus = getStatusFromProgress(merged as StudentProfile);
        const { _source, ...cleanFields } = fields as any;
        const { error } = await (supabase as any)
          .from('student_profiles')
          .update({ ...cleanFields, status: newStatus })
          .eq('id', studentId);
        if (error) throw error;
      } else {
        // No student_profiles record yet — create one
        const merged = { ...profile, ...fields };
        const { _source, id, ...rest } = merged as any;
        const newStatus = getStatusFromProgress(merged as StudentProfile);
        const insertData: Record<string, any> = {};
        // Map all non-null fields
        const allowedKeys = [
          'first_name', 'last_name', 'gender', 'date_of_birth', 'country_of_birth',
          'nationality', 'marital_status', 'has_dependents', 'number_of_dependents',
          'email', 'phone', 'alternate_phone', 'street', 'city', 'state', 'postcode', 'country',
          'passport_number', 'passport_expiry', 'passport_issue_country',
          'passport_bio_url', 'national_id_url', 'birth_certificate_url',
          'education_history', 'english_test_taken', 'english_test_date',
          'english_overall_score', 'english_listening', 'english_reading',
          'english_writing', 'english_speaking', 'english_trf_number', 'english_result_url',
          'applied_australian_visa', 'refused_visa', 'deported', 'current_australian_visa', 'visa_details',
          'preferred_country', 'preferred_city', 'preferred_study_level', 'preferred_course',
          'preferred_intake', 'has_relatives_australia', 'accommodation_preference',
          'financial_sponsor', 'sponsor_name', 'sponsor_relationship', 'sponsor_occupation',
          'sponsor_income', 'sponsor_country',
          'emergency_name', 'emergency_relationship', 'emergency_phone', 'emergency_email', 'emergency_country',
          'documents',
        ];
        for (const key of allowedKeys) {
          if (rest[key] !== undefined) {
            insertData[key] = rest[key];
          }
        }
        insertData.agent_id = agent.id;
        insertData.status = newStatus;
        // user_id is now nullable, so we can omit it

        const { data: inserted, error } = await (supabase as any)
          .from('student_profiles')
          .insert(insertData)
          .select('id')
          .single();
        if (error) throw error;

        // Update the URL to use the new student_profiles ID
        if (inserted?.id) {
          navigate(`/agent/students/${inserted.id}`, { replace: true });
        }
      }
      toast({ title: 'Saved', description: 'Changes saved successfully.' });
      queryClient.invalidateQueries({ queryKey: ['agent-student-profile'] });
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
        <div className="bg-muted border border-border rounded-2xl p-4 text-muted-foreground text-sm">
          This student hasn't registered yet. Saving any section will create their full profile automatically.
        </div>
      )}

      <PersonalDetailsSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <ContactDetailsSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <PassportSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <EducationHistorySection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <EnglishTestSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <VisaHistorySection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <StudyPreferencesSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <FinancialSponsorSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <EmergencyContactSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
      <DocumentUploadsSection data={profile} onSave={handleSave} isLocked={isLocked} isSaving={isSaving} />
    </div>
  );
}
