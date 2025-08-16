/**
 * @file Initializes the Supabase client and handles authentication.
 */

const supabaseUrl = 'https://auyijdnrccmtkuvzkkot.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eWlqZG5yY2NtdGt1dnpra290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDE4MDIsImV4cCI6MjA2NzI3NzgwMn0.hGZsssIYvHCjmGky8Udm575V5nJFrXNjThR766tyoss';

// Create and export the Supabase client
const sb = supabase.createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false
    }
});

// Handle authentication state changes
sb.auth.onAuthStateChange(async (event, session) => {
    console.log(`Supabase auth event: ${event}`, session);
    if (event === 'SIGNED_IN' && session?.user) {
        // Update user profile with ULIC email if needed
        const { data: profile } = await sb
            .from('users')
            .select('username')
            .eq('id', session.user.id)
            .single();

        if (!profile?.username) {
            await sb.from('users').upsert({
                id: session.user.id,
                username: session.user.email === 'ulictclub2024@gmail.com' ? 'ulictclub2024@gmail.com' : session.user.email
            });
        }
        window.location.href = '/pages/index.html';
    } else if (event === 'SIGNED_OUT') {
        window.location.href = '/pages/auth.html';
    }
});