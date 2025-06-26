
-- Add slug column and JSON columns for managing content from admin panel
ALTER TABLE public.destinations 
ADD COLUMN slug TEXT UNIQUE,
ADD COLUMN why_study_points JSONB DEFAULT '[]'::jsonb,
ADD COLUMN job_market_points JSONB DEFAULT '[]'::jsonb;

-- Generate slugs for existing destinations
UPDATE public.destinations 
SET slug = LOWER(REPLACE(REPLACE(name, ' ', '-'), '&', 'and'))
WHERE slug IS NULL;

-- Make slug not null after populating existing records
ALTER TABLE public.destinations 
ALTER COLUMN slug SET NOT NULL;

-- Add index for better performance on slug lookups
CREATE INDEX idx_destinations_slug ON public.destinations(slug);
