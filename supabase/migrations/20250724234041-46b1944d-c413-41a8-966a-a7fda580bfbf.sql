-- Add 'student' to the user_role enum
ALTER TYPE user_role ADD VALUE 'student';

-- Update the default role in user_profiles table from 'user' to 'student'
ALTER TABLE public.user_profiles ALTER COLUMN role SET DEFAULT 'student'::user_role;

-- Update existing users with 'user' role to 'student' role
UPDATE public.user_profiles SET role = 'student' WHERE role = 'user';