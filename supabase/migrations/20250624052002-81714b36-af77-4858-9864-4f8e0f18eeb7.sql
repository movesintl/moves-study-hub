
-- Add new columns to blogs table for SEO and FAQ support
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS focus_keywords text[];
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS featured_image_alt text;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS faqs jsonb DEFAULT '[]'::jsonb;

-- Add unique constraint on slug to ensure URL uniqueness
ALTER TABLE blogs ADD CONSTRAINT blogs_slug_unique UNIQUE (slug);

-- Create junction table for blog-category relationships (many-to-many)
CREATE TABLE IF NOT EXISTS blog_category_assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id uuid REFERENCES blogs(id) ON DELETE CASCADE,
  category_id uuid REFERENCES blog_categories(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(blog_id, category_id)
);
