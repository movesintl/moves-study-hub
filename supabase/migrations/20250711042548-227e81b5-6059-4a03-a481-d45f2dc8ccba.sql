-- Create staff members table
CREATE TABLE public.staff_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  description TEXT,
  email TEXT,
  phone TEXT,
  profile_image_url TEXT,
  social_media_links JSONB DEFAULT '{}'::jsonb,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;

-- Create policies for staff members
CREATE POLICY "Admin can manage staff members" 
ON public.staff_members 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Public can view active staff members" 
ON public.staff_members 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_staff_members_updated_at
BEFORE UPDATE ON public.staff_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();