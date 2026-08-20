-- Supabase Row Level Security (RLS) Policies
-- ==============================================
-- This file documents the RLS policies for the leads table.
-- Apply these statements in the Supabase SQL editor via the migration system.
--
-- Architecture:
-- - Anonymous website visitors can INSERT new leads (enquiries)
-- - Only authenticated admins (in public.admins table) can SELECT leads
-- - Admin users can only read their own admin record

-- ============================================================
-- LEADS TABLE - RLS Policies
-- ============================================================

-- Enable RLS on the leads table
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anonymous users to INSERT new leads
-- This allows website visitors to submit enquiries without authentication
DROP POLICY IF EXISTS "Allow anonymous leads insert" ON public.leads;
CREATE POLICY "Allow anonymous leads insert" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Allow SELECT only for authenticated admins
-- Only users whose ID is in the public.admins table can view leads
DROP POLICY IF EXISTS "Allow admins select" ON public.leads;
CREATE POLICY "Allow admins select" ON public.leads
  FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.admins WHERE user_id = auth.uid()
    )
  );

-- Policy 3: Allow UPDATE for authenticated admins
-- Only users in the public.admins table can update lead records
DROP POLICY IF EXISTS "Allow admins update" ON public.leads;
CREATE POLICY "Allow admins update" ON public.leads
  FOR UPDATE
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.admins WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.admins WHERE user_id = auth.uid()
    )
  );

-- ============================================================
-- ADMINS TABLE - RLS Policies
-- ============================================================

-- Enable RLS on the admins table
ALTER TABLE IF EXISTS public.admins ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow users to read only their own admin row
DROP POLICY IF EXISTS "Allow admin read own row" ON public.admins;
CREATE POLICY "Allow admin read own row" ON public.admins
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy 2: Allow admins to update their own row
DROP POLICY IF EXISTS "Allow admin update own row" ON public.admins;
CREATE POLICY "Allow admin update own row" ON public.admins
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- ADMIN MANAGEMENT
-- ============================================================
-- To add an admin user, run (replace with actual auth.users.id):
-- INSERT INTO public.admins (user_id) VALUES ('00000000-0000-0000-0000-000000000000');
--
-- To remove an admin:
-- DELETE FROM public.admins WHERE user_id = '00000000-0000-0000-0000-000000000000';
--
-- To view all admins:
-- SELECT user_id, created_at FROM public.admins;

-- ============================================================
-- ALTERNATIVE: Using JWT Claims
-- ============================================================
-- If you prefer to use a custom JWT claim (e.g., "is_admin"):
-- Replace the "Allow admins select" policy WITH CHECK with:
-- USING (auth.role() = 'authenticated' AND (current_setting('jwt.claims', true) ->> 'is_admin')::boolean = true)
--
-- This requires adding the claim to the user's JWT at authentication time.
