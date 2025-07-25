-- Enhanced rate limiting with progressive delays
ALTER TABLE public.rate_limits 
ADD COLUMN IF NOT EXISTS failure_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS lockout_until timestamp with time zone DEFAULT NULL;

-- Update rate limit function to support progressive delays
CREATE OR REPLACE FUNCTION public.check_rate_limit_with_lockout(
  p_identifier text, 
  p_action text, 
  p_max_requests integer DEFAULT 10, 
  p_window_minutes integer DEFAULT 60,
  p_max_failures integer DEFAULT 5,
  p_lockout_minutes integer DEFAULT 30
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_count integer;
  failure_count integer;
  lockout_until timestamp with time zone;
  window_start_time timestamp with time zone;
  result jsonb;
BEGIN
  window_start_time := now() - (p_window_minutes || ' minutes')::interval;
  
  -- Check if currently locked out
  SELECT rate_limits.lockout_until, rate_limits.failure_count
  INTO lockout_until, failure_count
  FROM public.rate_limits 
  WHERE identifier = p_identifier 
    AND action = p_action
  LIMIT 1;
  
  -- If locked out and lockout hasn't expired
  IF lockout_until IS NOT NULL AND lockout_until > now() THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'locked_out',
      'retry_after', EXTRACT(EPOCH FROM (lockout_until - now()))
    );
  END IF;
  
  -- Clean up old entries and reset lockout if expired
  DELETE FROM public.rate_limits 
  WHERE window_start < window_start_time;
  
  UPDATE public.rate_limits 
  SET lockout_until = NULL, failure_count = 0
  WHERE identifier = p_identifier 
    AND action = p_action 
    AND lockout_until <= now();
  
  -- Get current count for this identifier and action
  SELECT COALESCE(SUM(count), 0) 
  INTO current_count
  FROM public.rate_limits 
  WHERE identifier = p_identifier 
    AND action = p_action 
    AND window_start >= window_start_time;
  
  -- Check if limit exceeded
  IF current_count >= p_max_requests THEN
    -- Increment failure count
    INSERT INTO public.rate_limits (identifier, action, count, failure_count, window_start)
    VALUES (p_identifier, p_action, 0, 1, now())
    ON CONFLICT (identifier, action) 
    DO UPDATE SET 
      failure_count = rate_limits.failure_count + 1,
      created_at = now();
    
    -- Check if should lockout
    SELECT rate_limits.failure_count INTO failure_count
    FROM public.rate_limits
    WHERE identifier = p_identifier AND action = p_action;
    
    IF failure_count >= p_max_failures THEN
      UPDATE public.rate_limits 
      SET lockout_until = now() + (p_lockout_minutes || ' minutes')::interval
      WHERE identifier = p_identifier AND action = p_action;
      
      RETURN jsonb_build_object(
        'allowed', false,
        'reason', 'locked_out_for_excessive_attempts',
        'retry_after', p_lockout_minutes * 60
      );
    END IF;
    
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'rate_limited',
      'retry_after', p_window_minutes * 60
    );
  END IF;
  
  -- Increment counter and reset failure count on success
  INSERT INTO public.rate_limits (identifier, action, count, failure_count, window_start)
  VALUES (p_identifier, p_action, 1, 0, now())
  ON CONFLICT (identifier, action) 
  DO UPDATE SET 
    count = rate_limits.count + 1,
    failure_count = 0,
    lockout_until = NULL,
    created_at = now();
  
  RETURN jsonb_build_object('allowed', true);
END;
$$;

-- Create function to log authentication events
CREATE OR REPLACE FUNCTION public.log_auth_event(
  p_event_type text,
  p_user_id uuid DEFAULT NULL,
  p_ip_address inet DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_success boolean DEFAULT true,
  p_details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    ip_address,
    user_agent,
    old_values,
    new_values
  )
  VALUES (
    p_user_id,
    p_event_type,
    'auth_events',
    COALESCE(p_ip_address, inet_client_addr()),
    COALESCE(p_user_agent, current_setting('request.headers', true)::json->>'user-agent'),
    jsonb_build_object('success', p_success),
    p_details
  );
END;
$$;

-- Create function to detect suspicious activity patterns
CREATE OR REPLACE FUNCTION public.detect_suspicious_activity(
  p_user_id uuid DEFAULT NULL,
  p_ip_address inet DEFAULT NULL,
  p_time_window_hours integer DEFAULT 1
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  failed_logins integer;
  role_changes integer;
  multiple_ips integer;
  result jsonb;
  alert_level text := 'low';
BEGIN
  -- Count failed login attempts
  SELECT COUNT(*)
  INTO failed_logins
  FROM public.audit_logs
  WHERE (p_user_id IS NULL OR user_id = p_user_id)
    AND (p_ip_address IS NULL OR ip_address = p_ip_address)
    AND action LIKE '%failed%'
    AND created_at >= now() - (p_time_window_hours || ' hours')::interval;
  
  -- Count role changes
  SELECT COUNT(*)
  INTO role_changes
  FROM public.audit_logs
  WHERE (p_user_id IS NULL OR user_id = p_user_id)
    AND action = 'role_changed'
    AND created_at >= now() - (p_time_window_hours || ' hours')::interval;
  
  -- Count distinct IP addresses for user
  IF p_user_id IS NOT NULL THEN
    SELECT COUNT(DISTINCT ip_address)
    INTO multiple_ips
    FROM public.audit_logs
    WHERE user_id = p_user_id
      AND created_at >= now() - (p_time_window_hours || ' hours')::interval;
  ELSE
    multiple_ips := 0;
  END IF;
  
  -- Determine alert level
  IF failed_logins >= 10 OR role_changes >= 3 OR multiple_ips >= 5 THEN
    alert_level := 'high';
  ELSIF failed_logins >= 5 OR role_changes >= 2 OR multiple_ips >= 3 THEN
    alert_level := 'medium';
  END IF;
  
  result := jsonb_build_object(
    'alert_level', alert_level,
    'failed_logins', failed_logins,
    'role_changes', role_changes,
    'multiple_ips', multiple_ips,
    'time_window_hours', p_time_window_hours,
    'timestamp', now()
  );
  
  -- Log suspicious activity if medium or high
  IF alert_level IN ('medium', 'high') THEN
    PERFORM public.log_audit_event(
      'suspicious_activity_detected',
      'security_monitor',
      p_user_id,
      NULL,
      result
    );
  END IF;
  
  RETURN result;
END;
$$;