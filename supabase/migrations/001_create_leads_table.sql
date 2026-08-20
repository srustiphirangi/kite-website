-- Migration: Create leads table with RLS policies
-- This migration creates the public.leads table and configures Row Level Security
-- to allow anonymous users to insert leads while restricting SELECT to authenticated admins.

-- Expected status values (used by admin dashboard for auto-calculation):
-- - 'New': Initial contact, not yet reached out
-- - 'Contacted': Admin has reached out to the lead
-- - 'Converted': Lead has converted to a paying customer/enrolled
-- - 'Follow-up': Lead needs follow-up communication
-- - 'Lost': Lead is no longer interested
--
-- The admin dashboard automatically calculates:
-- - Contacted Leads: COUNT(status = 'Contacted')
-- - Converted Leads: COUNT(status = 'Converted')
-- - Conversion Rate: (Converted Leads / Total Leads) * 100%
-- These metrics recalculate in real-time as leads are inserted or updated.

-- Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  interested_country TEXT NOT NULL,
  service TEXT,
  course TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  source TEXT NOT NULL DEFAULT 'website',
  notes TEXT
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

-- Create the admins table to manage admin users
CREATE TABLE IF NOT EXISTS public.admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads table

-- Policy: Allow anonymous users to INSERT new leads
DROP POLICY IF EXISTS "Allow anonymous leads insert" ON public.leads;
CREATE POLICY "Allow anonymous leads insert" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow SELECT only for authenticated users in the admins table
DROP POLICY IF EXISTS "Allow admins select" ON public.leads;
CREATE POLICY "Allow admins select" ON public.leads
  FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.admins WHERE user_id = auth.uid()
    )
  );

-- Policy: Allow UPDATE for authenticated admins to modify lead status
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

-- RLS Policies for admins table

-- Policy: Allow users to read only their own admin row
DROP POLICY IF EXISTS "Allow admin read own row" ON public.admins;
CREATE POLICY "Allow admin read own row" ON public.admins
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Allow admins to update their own row
DROP POLICY IF EXISTS "Allow admin update own row" ON public.admins;
CREATE POLICY "Allow admin update own row" ON public.admins
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime notifications (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;

-- Grant appropriate permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE ON public.admins TO authenticated;
