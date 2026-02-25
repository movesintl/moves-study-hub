
-- Allow student_profiles to be created without a user_id (for agent-created profiles)
ALTER TABLE public.student_profiles ALTER COLUMN user_id DROP NOT NULL;
