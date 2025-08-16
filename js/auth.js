document.addEventListener('DOMContentLoaded', () => {
    // --- SUPABASE INITIALIZATION ---
    const SUPABASE_URL = 'https://auyijdnrccmtkuvzkkot.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eWlqZG5yY2NtdGt1dnpra290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDE4MDIsImV4cCI6MjA2NzI3NzgwMn0.hGZsssIYvHCjmGky8Udm575V5nJFrXNjThR766tyoss';
    
    // Check if supabase is available
    if (!window.supabase) {
        console.error("Supabase client is not loaded.");
        return;
    }
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // --- DOM ELEMENT SELECTION ---
    const container = document.getElementById('auth-container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const themeToggle = document.getElementById('theme-toggle');

    // Forms
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Error Message Divs
    const loginErrorDiv = document.getElementById('login-error-message');
    const signupErrorDiv = document.getElementById('signup-error-message');

    // --- FORM SWITCHING LOGIC ---
    const toggleForms = () => {
        container.classList.toggle('active');
    };
    
    if (registerBtn && loginBtn) {
        registerBtn.addEventListener('click', toggleForms);
        loginBtn.addEventListener('click', toggleForms);
    }

    // Mobile Toggling (since overlay is hidden)
    const setupMobileToggle = () => {
        if (window.innerWidth <= 768) {
            // Create buttons if they don't exist for mobile
            let mobileRegisterBtn = document.querySelector('.sign-in .hidden');
            if (!mobileRegisterBtn) {
                mobileRegisterBtn = document.createElement('button');
                mobileRegisterBtn.innerText = 'Sign Up';
                mobileRegisterBtn.className = 'hidden';
                document.querySelector('.sign-in form').appendChild(mobileRegisterBtn);
            }
            
            let mobileLoginBtn = document.querySelector('.sign-up .hidden');
            if (!mobileLoginBtn) {
                mobileLoginBtn = document.createElement('button');
                mobileLoginBtn.innerText = 'Log In';
                mobileLoginBtn.className = 'hidden';
                document.querySelector('.sign-up form').appendChild(mobileLoginBtn);
            }
            
            mobileRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleForms();
            });
            mobileLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleForms();
            });
        }
    };
    
    // --- THEME TOGGLER LOGIC ---
    const applyTheme = (theme) => {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme);
        themeToggle.checked = theme === 'dark-theme';
        localStorage.setItem('theme', theme);
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark-theme' : 'light-theme';
        applyTheme(newTheme);
    });

    // Load saved theme on startup
    const savedTheme = localStorage.getItem('theme') || 'dark-theme'; // Default to dark
    applyTheme(savedTheme);


    // --- PASSWORD VISIBILITY TOGGLE ---
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const passwordInput = button.previousElementSibling;
            const icon = button.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    });
    
    // --- UTILITY FUNCTIONS ---
    const showErrorMessage = (div, message) => {
        div.textContent = message;
        setTimeout(() => { div.textContent = ''; }, 5000);
    };

    // --- AUTHENTICATION LOGIC ---

    // Login Handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        loginErrorDiv.textContent = '';

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            showErrorMessage(loginErrorDiv, error.message);
        } else {
            // Redirect to a dashboard or home page on successful login
            // NOTE: In Electron, you might handle this differently, e.g., by sending a message to the main process.
            window.location.href = '../index.html'; 
        }
    });

    // Signup Handler
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const classValue = document.getElementById('signup-class').value;
        const section = document.getElementById('signup-section').value;
        signupErrorDiv.textContent = '';

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    class: classValue,
                    section: section,
                }
            }
        });

        if (error) {
            showErrorMessage(signupErrorDiv, error.message);
        } else {
            // Show a success message and maybe toggle to the login form
            showErrorMessage(signupErrorDiv, 'Success! Please check your email for a verification link.');
             setTimeout(() => {
                container.classList.remove('active'); // Switch to login view
            }, 3000);
        }
    });
    
    // OAuth Handlers for ELECTRON
    const handleOAuthLogin = async (provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                // Use the iOS Client ID for the desktop app
                clientId: '814510320922-jubhspa8tosqv60t59gd6g0o5kfadejq.apps.googleusercontent.com',
                // Use the custom URI scheme for the redirect
                redirectTo: 'ulic-desktop-app://login-callback',
            },
        });
        if (error) {
            showErrorMessage(loginErrorDiv, `Error with ${provider} login: ${error.message}`);
        }
    };
    
    document.querySelectorAll('.google-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleOAuthLogin('google');
        });
    });

    // Forgot Password Handler
    document.querySelector('.forgot-password').addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        if (!email) {
            showErrorMessage(loginErrorDiv, 'Please enter your email address first.');
            return;
        }

        // For Electron, you might want to redirect to a dedicated "Check your email" page
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.href,
        });

        if (error) {
            showErrorMessage(loginErrorDiv, error.message);
        } else {
            showErrorMessage(loginErrorDiv, 'Password reset link has been sent to your email.');
        }
    });
    
    // Initial setup calls
    setupMobileToggle();
    window.addEventListener('resize', setupMobileToggle);
});