-- Check if the trigger exists and recreate it if needed
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recreate the trigger to ensure it's properly attached
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Also create a trigger for confirmed users (in case email confirmation is required)
CREATE OR REPLACE FUNCTION public.handle_user_confirmed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only create profile if user is confirmed and doesn't already have one
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    INSERT INTO public.user_profiles (user_id, role)
    VALUES (NEW.id, 'student'::user_role)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for user confirmation
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_user_confirmed();