-- Add new fields to destinations table for better content management
ALTER TABLE public.destinations 
ADD COLUMN average_fee TEXT,
ADD COLUMN flag_icon_url TEXT,
ADD COLUMN cost_of_living_info TEXT,
ADD COLUMN more_information TEXT;