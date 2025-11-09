
-- Create a table for saved courses
CREATE TABLE public.saved_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  course_id UUID REFERENCES public.courses(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.saved_courses ENABLE ROW LEVEL SECURITY;

-- Create policies for saved courses
CREATE POLICY "Users can view their own saved courses" 
  ON public.saved_courses 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can save courses" 
  ON public.saved_courses 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can remove their saved courses" 
  ON public.saved_courses 
  FOR DELETE 
  USING (auth.uid() = user_id OR user_id IS NULL);
