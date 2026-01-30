# Three.js Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 3D particles network background and tech showcase to portfolio using Three.js with lazy loading

**Architecture:** Modular Three.js setup with lazy loading via Intersection Observer. Particles background loads when hero section visible, tech showcase loads when skills section visible.

**Tech Stack:** Three.js r160, Vanilla JavaScript ES6 modules, Intersection Observer API

---

## Task 1: Create Directory Structure

**Files:**
- Create: `js/three/` (directory)

**Step 1: Create three directory**

```bash
mkdir -p js/three
```

**Step 2: Verify structure**

```bash
ls -la js/
```

Expected: `three/` directory exists in `js/`

**Step 3: Commit**

```bash
git add js/three/.gitkeep
git commit -m "feat: create three.js directory structure

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Implement Lazy Loader

**Files:**
- Create: `js/three/lazy-loader.js`

**Step 1: Create lazy loader module**

Create `js/three/lazy-loader.js`:

```javascript
// Lazy loader for Three.js components using Intersection Observer
export class ThreeLazyLoader {
    constructor() {
        this.loaded = {
            threeCore: false,
            particlesBg: false,
            techShowcase: false
        };
        this.THREE = null;
        this.observers = [];
    }

    async init() {
        this.setupHeroObserver();
        this.setupSkillsObserver();
    }

    setupHeroObserver() {
        const heroSection = document.querySelector('#home');
        if (!heroSection) {
            console.warn('Hero section not found');
            return;
        }

        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !this.loaded.particlesBg) {
                    await this.loadParticlesBackground();
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(heroSection);
        this.observers.push(observer);
    }

