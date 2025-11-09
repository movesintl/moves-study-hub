
-- Create roles table for role management
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table for advanced settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Admin can manage roles" ON public.roles;
CREATE POLICY "Admin can manage roles" ON public.roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up 
      WHERE up.user_id = auth.uid() AND up.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "Admin can manage settings" ON public.site_settings;
CREATE POLICY "Admin can manage settings" ON public.site_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up 
      WHERE up.user_id = auth.uid() AND up.role = 'admin'
    )
  );

-- Insert default roles
INSERT INTO public.roles (name, description, permissions) VALUES
  ('admin', 'Full system access', '["all"]'),
  ('editor', 'Content management access', '["courses", "blogs", "universities", "destinations"]'),
  ('moderator', 'Limited content access', '["blogs"]')
ON CONFLICT (name) DO NOTHING;

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
  ('site_title', '"Moves International"', 'Main site title'),
  ('site_logo', '"/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png"', 'Site logo URL'),
  ('site_language', '"en"', 'Default site language'),
  ('site_timezone', '"UTC"', 'Site timezone'),
  ('site_favicon', '"/favicon.ico"', 'Site favicon URL'),
  ('site_font', '"Inter"', 'Default site font')
ON CONFLICT (key) DO NOTHING;
