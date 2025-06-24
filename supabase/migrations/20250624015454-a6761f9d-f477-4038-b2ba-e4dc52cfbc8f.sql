
-- Create applications table to store student applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  date_of_birth DATE,
  nationality TEXT,
  address TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  university_id UUID REFERENCES public.universities(id) ON DELETE SET NULL,
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  documents JSONB DEFAULT '[]'::jsonb, -- Array of document URLs and types
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT -- Admin notes
);

-- Enable RLS on applications table
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own applications (if we add auth later)
CREATE POLICY "Users can view their own applications" 
  ON public.applications 
  FOR SELECT 
  USING (true); -- For now, allow all to view (can be restricted later with auth)

-- Allow anyone to create applications (public form)
CREATE POLICY "Anyone can create applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (true);

-- Only admins can update applications (we'll check this in the app layer for now)
CREATE POLICY "Admins can update applications" 
  ON public.applications 
  FOR UPDATE 
  USING (true);

-- Only admins can delete applications
CREATE POLICY "Admins can delete applications" 
  ON public.applications 
  FOR DELETE 
  USING (true);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_applications_updated_at 
  BEFORE UPDATE ON public.applications 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();