    setupSkillsObserver() {
        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) {
            console.warn('Skills section not found');
            return;
        }

        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && !this.loaded.techShowcase) {
                    await this.loadTechShowcase();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(skillsSection);
        this.observers.push(observer);
    }

    async loadThreeCore() {
        if (this.loaded.threeCore) return;

        try {
            const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
            this.THREE = THREE;
            this.loaded.threeCore = true;
            console.log('Three.js core loaded');
        } catch (error) {
            console.error('Failed to load Three.js:', error);
            throw error;
        }
    }

    async loadParticlesBackground() {
        try {
            // Load Three.js core first
            await this.loadThreeCore();

            // Import and initialize particles
            const { ParticlesBackground } = await import('./particles-bg.js');
            const particles = new ParticlesBackground('#home', this.THREE);
            particles.init();

            this.loaded.particlesBg = true;
            console.log('Particles background loaded');
        } catch (error) {
            console.error('Failed to load particles background:', error);
        }
    }

    async loadTechShowcase() {
        try {
            // Ensure Three.js is loaded
            await this.loadThreeCore();

            // Import and initialize tech showcase
            const { TechShowcase } = await import('./tech-showcase.js');
            const showcase = new TechShowcase('tech-showcase-canvas', this.THREE);
            showcase.init();

            this.loaded.techShowcase = true;
            console.log('Tech showcase loaded');
        } catch (error) {
            console.error('Failed to load tech showcase:', error);
        }
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Export singleton instance
export function initLazyLoader() {
    const loader = new ThreeLazyLoader();
    loader.init();
    return loader;
}
```

**Step 2: Verify file created**

```bash
cat js/three/lazy-loader.js | head -20
```

Expected: File shows ThreeLazyLoader class with constructor

**Step 3: Commit**

```bash
git add js/three/lazy-loader.js
git commit -m "feat: add Three.js lazy loader with Intersection Observer

- Loads Three.js core when hero section visible
- Loads particles background on scroll to hero
- Loads tech showcase on scroll to skills
- Graceful error handling and cleanup

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Implement Particles Background

**Files:**
- Create: `js/three/particles-bg.js`

**Step 1: Create particles background module**

Create `js/three/particles-bg.js`:

```javascript
// Particles network background with mouse interaction
export class ParticlesBackground {
    constructor(containerId, THREE) {
        this.container = document.querySelector(containerId);
        this.THREE = THREE;
        this.particleCount = this.isMobile() ? 50 : 100;
        this.particles = [];
        this.lines = null;
        this.mouse = { x: 0, y: 0, moved: false };
        this.raycaster = null;
        this.animationId = null;
    }

    isMobile() {
        return window.innerWidth < 768;
    }

    init() {
        this.setupScene();
        this.createCanvas();
        this.createParticles();
        this.createLines();
        this.setupMouseInteraction();
        this.animate();
        this.setupResize();
    }

    setupScene() {
        this.scene = new this.THREE.Scene();
        this.camera = new this.THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 400;

        this.raycaster = new this.THREE.Raycaster();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particles-bg-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '0';
        this.canvas.style.pointerEvents = 'none';

        this.container.insertBefore(this.canvas, this.container.firstChild);

        this.renderer = new this.THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createParticles() {
        const geometry = new this.THREE.SphereGeometry(2, 8, 8);

        for (let i = 0; i < this.particleCount; i++) {
            // Gradient color from purple to blue
            const t = i / this.particleCount;
            const color = new this.THREE.Color();
            color.setHex(this.interpolateColor(0xa78bfa, 0x60a5fa, t));

            const material = new this.THREE.MeshBasicMaterial({ color });
            const particle = new this.THREE.Mesh(geometry, material);

            // Random position
            particle.position.x = (Math.random() - 0.5) * 1000;
            particle.position.y = (Math.random() - 0.5) * 1000;
            particle.position.z = (Math.random() - 0.5) * 400;

            // Store original position for mouse interaction
            particle.userData.originalPosition = particle.position.clone();

            // Random floating parameters
            particle.userData.floatSpeed = Math.random() * 0.002 + 0.001;
            particle.userData.floatAmplitude = Math.random() * 30 + 10;
            particle.userData.floatOffset = Math.random() * Math.PI * 2;

            this.scene.add(particle);
            this.particles.push(particle);
        }
    }

    interpolateColor(color1, color2, factor) {
        const r1 = (color1 >> 16) & 0xff;
        const g1 = (color1 >> 8) & 0xff;
        const b1 = color1 & 0xff;

        const r2 = (color2 >> 16) & 0xff;
        const g2 = (color2 >> 8) & 0xff;
        const b2 = color2 & 0xff;

        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);

        return (r << 16) | (g << 8) | b;
    }

    createLines() {
        const positions = [];
        const colors = [];

        // Create line segments between close particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const distance = this.particles[i].position.distanceTo(this.particles[j].position);

                if (distance < 150) {
                    positions.push(
                        this.particles[i].position.x,
                        this.particles[i].position.y,
                        this.particles[i].position.z,
                        this.particles[j].position.x,
                        this.particles[j].position.y,
                        this.particles[j].position.z
                    );

                    const opacity = 1 - distance / 150;
                    colors.push(0.65, 0.55, 0.98, opacity); // Purple
                    colors.push(0.38, 0.65, 0.98, opacity); // Blue
                }
            }
        }

        const geometry = new this.THREE.BufferGeometry();
        geometry.setAttribute('position', new this.THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new this.THREE.Float32BufferAttribute(colors, 4));

        const material = new this.THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        this.lines = new this.THREE.LineSegments(geometry, material);
        this.scene.add(this.lines);
    }

    updateLines() {
        const positions = [];
        const colors = [];

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const distance = this.particles[i].position.distanceTo(this.particles[j].position);

                if (distance < 150) {
                    positions.push(
                        this.particles[i].position.x,
                        this.particles[i].position.y,
                        this.particles[i].position.z,
                        this.particles[j].position.x,
                        this.particles[j].position.y,
                        this.particles[j].position.z
                    );

                    const opacity = 1 - distance / 150;
                    colors.push(0.65, 0.55, 0.98, opacity);
                    colors.push(0.38, 0.65, 0.98, opacity);
                }
            }
        }

        this.lines.geometry.setAttribute('position', new this.THREE.Float32BufferAttribute(positions, 3));
        this.lines.geometry.setAttribute('color', new this.THREE.Float32BufferAttribute(colors, 4));
    }

    setupMouseInteraction() {
        const onMouseMove = (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.mouse.moved = true;
        };

        const onMouseLeave = () => {
            this.mouse.moved = false;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);

        this.eventListeners = { onMouseMove, onMouseLeave };
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Update particle positions
        this.particles.forEach((particle, i) => {
            const original = particle.userData.originalPosition;
            const speed = particle.userData.floatSpeed;
            const amplitude = particle.userData.floatAmplitude;
            const offset = particle.userData.floatOffset;

            // Floating animation
            particle.position.x = original.x + Math.sin(time * speed + offset) * amplitude;
            particle.position.y = original.y + Math.cos(time * speed + offset) * amplitude;

            // Mouse repulsion
            if (this.mouse.moved) {
                this.raycaster.setFromCamera(this.mouse, this.camera);
                const mousePosition = this.raycaster.ray.origin.clone();
                mousePosition.z = particle.position.z;

                const distance = particle.position.distanceTo(mousePosition);

                if (distance < 200) {
                    const direction = particle.position.clone().sub(mousePosition).normalize();
                    const repulsion = direction.multiplyScalar((200 - distance) * 0.5);
                    particle.position.add(repulsion);
                }
            } else {
                // Return to original position
                particle.position.lerp(original, 0.1);
            }
        });

        this.updateLines();
        this.renderer.render(this.scene, this.camera);
    }

    setupResize() {
        const onResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onResize);
        this.resizeListener = onResize;
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.eventListeners) {
            window.removeEventListener('mousemove', this.eventListeners.onMouseMove);
            window.removeEventListener('mouseleave', this.eventListeners.onMouseLeave);
        }

        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }

        this.particles.forEach(particle => {
            particle.geometry.dispose();
            particle.material.dispose();
        });

        if (this.lines) {
            this.lines.geometry.dispose();
            this.lines.material.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}
```

**Step 2: Verify file created**

```bash
wc -l js/three/particles-bg.js
```

Expected: File shows ~290 lines

**Step 3: Commit**

```bash
git add js/three/particles-bg.js
git commit -m "feat: add particles network background system

- Gradient particles (purple to blue)
- Dynamic connection lines (distance-based opacity)
- Mouse repulsion interaction
- Floating animation with sin/cos waves
- Mobile adaptive (50 vs 100 particles)
- Performance optimized with cleanup

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Implement Tech Showcase

**Files:**
- Create: `js/three/tech-showcase.js`

**Step 1: Create tech showcase module**

Create `js/three/tech-showcase.js`:

```javascript
// 3D tech showcase with rotating object and dynamic lighting
export class TechShowcase {
    constructor(canvasId, THREE) {
        this.canvasId = canvasId;
        this.THREE = THREE;
        this.animationId = null;
        this.isVisible = false;
    }

    init() {
        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id "${this.canvasId}" not found`);
            return;
        }

        this.setupScene();
        this.createLights();
        this.createObject();
        this.setupVisibilityObserver();
        this.setupResize();
        this.animate();
    }

    setupScene() {
        this.scene = new this.THREE.Scene();

        this.camera = new this.THREE.PerspectiveCamera(
            45,
            this.canvas.offsetWidth / this.canvas.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        this.renderer = new this.THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createLights() {
        // Ambient light
        const ambientLight = new this.THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new this.THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Point light (orbiting)
        this.pointLight = new this.THREE.PointLight(0x60a5fa, 0.8);
        this.pointLight.position.set(3, 0, 0);
        this.scene.add(this.pointLight);
    }

    createObject() {
        const geometry = new this.THREE.IcosahedronGeometry(1.5, 1);

        const material = new this.THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x4c1d95,
            emissiveIntensity: 0.3
        });

        this.object = new this.THREE.Mesh(geometry, material);
        this.scene.add(this.object);
    }

    setupVisibilityObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                this.isVisible = entries[0].isIntersecting;
                if (this.isVisible && !this.animationId) {
                    this.animate();
                } else if (!this.isVisible && this.animationId) {
                    cancelAnimationFrame(this.animationId);
                    this.animationId = null;
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(this.canvas);
        this.visibilityObserver = observer;
    }

    animate() {
        if (!this.isVisible) return;

        this.animationId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Rotate object
        this.object.rotation.y += 0.005;
        this.object.rotation.x = Math.sin(time * 0.5) * 0.1;

        // Orbit point light
        this.pointLight.position.x = Math.cos(time) * 3;
        this.pointLight.position.z = Math.sin(time) * 3;

        this.renderer.render(this.scene, this.camera);
    }

    setupResize() {
        const onResize = () => {
            const width = this.canvas.offsetWidth;
            const height = this.canvas.offsetHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        };

        window.addEventListener('resize', onResize);
        this.resizeListener = onResize;
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
        }

        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
        }

        if (this.object) {
            this.object.geometry.dispose();
            this.object.material.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}
```

**Step 2: Verify file created**

```bash
wc -l js/three/tech-showcase.js
```

Expected: File shows ~140 lines

**Step 3: Commit**

```bash
git add js/three/tech-showcase.js
git commit -m "feat: add 3D tech showcase with rotating object

- Low-poly icosahedron with metallic material
- Purple color with emissive glow
- Dynamic lighting (ambient, directional, orbiting point light)
- Continuous rotation with subtle wobble
- Pauses when out of viewport (battery saving)
- Responsive canvas sizing

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Update Skills Component with Canvas

**Files:**
- Modify: `components/skills.html:253` (after closing section tag)

**Step 1: Add canvas to skills section**

Add this before the closing `</section>` tag in `components/skills.html` (after line 252):

```html
            <!-- 3D Tech Showcase Canvas -->
            <div class="mt-16 flex justify-center">
                <div class="relative">
                    <canvas id="tech-showcase-canvas"
                            class="rounded-2xl border border-slate-700/50"
                            style="width: 800px; height: 600px; max-width: 100%;">
                    </canvas>
                    <div class="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-500/30">
                        <p class="text-xs text-slate-300 font-mono">WebGL • Three.js Demo</p>
                    </div>
                </div>
            </div>
```

**Step 2: Verify changes**

```bash
grep -A 5 "3D Tech Showcase" components/skills.html
```

Expected: Shows canvas element with id "tech-showcase-canvas"

**Step 3: Commit**

```bash
git add components/skills.html
git commit -m "feat: add 3D showcase canvas to skills section

- 800x600px canvas with responsive max-width
- Positioned at bottom of skills section
- Border and label for visual context

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Integrate Lazy Loader into Main App

**Files:**
- Modify: `js/app.js:29` (after initializeApp call)

**Step 1: Import and initialize lazy loader**

After line 29 (`initializeApp();`) in `js/app.js`, add:

```javascript
    // Initialize Three.js lazy loader
    import('./three/lazy-loader.js')
        .then(({ initLazyLoader }) => {
            initLazyLoader();
        })
        .catch(error => {
            console.error('Failed to initialize Three.js lazy loader:', error);
        });
```

**Step 2: Verify changes**

```bash
tail -20 js/app.js
```

Expected: Shows lazy loader import after initializeApp

**Step 3: Test in browser**

Open `index.html` in browser, check console for:
- "Three.js core loaded" when scrolling to hero
- "Particles background loaded"
- "Tech showcase loaded" when scrolling to skills

**Step 4: Commit**

```bash
git add js/app.js
git commit -m "feat: integrate Three.js lazy loader into main app

- Dynamically imports lazy-loader module
- Initializes after components load
- Graceful error handling if loader fails

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Manual Testing

**Files:**
- Test: All components

**Step 1: Start local server**

```bash
python3 -m http.server 8000
```

**Step 2: Test particles background**

1. Open http://localhost:8000 in browser
2. Scroll to hero section
3. Verify:
   - [ ] Particles appear (50-100 dots)
   - [ ] Lines connect nearby particles
   - [ ] Mouse movement causes repulsion
   - [ ] Particles float smoothly
   - [ ] Console shows "Particles background loaded"

**Step 3: Test tech showcase**

1. Scroll down to skills section
2. Verify:
   - [ ] Canvas appears at bottom of skills
   - [ ] Purple icosahedron rotates continuously
   - [ ] Light orbits around object
   - [ ] Subtle wobble animation
   - [ ] Console shows "Tech showcase loaded"

**Step 4: Test mobile responsiveness**

```bash
# Open DevTools, toggle device toolbar, test mobile view
```

Verify:
- [ ] Particles reduced to ~50 on mobile
- [ ] Canvas responsive (max-width: 100%)
- [ ] No performance issues
- [ ] Smooth 30fps on mobile

**Step 5: Test lazy loading**

1. Refresh page
2. Check Network tab - Three.js should NOT load immediately
3. Scroll to hero - Three.js loads now
4. Scroll to skills - tech-showcase.js loads now

**Step 6: Document any issues**

If issues found, note them for fixing.

---

## Task 8: Deploy to Vercel

**Files:**
- Deploy: Production

**Step 1: Check git status**

```bash
git status
```

Expected: Working tree clean, all changes committed

**Step 2: Deploy to production**

```bash
vercel --prod
```

**Step 3: Verify deployment**

Open: https://thangnt.vercel.app

Test:
- [ ] Particles background loads on scroll
- [ ] Tech showcase loads on scroll
- [ ] No console errors
- [ ] Performance acceptable (60fps desktop, 30fps mobile)

**Step 4: Final commit if needed**

If deployment required changes:

```bash
git add .
git commit -m "chore: production deployment fixes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Success Criteria Checklist

After all tasks completed, verify:

- [ ] Particles background animates smoothly behind hero
- [ ] Lines connect particles dynamically (distance < 150px)
- [ ] Mouse interaction works (repulsion effect within 200px)
- [ ] Tech showcase loads when skills section visible
- [ ] 3D object rotates with lighting effects
- [ ] No performance issues on desktop (60fps)
- [ ] Mobile works with reduced particles (30fps)
- [ ] Page loads fast (Three.js not in initial bundle)
- [ ] Lazy loading confirmed in Network tab
- [ ] No console errors
- [ ] Deployed successfully to production

---

## Notes

- **DRY**: Reusable ThreeLazyLoader for both components
- **YAGNI**: No extra features beyond requirements (no particle color picker, no showcase controls, etc.)
- **Performance**: Mobile detection, visibility observer, cleanup methods
- **Error Handling**: Try/catch on all dynamic imports, graceful degradation

---

## Rollback Plan

If Three.js integration causes issues:

```bash
git revert HEAD~8..HEAD
git push --force
vercel --prod
```

This will remove all Three.js changes and restore previous working state.
