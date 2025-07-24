-- Add counselor role to the user_role enum
ALTER TYPE user_role ADD VALUE 'counselor';

-- Insert counselor role into roles table
INSERT INTO public.roles (name, description, permissions) VALUES
  ('counselor', 'Counselling and application management access', '["applications", "counselling", "marketing", "contact"]')
ON CONFLICT (name) DO NOTHING;