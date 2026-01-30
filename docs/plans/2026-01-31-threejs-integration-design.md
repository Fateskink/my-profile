# Three.js Integration Design

**Date**: 2026-01-31
**Author**: Claude (Brainstorming with Thăng)
**Status**: Approved

---

## Overview

Integrate Three.js into the portfolio website to add:
1. **3D Particles Network Background** - Animated dots with connecting lines running behind all content
2. **Skills Section 3D Showcase** - Mini WebGL demo with rotating 3D tech object

---

## Requirements

### Particles Background
- **Style**: Particles network with dots and connecting lines
- **Colors**: Purple/blue gradient matching theme (`#a78bfa` to `#60a5fa`)
- **Interactivity**: Mouse-reactive (repulsion effect)
- **Density**: Light (50-100 particles, mobile-adaptive)
- **Location**: Full-page background behind hero section

### Skills Showcase
- **Type**: Mini WebGL demo scene
- **Content**: Rotating 3D tech object (low-poly icosahedron)
- **Features**: Metallic material with dynamic lighting, reflections
- **Size**: 800x600px canvas centered in skills section
- **Performance**: Pauses when not visible

### Loading Strategy
- **Lazy load on scroll** using Intersection Observer
- Three.js loaded only when hero section comes into view
- Tech showcase loaded when skills section visible

---

## Architecture

### File Structure

```
profile/
├── js/
│   ├── app.js                    # Existing (add lazy loader init)
│   ├── three/
│   │   ├── particles-bg.js       # Particles network system
│   │   ├── tech-showcase.js      # Skills section 3D demo
│   │   └── lazy-loader.js        # Intersection Observer loader
├── components/
│   ├── skills.html               # Add canvas placeholder
│   └── ...                       # Other existing components
```

### Loading Flow

1. **Page loads** → No Three.js loaded (fast first paint)
2. **User scrolls to hero** → Lazy-loader detects, loads Three.js core + particles-bg.js
3. **User scrolls to skills** → Lazy-loader loads tech-showcase.js

### Integration Points

- `js/app.js` line 29: After `initializeApp()`, call `initLazyLoader()`
- `components/skills.html`: Add `<canvas id="tech-showcase-canvas"></canvas>`
- Both canvases positioned `absolute` with `z-index: 0` behind content

---

## Component Details

### 1. Particles Background (`particles-bg.js`)

**Class**: `ParticlesBackground`

**Constructor**:
```javascript
constructor(containerId) {
    this.container = document.querySelector(containerId);
    this.particleCount = this.isMobile() ? 50 : 100;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
}
```

**Particles**:
- Geometry: `THREE.SphereGeometry(2, 8, 8)` - small spheres
- Material: `THREE.MeshBasicMaterial` with gradient colors
- Colors: Purple `#a78bfa` to Blue `#60a5fa`
- Positions: Random in bounds (-500 to 500) on x, y, z axes
- Movement: Slow floating with `Math.sin/cos` waves (amplitude: ±30px)

**Connection Lines**:
- Type: `THREE.LineSegments` with `LineBasicMaterial`
- Logic: Connect particles if distance < 150px
- Opacity: `1 - (distance / 150)` - fades with distance
- Update: Every frame to follow particle positions

**Mouse Interaction**:
- Raycaster detects mouse position in 3D space
- Particles within 200px of mouse: push away (repulsion)
- Smooth easing: `particle.position.lerp(targetPosition, 0.1)`
- Mouse leave: particles return to original positions

**Performance**:
- `requestAnimationFrame` loop
- Mobile detection: reduce to 50 particles
- Cleanup: Dispose geometries/materials on destroy

---

### 2. Tech Showcase (`tech-showcase.js`)

**Class**: `TechShowcase`

**Constructor**:
```javascript
constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 1000);
    this.camera.position.z = 5;
}
```

**3D Object**:
- Geometry: `THREE.IcosahedronGeometry(1.5, 1)` - low-poly crystal
- Material: `THREE.MeshStandardMaterial`
  - `color: 0x8b5cf6` (purple-500)
  - `metalness: 0.7` - reflective surface
  - `roughness: 0.2` - smooth finish
  - `emissive: 0x4c1d95` (purple-900) - inner glow
  - `emissiveIntensity: 0.3`

