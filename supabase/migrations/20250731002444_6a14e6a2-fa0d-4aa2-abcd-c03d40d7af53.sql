-- Add new columns to universities table for dynamic content

-- Add Key Highlights column (JSONB array)
ALTER TABLE public.universities 
ADD COLUMN key_highlights JSONB DEFAULT '[]'::jsonb;

-- Add Rankings & Recognition columns
ALTER TABLE public.universities 
ADD COLUMN qs_world_ranking TEXT;

ALTER TABLE public.universities 
ADD COLUMN qs_rating TEXT;

ALTER TABLE public.universities 
ADD COLUMN research_rating TEXT;

-- Add Institute Facts columns  
ALTER TABLE public.universities 
ADD COLUMN institution_type TEXT;

ALTER TABLE public.universities 
ADD COLUMN established_year TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.universities.key_highlights IS 'Array of key highlights with title, description, and color';
COMMENT ON COLUMN public.universities.qs_world_ranking IS 'QS World University ranking position';
COMMENT ON COLUMN public.universities.qs_rating IS 'QS Star rating (e.g., 5★)';
COMMENT ON COLUMN public.universities.research_rating IS 'Research excellence rating';
COMMENT ON COLUMN public.universities.institution_type IS 'Type of institution (e.g., Public University, Private College)';
COMMENT ON COLUMN public.universities.established_year IS 'Year the institution was established';