-- Create function to get auth users (admin only)
CREATE OR REPLACE FUNCTION public.get_auth_users()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
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