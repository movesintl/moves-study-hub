-- Clean up duplicate user profiles and fix the table

-- First, remove duplicate entries, keeping only the first one for each user_id
DELETE FROM public.user_profiles 
WHERE id NOT IN (
  SELECT MIN(id) 
  FROM public.user_profiles 
  GROUP BY user_id
);

-- Add unique constraint on user_id to prevent future duplicates
ALTER TABLE public.user_profiles 
ADD CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id);

-- Update default role to 'student' instead of 'user'
ALTER TABLE public.user_profiles 
ALTER COLUMN role SET DEFAULT 'student'::user_role;

-- Add RLS policy to allow users to create their own profile during signup
CREATE POLICY "Users can create their own profile during signup" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);