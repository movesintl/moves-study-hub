-- Add "How It Works" section fields to services table
ALTER TABLE public.services 
ADD COLUMN how_it_works_title TEXT,
ADD COLUMN how_it_works_description TEXT,
ADD COLUMN how_it_works_feature_image_url TEXT,
ADD COLUMN how_it_works_blurbs JSONB DEFAULT '[]'::jsonb;