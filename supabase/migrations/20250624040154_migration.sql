
-- Update counselling_bookings table to include additional fields for a complete booking form
ALTER TABLE public.counselling_bookings 
ADD COLUMN IF NOT EXISTS course_interest TEXT,
ADD COLUMN IF NOT EXISTS current_education_level TEXT,
ADD COLUMN IF NOT EXISTS english_test_score TEXT,
ADD COLUMN IF NOT EXISTS work_experience TEXT;

-- Update the existing policies to allow anyone to insert bookings (for public form submissions)
DROP POLICY IF EXISTS "Anyone can insert counselling bookings" ON public.counselling_bookings;

CREATE POLICY "Anyone can insert counselling bookings" 
  ON public.counselling_bookings 
  FOR INSERT 
  WITH CHECK (true);
