-- Let's check what enum types currently exist and create user_role properly
-- First, let's see what's in the database
SELECT typname FROM pg_type WHERE typtype = 'e';

-- Drop the user_profiles table temporarily to recreate it properly
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create the user_role enum type first
CREATE TYPE public.user_role AS ENUM (
    'student',
    'admin', 
    'editor',
    'counselor'
);

-- Now create the user_profiles table with the correct structure
CREATE TABLE public.user_profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.user_role NOT NULL DEFAULT 'student'::public.user_role,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admin can manage all profiles" ON public.user_profiles
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile during signup" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Recreate the handle_new_user function with correct enum reference
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Create user profile with student role by default
  INSERT INTO public.user_profiles (user_id, role)
  VALUES (NEW.id, 'student'::public.user_role)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Recreate the handle_user_confirmed function
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
    VALUES (NEW.id, 'student'::public.user_role)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_confirmed();