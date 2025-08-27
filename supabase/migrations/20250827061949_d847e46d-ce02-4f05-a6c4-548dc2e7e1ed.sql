-- Create improved mapping function with proper table reference
CREATE OR REPLACE FUNCTION sync_course_foreign_keys_improved()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Update study_area_id with fuzzy matching
  UPDATE public.courses 
  SET study_area_id = (
    CASE 
      WHEN lower(study_area) LIKE '%business%' THEN (SELECT id FROM public.course_study_areas WHERE name ILIKE '%business%' LIMIT 1)
      WHEN lower(study_area) LIKE '%cyber%' OR lower(study_area) LIKE '%it%' OR lower(study_area) LIKE '%computer%' 
        THEN (SELECT id FROM public.course_study_areas WHERE name ILIKE '%computer%' OR name ILIKE '%IT%' LIMIT 1)
      WHEN lower(study_area) LIKE '%health%' OR lower(study_area) LIKE '%medicine%' 
        THEN (SELECT id FROM public.course_study_areas WHERE name ILIKE '%health%' OR name ILIKE '%medicine%' LIMIT 1)
      WHEN lower(study_area) LIKE '%engineering%' OR lower(study_area) LIKE '%trade%' 
        THEN (SELECT id FROM public.course_study_areas WHERE name ILIKE '%engineering%' OR name ILIKE '%trade%' LIMIT 1)
      WHEN lower(study_area) LIKE '%education%' 
        THEN (SELECT id FROM public.course_study_areas WHERE name ILIKE '%business%' LIMIT 1) -- Map to closest available
      ELSE NULL
    END
  )
  WHERE study_area_id IS NULL AND study_area IS NOT NULL;

  RAISE NOTICE 'Improved course foreign key synchronization completed';
END;
$$;

-- Execute the improved sync function
SELECT sync_course_foreign_keys_improved();