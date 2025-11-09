-- Add FAQ field to destinations table
ALTER TABLE public.destinations 
ADD COLUMN faqs JSONB DEFAULT '[]'::jsonb;