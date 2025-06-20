
-- Create universities table
CREATE TABLE public.universities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  location TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create destinations table  
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  featured_image_url TEXT,
  visa_info TEXT,
  lifestyle_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon_url TEXT,
  short_description TEXT,
  full_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  featured_image_url TEXT,
  author TEXT,
  category_id UUID REFERENCES public.blog_categories(id),
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media files table
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image', 'pdf', 'video'
  file_size INTEGER,
  folder TEXT DEFAULT 'general',
  tags TEXT[],
  uploaded_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update courses table to reference universities and destinations
ALTER TABLE public.courses 
ADD COLUMN university_id UUID REFERENCES public.universities(id),
ADD COLUMN destination_id UUID REFERENCES public.destinations(id),
ADD COLUMN thumbnail_url TEXT,
ADD COLUMN application_link TEXT;

-- Create user roles for admin access
CREATE TYPE public.user_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_profiles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$;

-- Create RLS policies for admin-only access
CREATE POLICY "Admin full access to universities" ON public.universities FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin full access to destinations" ON public.destinations FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin full access to services" ON public.services FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin full access to blog_categories" ON public.blog_categories FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin full access to blogs" ON public.blogs FOR ALL USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin full access to media_files" ON public.media_files FOR ALL USING (public.is_admin(auth.uid()));

-- Public read access for non-sensitive content
CREATE POLICY "Public read access to universities" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Public read access to destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Public read access to services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read access to published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Public read access to blog_categories" ON public.blog_categories FOR SELECT USING (true);

-- User profiles policies
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin can manage all profiles" ON public.user_profiles FOR ALL USING (public.is_admin(auth.uid()));

-- Insert some sample data
INSERT INTO public.blog_categories (name) VALUES 
('Study Abroad Tips'),
('Visa Guidelines'),
('University Reviews'),
('Student Life');

-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies for media bucket
CREATE POLICY "Admin can upload media" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admin can update media" ON storage.objects FOR UPDATE 
USING (bucket_id = 'media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete media" ON storage.objects FOR DELETE 
USING (bucket_id = 'media' AND public.is_admin(auth.uid()));

CREATE POLICY "Public can view media" ON storage.objects FOR SELECT 
USING (bucket_id = 'media');
