
## Fix: Make Student Names Always Clickable

### Problem
The current code conditionally links the student name only when a `student_profiles` record exists (matched by email). Since no `student_profiles` records exist yet, all names render as plain text with no link.

### Solution
Make the student name **always clickable** by linking to the agent student profile page using the `agent_students` record ID as a fallback. The link should work in two scenarios:

1. **If a `student_profiles` record exists** -- link to `/agent/students/{student_profiles.id}` (current behavior)
2. **If no profile exists** -- link to `/agent/students/{agent_students.id}` so the agent can still navigate to a detail page

### Changes

**File: `src/pages/agent/AgentStudents.tsx`**
- Update the name cell to always render a `<Link>` component
- Use `getProfileId(email)` if available, otherwise fall back to the `agent_students` record `id`
- The name will always be styled as a clickable link (blue text with hover underline)

**File: `src/pages/agent/AgentStudentProfile.tsx`**
- Update the profile page to handle both cases: look up by `student_profiles.id` first, and if not found, look up by `agent_students.id` to show basic info from `agent_students`

This ensures agents can always click on a student name regardless of whether the student has started filling out their profile.
