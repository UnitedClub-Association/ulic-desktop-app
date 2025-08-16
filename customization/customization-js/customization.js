document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('customization-content');
    const navPlaceholder = document.getElementById('customization-navbar-placeholder');
    let customCursorInstance;

    const loadHTML = async (url, targetElement) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            targetElement.innerHTML = await response.text();
        } catch (error) {
            console.error(error);
            targetElement.innerHTML = `<p style="color:red;">Error loading content.</p>`;
        }
    };

    const loadPage = async (page) => {
        if (customCursorInstance) {
            customCursorInstance.destroy();
            customCursorInstance = null;
        }
        
        await loadHTML(page, contentArea);
        
        if (page === 'themes.html') initializeThemeSelector();
        else if (page === 'backgrounds.html') initializeBackgroundSelector();
        else if (page === 'cursor.html') initializeCursorSelector();
        else if (page === 'user-info.html') initializeUserInfoForm();
    };

    const setActiveLink = (page) => {
        document.querySelectorAll('.customization-nav .nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });
    };

    const router = () => {
        const hash = window.location.hash.substring(1) || 'user-info';
        const link = document.querySelector(`.nav-link[href="#${hash}"]`);
        const page = link ? link.dataset.page : 'user-info.html';
        loadPage(page);
        setActiveLink(page);
    };

    // --- Page Initializers ---

    function initializeThemeSelector() {
        // ... (This function remains unchanged)
        const themeGrid = document.getElementById('theme-grid-container');
        if (!themeGrid || typeof themes === 'undefined') return;

        for (const category in themes) {
            for (const themeId in themes[category]) {
                const theme = themes[category][themeId];
                const button = document.createElement('button');
                button.className = 'theme-button';
                button.dataset.theme = themeId;
                button.textContent = theme.name;
                button.addEventListener('click', () => applyAndSaveTheme(themeId));
                themeGrid.appendChild(button);
            }
        }
        const currentTheme = localStorage.getItem(ThemeEngine.storageKey) || ThemeEngine.defaultTheme;
        applyAndSaveTheme(currentTheme);
    }

    /**
     * REWRITTEN: This function now builds the background selector UI
     * with categories based on the new structure in backgrounds.js.
     */
    function initializeBackgroundSelector() {
        const mainContainer = document.getElementById('background-grid-container');
        if (!mainContainer || typeof BACKGROUNDS === 'undefined') return;
        
        mainContainer.innerHTML = ''; // Clear previous content

        // Iterate over each category in the BACKGROUNDS object
        for (const categoryName in BACKGROUNDS) {
            // Create a title for the category
            const categoryTitle = document.createElement('h2');
            categoryTitle.className = 'background-category-title';
            categoryTitle.textContent = categoryName;
            mainContainer.appendChild(categoryTitle);

            // Create a grid container for this category's buttons
            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'theme-grid'; // Re-use the same grid style
            
            const backgroundsInCategory = BACKGROUNDS[categoryName];
            
            // Iterate over each background within the category
            for (const bgId in backgroundsInCategory) {
                const bg = backgroundsInCategory[bgId];
                const button = document.createElement('button');
                button.className = 'theme-button';
                button.dataset.background = bgId;
                button.textContent = bg.name;
                button.addEventListener('click', () => applyAndSaveBackground(bgId));
                categoryGrid.appendChild(button);
            }
            
            mainContainer.appendChild(categoryGrid);
        }

        // Apply the currently active background
        const currentBg = localStorage.getItem(BackgroundEngine.storageKey) || BackgroundEngine.defaultBackground;
        applyAndSaveBackground(currentBg);
    }

    function initializeCursorSelector() { /* ... (This function remains unchanged) */ }
    function initializeUserInfoForm() { /* ... (This function remains unchanged) */ }

    // --- Apply & Save Functions ---

    function applyAndSaveTheme(themeId) {
        ThemeEngine.apply(themeId);
        document.querySelectorAll('.theme-button[data-theme]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeId);
        });
    }

    function applyAndSaveBackground(backgroundId) {
        BackgroundEngine.apply(backgroundId);
        document.querySelectorAll('.theme-button[data-background]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.background === backgroundId);
        });
    }

    // --- Initial Load ---
    loadHTML('customization-navbar.html', navPlaceholder).then(() => {
        window.addEventListener('hashchange', router);
        router();
    });
});
