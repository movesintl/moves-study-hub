-- Allow agents to update student profiles they own
CREATE POLICY "Agents can update student profiles"
ON public.student_profiles
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM agents
  WHERE agents.id = student_profiles.agent_id
  AND agents.user_id = auth.uid()
));