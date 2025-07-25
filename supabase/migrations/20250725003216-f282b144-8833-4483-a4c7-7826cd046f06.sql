-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('Webinar', 'In-Person', 'Workshop', 'Open Day', 'Info Session')),
  mode TEXT NOT NULL CHECK (mode IN ('Online', 'Offline', 'Hybrid')),
  location TEXT,
  city TEXT,
  event_link TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  is_free BOOLEAN NOT NULL DEFAULT true,
  ticket_price DECIMAL(10,2),
  registration_required BOOLEAN NOT NULL DEFAULT false,
  registration_form_url TEXT,
  host_name TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin can manage all events" 
ON public.events 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Public can view published events" 
ON public.events 
FOR SELECT 
USING (is_published = true);

-- Create function to generate event slug
CREATE OR REPLACE FUNCTION public.generate_event_slug(event_title text, event_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
SET search_path = ''
AS $function$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := public.slugify(event_title);
  final_slug := base_slug;
  
  -- Check if slug exists (excluding current event if updating)
  WHILE EXISTS (
    SELECT 1 FROM public.events 
    WHERE slug = final_slug 
    AND (event_id IS NULL OR id != event_id)
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$function$;

-- Create trigger function for auto-generating slug
CREATE OR REPLACE FUNCTION public.auto_generate_event_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  -- Only generate slug if it's not provided or if title changed
  IF NEW.slug IS NULL OR OLD.title IS DISTINCT FROM NEW.title THEN
    NEW.slug := public.generate_event_slug(NEW.title, NEW.id);
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create triggers
CREATE TRIGGER auto_generate_event_slug_trigger
  BEFORE INSERT OR UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_generate_event_slug();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();