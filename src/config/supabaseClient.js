import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqinaiyidwzbkvhpmmjv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxaW5haXlpZHd6Ymt2aHBtbWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Nzk2NjUsImV4cCI6MjA0NjU1NTY2NX0.yIpx-54Ab8CtmBHnSndXgxMlW8b5I8q0FVKhKXlaQ0Y';

// Test the connection
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Log successful connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
});

export default supabase; 