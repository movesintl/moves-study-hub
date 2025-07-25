-- Create notifications table
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  category text NOT NULL DEFAULT 'general', -- 'application', 'counselling', 'system', 'contact', 'job_application'
  reference_id uuid, -- Reference to related record (application_id, booking_id, etc.)
  reference_table text, -- Table name for the reference
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own notifications" 
ON public.notifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all notifications" 
ON public.notifications 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "System can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

-- Create function for creating notifications
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id uuid,
  p_title text,
  p_message text,
  p_type text DEFAULT 'info',
  p_category text DEFAULT 'general',
  p_reference_id uuid DEFAULT NULL,
  p_reference_table text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  notification_id uuid;
BEGIN
  INSERT INTO public.notifications (
    user_id, title, message, type, category, reference_id, reference_table
  )
  VALUES (
    p_user_id, p_title, p_message, p_type, p_category, p_reference_id, p_reference_table
  )
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$;

-- Create function to notify admins
CREATE OR REPLACE FUNCTION public.notify_admins(
  p_title text,
  p_message text,
  p_type text DEFAULT 'info',
  p_category text DEFAULT 'general',
  p_reference_id uuid DEFAULT NULL,
  p_reference_table text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  admin_record RECORD;
BEGIN
  -- Get all admin and editor users
  FOR admin_record IN 
    SELECT up.user_id 
    FROM public.user_profiles up 
    WHERE up.role IN ('admin', 'editor')
  LOOP
    PERFORM public.create_notification(
      admin_record.user_id,
      p_title,
      p_message,
      p_type,
      p_category,
      p_reference_id,
      p_reference_table
    );
  END LOOP;
END;
$$;

-- Create triggers for automatic notifications

-- Trigger for new job applications
CREATE OR REPLACE FUNCTION public.notify_job_application()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  career_title text;
BEGIN
  -- Get career title
  SELECT job_title INTO career_title FROM public.careers WHERE id = NEW.career_id;
  
  -- Notify admins
  PERFORM public.notify_admins(
    'New Job Application',
    NEW.full_name || ' has applied for ' || COALESCE(career_title, 'a position'),
    'info',
    'job_application',
    NEW.id,
    'job_applications'
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_job_application_trigger
  AFTER INSERT ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_job_application();

-- Trigger for new counselling bookings
CREATE OR REPLACE FUNCTION public.notify_counselling_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Notify admins
  PERFORM public.notify_admins(
    'New Counselling Booking',
    NEW.student_name || ' has booked a counselling session',
    'info',
    'counselling',
    NEW.id,
    'counselling_bookings'
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_counselling_booking_trigger
  AFTER INSERT ON public.counselling_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_counselling_booking();

-- Trigger for new contact submissions
CREATE OR REPLACE FUNCTION public.notify_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Notify admins
  PERFORM public.notify_admins(
    'New Contact Submission',
    NEW.name || ' has submitted a contact form',
    'info',
    'contact',
    NEW.id,
    'contact_submissions'
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_contact_submission_trigger
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_contact_submission();

-- Trigger for new applications
CREATE OR REPLACE FUNCTION public.notify_application()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Notify admins
  PERFORM public.notify_admins(
    'New Student Application',
    NEW.student_name || ' has submitted a new application',
    'info',
    'application',
    NEW.id,
    'applications'
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_application_trigger
  AFTER INSERT ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_application();

-- Add updated_at trigger
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for notifications
ALTER TABLE public.notifications REPLICA IDENTITY FULL;