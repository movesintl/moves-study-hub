-- Enable realtime for notifications table
ALTER TABLE public.notifications REPLICA IDENTITY FULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'notifications'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
    END IF;
END
$$;

-- Create trigger for application status updates
CREATE OR REPLACE FUNCTION public.notify_application_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  course_title text;
  user_id_for_notification uuid;
BEGIN
  -- Only notify if status has changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Get course title for the notification
    SELECT c.title INTO course_title 
    FROM public.courses c 
    WHERE c.id = NEW.course_id;
    
    -- Try to find user by email match with auth.users
    SELECT au.id INTO user_id_for_notification
    FROM auth.users au
    WHERE au.email = NEW.student_email;
    
    -- Create notification for the student if user exists
    IF user_id_for_notification IS NOT NULL THEN
      PERFORM public.create_notification(
        user_id_for_notification,
        'Application Status Updated',
        'Your application for ' || COALESCE(course_title, 'a course') || ' has been updated to: ' || NEW.status,
        CASE 
          WHEN NEW.status = 'approved' THEN 'success'
          WHEN NEW.status = 'rejected' THEN 'warning'
          ELSE 'info'
        END,
        'application',
        NEW.id,
        'applications'
      );
    END IF;
    
    -- Also notify admins about status changes
    PERFORM public.notify_admins(
      'Application Status Changed',
      NEW.student_name || '''s application status changed to: ' || NEW.status,
      'info',
      'application',
      NEW.id,
      'applications'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for application updates
CREATE TRIGGER notify_application_update_trigger
  AFTER UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_application_update();