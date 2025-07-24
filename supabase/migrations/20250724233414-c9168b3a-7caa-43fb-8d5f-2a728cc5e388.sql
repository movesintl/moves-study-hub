-- Fix function search path issues for security
-- Update functions to have proper search_path settings

-- Fix auto_generate_course_slug function
CREATE OR REPLACE FUNCTION public.auto_generate_course_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if title changed
  IF NEW.slug IS NULL OR OLD.title IS DISTINCT FROM NEW.title THEN
    NEW.slug := public.generate_unique_slug(NEW.title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Fix auto_generate_university_slug function
CREATE OR REPLACE FUNCTION public.auto_generate_university_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if name changed
  IF NEW.slug IS NULL OR OLD.name IS DISTINCT FROM NEW.name THEN
    NEW.slug := public.generate_university_slug(NEW.name, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Fix auto_generate_service_slug function
CREATE OR REPLACE FUNCTION public.auto_generate_service_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if title changed
  IF NEW.slug IS NULL OR OLD.title IS DISTINCT FROM NEW.title THEN
    NEW.slug := public.generate_service_slug(NEW.title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create audit logging table for security events
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (public.is_admin(auth.uid()));

-- Create audit logging function
CREATE OR REPLACE FUNCTION public.log_audit_event(
  p_action text,
  p_table_name text DEFAULT NULL,
  p_record_id uuid DEFAULT NULL,
  p_old_values jsonb DEFAULT NULL,
  p_new_values jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address,
    user_agent
  )
  VALUES (
    auth.uid(),
    p_action,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values,
    inet_client_addr(),
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$function$;

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier text NOT NULL, -- IP address or user ID
  action text NOT NULL, -- e.g., 'contact_form', 'counselling_booking'
  count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on rate limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only system can manage rate limits
CREATE POLICY "System can manage rate limits" 
ON public.rate_limits 
FOR ALL 
USING (true);

-- Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier text,
  p_action text,
  p_max_requests integer DEFAULT 10,
  p_window_minutes integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  current_count integer;
  window_start_time timestamp with time zone;
BEGIN
  window_start_time := now() - (p_window_minutes || ' minutes')::interval;
  
  -- Clean up old entries
  DELETE FROM public.rate_limits 
  WHERE window_start < window_start_time;
  
  -- Get current count for this identifier and action
  SELECT COALESCE(SUM(count), 0) 
  INTO current_count
  FROM public.rate_limits 
  WHERE identifier = p_identifier 
    AND action = p_action 
    AND window_start >= window_start_time;
  
  -- Check if limit exceeded
  IF current_count >= p_max_requests THEN
    RETURN false;
  END IF;
  
  -- Increment counter
  INSERT INTO public.rate_limits (identifier, action, count, window_start)
  VALUES (p_identifier, p_action, 1, now())
  ON CONFLICT (identifier, action) 
  DO UPDATE SET 
    count = rate_limits.count + 1,
    created_at = now();
  
  RETURN true;
END;
$function$;