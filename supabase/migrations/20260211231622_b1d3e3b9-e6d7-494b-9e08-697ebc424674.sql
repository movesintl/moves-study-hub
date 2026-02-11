
-- 2. Create agents table
CREATE TABLE public.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name text,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  is_active boolean NOT NULL DEFAULT true,
  invited_at timestamp with time zone NOT NULL DEFAULT now(),
  activated_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 3. Create agent_students table
CREATE TABLE public.agent_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
  student_name text NOT NULL,
  student_email text NOT NULL,
  student_phone text,
  date_of_birth date,
  nationality text,
  address text,
  current_education_level text,
  english_test_score text,
  work_experience text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 4. Add agent_id column to applications table
ALTER TABLE public.applications ADD COLUMN agent_id uuid REFERENCES public.agents(id) ON DELETE SET NULL;

-- 5. Enable RLS
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_students ENABLE ROW LEVEL SECURITY;

-- 6. Create helper function to check agent role
CREATE OR REPLACE FUNCTION public.is_agent(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = p_user_id AND role = 'agent'
  );
$$;

-- 7. Create helper function to get agent_id from user_id
CREATE OR REPLACE FUNCTION public.get_agent_id(p_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.agents WHERE user_id = p_user_id LIMIT 1;
$$;

-- 8. RLS policies for agents table
CREATE POLICY "Admins can manage all agents"
  ON public.agents FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Agents can view own record"
  ON public.agents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Agents can update own record"
  ON public.agents FOR UPDATE
  USING (auth.uid() = user_id);

-- 9. RLS policies for agent_students table
CREATE POLICY "Admins can manage all agent students"
  ON public.agent_students FOR ALL
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Agents can view own students"
  ON public.agent_students FOR SELECT
  USING (agent_id = public.get_agent_id(auth.uid()));

CREATE POLICY "Agents can create students"
  ON public.agent_students FOR INSERT
  WITH CHECK (agent_id = public.get_agent_id(auth.uid()));

CREATE POLICY "Agents can update own students"
  ON public.agent_students FOR UPDATE
  USING (agent_id = public.get_agent_id(auth.uid()));

CREATE POLICY "Agents can delete own students"
  ON public.agent_students FOR DELETE
  USING (agent_id = public.get_agent_id(auth.uid()));

-- 10. Update applications RLS to allow agents to insert and view their own
CREATE POLICY "Agents can create applications"
  ON public.applications FOR INSERT
  WITH CHECK (agent_id = public.get_agent_id(auth.uid()));

CREATE POLICY "Agents can view own applications"
  ON public.applications FOR SELECT
  USING (agent_id = public.get_agent_id(auth.uid()));

-- 11. Triggers for updated_at
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agent_students_updated_at
  BEFORE UPDATE ON public.agent_students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
