-- COMPREHENSIVE SECURITY FIXES MIGRATION
-- This migration addresses critical security vulnerabilities identified in the security review

-- 1. ENABLE RLS ON MISSING TABLES
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_study_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_study_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_category_assignments ENABLE ROW LEVEL SECURITY;

-- 2. CREATE PROPER RLS POLICIES FOR COURSES TABLE
CREATE POLICY "Public read access to courses" 
ON public.courses 
FOR SELECT 
USING (true);

CREATE POLICY "Admin full access to courses" 
ON public.courses 
FOR ALL 
USING (is_admin(auth.uid()));

-- 3. CREATE PROPER RLS POLICIES FOR COURSE STUDY AREAS
CREATE POLICY "Public read access to course study areas" 
ON public.course_study_areas 
FOR SELECT 
USING (true);

CREATE POLICY "Admin full access to course study areas" 
ON public.course_study_areas 
FOR ALL 
USING (is_admin(auth.uid()));

-- 4. CREATE PROPER RLS POLICIES FOR COURSE STUDY LEVELS
CREATE POLICY "Public read access to course study levels" 
ON public.course_study_levels 
FOR SELECT 
USING (true);

CREATE POLICY "Admin full access to course study levels" 
ON public.course_study_levels 
FOR ALL 
USING (is_admin(auth.uid()));

-- 5. CREATE PROPER RLS POLICIES FOR BLOG CATEGORY ASSIGNMENTS
CREATE POLICY "Public read access to blog category assignments" 
ON public.blog_category_assignments 
FOR SELECT 
USING (true);

CREATE POLICY "Admin full access to blog category assignments" 
ON public.blog_category_assignments 
FOR ALL 
USING (is_admin(auth.uid()));

-- 6. FIX OVERLY PERMISSIVE APPLICATIONS POLICIES
DROP POLICY IF EXISTS "Admins can delete applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "Users can view their own applications" ON public.applications;

CREATE POLICY "Admin can delete applications" 
ON public.applications 
FOR DELETE 
USING (is_admin(auth.uid()));

CREATE POLICY "Admin can update applications" 
ON public.applications 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own applications" 
ON public.applications 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  (student_email = (auth.jwt() ->> 'email'::text) OR is_admin(auth.uid()))
);

-- 7. FIX OVERLY PERMISSIVE PAGES POLICIES
DROP POLICY IF EXISTS "Authenticated users can manage pages" ON public.pages;

CREATE POLICY "Admin can manage pages" 
ON public.pages 
FOR ALL 
USING (is_admin(auth.uid()));

-- 8. FIX OVERLY PERMISSIVE MEDIA FILES POLICIES
DROP POLICY IF EXISTS "Authenticated users can delete media files" ON public.media_files;
DROP POLICY IF EXISTS "Authenticated users can update media files" ON public.media_files;
DROP POLICY IF EXISTS "Authenticated users can upload media files" ON public.media_files;
DROP POLICY IF EXISTS "Authenticated users can view media files" ON public.media_files;

CREATE POLICY "Admin can manage media files" 
ON public.media_files 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Authenticated users can view media files" 
ON public.media_files 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- 9. TIGHTEN SAVED COURSES POLICIES
DROP POLICY IF EXISTS "Users can remove their saved courses" ON public.saved_courses;
DROP POLICY IF EXISTS "Users can save courses" ON public.saved_courses;
DROP POLICY IF EXISTS "Users can view their own saved courses" ON public.saved_courses;

CREATE POLICY "Users can view their own saved courses" 
ON public.saved_courses 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can save courses" 
ON public.saved_courses 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Users can remove their saved courses" 
ON public.saved_courses 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- 10. UPDATE DATABASE FUNCTIONS WITH PROPER SECURITY
-- Update existing functions to use proper search_path
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_profiles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_auth_users()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  result json;
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  
  -- Get auth users data
  SELECT json_agg(
    json_build_object(
      'id', id,
      'email', email,
      'raw_user_meta_data', raw_user_meta_data,
      'created_at', created_at
    )
  )
  INTO result
  FROM auth.users;
  
  RETURN COALESCE(result, '[]'::json);
END;
$$;

CREATE OR REPLACE FUNCTION public.slugify(text)
RETURNS text
LANGUAGE plpgsql
STABLE
SET search_path = ''
AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace($1, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_unique_slug(course_title text, course_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := public.slugify(course_title);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current course if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.courses 
    WHERE slug = final_slug 
    AND (course_id IS NULL OR id != course_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_university_slug(university_name text, university_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := public.slugify(university_name);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current university if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.universities 
    WHERE slug = final_slug 
    AND (university_id IS NULL OR id != university_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_service_slug(service_title text, service_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := public.slugify(service_title);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current service if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.services 
    WHERE slug = final_slug 
    AND (service_id IS NULL OR id != service_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

-- 11. CREATE SECURITY HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_profiles.user_id = is_admin_or_editor.user_id 
    AND role IN ('admin', 'editor')
  );
$$;

-- 12. AUDIT LOGGING FUNCTION
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  user_id uuid,
  details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Log security events for audit purposes
  -- This can be extended to write to an audit table if needed
  RAISE LOG 'Security Event: % - User: % - Details: %', event_type, user_id, details;
END;
$$;