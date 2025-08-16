/**
 * ULIC Navbar Engine (navbar.js)
 * This script is self-initializing. It fetches the navbar component,
 * injects it into the page, and manages all its functionality including
 * positioning, theme switching, and active link highlighting.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Self-executing function to load and initialize the navbar
    (async function initializeNavbar() {
        const placeholder = document.getElementById('navbar-placeholder');
        if (!placeholder) {
            console.error('Navbar placeholder div #navbar-placeholder not found.');
            return;
        }

        try {
            // Fetch the navbar HTML from the components directory
            const response = await fetch('../components/navbar.html');
            if (!response.ok) throw new Error('navbar.html not found.');
            
            placeholder.innerHTML = await response.text();
            
            // Once HTML is loaded, initialize all interactive elements
            runNavbarLogic();

        } catch (error) {
            console.error('Failed to load navbar:', error);
            placeholder.innerHTML = '<p style="color:red; text-align:center;">Navbar failed to load.</p>';
        }
    })();
});

function runNavbarLogic() {
    // --- ELEMENT SELECTORS ---
    const navContainer = document.getElementById('nav-container');
    const minimizeBtn = document.getElementById('minimize-btn');
    const optionsBtn = document.getElementById('nav-options-btn');
    const optionsMenu = document.getElementById('nav-options-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navContainer) return; // Exit if navbar HTML failed to load

    // --- STATE MANAGEMENT ---
    let navState = {
        position: localStorage.getItem('navPosition') || 'left',
        minimized: localStorage.getItem('navMinimized') === 'true',
    };

    // --- FUNCTIONS ---

    /** Applies all visual states based on the navState object */
    const applyNavState = () => {
        const isVertical = ['left', 'right'].includes(navState.position);
        
        // Update body padding for layout
        document.body.className = document.body.className.replace(/body-padding-.*/g, '');
        if (isVertical) {
            document.body.classList.add(`body-padding-${navState.position}`);
            if (navState.minimized) {
                document.body.classList.add('minimized');
            }
        } else {
            document.body.classList.add(`body-padding-${navState.position}`);
        }

        // Update navbar container classes
        navContainer.className = `position-${navState.position}`;
        if (isVertical && navState.minimized) {
            navContainer.classList.add('minimized');
        }

        // Update the active button in the options menu
        optionsMenu.querySelectorAll('button[data-position]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.position === navState.position);
        });
    };
    
    /** Sets the 'active' class on the current page's navigation link. */
    const setActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkPage = (link.getAttribute('href') || '').split('/').pop();
            link.classList.toggle('active', linkPage === currentPage);
        });
    };

    // --- EVENT LISTENERS ---

    minimizeBtn.addEventListener('click', () => {
        if (['left', 'right'].includes(navState.position)) {
            navState.minimized = !navState.minimized;
            localStorage.setItem('navMinimized', navState.minimized);
            applyNavState();
        }
    });

    optionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!optionsMenu.contains(e.target) && e.target !== optionsBtn) {
            optionsMenu.classList.remove('show');
        }
    });

    optionsMenu.addEventListener('click', (e) => {
        const button = e.target.closest('button[data-position]');
        if (button) {
            navState.position = button.dataset.position;
            navState.minimized = false; // Reset minimized state when changing position
            localStorage.setItem('navPosition', navState.position);
            localStorage.setItem('navMinimized', 'false');
            applyNavState();
            optionsMenu.classList.remove('show');
        }
    });

    // --- INITIALIZATION CALLS ---
    applyNavState();
    setActiveLink();
}