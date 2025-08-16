/**
 * Custom Cursor Engine (cursor.js)
 *
 * This script creates a highly customizable, animated cursor.
 * It's designed to be instantiated and controlled by another script.
 *
 * Features:
 * - Smooth, performant animation using GSAP.
 * - Two-element cursor (dot and outline) for rich effects.
 * - Hover and click/mousedown effects.
 * - An extensive, categorized library of cursor designs.
 * - Dynamic style injection for seamless theme switching.
 */

// A vast library of cursor designs, categorized for easy browsing.
const CURSOR_DESIGNS = {
    "Minimalist & Modern": {
        "default-glow": {
            name: "Default Glow",
            css: `
                .cursor-dot { background-color: var(--cursor-primary); transition: transform 0.2s; }
                .cursor-outline { border: 2px solid var(--cursor-primary); transition: transform 0.3s, opacity 0.3s; }
                .is-hovering .cursor-outline { transform: scale(2.5); opacity: 0.5; }
                .is-down .cursor-dot { transform: scale(0.7); }
                .is-down .cursor-outline { transform: scale(1.5); }
            `
        },
        "simple-dot": {
            name: "Simple Dot",
            css: `
                .cursor-dot { background-color: var(--cursor-primary); transform: scale(1.5); }
                .cursor-outline { display: none; }
                .is-hovering .cursor-dot { transform: scale(2); }
            `
        },
        "outline-only": {
            name: "Outline Only",
            css: `
                .cursor-dot { display: none; }
                .cursor-outline { border: 2px solid var(--cursor-primary); }
                .is-hovering .cursor-outline { background-color: var(--cursor-primary-alpha-1); }
            `
        },
        "square-up": {
            name: "Square Up",
            css: `
                .cursor-dot { width: 8px; height: 8px; border-radius: 0; background-color: var(--cursor-primary); }
                .cursor-outline { width: 30px; height: 30px; border-radius: 0; border: 2px solid var(--cursor-primary); }
                .is-hovering .cursor-outline { transform: rotate(45deg) scale(1.2); }
            `
        },
        "diamond-dust": {
            name: "Diamond Dust",
            css: `
                .cursor-dot { width: 10px; height: 10px; background-color: var(--cursor-secondary); transform: rotate(45deg); }
                .cursor-outline { width: 30px; height: 30px; border: 2px solid var(--cursor-primary); transform: rotate(45deg); }
                .is-hovering .cursor-outline { background-color: var(--cursor-primary-alpha-1); transform: rotate(45deg) scale(1.5); }
            `
        },
        "crosshair": {
            name: "Crosshair",
            css: `
                .cursor-dot { display: none; }
                .cursor-outline { background: none; border: none; }
                .cursor-outline::before, .cursor-outline::after { content: ''; position: absolute; top: 50%; left: 50%; background: var(--cursor-primary); }
                .cursor-outline::before { width: 2px; height: 30px; transform: translate(-50%, -50%); }
                .cursor-outline::after { width: 30px; height: 2px; transform: translate(-50%, -50%); }
                .is-hovering .cursor-outline { transform: scale(1.2); }
            `
        },
        "line-pulse": {
            name: "Line Pulse",
            css: `
                .cursor-dot { background-color: var(--cursor-primary); }
                .cursor-outline { width: 50px; height: 2px; border-radius: 1px; border: none; background-color: var(--cursor-primary); }
                .is-hovering .cursor-outline { animation: pulse 1s infinite; }
                @keyframes pulse { 0% { transform: scaleX(1); } 50% { transform: scaleX(1.5); } 100% { transform: scaleX(1); } }
            `
        },
    },
    "Sci-Fi & Tech": {
        "sci-fi-target": {
            name: "Target Acquired",
            css: `
                .cursor-dot { background: var(--cursor-secondary); border-radius: 50%; }
                .cursor-outline { border: none; }
                .cursor-outline::before, .cursor-outline::after { content: ''; position: absolute; top: 50%; left: 50%; border: 2px solid var(--cursor-primary); border-radius: 50%; transform: translate(-50%, -50%); }
                .cursor-outline::before { width: 40px; height: 40px; }
                .cursor-outline::after { width: 30px; height: 30px; border-style: dashed; animation: spin 4s linear infinite; }
                .is-hovering .cursor-outline::after { border-color: var(--cursor-secondary); }
            `
        },
        "glitch-effect": {
            name: "Glitch Effect",
            css: `
                .cursor-dot { background: var(--cursor-primary); box-shadow: 0 0 5px var(--cursor-primary); }
                .cursor-outline { border: 2px solid var(--cursor-secondary); }
                .is-hovering .cursor-dot, .is-hovering .cursor-outline { animation: glitch 0.5s infinite; }
                @keyframes glitch {
                    0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); }
                }
            `
        },
        "binary-stream": {
            name: "Binary Stream",
            html: `<span style="font-size: 8px; color: var(--cursor-primary); animation: spin 2s linear infinite;">101</span>`,
            css: `
                .cursor-dot { background: var(--cursor-secondary); }
                .cursor-outline { border: 2px dotted var(--cursor-primary); }
                .is-hovering .cursor-outline { transform: scale(1.5); }
            `
        },
        "hex-grid": {
            name: "Hex Grid",
            css: `
                .cursor-dot { background: var(--cursor-secondary); clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
                .cursor-outline { border: 2px solid var(--cursor-primary); clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
                .is-hovering .cursor-outline { transform: scale(1.2) rotate(60deg); }
            `
        },
        "scanner-sweep": {
            name: "Scanner Sweep",
            css: `
                .cursor-dot { display: none; }
                .cursor-outline { border: 2px solid var(--cursor-primary); overflow: hidden; }
                .cursor-outline::after { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, var(--cursor-secondary-alpha-2), transparent); animation: sweep 2s linear infinite; }
                @keyframes sweep { 0% { left: -100%; } 100% { left: 100%; } }
            `
        },
    },
    "Fantasy & Mystical": {
        "magic-orb": {
            name: "Magic Orb",
            css: `
                .cursor-dot { background: radial-gradient(circle, var(--cursor-secondary), var(--cursor-primary)); box-shadow: 0 0 10px var(--cursor-secondary); }
                .cursor-outline { border: 2px solid transparent; border-radius: 50%; animation: aura 2s infinite alternate; }
                @keyframes aura {
                    from { box-shadow: 0 0 15px -5px var(--cursor-primary); }
                    to { box-shadow: 0 0 15px 5px var(--cursor-secondary); }
                }
            `
        },
        "rune-circle": {
            name: "Rune Circle",
            html: `<svg viewbox="0 0 100 100" style="width: 100%; height: 100%; animation: spin 10s linear infinite;"><text x="50" y="55" font-size="50" text-anchor="middle" fill="var(--cursor-primary)">✧</text></svg>`,
            css: `
                .cursor-dot { display: none; }
                .cursor-outline { border: 2px solid var(--cursor-secondary); }
                .is-hovering .cursor-outline { transform: scale(1.2); }
            `
        },
        "ghostly-wisp": {
            name: "Ghostly Wisp",
            css: `
                .cursor-dot { background: var(--cursor-primary); filter: blur(2px); }
                .cursor-outline { border: 2px solid var(--cursor-secondary); border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; animation: morph 5s linear infinite; filter: blur(1px); }
                @keyframes morph {
                    0% { transform: rotate(0deg); border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
                    100% { transform: rotate(360deg); border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
                }
            `
        },
        "dragon-flame": {
            name: "Dragon Flame",
            css: `
                .cursor-dot { background: var(--cursor-secondary); }
                .cursor-outline { width: 20px; height: 40px; border: none; background: var(--cursor-primary); clip-path: path('M10 40 C 10 40, 0 25, 0 15 C 0 0, 10 0, 10 0 C 10 0, 20 0, 20 15 C 20 25, 10 40, 10 40 Z'); animation: flicker 0.3s infinite; }
                @keyframes flicker { 50% { transform: scale(1.1) translateY(-5px); opacity: 0.8; } }
            `
        },
    },
    "Playful & Fun": {
        "bouncy-ball": {
            name: "Bouncy Ball",
            css: `
                .cursor-dot { background: var(--cursor-primary); transition: transform 0.1s; }
                .cursor-outline { border: 2px solid var(--cursor-secondary); }
                .is-down .cursor-dot { transform: scale(2); }
                .is-hovering .cursor-outline { animation: bounce 0.5s; }
                @keyframes bounce { 50% { transform: scale(1.4); } }
            `
        },
        "emoji-face": {
            name: "Emoji Face",
            html: `<span>😊</span>`,
            css: `
                .cursor-dot { display: none; }
                .cursor-outline { border: none; font-size: 30px; }
                .is-hovering .cursor-outline { animation: spin 2s; }
            `
        },
        "comet-tail": {
            name: "Comet Tail",
            css: `
                .cursor-dot { background-color: var(--cursor-primary); box-shadow: 0 0 10px var(--cursor-primary); }
                .cursor-outline { border: none; }
                /* The tail is achieved by the rapid GSAP transition */
            `
        },
        "splat": {
            name: "Splat",
            css: `
                .cursor-dot { background: var(--cursor-primary); }
                .cursor-outline { border: 2px solid var(--cursor-secondary); border-radius: 55% 45% 42% 58% / 60% 58% 42% 40%; }
                .is-down .cursor-outline { transform: scale(1.5); border-radius: 45% 55% 62% 38% / 50% 48% 52% 50%; }
            `
        },
        "star-burst": {
            name: "Star Burst",
            html: `<span>✦</span>`,
            css: `
                .cursor-dot { display: none; }
                .cursor-outline { border: none; font-size: 30px; color: var(--cursor-primary); }
                .is-hovering .cursor-outline { color: var(--cursor-secondary); transform: scale(1.5) rotate(180deg); }
            `
        }
    }
};

