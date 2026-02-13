import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
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
import ReviewSubmitSection from '@/components/student-profile/ReviewSubmitSection';
import { Loader2 } from 'lucide-react';

const defaultProfile: StudentProfile = {
  id: '',
  user_id: '',
  agent_id: null,
  status: 'invited',
  submitted_at: null,
  first_name: null, last_name: null, gender: null, date_of_birth: null,
  country_of_birth: null, nationality: null, marital_status: null,
  has_dependents: null, number_of_dependents: null,
  email: null, phone: null, alternate_phone: null,
  street: null, city: null, state: null, postcode: null, country: null,
  passport_number: null, passport_expiry: null, passport_issue_country: null,
  passport_bio_url: null, national_id_url: null, birth_certificate_url: null,
  education_history: [],
  english_test_taken: null, english_test_date: null, english_overall_score: null,
  english_listening: null, english_reading: null, english_writing: null,
  english_speaking: null, english_trf_number: null, english_result_url: null,
  applied_australian_visa: null, refused_visa: null, deported: null,
  current_australian_visa: null, visa_details: null,
  preferred_country: null, preferred_city: null, preferred_study_level: null,
  preferred_course: null, preferred_intake: null,
  has_relatives_australia: null, accommodation_preference: null,
  financial_sponsor: null, sponsor_name: null, sponsor_relationship: null,
  sponsor_occupation: null, sponsor_income: null, sponsor_country: null,
  emergency_name: null, emergency_relationship: null, emergency_phone: null,
  emergency_email: null, emergency_country: null,
  documents: [],
  created_at: '', updated_at: '',
};

export default function StudentProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('student_profiles' as any)
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      toast({ title: 'Error loading profile', description: error.message, variant: 'destructive' });
    } else if (data) {
      const d = data as any;
      setProfile({
        ...defaultProfile,
        ...d,
        education_history: Array.isArray(d.education_history) ? d.education_history : [],
        documents: Array.isArray(d.documents) ? d.documents : [],
      });
    }
    setLoading(false);
  }, [user, toast]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleSave = async (sectionName: string, fields: Partial<StudentProfile>) => {
    if (!user) return;
    setSavingSection(sectionName);

    // Merge locally first to compute new status
    const merged = { ...profile, ...fields };
    const newStatus = getStatusFromProgress(merged);

    const updatePayload = { ...fields, status: newStatus };

    const { error } = await supabase
      .from('student_profiles' as any)
      .update(updatePayload)
      .eq('user_id', user.id);

    if (error) {
      toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    } else {
      setProfile(prev => ({ ...prev, ...fields, status: newStatus }));
      toast({ title: 'Saved successfully' });
    }
    setSavingSection(null);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);

    const { error } = await supabase
      .from('student_profiles' as any)
      .update({ status: 'application_submitted', submitted_at: new Date().toISOString() })
      .eq('user_id', user.id);

    if (error) {
      toast({ title: 'Submission failed', description: error.message, variant: 'destructive' });
    } else {
      setProfile(prev => ({ ...prev, status: 'application_submitted', submitted_at: new Date().toISOString() }));
      toast({ title: 'Application submitted!', description: 'Your agent will be notified.' });

      // Notify agent and admins
      if (profile.agent_id) {
        await supabase.rpc('create_notification', {
          p_user_id: profile.agent_id,
          p_title: 'Student Application Submitted',
          p_message: `${profile.first_name || 'A student'} ${profile.last_name || ''} has submitted their application.`,
          p_type: 'info',
          p_category: 'application',
        });
      }
      await supabase.rpc('notify_admins', {
        p_title: 'Student Application Submitted',
        p_message: `${profile.first_name || 'A student'} ${profile.last_name || ''} has submitted their profile application.`,
        p_type: 'info',
        p_category: 'application',
      });
    }
    setSubmitting(false);
  };

  const isLocked = profile.status === 'application_submitted';
  const progress = calculateProgress(profile);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <ProfileHeader progress={progress} status={profile.status} />
      <PersonalDetailsSection data={profile} onSave={f => handleSave('personal', f)} isLocked={isLocked} isSaving={savingSection === 'personal'} />
      <ContactDetailsSection data={profile} onSave={f => handleSave('contact', f)} isLocked={isLocked} isSaving={savingSection === 'contact'} />
      <PassportSection data={profile} onSave={f => handleSave('passport', f)} isLocked={isLocked} isSaving={savingSection === 'passport'} />
      <EducationHistorySection data={profile} onSave={f => handleSave('education', f)} isLocked={isLocked} isSaving={savingSection === 'education'} />
      <EnglishTestSection data={profile} onSave={f => handleSave('english', f)} isLocked={isLocked} isSaving={savingSection === 'english'} />
      <VisaHistorySection data={profile} onSave={f => handleSave('visa', f)} isLocked={isLocked} isSaving={savingSection === 'visa'} />
      <StudyPreferencesSection data={profile} onSave={f => handleSave('study', f)} isLocked={isLocked} isSaving={savingSection === 'study'} />
      <FinancialSponsorSection data={profile} onSave={f => handleSave('financial', f)} isLocked={isLocked} isSaving={savingSection === 'financial'} />
      <EmergencyContactSection data={profile} onSave={f => handleSave('emergency', f)} isLocked={isLocked} isSaving={savingSection === 'emergency'} />
      <DocumentUploadsSection data={profile} onSave={f => handleSave('documents', f)} isLocked={isLocked} isSaving={savingSection === 'documents'} />
      <ReviewSubmitSection data={profile} onSubmit={handleSubmit} isLocked={isLocked} isSubmitting={submitting} />
    </div>
  );
}
