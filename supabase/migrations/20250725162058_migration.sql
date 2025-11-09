-- Add university additional information fields
ALTER TABLE universities 
ADD COLUMN application_portal_status TEXT DEFAULT 'Open',
ADD COLUMN global_ranking TEXT DEFAULT 'Top 500', 
ADD COLUMN accreditation_status TEXT DEFAULT 'Verified',
ADD COLUMN admission_requirements JSONB DEFAULT '[]'::jsonb,
ADD COLUMN application_deadlines JSONB DEFAULT '[]'::jsonb;