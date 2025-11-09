
-- Fix the RLS policy for counselling_bookings to avoid auth.users table access
DROP POLICY IF EXISTS "Users can view their own counselling bookings" ON public.counselling_bookings;

-- Create a new policy that uses the student_email directly
CREATE POLICY "Users can view their own counselling bookings" 
  ON public.counselling_bookings 
  FOR SELECT 
  USING (
    CASE 
      WHEN auth.uid() IS NULL THEN false
      ELSE student_email = (auth.jwt() ->> 'email')
    END
  );
