
-- Create counselling_bookings table
CREATE TABLE public.counselling_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  preferred_destination TEXT,
  study_level TEXT,
  message TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.counselling_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for counselling_bookings
CREATE POLICY "Anyone can insert counselling bookings" 
  ON public.counselling_bookings 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own counselling bookings" 
  ON public.counselling_bookings 
  FOR SELECT 
  USING (student_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Admins can view all counselling bookings" 
  ON public.counselling_bookings 
  FOR SELECT 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all counselling bookings" 
  ON public.counselling_bookings 
  FOR UPDATE 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete all counselling bookings" 
  ON public.counselling_bookings 
  FOR DELETE 
  USING (public.is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_counselling_bookings_updated_at
  BEFORE UPDATE ON public.counselling_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
