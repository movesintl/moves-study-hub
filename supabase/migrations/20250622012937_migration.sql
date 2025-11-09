
-- Create tables for course categories
CREATE TABLE public.course_study_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.course_study_levels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default study areas
INSERT INTO public.course_study_areas (name, description) VALUES
('IT & Computer Science', 'Information Technology and Computer Science programs'),
('Business & Management', 'Business Administration and Management programs'),
('Health & Medicine', 'Healthcare and Medical programs'),
('Engineering', 'Engineering and Technical programs'),
('Trade & Vocational', 'Trade skills and Vocational training');

-- Insert default study levels
INSERT INTO public.course_study_levels (name, description) VALUES
('Certificate', 'Certificate level programs'),
('Diploma', 'Diploma level programs'),
('Bachelor', 'Bachelor degree programs'),
('Master', 'Master degree programs'),
('PhD', 'Doctoral programs');

-- Add foreign key columns to courses table
ALTER TABLE public.courses 
ADD COLUMN study_area_id UUID REFERENCES public.course_study_areas(id),
ADD COLUMN study_level_id UUID REFERENCES public.course_study_levels(id);

-- Update existing courses to link with new categories (optional - maps existing text to new IDs)
UPDATE public.courses SET study_area_id = (
  SELECT id FROM public.course_study_areas 
  WHERE name = CASE 
    WHEN courses.study_area = 'IT' THEN 'IT & Computer Science'
    WHEN courses.study_area = 'Business' THEN 'Business & Management'
    WHEN courses.study_area = 'Health' THEN 'Health & Medicine'
    WHEN courses.study_area = 'Engineering' THEN 'Engineering'
    WHEN courses.study_area = 'Trade' THEN 'Trade & Vocational'
    ELSE courses.study_area
  END
);

UPDATE public.courses SET study_level_id = (
  SELECT id FROM public.course_study_levels 
  WHERE name = CASE 
    WHEN courses.level = 'Certificate' THEN 'Certificate'
    WHEN courses.level = 'Diploma' THEN 'Diploma'
    WHEN courses.level = 'Bachelor' THEN 'Bachelor'
    WHEN courses.level = 'Master' THEN 'Master'
    ELSE courses.level
  END
);
