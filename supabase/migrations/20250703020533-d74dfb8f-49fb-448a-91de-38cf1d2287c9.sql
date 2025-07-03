-- Add overview content field to universities table
ALTER TABLE public.universities 
ADD COLUMN overview_content TEXT;