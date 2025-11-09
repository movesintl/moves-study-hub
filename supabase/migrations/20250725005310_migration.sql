-- Create job_type enum
CREATE TYPE job_type AS ENUM ('Full-Time', 'Part-Time', 'Internship', 'Contract');

-- Create careers table
CREATE TABLE public.careers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  job_type job_type NOT NULL,
  location TEXT NOT NULL,
  department TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  benefits TEXT,
  apply_link TEXT NOT NULL,
  application_deadline TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

-- Create policies for careers
CREATE POLICY "Admin can manage all careers" 
ON public.careers 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Public can view published careers" 
ON public.careers 
FOR SELECT 
USING (is_published = true);

-- Create function to generate unique career slug
CREATE OR REPLACE FUNCTION public.generate_career_slug(career_title text, career_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
SET search_path TO ''
AS $function$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := public.slugify(career_title);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current career if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.careers 
    WHERE slug = final_slug 
    AND (career_id IS NULL OR id != career_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$function$;

-- Create trigger function for auto-generating career slug
CREATE OR REPLACE FUNCTION public.auto_generate_career_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if title changed
  IF NEW.slug IS NULL OR OLD.job_title IS DISTINCT FROM NEW.job_title THEN
    NEW.slug := public.generate_career_slug(NEW.job_title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for automatic slug generation
CREATE TRIGGER auto_generate_career_slug_trigger
BEFORE INSERT OR UPDATE ON public.careers
FOR EACH ROW
EXECUTE FUNCTION public.auto_generate_career_slug();

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_careers_updated_at
BEFORE UPDATE ON public.careers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();