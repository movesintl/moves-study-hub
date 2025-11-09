
-- Add visual builder fields to the pages table
ALTER TABLE public.pages 
ADD COLUMN visual_builder_enabled BOOLEAN DEFAULT false,
ADD COLUMN visual_builder_data JSONB DEFAULT '{}'::jsonb,
ADD COLUMN visual_builder_version TEXT DEFAULT '1.0';

-- Add index for better performance on visual builder queries
CREATE INDEX idx_pages_visual_builder_enabled ON public.pages(visual_builder_enabled);

-- Add a comment to document the new fields
COMMENT ON COLUMN public.pages.visual_builder_enabled IS 'Whether this page uses the visual builder instead of traditional content fields';
COMMENT ON COLUMN public.pages.visual_builder_data IS 'Craft.js serialized data for the visual builder';
COMMENT ON COLUMN public.pages.visual_builder_version IS 'Version of the visual builder data format';
