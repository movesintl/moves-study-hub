-- Simplify user_profiles table structure
-- First, let's see if we need to drop any existing columns
-- Keep only essential columns: id, user_id, role, created_at

-- Drop any extra columns if they exist (this is safe - will ignore if column doesn't exist)
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS email;
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS full_name;
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS avatar_url;
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS phone;
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS bio;
ALTER TABLE public.user_profiles DROP COLUMN IF EXISTS updated_at;

-- Ensure we have the right structure
-- user_id should be unique and not null
ALTER TABLE public.user_profiles 
  ALTER COLUMN user_id SET NOT NULL;

-- Add unique constraint on user_id if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'user_profiles_user_id_key'
  ) THEN
    ALTER TABLE public.user_profiles 
      ADD CONSTRAINT user_profiles_user_id_key UNIQUE (user_id);
  END IF;
END $$;

-- Ensure role column has proper default
ALTER TABLE public.user_profiles 
  ALTER COLUMN role SET DEFAULT 'student'::user_role;

-- Update the handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Create user profile with student role by default
  INSERT INTO public.user_profiles (user_id, role)
  VALUES (NEW.id, 'student'::user_role)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Ensure the trigger exists and is properly configured
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Create a more robust function for email confirmation
CREATE OR REPLACE FUNCTION public.handle_user_confirmed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only create profile if user is confirmed and doesn't already have one
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    INSERT INTO public.user_profiles (user_id, role)
    VALUES (NEW.id, 'student'::user_role)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Add trigger for email confirmation as backup
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_confirmed();