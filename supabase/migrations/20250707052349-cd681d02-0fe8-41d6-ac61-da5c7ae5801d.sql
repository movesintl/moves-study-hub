-- Add slug column to services table if it doesn't exist
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create unique slug generation function for services
CREATE OR REPLACE FUNCTION public.generate_service_slug(service_title text, service_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
AS $function$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := slugify(service_title);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current service if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.services 
    WHERE slug = final_slug 
    AND (service_id IS NULL OR id != service_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$function$;

-- Create trigger function to auto-generate service slug
CREATE OR REPLACE FUNCTION public.auto_generate_service_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if title changed
  IF NEW.slug IS NULL OR OLD.title IS DISTINCT FROM NEW.title THEN
    NEW.slug := generate_service_slug(NEW.title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for auto slug generation
DROP TRIGGER IF EXISTS auto_generate_service_slug_trigger ON public.services;
CREATE TRIGGER auto_generate_service_slug_trigger
  BEFORE INSERT OR UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_service_slug();

-- Generate slugs for existing services
UPDATE public.services 
SET slug = generate_service_slug(title, id) 
WHERE slug IS NULL;