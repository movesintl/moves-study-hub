-- First, let's check if the user_role enum exists and what values it has
-- If it doesn't exist, we'll create it with all the roles we need

-- Create the user_role enum type with all necessary roles
DO $$ 
BEGIN
    -- Drop the enum if it exists to recreate it with all values
    DROP TYPE IF EXISTS public.user_role CASCADE;
    
    -- Create the enum with all roles
    CREATE TYPE public.user_role AS ENUM (
        'student',
        'admin', 
        'editor',
        'counselor'
    );
EXCEPTION 
    WHEN duplicate_object THEN 
        NULL; -- Ignore if it already exists
END $$;

-- Now let's fix the user_profiles table to use the enum properly
ALTER TABLE public.user_profiles 
  ALTER COLUMN role TYPE public.user_role USING role::text::public.user_role;

-- Set the default role to student
ALTER TABLE public.user_profiles 
  ALTER COLUMN role SET DEFAULT 'student'::public.user_role;

-- Recreate the handle_new_user function with the correct enum reference
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

-- Recreate the handle_user_confirmed function with the correct enum reference
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