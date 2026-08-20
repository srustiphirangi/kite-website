import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  // In dev, missing envs should be obvious in console — avoid throwing at import time
  console.warn('Missing Supabase env vars: VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY');
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_KEY ?? '');

export default supabase;
