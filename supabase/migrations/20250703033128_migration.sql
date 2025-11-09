-- Update courses table to replace min/max fees with single tuition fee
ALTER TABLE public.courses 
DROP COLUMN tuition_fee_min,
DROP COLUMN tuition_fee_max,
ADD COLUMN tuition_fee INTEGER;