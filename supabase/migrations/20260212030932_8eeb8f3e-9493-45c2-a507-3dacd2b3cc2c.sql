
-- Drop existing restrictive policies on user_profiles
DROP POLICY IF EXISTS "Admin can manage all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Admin can manage all profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Users can view own profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
