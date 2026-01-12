import { createClient } from '@supabase/supabase-js';

// Supabase URL and Key retrieved from env file. 
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

// Initialises the Supabase client.
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// COMMENTED OUT DUE TO NOT IMPLEMENTING AUTH YET
// export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
//     auth: {
//         storage: localStorage,
//         autoRefreshToken: true,
//         persistSession: true,
//         detectSessionInUrl: false,
//     },
// });