**Lighting**:
- `AmbientLight`: `0x404040, 0.5` - base illumination
- `DirectionalLight`: `0xffffff, 1` at `(5, 5, 5)` - main light
- `PointLight`: `0x60a5fa, 0.8` (blue-400) - orbiting dynamic highlight

**Animation**:
- Continuous rotation: `object.rotation.y += 0.005`
- Subtle wobble: `object.rotation.x = Math.sin(time * 0.5) * 0.1`
- PointLight orbit: `light.position.x = Math.cos(time) * 3`

**Performance**:
- Intersection Observer tracks visibility
- Out of viewport: `cancelAnimationFrame()` (saves battery)
- Back in view: resume animation loop

**Canvas**: 800x600px, centered in skills section with border

---

### 3. Lazy Loader (`lazy-loader.js`)

**Class**: `ThreeLazyLoader`

**State**:
```javascript
this.loaded = {
    threeCore: false,
    particlesBg: false,
    techShowcase: false
};
```

**Three.js Core Loading**:
- Triggered when hero section becomes visible
- Dynamic import from CDN:
  ```javascript
  await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  ```
- Load once, set flag `threeCore: true`

**Intersection Observers**:

**Observer 1 - Hero Background**:
- Target: `#home` section
- Threshold: `0.2` (20% visible)
- Action: Load Three.js core + initialize `ParticlesBackground`
- Canvas: Create `<canvas id="particles-bg-canvas">` and append to `#home`

**Observer 2 - Skills Showcase**:
- Target: `#skills` section
- Threshold: `0.3` (30% visible)
- Action: Load `tech-showcase.js` + initialize `TechShowcase`
- Canvas: Use existing `<canvas id="tech-showcase-canvas">`

**Error Handling**:
- Try/catch around dynamic imports
- Graceful degradation: skip 3D if load fails
- Console warning, no page break

**Cleanup**:
- Disconnect observers once loaded
- Prevent duplicate initialization

---

## Implementation Steps

1. **Create directory structure**: `js/three/`
2. **Implement `lazy-loader.js`**: Intersection Observer logic
3. **Implement `particles-bg.js`**: Particles network system
4. **Implement `tech-showcase.js`**: 3D tech object showcase
5. **Update `js/app.js`**: Initialize lazy loader after components load
6. **Update `components/skills.html`**: Add canvas placeholder
7. **Add CSS**: Position canvases with `z-index: 0`
8. **Test**: Scroll behavior, performance, mobile responsiveness
9. **Deploy**: Push to Vercel

---

## Dependencies

- **Three.js r160+** from CDN: `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`
- Size: ~145KB gzipped
- Loaded dynamically, not in initial bundle

---

## Performance Targets

- **Desktop**: 60fps for both particles and showcase
- **Mobile**: 30fps, reduced particle count (50 vs 100)
- **First Paint**: No impact (lazy loaded)
- **Battery**: Tech showcase pauses when not visible

---

## Design Rationale

**Why Modular?**
- Follows existing component-based pattern
- Each feature in separate file (maintainable)
- Easy to extend with more 3D effects later
- Professional structure

**Why Lazy Load?**
- Three.js is 145KB - significant initial load cost
- Most users may not scroll to see all effects
- Improves Time to Interactive (TTI)
- Progressive enhancement approach

**Why These 3D Elements?**
- Particles: Modern, tech-forward aesthetic without being distracting
- Tech showcase: Demonstrates WebGL capabilities directly in skills section
- Both: Reinforce "Full Stack Developer" with front-end expertise

---

## Success Criteria

- [ ] Particles background animates smoothly behind hero
- [ ] Lines connect particles dynamically
- [ ] Mouse interaction works (repulsion effect)
- [ ] Tech showcase loads when skills section visible
- [ ] 3D object rotates with lighting effects
- [ ] No performance issues on desktop (60fps)
- [ ] Mobile works with reduced particles (30fps)
- [ ] Page loads fast (no Three.js in initial bundle)
