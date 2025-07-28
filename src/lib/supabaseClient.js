// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // fail fast with a clearer message
  throw new Error(
    'Missing Supabase env vars. Did you create .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY?'
  );
}

export const supabase =  // cached for HMR
  globalThis.supabase ??
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    realtime: { enabled: false }
  });

if (import.meta.env.DEV) globalThis.supabase = supabase;
