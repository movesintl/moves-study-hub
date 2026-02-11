
-- Step 1: Add 'agent' to the user_role enum only
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'agent';
