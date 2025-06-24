
-- Enable RLS on media_files table if not already enabled
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to insert media files
CREATE POLICY "Authenticated users can upload media files" 
ON public.media_files 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Create policy to allow all authenticated users to view media files
CREATE POLICY "Authenticated users can view media files" 
ON public.media_files 
FOR SELECT 
TO authenticated 
USING (true);

-- Create policy to allow all authenticated users to update media files
CREATE POLICY "Authenticated users can update media files" 
ON public.media_files 
FOR UPDATE 
TO authenticated 
USING (true);

-- Create policy to allow all authenticated users to delete media files
CREATE POLICY "Authenticated users can delete media files" 
ON public.media_files 
FOR DELETE 
TO authenticated 
USING (true);

-- Ensure storage policies exist for the media bucket (ignore if they already exist)
DO $$
BEGIN
  -- Check if policies exist, create if they don't
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload to media bucket'
  ) THEN
    CREATE POLICY "Authenticated users can upload to media bucket" 
    ON storage.objects 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'media');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can view media bucket'
  ) THEN
    CREATE POLICY "Authenticated users can view media bucket" 
    ON storage.objects 
    FOR SELECT 
    TO authenticated 
    USING (bucket_id = 'media');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete from media bucket'
  ) THEN
    CREATE POLICY "Authenticated users can delete from media bucket" 
    ON storage.objects 
    FOR DELETE 
    TO authenticated 
    USING (bucket_id = 'media');
  END IF;
END $$;
