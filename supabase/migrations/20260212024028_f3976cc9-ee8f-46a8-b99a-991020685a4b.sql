
-- Add 'agent' to user_role enum
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'agent';

-- Create agents table
CREATE TABLE public.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  email text NOT NULL,
  contact_person text NOT NULL,
  company_name text,
  phone text,
  is_active boolean DEFAULT true,
  invited_at timestamptz DEFAULT now(),
  activated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access to agents" ON public.agents
  FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Agents can view own record" ON public.agents
  FOR SELECT USING (auth.uid() = user_id);

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create agent_students table
CREATE TABLE public.agent_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  student_email text NOT NULL,
  student_phone text,
  nationality text,
  date_of_birth date,
  address text,
  education_level text,
  english_test_type text,
  english_test_score text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.agent_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access to agent_students" ON public.agent_students
  FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Agents can manage own students" ON public.agent_students
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = agent_students.agent_id 
      AND agents.user_id = auth.uid()
    )
  );

CREATE TRIGGER update_agent_students_updated_at
  BEFORE UPDATE ON public.agent_students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add agent_id column to applications table
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS agent_id uuid REFERENCES public.agents(id);

-- Policy for agents to view their own applications
CREATE POLICY "Agents can view their applications" ON public.applications
  FOR SELECT USING (
    agent_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = applications.agent_id 
      AND agents.user_id = auth.uid()
    )
  );

-- Policy for agents to insert applications
CREATE POLICY "Agents can create applications" ON public.applications
  FOR INSERT WITH CHECK (
    agent_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.agents 
      WHERE agents.id = applications.agent_id 
      AND agents.user_id = auth.uid()
    )
  );
