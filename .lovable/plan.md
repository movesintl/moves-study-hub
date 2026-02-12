

# Fix Agent Login: Password Setup After Invitation

## The Problem
When an admin invites an agent, Supabase sends a magic link email. The agent clicks it and gets authenticated, but they never set a password. So on subsequent visits, they cannot log in because there's no password on their account.

## The Solution
Create a password setup flow that activates when an agent accepts their invitation.

### How It Works
1. Admin invites agent (existing flow -- sends magic link via email)
2. Agent clicks the magic link and arrives at `/auth` already authenticated
3. The system detects the agent role and that their `agents.activated_at` is null (first login)
4. Instead of redirecting straight to `/agent`, redirect to a **Set Password** page
5. Agent creates their password using `supabase.auth.updateUser({ password })`
6. System marks `agents.activated_at = now()` and redirects to `/agent`
7. On future logins, agent uses email + password normally

### Files to Create
- **`src/pages/agent/AgentSetPassword.tsx`** -- A simple page with password + confirm password fields. Calls `supabase.auth.updateUser({ password })`, then updates `agents.activated_at`, then navigates to `/agent`.

### Files to Modify
- **`src/pages/Auth.tsx`** -- When an authenticated agent user is detected and `activated_at` is null, redirect to `/agent/set-password` instead of `/agent`
- **`src/pages/AuthCallback.tsx`** -- Same logic: check `activated_at` for agent users and redirect accordingly
- **`src/App.tsx`** -- Add route for `/agent/set-password`
- **`supabase/functions/invite-agent/index.ts`** -- Ensure `activated_at` is explicitly set to `null` on creation (already the case)

### User Experience
- First login (via invitation link): Agent sees "Set Your Password" page
- Subsequent logins: Agent uses email + password on the normal login page
- The login page already supports email/password sign-in, so no changes needed there

## Technical Details

### AgentSetPassword Component
```
- Get current user from AuthContext
- Show form with password + confirm password fields
- On submit: call supabase.auth.updateUser({ password })
- Then update agents table: set activated_at = now() where user_id = user.id
- Navigate to /agent
```

### Auth.tsx and AuthCallback.tsx Changes
```
- When role === 'agent':
  - Query agents table for activated_at where user_id matches
  - If activated_at is null → navigate('/agent/set-password')
  - If activated_at is set → navigate('/agent')
```

### Route Addition in App.tsx
```
<Route path="/agent/set-password" element={<AgentSetPassword />} />
```
