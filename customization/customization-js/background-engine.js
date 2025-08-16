/**
 * Background Engine
 * Manages loading, applying, and saving backgrounds across the site.
 * Depends on backgrounds.js being loaded first.
 */
const BackgroundEngine = {
    storageKey: 'ulic-active-background',
    defaultBackground: 'tokyo-shapes',
    containerId: 'dynamic-background-container',

    /**
     * NEW HELPER FUNCTION: Finds a background by its ID, searching through all categories.
     * This is the critical fix for the "disappearing backgrounds" bug.
     * @param {string} backgroundId - The unique key of the background to find.
     * @returns {object|null} The background object or null if not found.
     */
    findBackgroundById: function(backgroundId) {
        for (const categoryName in BACKGROUNDS) {
            if (BACKGROUNDS[categoryName][backgroundId]) {
                return BACKGROUNDS[categoryName][backgroundId];
            }
        }
        console.warn(`Background with ID "${backgroundId}" could not be found in any category.`);
        return null;
    },

    init: function() {
        if (typeof BACKGROUNDS === 'undefined') {
            console.error('BackgroundEngine Error: backgrounds.js is not loaded.');
            return;
        }
        const savedBackground = localStorage.getItem(this.storageKey) || this.defaultBackground;
        this.apply(savedBackground);
    },

    apply: function(backgroundId) {
        // FIX: Use the new helper function to find the background.
        const background = this.findBackgroundById(backgroundId);
        const container = document.getElementById(this.containerId);

        if (!container) {
            console.error(`Background container #${this.containerId} not found.`);
            return;
        }
        
        if (!background) {
            // If the requested background isn't found, try applying the default.
            if (backgroundId !== this.defaultBackground) {
                this.apply(this.defaultBackground);
            }
            return;
        }

        // Clear previous background styles and content
        container.innerHTML = '';
        container.style.cssText = '';

        switch (background.type) {
            case 'shapes':
                container.innerHTML = background.html || '';
                break;
            case 'gradient':
            case 'pattern': // Added for future use
                container.style.cssText = background.css || '';
                break;
        }

        localStorage.setItem(this.storageKey, backgroundId);
    }
};

// Initialize the engine after the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
    BackgroundEngine.init();
});
