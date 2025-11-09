-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  career_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cv_file_url TEXT,
  cover_letter_file_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all job applications" 
ON public.job_applications 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update job applications" 
ON public.job_applications 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete job applications" 
ON public.job_applications 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Add foreign key constraint
ALTER TABLE public.job_applications 
ADD CONSTRAINT fk_job_applications_career 
FOREIGN KEY (career_id) REFERENCES public.careers(id) ON DELETE CASCADE;

-- Create trigger for updated_at
CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage policies for job applications if not exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('job-applications', 'job-applications', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for job applications
CREATE POLICY "Users can upload their job application files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Users can view their job application files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'job-applications');

CREATE POLICY "Admins can view all job application files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'job-applications' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete job application files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'job-applications' AND is_admin(auth.uid()));