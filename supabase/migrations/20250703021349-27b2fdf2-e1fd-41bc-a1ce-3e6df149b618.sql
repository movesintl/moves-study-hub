-- Add slug field to universities table
ALTER TABLE public.universities 
ADD COLUMN slug TEXT UNIQUE;

-- Create function to generate university slug
CREATE OR REPLACE FUNCTION public.generate_university_slug(university_name text, university_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
AS $function$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := slugify(university_name);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current university if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.universities 
    WHERE slug = final_slug 
    AND (university_id IS NULL OR id != university_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$function$;

-- Create trigger for auto-generating university slugs
CREATE OR REPLACE FUNCTION public.auto_generate_university_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if name changed
  IF NEW.slug IS NULL OR OLD.name IS DISTINCT FROM NEW.name THEN
    NEW.slug := generate_university_slug(NEW.name, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger
CREATE TRIGGER update_university_slug
  BEFORE INSERT OR UPDATE ON public.universities
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_generate_university_slug();