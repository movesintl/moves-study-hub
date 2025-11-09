-- Add slug column to courses table
ALTER TABLE public.courses ADD COLUMN slug text;

-- Create unique index on slug
CREATE UNIQUE INDEX idx_courses_slug ON public.courses (slug);

-- Function to generate slug from course title
CREATE OR REPLACE FUNCTION public.slugify(text)
RETURNS text AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace($1, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION public.generate_unique_slug(course_title text, course_id uuid DEFAULT NULL)
RETURNS text AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := slugify(course_title);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current course if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.courses 
    WHERE slug = final_slug 
    AND (course_id IS NULL OR id != course_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to auto-generate slug on insert/update
CREATE OR REPLACE FUNCTION public.auto_generate_course_slug()
RETURNS trigger AS $$
BEGIN
  -- Only generate slug if it's not provided or if title changed
  IF NEW.slug IS NULL OR OLD.title IS DISTINCT FROM NEW.title THEN
    NEW.slug := generate_unique_slug(NEW.title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_auto_generate_course_slug_insert
  BEFORE INSERT ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_generate_course_slug();

CREATE TRIGGER trigger_auto_generate_course_slug_update
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_generate_course_slug();

-- Generate slugs for existing courses
UPDATE public.courses SET slug = generate_unique_slug(title, id) WHERE slug IS NULL;