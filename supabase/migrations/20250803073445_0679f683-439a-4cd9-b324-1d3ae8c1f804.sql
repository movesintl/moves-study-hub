-- Create scholarships table
CREATE TABLE public.scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  eligibility_criteria TEXT,
  application_process TEXT,
  required_documents TEXT,
  scholarship_amount TEXT,
  currency TEXT DEFAULT 'AUD',
  deadline TIMESTAMP WITH TIME ZONE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  university_id UUID REFERENCES public.universities(id),
  course_id UUID REFERENCES public.courses(id),
  destination_country TEXT,
  scholarship_type TEXT NOT NULL, -- 'merit', 'need-based', 'sports', 'academic', etc.
  application_link TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  featured_image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin can manage all scholarships" 
ON public.scholarships 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Public can view published scholarships" 
ON public.scholarships 
FOR SELECT 
USING (is_published = true);

-- Create function to generate scholarship slug
CREATE OR REPLACE FUNCTION public.generate_scholarship_slug(scholarship_title text, scholarship_id uuid DEFAULT NULL::uuid)
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := public.slugify(scholarship_title);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current scholarship if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.scholarships 
    WHERE slug = final_slug 
    AND (scholarship_id IS NULL OR id != scholarship_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$function$;

-- Create trigger for auto-generating slug
CREATE OR REPLACE FUNCTION public.auto_generate_scholarship_slug()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if title changed
  IF NEW.slug IS NULL OR OLD.title IS DISTINCT FROM NEW.title THEN
    NEW.slug := public.generate_scholarship_slug(NEW.title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger
CREATE TRIGGER scholarships_auto_slug_trigger
  BEFORE INSERT OR UPDATE ON public.scholarships
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_generate_scholarship_slug();

-- Create updated_at trigger
CREATE TRIGGER update_scholarships_updated_at
  BEFORE UPDATE ON public.scholarships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();