-- First, add 'student' to the user_role enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('user', 'admin', 'editor', 'counselor', 'student');
    ELSIF NOT EXISTS (SELECT 1 FROM unnest(enum_range(NULL::user_role)) AS val WHERE val = 'student') THEN
        ALTER TYPE user_role ADD VALUE 'student';
    END IF;
END $$;

-- Update the handle_new_user function to create users as 'student' by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, role)
  VALUES (NEW.id, 'student'::user_role)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Update existing 'user' role profiles to 'student' role
UPDATE public.user_profiles 
SET role = 'student'::user_role 
WHERE role = 'user'::user_role;