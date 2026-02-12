

# Fix Agent Invitation - Edge Function Project Mismatch

## Problem
The edge function is deployed to Lovable Cloud (project `coadhiipbnnqlmslpzeu`) but your database, auth, and all data live on your external Supabase project (`hhzjzbxpdnehbgwvmimm`). The `supabase.functions.invoke()` call goes to the wrong project, and the edge function's environment variables also point to the wrong database.

## Solution
Update the edge function to connect to your **external Supabase project** instead of using default env vars, and update the frontend to call the edge function at the correct (Lovable Cloud) URL.

### Step 1: Add Required Secrets
Add the following secrets for your **external** Supabase project (`hhzjzbxpdnehbgwvmimm`):
- `EXTERNAL_SUPABASE_URL` = `https://hhzjzbxpdnehbgwvmimm.supabase.co`
- `EXTERNAL_SUPABASE_ANON_KEY` = your external project's anon key
- `EXTERNAL_SUPABASE_SERVICE_ROLE_KEY` = your external project's service role key (found in Supabase Dashboard > Settings > API)

### Step 2: Update the Edge Function
Modify `supabase/functions/invite-agent/index.ts` to:
- Use `EXTERNAL_SUPABASE_URL` and `EXTERNAL_SUPABASE_SERVICE_ROLE_KEY` instead of default `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`
- Use `EXTERNAL_SUPABASE_ANON_KEY` for the caller verification client
- This ensures the function reads/writes to the correct database and sends invites through the correct auth system

### Step 3: Update the Frontend Call
Modify `src/pages/admin/agents/AgentsList.tsx` to call the edge function at the **Lovable Cloud URL** directly instead of using `supabase.functions.invoke()` (which goes to the wrong project):

```text
Before: supabase.functions.invoke('invite-agent', { body: data })
After:  fetch('https://coadhiipbnnqlmslpzeu.supabase.co/functions/v1/invite-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': Bearer ${session.access_token} },
          body: JSON.stringify(data)
        })
```

### Step 4: Redeploy and Test
Deploy the updated edge function and test the invite flow end-to-end.

## Technical Details

### Files to modify:
1. **`supabase/functions/invite-agent/index.ts`** - Switch from default env vars to external project secrets
2. **`src/pages/admin/agents/AgentsList.tsx`** - Use direct fetch to Lovable Cloud URL with auth header

### Why this approach?
- The edge function runs on Lovable Cloud but needs to manage users/data on your external Supabase
- Supabase's `inviteUserByEmail()` must run server-side with the service role key -- it cannot be done from the frontend
- Using secrets keeps your service role key secure

