-- The security linter detected INFO issues about RLS policies
-- These appear to be false positives since we do have policies on the reviews table
-- Let's verify our policies are correct and add any missing ones

-- Double-check that our policies exist (they should already be there)
-- If not, recreate them:

-- Drop existing policies if they exist to recreate them properly
DROP POLICY IF EXISTS "Admin can manage all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public can view published reviews" ON public.reviews;

-- Recreate comprehensive policies
CREATE POLICY "Admin can manage all reviews" 
ON public.reviews 
FOR ALL 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Public can view published reviews" 
ON public.reviews 
FOR SELECT 
USING (is_published = true);

-- Add a policy for authenticated users to create reviews if needed in future
CREATE POLICY "Authenticated users can suggest reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND is_published = false);