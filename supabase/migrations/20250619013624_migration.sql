
-- Create a table for courses
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  study_area TEXT NOT NULL,
  level TEXT NOT NULL,
  country TEXT NOT NULL,
  university TEXT NOT NULL,
  tuition_fee_min INTEGER,
  tuition_fee_max INTEGER,
  currency TEXT DEFAULT 'AUD',
  duration_months INTEGER NOT NULL,
  intake_dates TEXT[], -- Array of intake dates like ['February', 'July', 'November']
  eligibility TEXT,
  requirements TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample course data
INSERT INTO public.courses (title, description, study_area, level, country, university, tuition_fee_min, tuition_fee_max, currency, duration_months, intake_dates, eligibility, requirements, featured) VALUES
('Bachelor of Information Technology', 'Comprehensive IT program covering software development, cybersecurity, and data analytics', 'IT', 'Bachelor', 'Australia', 'University of Melbourne', 35000, 42000, 'AUD', 36, ARRAY['February', 'July'], 'IELTS 6.5 overall with no band less than 6.0', 'Completion of Year 12 or equivalent', true),
('Master of Business Administration', 'Advanced business management program for future leaders', 'Business', 'Master', 'Australia', 'Monash University', 45000, 55000, 'AUD', 24, ARRAY['February', 'July', 'September'], 'IELTS 7.0 overall with no band less than 6.5', 'Bachelor degree with 2+ years work experience', true),
('Diploma of Health Sciences', 'Foundation program for healthcare careers', 'Health', 'Diploma', 'Australia', 'RMIT University', 18000, 22000, 'AUD', 18, ARRAY['February', 'July', 'November'], 'IELTS 6.0 overall with no band less than 5.5', 'Completion of Year 11 or equivalent', false),
('Certificate IV in Trade Skills', 'Practical trade skills training program', 'Trade', 'Certificate', 'Australia', 'TAFE NSW', 8000, 12000, 'AUD', 12, ARRAY['Monthly intakes'], 'IELTS 5.5 overall', 'Basic English proficiency', false),
('Master of Engineering', 'Advanced engineering program with specialization options', 'Engineering', 'Master', 'Canada', 'University of Toronto', 50000, 65000, 'CAD', 24, ARRAY['September', 'January'], 'IELTS 7.0 overall', 'Bachelor in Engineering or related field', true),
('Bachelor of Nursing', 'Comprehensive nursing program with clinical placements', 'Health', 'Bachelor', 'UK', 'University of Edinburgh', 25000, 35000, 'GBP', 36, ARRAY['September'], 'IELTS 7.0 overall with no band less than 7.0', 'A-levels or equivalent in sciences', true),
('Diploma of Digital Marketing', 'Modern digital marketing skills and strategies', 'Business', 'Diploma', 'Australia', 'Griffith University', 15000, 20000, 'AUD', 12, ARRAY['February', 'June', 'October'], 'IELTS 6.0 overall', 'Year 12 completion', false),
('Master of Data Science', 'Advanced data analytics and machine learning program', 'IT', 'Master', 'Canada', 'University of British Columbia', 45000, 55000, 'CAD', 20, ARRAY['September', 'January', 'May'], 'IELTS 6.5 overall', 'Bachelor in IT, Mathematics, or Statistics', true);

-- Add indexes for better search performance
CREATE INDEX idx_courses_study_area ON public.courses(study_area);
CREATE INDEX idx_courses_level ON public.courses(level);
CREATE INDEX idx_courses_country ON public.courses(country);
CREATE INDEX idx_courses_featured ON public.courses(featured);
