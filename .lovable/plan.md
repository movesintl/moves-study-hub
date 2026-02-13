

# Student Profile Page - Complete Implementation Plan

## Overview
Build a comprehensive, single-page Student Profile form accessible to students who have been invited by an agent. The page is a vertical, section-by-section layout with individual save buttons, a progress bar, status tracking, and a final submit flow that locks editing.

---

## Database Changes

### New Table: `student_profiles`
Stores all student profile data in a single row per student, with JSONB columns for repeatable/complex sections.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid | References the student's auth user |
| agent_id | uuid | The agent who invited them |
| status | text | `invited`, `profile_incomplete`, `profile_completed`, `application_submitted` |
| submitted_at | timestamptz | Null until submission |
| **Section 1: Personal** | | |
| first_name | text | |
| last_name | text | |
| gender | text | |
| date_of_birth | date | |
| country_of_birth | text | |
| nationality | text | |
| marital_status | text | |
| has_dependents | boolean | |
| number_of_dependents | integer | |
| **Section 2: Contact** | | |
| email | text | Read-only, from auth |
| phone | text | |
| alternate_phone | text | |
| street | text | |
| city | text | |
| state | text | |
| postcode | text | |
| country | text | |
| **Section 3: Passport** | | |
| passport_number | text | |
| passport_expiry | date | |
| passport_issue_country | text | |
| passport_bio_url | text | File URL |
| national_id_url | text | File URL |
| birth_certificate_url | text | File URL |
| **Section 4: Education** | | |
| education_history | jsonb | Array of education records |
| **Section 5: English Test** | | |
| english_test_taken | text | IELTS/PTE/TOEFL/Duolingo/not_yet |
| english_test_date | date | |
| english_overall_score | text | |
| english_listening | text | |
| english_reading | text | |
| english_writing | text | |
| english_speaking | text | |
| english_trf_number | text | |
| english_result_url | text | File URL |
| **Section 6: Visa History** | | |
| applied_australian_visa | boolean | |
| refused_visa | boolean | |
| deported | boolean | |
| current_australian_visa | boolean | |
| visa_details | text | |
| **Section 7: Study Preferences** | | |
| preferred_country | text | |
| preferred_city | text | |
| preferred_study_level | text | |
| preferred_course | text | |
| preferred_intake | text | |
| has_relatives_australia | boolean | |
| accommodation_preference | text | |
| **Section 8: Financial** | | |
| financial_sponsor | text | self/parents/spouse/other |
| sponsor_name | text | |
| sponsor_relationship | text | |
| sponsor_occupation | text | |
| sponsor_income | text | |
| sponsor_country | text | |
| **Section 9: Emergency Contact** | | |
| emergency_name | text | |
| emergency_relationship | text | |
| emergency_phone | text | |
| emergency_email | text | |
| emergency_country | text | |
| **Section 10: Documents** | | |
| documents | jsonb | Array of {category, label, url, name} |
| **Timestamps** | | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### RLS Policies
- Students can SELECT/UPDATE their own profile (`user_id = auth.uid()`)
- Agents can SELECT profiles of their students (`agent_id` matches agent)
- Admins have full access

### Storage
- Use the existing `media` bucket for file uploads
- Create a folder convention: `student-profiles/{user_id}/` for organizing files

---

## New Files

### 1. `src/pages/student/StudentProfilePage.tsx`
The main page component containing:
- **Header**: Profile completion progress bar (calculated from filled fields) and status badge
- **11 sections** rendered vertically, each as a Card with its own form state and Save button
- Each section calls a Supabase `update` on the `student_profiles` row, updating only that section's columns
- Section components will be defined within this file or split into a subfolder if needed
- After submission: all fields become read-only, status changes to `application_submitted`

### 2. `src/components/student-profile/` (subfolder)
Break into manageable section components:
- `PersonalDetailsSection.tsx`
- `ContactDetailsSection.tsx`
- `PassportSection.tsx`
- `EducationHistorySection.tsx` (with repeatable entries)
- `EnglishTestSection.tsx` (conditional fields)
- `VisaHistorySection.tsx`
- `StudyPreferencesSection.tsx`
- `FinancialSponsorSection.tsx`
- `EmergencyContactSection.tsx`
- `DocumentUploadsSection.tsx`
- `ReviewSubmitSection.tsx`
- `ProfileHeader.tsx` (progress bar + status badge)

Each section component receives: `data`, `onSave`, `isLocked` (post-submission), `isSaving`

---

## Routing

Add a new route in `src/App.tsx`:
```
/student-dashboard/student-profile
```
This page will NOT use the agent sidebar layout. It will be a standalone page (or use the existing student dashboard layout).

---

## Key Behaviors

### Progress Calculation
Count the number of filled required fields across all sections divided by total required fields, displayed as a percentage in a progress bar at the top.

### Status Logic
- **Invited**: Profile just created, no data saved yet
- **Profile Incomplete**: Some sections saved but not all required fields filled
- **Profile Completed**: All required fields filled
- **Application Submitted**: Student clicked Submit -- profile is locked

### Section Save
Each section's Save button calls:
```typescript
supabase.from('student_profiles').update({ ...sectionFields }).eq('user_id', user.id)
```
Then recalculates progress and updates status accordingly.

### Education History (Repeatable)
Uses a JSONB column. UI shows an "Add Education" button that appends a new entry to the array. Each entry has fields for qualification level, course name, institution, country, dates, completion status, and file upload URL.

### Document Uploads
Files are uploaded to Supabase Storage (`media` bucket, `student-profiles/{user_id}/` path), and the returned URL is stored in the profile row.

### Submit Flow
1. Validate all required sections are complete
2. Show confirmation checkbox: "I confirm all information is correct"
3. On submit: update `status = 'application_submitted'`, set `submitted_at = now()`
4. Lock all fields (read-only)
5. Send notification to assigned agent and admin (using existing `create_notification` database function)

---

## Technical Details

### Migration SQL
A single migration to create the `student_profiles` table with all columns, RLS policies, and an `updated_at` trigger.

### Notification on Submit
Use the existing `create_notification` DB function to notify the agent and admins when a student submits their profile.

### UI Style
- Follows the existing modern design system (rounded-xl cards, gradient accents, soft shadows)
- Each section is a Card with a subtle top border accent
- Progress bar uses the existing `Progress` component
- Status badges use the existing `Badge` component with color-coded variants
- Searchable nationality/country fields use the existing `Combobox` component
- Date fields use the native date input (consistent with existing forms)

