import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    console.warn("WARNING: NEXT_PUBLIC_SUPABASE_URL is missing");
}

// Public client for frontend (follows RLS)
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any);

if (!supabaseAnonKey && typeof window === 'undefined') {
    console.warn("WARNING: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
}

// Admin client for backend tasks (bypasses RLS)
// We only initialize this on the server side where the service role key is available
export const supabaseAdmin = (supabaseUrl && supabaseServiceRoleKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : (null as any);

if (!supabaseServiceRoleKey && typeof window === 'undefined') {
    console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is missing");
}
