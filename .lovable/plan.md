

# Fix Agent Invitation System

## Overview
Three things need to be fixed for agent invitations to work:
1. The `agents` table doesn't exist yet in your database
2. The invite button calls the wrong URL for the edge function  
3. The edge function needs your external Supabase service role key to send invitation emails

## Step 1: Create the `agents` table
Run a database migration to create the table with columns for email, contact person, company, phone, status, and timestamps. Add RLS policies so only admins can manage agents.

Also add `'agent'` to the `user_role` enum type so agents can be properly assigned.

## Step 2: Add the Service Role Key secret
The edge function needs your **external Supabase service role key** to call `auth.admin.inviteUserByEmail()`. You'll be prompted to paste this key (found in your Supabase Dashboard at Settings > API > service_role key for project `hhzjzbxpdnehbgwvmimm`).

## Step 3: Update the Edge Function
Modify `supabase/functions/invite-agent/index.ts` to:
- Use your external project URL (`https://hhzjzbxpdnehbgwvmimm.supabase.co`) and the service role key secret
- Use your external anon key for verifying the caller's identity
- Set the invitation redirect URL to your app's domain

## Step 4: Update the Frontend
Modify `src/pages/admin/agents/AgentsList.tsx` to:
- Call the edge function via direct `fetch()` to the Lovable-deployed URL instead of `supabase.functions.invoke()` (which targets the wrong host)
- Pass the logged-in user's auth token in the request header
- Import `useAuth` to access the current session

## Step 5: Deploy and Test
Redeploy the edge function and test sending an agent invitation.

---

## Technical Details

### Database Migration SQL
```sql
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
```

### Files to modify
1. **`supabase/functions/invite-agent/index.ts`** -- use hardcoded external URL + secret for service role key
2. **`src/pages/admin/agents/AgentsList.tsx`** -- use direct `fetch()` with auth header instead of `supabase.functions.invoke()`

### Secret needed
- `EXTERNAL_SUPABASE_SERVICE_ROLE_KEY` -- your external project's service role key

