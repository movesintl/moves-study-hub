-- Add featured column to universities table
ALTER TABLE public.universities 
ADD COLUMN featured boolean NOT NULL DEFAULT false;

-- Add an index for better performance when querying featured universities
CREATE INDEX idx_universities_featured ON public.universities(featured);

-- Update trigger to handle updated_at
-- The trigger already exists from previous migrations, so no need to recreate it