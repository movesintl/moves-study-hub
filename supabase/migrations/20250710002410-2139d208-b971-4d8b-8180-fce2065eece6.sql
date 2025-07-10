-- Add FAQ field to services table
ALTER TABLE public.services 
ADD COLUMN faqs JSONB DEFAULT '[]'::jsonb;