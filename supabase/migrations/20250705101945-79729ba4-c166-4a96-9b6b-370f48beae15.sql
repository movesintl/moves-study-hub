-- Add feature image support to services table
ALTER TABLE public.services 
ADD COLUMN feature_image_url TEXT,
ADD COLUMN feature_image_alt TEXT;