// Auto-generate more designs by combining styles and shapes to reach 100+
const baseShapes = {
    'circle': '',
    'square': 'border-radius: 0;',
    'diamond': 'transform: rotate(45deg);',
    'triangle': 'width: 0; height: 0; background: none; border-left: 15px solid transparent; border-right: 15px solid transparent; border-bottom: 25px solid var(--cursor-primary); border-radius: 0;'
};
const baseEffects = {
    'pulse': 'animation: pulse 1.5s infinite;',
    'spin': 'animation: spin 3s linear infinite;',
    'glow': 'box-shadow: 0 0 10px var(--cursor-primary);',
    'dashed': 'border-style: dashed;',
    'dotted': 'border-style: dotted;',
};
let designCount = Object.values(CURSOR_DESIGNS).reduce((acc, cat) => acc + Object.keys(cat).length, 0);

for (const [shapeId, shapeCss] of Object.entries(baseShapes)) {
    for (const [effectId, effectCss] of Object.entries(baseEffects)) {
        if (designCount >= 101) break;
        const id = `${shapeId}-${effectId}`;
        const name = `${shapeId.charAt(0).toUpperCase() + shapeId.slice(1)} ${effectId.charAt(0).toUpperCase() + effectId.slice(1)}`;

        // Avoid creating duplicates
        if (!Object.values(CURSOR_DESIGNS).some(cat => cat[id])) {
            CURSOR_DESIGNS["Generated & Hybrid"] = CURSOR_DESIGNS["Generated & Hybrid"] || {};
            CURSOR_DESIGNS["Generated & Hybrid"][id] = {
                name: name,
                css: `
                    .cursor-dot { background-color: var(--cursor-secondary); ${shapeCss.includes('transform') ? shapeCss : ''} }
                    .cursor-outline { border: 2px solid var(--cursor-primary); ${shapeCss} ${effectCss} }
                    .is-hovering .cursor-outline { transform: scale(1.3) ${shapeCss.includes('rotate') ? 'rotate(45deg)' : ''}; }
                `
            };
            designCount++;
        }
    }
}

