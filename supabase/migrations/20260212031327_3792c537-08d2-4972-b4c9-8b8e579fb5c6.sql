
-- Add unique constraint on user_id for proper upsert support
ALTER TABLE public.user_profiles ADD CONSTRAINT user_profiles_user_id_unique UNIQUE (user_id);

-- Insert the missing agent profile
INSERT INTO public.user_profiles (user_id, role) 
VALUES ('6e49d6f3-e25d-40d4-a4d8-8afb548aec2e', 'agent')
ON CONFLICT (user_id) DO NOTHING;
