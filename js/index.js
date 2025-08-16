document.addEventListener('DOMContentLoaded', async () => {
    /**
     * Debounces a function to limit execution frequency.
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    /**
     * Fetches and loads the navbar HTML and its JavaScript.
     */
    const loadNavbar = async () => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (!navbarPlaceholder) {
            console.error('Navbar placeholder not found!');
            return;
        }

        try {
            const response = await fetch('../components/navbar.html');
            if (!response.ok) throw new Error('Network response was not ok');
            navbarPlaceholder.innerHTML = await response.text();

            const navbarScript = document.createElement('script');
            navbarScript.src = '../js/navbar.js';
            document.body.appendChild(navbarScript);
        } catch (error) {
            console.error('Failed to load navbar:', error);
            navbarPlaceholder.innerHTML = '<p style="color:#FF8C00;">Error: Could not load navigation bar.</p>';
        }
    };

    /**
     * Loads and renders events and projects.
     */
    const loadContent = async () => {
        try {
            // Fetch and render events (limit to 4 for homepage)
            const events = await fetchAllEvents();
            const recentEvents = events.slice(0, 4);
            renderCards('events-grid', recentEvents);

            // Fetch and render projects (limit to 4 for homepage)
            const projects = await fetchAllProjects();
            const recentProjects = projects.slice(0, 4);
            renderCards('projects-grid', recentProjects);
        } catch (error) {
            console.error('Failed to load content:', error);
            document.getElementById('events-grid').innerHTML = '<p style="color:#FF8C00;">Error: Could not load events.</p>';
            document.getElementById('projects-grid').innerHTML = '<p style="color:#FF8C00;">Error: Could not load projects.</p>';
        }
    };

    // Initialize navbar and content
    await Promise.all([loadNavbar(), loadContent()]);

    // Handle "View All" button clicks
    document.querySelectorAll('.view-all-btn').forEach(btn => {
        btn.addEventListener('click', debounce((e) => {
            e.preventDefault();
            window.location.href = e.target.getAttribute('href');
        }, 100));
    });
});