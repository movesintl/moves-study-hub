-- Create improved mapping function with fuzzy matching
CREATE OR REPLACE FUNCTION sync_course_foreign_keys_improved()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Update study_area_id with fuzzy matching
  UPDATE courses 
  SET study_area_id = (
    CASE 
      WHEN lower(study_area) LIKE '%business%' THEN (SELECT id FROM course_study_areas WHERE name ILIKE '%business%' LIMIT 1)
      WHEN lower(study_area) LIKE '%cyber%' OR lower(study_area) LIKE '%it%' OR lower(study_area) LIKE '%computer%' 
        THEN (SELECT id FROM course_study_areas WHERE name ILIKE '%computer%' OR name ILIKE '%IT%' LIMIT 1)
      WHEN lower(study_area) LIKE '%health%' OR lower(study_area) LIKE '%medicine%' 
        THEN (SELECT id FROM course_study_areas WHERE name ILIKE '%health%' OR name ILIKE '%medicine%' LIMIT 1)
      WHEN lower(study_area) LIKE '%engineering%' OR lower(study_area) LIKE '%trade%' 
        THEN (SELECT id FROM course_study_areas WHERE name ILIKE '%engineering%' OR name ILIKE '%trade%' LIMIT 1)
      WHEN lower(study_area) LIKE '%education%' 
        THEN (SELECT id FROM course_study_areas WHERE name ILIKE '%business%' LIMIT 1) -- Map to closest available
      ELSE NULL
    END
  )
  WHERE study_area_id IS NULL AND study_area IS NOT NULL;

  -- Update study_level_id based on level text (exact match should work)
  UPDATE courses 
  SET study_level_id = csl.id
  FROM course_study_levels csl
  WHERE courses.study_level_id IS NULL 
    AND courses.level = csl.name;

  -- Update destination_id based on country text (exact match should work)
  UPDATE courses 
  SET destination_id = d.id
  FROM destinations d
  WHERE courses.destination_id IS NULL 
    AND courses.country = d.name;

  -- Update university_id based on university text (exact match should work)
  UPDATE courses 
  SET university_id = u.id
  FROM universities u
  WHERE courses.university_id IS NULL 
    AND courses.university = u.name;

  RAISE NOTICE 'Improved course foreign key synchronization completed';
END;
$$;

-- Execute the improved sync function
SELECT sync_course_foreign_keys_improved();