
-- Create the pages table
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add Row Level Security (RLS) - making pages publicly readable when published
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published pages
CREATE POLICY "Published pages are viewable by everyone" 
  ON public.pages 
  FOR SELECT 
  USING (published = true OR auth.uid() IS NOT NULL);

-- Allow authenticated users to manage pages (admin functionality)
CREATE POLICY "Authenticated users can manage pages" 
  ON public.pages 
  FOR ALL 
  USING (auth.uid() IS NOT NULL);
