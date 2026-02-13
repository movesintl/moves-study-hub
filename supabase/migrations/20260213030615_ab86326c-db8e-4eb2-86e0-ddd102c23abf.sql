
-- Create student_profiles table
CREATE TABLE public.student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  agent_id uuid,
  status text NOT NULL DEFAULT 'invited',
  submitted_at timestamptz,
  -- Section 1: Personal
  first_name text,
  last_name text,
  gender text,
  date_of_birth date,
  country_of_birth text,
  nationality text,
  marital_status text,
  has_dependents boolean,
  number_of_dependents integer,
  -- Section 2: Contact
  email text,
  phone text,
  alternate_phone text,
  street text,
  city text,
  state text,
  postcode text,
  country text,
  -- Section 3: Passport
  passport_number text,
  passport_expiry date,
  passport_issue_country text,
  passport_bio_url text,
  national_id_url text,
  birth_certificate_url text,
  -- Section 4: Education
  education_history jsonb DEFAULT '[]'::jsonb,
  -- Section 5: English Test
  english_test_taken text,
  english_test_date date,
  english_overall_score text,
  english_listening text,
  english_reading text,
  english_writing text,
  english_speaking text,
  english_trf_number text,
  english_result_url text,
  -- Section 6: Visa History
  applied_australian_visa boolean,
  refused_visa boolean,
  deported boolean,
  current_australian_visa boolean,
  visa_details text,
  -- Section 7: Study Preferences
  preferred_country text,
  preferred_city text,
  preferred_study_level text,
  preferred_course text,
  preferred_intake text,
  has_relatives_australia boolean,
  accommodation_preference text,
  -- Section 8: Financial
  financial_sponsor text,
  sponsor_name text,
  sponsor_relationship text,
  sponsor_occupation text,
  sponsor_income text,
  sponsor_country text,
  -- Section 9: Emergency Contact
  emergency_name text,
  emergency_relationship text,
  emergency_phone text,
  emergency_email text,
  emergency_country text,
  -- Section 10: Documents
  documents jsonb DEFAULT '[]'::jsonb,
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add unique constraint on user_id
ALTER TABLE public.student_profiles ADD CONSTRAINT student_profiles_user_id_key UNIQUE (user_id);

-- Enable RLS
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

-- Students can view their own profile
CREATE POLICY "Students can view own profile"
ON public.student_profiles FOR SELECT
USING (auth.uid() = user_id);

-- Students can update their own profile
CREATE POLICY "Students can update own profile"
ON public.student_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Agents can view their students' profiles
CREATE POLICY "Agents can view student profiles"
ON public.student_profiles FOR SELECT
USING (EXISTS (
  SELECT 1 FROM agents
  WHERE agents.id = student_profiles.agent_id
  AND agents.user_id = auth.uid()
));

-- Admins have full access
CREATE POLICY "Admin full access to student_profiles"
ON public.student_profiles FOR ALL
USING (is_admin(auth.uid()));

-- System/agents can insert profiles (when inviting students)
CREATE POLICY "Agents can create student profiles"
ON public.student_profiles FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM agents
    WHERE agents.id = student_profiles.agent_id
    AND agents.user_id = auth.uid()
  )
  OR is_admin(auth.uid())
);

-- Updated_at trigger
CREATE TRIGGER update_student_profiles_updated_at
BEFORE UPDATE ON public.student_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
