import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, GraduationCap, Languages, Plane, BookOpen, Wallet, AlertTriangle, FileText } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const statusConfig: Record<string, { label: string; class: string }> = {
  invited: { label: 'Invited', class: 'bg-blue-50 text-blue-700 border-blue-200' },
  profile_incomplete: { label: 'Profile Incomplete', class: 'bg-amber-50 text-amber-700 border-amber-200' },
  profile_completed: { label: 'Profile Completed', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  application_submitted: { label: 'Application Submitted', class: 'bg-purple-50 text-purple-700 border-purple-200' },
};

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
    <div className="flex items-center gap-2 text-foreground font-semibold">
      <Icon className="h-4 w-4 text-primary" />
      {title}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">{children}</div>
  </div>
);

const Field = ({ label, value }: { label: string; value: any }) => (
  <div>
    <span className="text-muted-foreground text-xs">{label}</span>
    <p className="text-foreground font-medium">{value || '—'}</p>
  </div>
);

export default function AgentStudentProfile() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

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
      const { data, error } = await (supabase as any)
        .from('student_profiles')
        .select('*')
        .eq('id', studentId)
        .eq('agent_id', agent!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!agent && !!studentId,
  });

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

  const status = statusConfig[profile.status] || statusConfig.invited;
  const education = Array.isArray(profile.education_history) ? profile.education_history : [];
  const documents = Array.isArray(profile.documents) ? profile.documents : [];

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="rounded-xl gap-2" onClick={() => navigate('/agent/students')}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Badge variant="outline" className={`${status.class} border px-3 py-1.5 text-sm font-medium`}>
          {status.label}
        </Badge>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6">
        <h1 className="text-2xl font-bold text-foreground">
          {profile.first_name || 'Student'} {profile.last_name || 'Profile'}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Read-only view of student application</p>
      </div>

      <Section title="Personal Details" icon={User}>
        <Field label="First Name" value={profile.first_name} />
        <Field label="Last Name" value={profile.last_name} />
        <Field label="Gender" value={profile.gender} />
        <Field label="Date of Birth" value={profile.date_of_birth} />
        <Field label="Country of Birth" value={profile.country_of_birth} />
        <Field label="Nationality" value={profile.nationality} />
        <Field label="Marital Status" value={profile.marital_status} />
        <Field label="Dependents" value={profile.has_dependents ? `Yes (${profile.number_of_dependents || 0})` : 'No'} />
      </Section>

      <Section title="Contact Details" icon={Mail}>
        <Field label="Email" value={profile.email} />
        <Field label="Phone" value={profile.phone} />
        <Field label="Alternate Phone" value={profile.alternate_phone} />
        <Field label="Address" value={[profile.street, profile.city, profile.state, profile.postcode, profile.country].filter(Boolean).join(', ')} />
      </Section>

      <Section title="Passport & Identity" icon={CreditCard}>
        <Field label="Passport Number" value={profile.passport_number} />
        <Field label="Expiry Date" value={profile.passport_expiry} />
        <Field label="Issue Country" value={profile.passport_issue_country} />
      </Section>

      {education.length > 0 && (
        <Section title="Education History" icon={GraduationCap}>
          {education.map((e: any, i: number) => (
            <div key={i} className="col-span-2 bg-muted/30 rounded-xl p-3 space-y-1">
              <p className="font-medium text-foreground">{e.qualification_level} — {e.course_name}</p>
              <p className="text-xs text-muted-foreground">{e.institution_name}, {e.country}</p>
              <p className="text-xs text-muted-foreground">{e.start_date} to {e.end_date} · {e.completed ? 'Completed' : 'In Progress'}</p>
            </div>
          ))}
        </Section>
      )}

      <Section title="English Test" icon={Languages}>
        <Field label="Test Taken" value={profile.english_test_taken} />
        <Field label="Overall Score" value={profile.english_overall_score} />
        <Field label="Listening" value={profile.english_listening} />
        <Field label="Reading" value={profile.english_reading} />
        <Field label="Writing" value={profile.english_writing} />
        <Field label="Speaking" value={profile.english_speaking} />
      </Section>

      <Section title="Visa History" icon={Plane}>
        <Field label="Applied Australian Visa" value={profile.applied_australian_visa ? 'Yes' : 'No'} />
        <Field label="Refused Visa" value={profile.refused_visa ? 'Yes' : 'No'} />
        <Field label="Deported" value={profile.deported ? 'Yes' : 'No'} />
        <Field label="Current Australian Visa" value={profile.current_australian_visa ? 'Yes' : 'No'} />
        {profile.visa_details && <Field label="Details" value={profile.visa_details} />}
      </Section>

      <Section title="Study Preferences" icon={BookOpen}>
        <Field label="Preferred Country" value={profile.preferred_country} />
        <Field label="Preferred City" value={profile.preferred_city} />
        <Field label="Study Level" value={profile.preferred_study_level} />
        <Field label="Course" value={profile.preferred_course} />
        <Field label="Intake" value={profile.preferred_intake} />
        <Field label="Accommodation" value={profile.accommodation_preference} />
      </Section>

      <Section title="Financial Sponsor" icon={Wallet}>
        <Field label="Sponsor" value={profile.financial_sponsor} />
        <Field label="Sponsor Name" value={profile.sponsor_name} />
        <Field label="Relationship" value={profile.sponsor_relationship} />
        <Field label="Occupation" value={profile.sponsor_occupation} />
        <Field label="Income" value={profile.sponsor_income} />
        <Field label="Country" value={profile.sponsor_country} />
      </Section>

      <Section title="Emergency Contact" icon={AlertTriangle}>
        <Field label="Name" value={profile.emergency_name} />
        <Field label="Relationship" value={profile.emergency_relationship} />
        <Field label="Phone" value={profile.emergency_phone} />
        <Field label="Email" value={profile.emergency_email} />
        <Field label="Country" value={profile.emergency_country} />
      </Section>

      {documents.length > 0 && (
        <Section title="Documents" icon={FileText}>
          {documents.map((d: any, i: number) => (
            <div key={i} className="col-span-2 flex items-center justify-between bg-muted/30 rounded-xl p-3">
              <div>
                <p className="font-medium text-foreground text-sm">{d.label || d.category}</p>
                <p className="text-xs text-muted-foreground">{d.name}</p>
              </div>
              {d.url && (
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">
                  View
                </a>
              )}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}
