-- Insert user_profiles for existing auth users who don't have profiles
INSERT INTO public.user_profiles (user_id, role)
SELECT au.id, 'user'::user_role
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.user_id
WHERE up.user_id IS NULL;