// js/theme-engine.js

/**
 * Global Theme Engine
 * Manages loading, applying, and saving themes across the entire site.
 * Depends on themes.js being loaded first.
 */
const ThemeEngine = {
    // The key used to save the theme ID in the browser's local storage.
    storageKey: 'ulic-active-theme',

    // The default theme to use if none is saved.
    defaultTheme: 'tokyo-night',

    /**
     * Initializes the engine. This should be called once on every page load.
     * It loads the saved theme from localStorage and applies it.
     */
    init: function() {
        if (typeof themes === 'undefined') {
            console.error('ThemeEngine Error: themes.js is not loaded.');
            return;
        }
        const savedTheme = localStorage.getItem(this.storageKey) || this.defaultTheme;
        this.apply(savedTheme);
    },

    /**
     * Applies a theme by its ID and saves the choice to localStorage.
     * @param {string} themeId The ID of the theme to apply (e.g., 'synthwave-sunset').
     */
    apply: function(themeId) {
        let themeFound = false;
        // Search for the theme in the global 'themes' object.
        for (const category in themes) {
            if (themes[category][themeId]) {
                const themeVars = themes[category][themeId].vars;
                // Apply each CSS variable to the root element (<html>).
                for (const varName in themeVars) {
                    document.documentElement.style.setProperty(varName, themeVars[varName]);
                }
                themeFound = true;
                break;
            }
        }

        if (themeFound) {
            // Save the successful choice for persistence across pages.
            localStorage.setItem(this.storageKey, themeId);
            console.log(`Theme applied and saved: ${themeId}`);
        } else {
            console.warn(`ThemeEngine Warning: Theme "${themeId}" not found. Applying default.`);
            if (themeId !== this.defaultTheme) {
                this.apply(this.defaultTheme); // Avoid an infinite loop
            }
        }
    }
};

// Initialize the engine as soon as the script loads.
ThemeEngine.init();