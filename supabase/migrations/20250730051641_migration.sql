-- Create reviews table for student testimonials
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  reviewer_name TEXT NOT NULL,
  reviewer_role TEXT NOT NULL DEFAULT 'Student',
  reviewer_image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Admin can manage all reviews" 
ON public.reviews 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Public can view published reviews" 
ON public.reviews 
FOR SELECT 
USING (is_published = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample reviews
INSERT INTO public.reviews (content, rating, reviewer_name, reviewer_role, reviewer_image_url, is_published, is_featured, display_order) VALUES
(
  'Great experience with the team and Specially Disha didi. I am really thankful to the team for guiding me through the entire process of getting admission in my dream university.',
  5,
  'Faizan Rafiq',
  'Student',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  true,
  true,
  1
),
(
  'Amazing support throughout my journey. The counselors were extremely helpful and professional. They made my study abroad dream come true!',
  5,
  'Priya Sharma',
  'Student',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  true,
  true,
  2
),
(
  'The best consultancy for study abroad. They helped me get into my preferred university in Australia. Highly recommended for all students.',
  5,
  'Rohit Kumar',
  'Student',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  true,
  false,
  3
),
(
  'Excellent guidance and support. The team helped me understand all the requirements and processes. Very professional and caring approach.',
  5,
  'Sneha Patel',
  'Student',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  true,
  false,
  4
),
(
  'Outstanding service! They made the complex process of studying abroad so simple. Thank you for making my dreams come true.',
  5,
  'Arjun Singh',
  'Student',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  true,
  false,
  5
),
(
  'Professional and dedicated team. They provided excellent guidance from application to visa process. Could not ask for better support.',
  5,
  'Aisha Khan',
  'Student',
  'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face',
  true,
  false,
  6
);