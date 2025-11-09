-- Add checkbox fields to counselling_bookings table
ALTER TABLE public.counselling_bookings 
ADD COLUMN agrees_to_terms boolean DEFAULT false,
ADD COLUMN agrees_to_contact boolean DEFAULT false,
ADD COLUMN agrees_to_marketing boolean DEFAULT false;

-- Create marketing_consents table for users who agree to marketing
CREATE TABLE public.marketing_consents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_email text NOT NULL,
  student_name text NOT NULL,
  student_phone text,
  consent_date timestamp with time zone NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  source text DEFAULT 'counselling_form',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on marketing_consents table
ALTER TABLE public.marketing_consents ENABLE ROW LEVEL SECURITY;

-- Create policies for marketing_consents
CREATE POLICY "Admins can view all marketing consents" 
ON public.marketing_consents 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update marketing consents" 
ON public.marketing_consents 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can insert marketing consents" 
ON public.marketing_consents 
FOR INSERT 
WITH CHECK (true);

-- Add index for faster email lookups
CREATE INDEX idx_marketing_consents_email ON public.marketing_consents(student_email);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_marketing_consents_updated_at
BEFORE UPDATE ON public.marketing_consents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();