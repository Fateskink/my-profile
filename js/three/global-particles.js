/**
 * Global Particles Background
 * Full-page animated particle network
 */
export class GlobalParticles {
  constructor(THREE) {
    this.THREE = THREE;
    this.animationId = null;
    this.container = null;
  }

  init() {
    // Create full-screen container
    this.container = document.createElement('div');
    this.container.id = 'global-particles-container';
    this.container.style.position = 'fixed';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100vw';
    this.container.style.height = '100vh';
    this.container.style.zIndex = '-1';
    this.container.style.pointerEvents = 'none';
    document.body.insertBefore(this.container, document.body.firstChild);

    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.container.appendChild(this.canvas);

    this.startTime = Date.now();
    this.setupScene();
    this.createParticles();
    this.setupResize();
    this.animate();
  }

  setupScene() {
    this.scene = new this.THREE.Scene();

    this.camera = new this.THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    this.renderer = new this.THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  createParticles() {
    // More particles for full-page effect
    const particleCount = window.innerWidth < 768 ? 100 : 200;
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01
      });
    }

    this.velocities = velocities;

    const geometry = new this.THREE.BufferGeometry();
    geometry.setAttribute('position', new this.THREE.BufferAttribute(positions, 3));

    const material = new this.THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.8,
      transparent: true,
      opacity: 0.6,
      blending: this.THREE.AdditiveBlending
    });

    this.particles = new this.THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Create connection lines
    const lineMaterial = new this.THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.15,
      blending: this.THREE.AdditiveBlending
    });

    this.lines = [];
    const lineCount = window.innerWidth < 768 ? 30 : 50;
    for (let i = 0; i < lineCount; i++) {
      const lineGeometry = new this.THREE.BufferGeometry();
      const line = new this.THREE.Line(lineGeometry, lineMaterial);
      this.lines.push(line);
      this.scene.add(line);
    }
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    const positions = this.particles.geometry.attributes.position.array;

    // Update particle positions
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3] += this.velocities[i].x;
      positions[i * 3 + 1] += this.velocities[i].y;
      positions[i * 3 + 2] += this.velocities[i].z;

      // Wrap around boundaries
      if (Math.abs(positions[i * 3]) > 50) this.velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 50) this.velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 25) this.velocities[i].z *= -1;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;

    // Update connection lines
    let lineIndex = 0;
    for (let i = 0; i < positions.length / 3 && lineIndex < this.lines.length; i++) {
      for (let j = i + 1; j < positions.length / 3 && lineIndex < this.lines.length; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 15) {
          const linePositions = new Float32Array([
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          ]);

          this.lines[lineIndex].geometry.setAttribute(
            'position',
            new this.THREE.BufferAttribute(linePositions, 3)
          );
          lineIndex++;
        }
      }
    }

    // Rotate camera slightly for depth effect
    const time = (Date.now() - this.startTime) * 0.0001;
    this.camera.position.x = Math.sin(time) * 5;
    this.camera.lookAt(0, 0, 0);

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
      this.animationId = null;
    }

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }

    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
      this.scene.remove(this.particles);
    }

    this.lines.forEach(line => {
      line.geometry.dispose();
      line.material.dispose();
      this.scene.remove(line);
    });

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    this.scene = null;
    this.camera = null;
  }
}
