
-- Add new columns to the pages table for the expanded functionality
ALTER TABLE public.pages 
ADD COLUMN subtitle TEXT,
ADD COLUMN feature_image_url TEXT,
ADD COLUMN page_description TEXT,
ADD COLUMN content_image_url TEXT,
ADD COLUMN content_video_url TEXT,
ADD COLUMN cta_text TEXT,
ADD COLUMN cta_button_text TEXT,
ADD COLUMN cta_button_link TEXT,
ADD COLUMN body_content TEXT,
ADD COLUMN faqs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN related_blog_category_id UUID,
ADD COLUMN show_counselling_form BOOLEAN DEFAULT true;

-- Add foreign key reference to blog_categories for related blogs
ALTER TABLE public.pages 
ADD CONSTRAINT fk_pages_blog_category 
FOREIGN KEY (related_blog_category_id) 
REFERENCES public.blog_categories(id) 
ON DELETE SET NULL;
