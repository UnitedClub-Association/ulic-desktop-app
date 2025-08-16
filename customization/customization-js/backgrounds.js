/**
 * backgrounds.js
 * Defines a library of available animated backgrounds, now organized by category.
 * v2.0 - Major overhaul with 50+ designs.
 */
const BACKGROUNDS = {
    "Gradients & Patterns": {
        "synthwave-gradient": { name: "Synthwave Grid", type: 'shapes', html: `<div class="synth-sun"></div><div class="synth-grid"></div>` },
        "sunset-flare": { name: "Sunset Flare", type: 'gradient', css: `background: radial-gradient(ellipse at 70% 80%, #ee7752, #e73c7e, #23a6d5, #23d5ab); background-size: 200% 200%; animation: subtle-pan 25s ease infinite alternate;` },
        "aurora-borealis": { name: "Aurora", type: 'shapes', html: `<div class="aurora a1"></div><div class="aurora a2"></div><div class="aurora a3"></div>` },
        "molten-core": { name: "Molten Core", type: 'shapes', html: `<div class="lava-lamp"><div class="lava-blob"></div><div class="lava-blob"></div><div class="lava-blob"></div><div class="lava-blob"></div><div class="lava-blob"></div></div>` },
        "diagonal-stripes": { name: "Kinetic Stripes", type: 'gradient', css: `background: repeating-linear-gradient(45deg, var(--primary-glow) 0%, var(--primary-glow) 5%, var(--bg-color) 5%, var(--bg-color) 50%); background-size: 100px 100px; animation: slide-stripes 5s linear infinite;` },
        "polka-dots": { name: "Floating Orbs", type: 'shapes', html: `<div class="orb-container"><div class="orb"></div><div class="orb"></div><div class="orb"></div><div class="orb"></div><div class="orb"></div><div class="orb"></div><div class="orb"></div><div class="orb"></div></div>` },
        "honeycomb-grid": { name: "Pulsing Hexagons", type: 'shapes', html: `<div class="hex-grid-container"></div>` },
        "kaleidoscope": { name: "Kaleidoscope", type: 'shapes', html: `<div class="kaleido-slice"><div></div></div><div class="kaleido-slice"><div></div></div><div class="kaleido-slice"><div></div></div><div class="kaleido-slice"><div></div></div><div class="kaleido-slice"><div></div></div><div class="kaleido-slice"><div></div></div>` },
        "shifting-sands": { name: "Shifting Sands", type: 'gradient', css: ` --bg-sand: #f4a261; --bg-sand-dark: #e76f51; background: repeating-conic-gradient(var(--bg-sand) 0% 25%, var(--bg-sand-dark) 0% 50%) 50% / 200vmin 200vmin; animation: sand-swirl 15s ease-in-out infinite;` },
    },
    "Geometric & Shapes": {
        "tokyo-shapes": { name: "Tokyo Shapes", type: 'shapes', html: `<div class="shape shape1"></div><div class="shape shape2"></div><div class="shape shape3"></div><div class="shape shape4"></div><div class="shape shape5"></div><div class="shape shape6"></div><div class="shape shape7"></div><div class="shape shape8"></div><div class="shape shape9"></div><div class="shape shape10"></div><div class="shape shape11"></div><div class="shape shape12"></div>` },
        "geometric-dance": { name: "Geo Dance", type: 'shapes', html: `<div class="geo g1"></div><div class="geo g2"></div><div class="geo g3"></div><div class="geo g4"></div><div class="geo g5"></div>` },
        "minimal-lines": { name: "Minimal Lines", type: 'shapes', html: `<div class="line l1"></div><div class="line l2"></div><div class="line l3"></div><div class="line l4"></div>` },
        "hyperspace": { name: "Hyperspace", type: 'shapes', html: `<div class="hyperspace-container"></div>`},
        "wavy-lines": { name: "Wavy Lines", type: 'shapes', html: `<svg class="wavy-svg" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="wavy-pattern" patternUnits="userSpaceOnUse" width="100" height="100"><path class="wavy-path" d="M 0 50 Q 25 25, 50 50 T 100 50"></path></pattern></defs><rect width="100%" height="100%" fill="url(#wavy-pattern)"></rect></svg>` },
        "voxel-field": { name: "Voxel Field", type: 'shapes', html: `<div class="voxel-grid"></div>` },
        "art-deco-pattern": { name: "Art Deco Pattern", type: 'gradient', css: ` --c1: var(--primary-glow); --c2: var(--bg-secondary); background: radial-gradient(circle at 50% 50%, var(--c1) 2px, transparent 3px), radial-gradient(circle at 50% 50%, var(--c1) 2px, transparent 3px), var(--c2); background-size: 50px 50px; background-position: 0 0, 25px 25px; animation: pan-grid 10s linear infinite;` },
        "blueprint-grid": { name: "Blueprint Grid", type: 'gradient', css: ` background-color: #0d47a1; background-image: linear-gradient(var(--secondary-glow) 1px, transparent 1px), linear-gradient(90deg, var(--secondary-glow) 1px, transparent 1px); background-size: 40px 40px; animation: pan-grid 20s linear infinite;`},
    },
    "Organic & Natural": {
        "starfield": { name: "Starfield", type: 'shapes', html: `<div id="stars1"></div><div id="stars2"></div><div id="stars3"></div>` },
        "floating-bubbles": { name: "Bubbles", type: 'shapes', html: `<div class="bubble-wrapper"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>` },
        "rising-embers": { name: "Embers", type: 'shapes', html: `<div class="ember-wrapper"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>` },
        "drifting-snow": { name: "Snow", type: 'shapes', html: `<div class="snow-layer layer1"></div><div class="snow-layer layer2"></div><div class="snow-layer layer3"></div>` },
        "rain-fall": { name: "Rain", type: 'shapes', html: `<div class="rain-drop"></div><div class="rain-drop"></div><div class="rain-drop"></div><div class="rain-drop"></div><div class="rain-drop"></div><div class="rain-drop"></div><div class="rain-drop"></div><div class="rain-drop"></div>` },
        "underwater-caustics": { name: "Underwater Caustics", type: 'shapes', html: `<div class="caustics-layer"></div><div class="caustics-layer"></div>`},
        "fireflies": { name: "Fireflies", type: 'shapes', html: `<div class="firefly-container"></div>`},
        "gentle-clouds": { name: "Gentle Clouds", type: 'shapes', html: `<div class="cloud-bg"><div class="cloud c1"></div><div class="cloud c2"></div><div class="cloud c3"></div></div>`},
        "autumn-leaves": { name: "Autumn Leaves", type: 'shapes', html: `<div class="leaf-scene"><div>🍂</div><div>🍁</div><div>🍂</div><div>🍁</div><div>🍂</div><div>🍁</div><div>🍂</div><div>🍁</div></div>`},
    },
    "Sci-Fi & Tech": {
        "matrix-rain": { name: "Matrix", type: 'shapes', html: `<div class="matrix-container"></div>` },
        "circuit-board": { name: "Circuitry", type: 'shapes', html: `<div class="circuit-container"></div>` },
        "plexus-network": { name: "Plexus Network", type: 'shapes', html: `<div class="plexus-container"></div>`},
        "neural-network": { name: "Neural Network", type: 'shapes', html: `<canvas id="neural-canvas"></canvas>`}, // Requires JS logic to run
        "code-flow": { name: "Code Flow", type: 'shapes', html: `<div class="code-column"></div><div class="code-column"></div><div class="code-column"></div><div class="code-column"></div>`},
        "confetti-blast": { name: "Confetti", type: 'shapes', html: `<div class="confetti-container"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>` },
        "lighthouse-beam": { name: "Lighthouse Beam", type: 'shapes', html: `<div class="lighthouse-container"><div class="lighthouse-beam-anim"></div></div>`},
        "data-stream": { name: "Data Stream", type: 'shapes', html: `<div class="stream-container"></div>`},
    },
    "Abstract & Ethereal": {
        "cosmic-rift": { name: "Cosmic Rift", type: 'gradient', css: `background: radial-gradient(circle, #6a3093 0%, var(--bg-color) 70%); animation: spin 40s linear infinite, subtle-pulse 8s ease-in-out infinite alternate;`},
        "liquid-light": { name: "Liquid Light", type: 'shapes', html: `<div class="liquid-container"></div>` },
        "particle-storm": { name: "Particle Storm", type: 'shapes', html: `<div class="particle-container"></div>`},
        "solar-winds": { name: "Solar Winds", type: 'shapes', html: `<div class="wind-streak"></div><div class="wind-streak"></div><div class="wind-streak"></div><div class="wind-streak"></div><div class="wind-streak"></div>`},
        "metaballs": { name: "Metaballs", type: 'shapes', html: `<div class="metaballs-container"><div class="metaball m1"></div><div class="metaball m2"></div><div class="metaball m3"></div><div class="metaball m4"></div></div>`},
        "ethereal-fog": { name: "Ethereal Fog", type: 'shapes', html: `<div class="fog-layer fog1"></div><div class="fog-layer fog2"></div><div class="fog-layer fog3"></div>`},
        "quantum-foam": { name: "Quantum Foam", type: 'shapes', html: `<div class="foam-container"></div>`},
        "spirit-blossoms": { name: "Spirit Blossoms", type: 'shapes', html: `<div class="blossom-container"></div>`},
    },
    "Retro & Glitch": {
        "glitch-effect": { name: "Glitch", type: 'shapes', html: `<div class="glitch-img" data-text="GLITCH">GLITCH</div><div class="glitch-img" data-text="GLITCH">GLITCH</div><div class="glitch-img" data-text="GLITCH">GLITCH</div>`},
        "vhs-noise": { name: "VHS Noise", type: 'shapes', html: `<div class="vhs-scanlines"></div><div class="vhs-flicker"></div>` },
        "arcade-carpet": { name: "Arcade Carpet", type: 'gradient', css: ` --c1: #ff00ff; --c2: #00ffff; --c3: #ffff00; --s: 60px; background: repeating-linear-gradient(45deg, var(--c1) 0 5px, transparent 5px 10px), repeating-linear-gradient(-45deg, var(--c2) 0 5px, transparent 5px 10px), repeating-linear-gradient(0deg, var(--c3) 0 2px, transparent 2px 20px); animation: subtle-pan 30s linear infinite;` },
        "pixel-scape": { name: "Pixel Scape", type: 'shapes', html: `<div class="pixel-sky"></div><div class="pixel-sun"></div><div class="pixel-mountains"></div>`},
        "seventies-groove": { name: "70s Groove", type: 'gradient', css: ` background-color: #f7971e; background-image: repeating-linear-gradient(135deg, #cb2d3e 0px, #cb2d3e 20px, #ef473a 20px, #ef473a 40px, #f7971e 40px, #f7971e 60px); animation: slide-stripes 8s linear infinite;`},
    }
};