class CustomCursor {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            speed: 0.2, // GSAP animation speed
            ...options
        };

        this.container = this.options.container;
        this.cursor = null;
        this.dot = null;
        this.outline = null;
        this.styleTag = null;

        this.cursorX = 0;
        this.cursorY = 0;
        this.posX = 0;
        this.posY = 0;

        this.init();
    }

    init() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.dot = document.createElement('div');
        this.dot.className = 'cursor-dot';
        this.outline = document.createElement('div');
        this.outline.className = 'cursor-outline';

        this.cursor.appendChild(this.dot);
        this.cursor.appendChild(this.outline);
        this.container.appendChild(this.cursor);

        this.styleTag = document.createElement('style');
        document.head.appendChild(this.styleTag);

        this.initEventListeners();
        this.animate();

        // Set initial default design and colors
        this.setDesign('default-glow');
        this.setColor('#7aa2f7', '#bb9af7'); // Default to Tokyo Night colors
    }

    initEventListeners() {
        window.addEventListener('mousemove', e => {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
        });

        document.addEventListener('mousedown', () => this.cursor.classList.add('is-down'));
        document.addEventListener('mouseup', () => this.cursor.classList.remove('is-down'));

        // Use a more robust way to find interactive elements
        const interactiveSelector = 'a, button, input, select, textarea, [data-cursor-hover]';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactiveSelector)) {
                this.cursor.classList.add('is-hovering');
            } else {
                this.cursor.classList.remove('is-hovering');
            }
        });
    }

    animate() {
        gsap.to({}, {
            duration: 0.016,
            repeat: -1,
            onRepeat: () => {
                this.posX += (this.cursorX - this.posX) * this.options.speed;
                this.posY += (this.cursorY - this.posY) * this.options.speed;
                gsap.set(this.cursor, {
                    css: { left: this.posX, top: this.posY }
                });
            }
        });
    }

    setDesign(designId) {
        let design;
        for (const category in CURSOR_DESIGNS) {
            if (CURSOR_DESIGNS[category][designId]) {
                design = CURSOR_DESIGNS[category][designId];
                break;
            }
        }

        if (!design) {
            console.warn(`Cursor design "${designId}" not found. Using default.`);
            design = CURSOR_DESIGNS['Minimalist & Modern']['default-glow'];
        }

        this.dot.innerHTML = design.html || '';

        const baseCss = `
            .custom-cursor { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; mix-blend-mode: difference; }
            .cursor-dot, .cursor-outline { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; transition: transform 0.2s, opacity 0.2s; }
            .cursor-dot { width: 8px; height: 8px; }
            .cursor-outline { width: 40px; height: 40px; }
            @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        `;
        this.styleTag.innerHTML = baseCss + (design.css || '');
    }

    setColor(primary, secondary) {
        document.documentElement.style.setProperty('--cursor-primary', primary);
        document.documentElement.style.setProperty('--cursor-secondary', secondary || primary);
    }

    /**
     * NEW METHOD: Removes the cursor elements and event listeners from the page.
     */
    destroy() {
        // Stop the animation loop
        gsap.killTweensOf({});

        // Remove event listeners
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mousedown', this.mouseDownHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
        document.removeEventListener('mouseover', this.mouseOverHandler);

        // Remove DOM elements
        if (this.cursor) {
            this.cursor.remove();
            this.cursor = null;
        }
        if (this.styleTag) {
            this.styleTag.remove();
            this.styleTag = null;
        }
    }
}