-- Fix missing foreign key relationships for courses
-- This function will map text values to their corresponding IDs

-- Create function to sync course foreign key IDs
CREATE OR REPLACE FUNCTION sync_course_foreign_keys()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update study_area_id based on study_area text
  UPDATE courses 
  SET study_area_id = csa.id
  FROM course_study_areas csa
  WHERE courses.study_area_id IS NULL 
    AND courses.study_area = csa.name;

  -- Update study_level_id based on level text
  UPDATE courses 
  SET study_level_id = csl.id
  FROM course_study_levels csl
  WHERE courses.study_level_id IS NULL 
    AND courses.level = csl.name;

  -- Update destination_id based on country text
  UPDATE courses 
  SET destination_id = d.id
  FROM destinations d
  WHERE courses.destination_id IS NULL 
    AND courses.country = d.name;

  -- Update university_id based on university text
  UPDATE courses 
  SET university_id = u.id
  FROM universities u
  WHERE courses.university_id IS NULL 
    AND courses.university = u.name;

  -- Log the sync results
  RAISE NOTICE 'Course foreign key synchronization completed';
END;
$$;

-- Execute the sync function
SELECT sync_course_foreign_keys();

-- Create trigger to auto-sync on course updates
CREATE OR REPLACE FUNCTION auto_sync_course_foreign_keys()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Auto-populate study_area_id if missing but study_area text exists
  IF NEW.study_area_id IS NULL AND NEW.study_area IS NOT NULL THEN
    SELECT id INTO NEW.study_area_id 
    FROM course_study_areas 
    WHERE name = NEW.study_area 
    LIMIT 1;
  END IF;

  -- Auto-populate study_level_id if missing but level text exists
  IF NEW.study_level_id IS NULL AND NEW.level IS NOT NULL THEN
    SELECT id INTO NEW.study_level_id 
    FROM course_study_levels 
    WHERE name = NEW.level 
    LIMIT 1;
  END IF;

  -- Auto-populate destination_id if missing but country text exists
  IF NEW.destination_id IS NULL AND NEW.country IS NOT NULL THEN
    SELECT id INTO NEW.destination_id 
    FROM destinations 
    WHERE name = NEW.country 
    LIMIT 1;
  END IF;

  -- Auto-populate university_id if missing but university text exists
  IF NEW.university_id IS NULL AND NEW.university IS NOT NULL THEN
    SELECT id INTO NEW.university_id 
    FROM universities 
    WHERE name = NEW.university 
    LIMIT 1;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for courses table
DROP TRIGGER IF EXISTS trigger_auto_sync_course_foreign_keys ON courses;
CREATE TRIGGER trigger_auto_sync_course_foreign_keys
  BEFORE INSERT OR UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION auto_sync_course_foreign_keys();