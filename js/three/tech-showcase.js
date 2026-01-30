/**
 * Tech Showcase - 3D Animated Object
 * Displays a rotating geometric shape with dynamic lighting
 * for the skills/tech section
 */

export class TechShowcase {
  constructor(canvasId, THREE) {
    this.canvasId = canvasId;
    this.THREE = THREE;
    this.animationId = null;
    this.isVisible = false;
  }

  /**
   * Initialize the showcase
   */
  init() {
    this.canvas = document.getElementById(this.canvasId);
    if (!this.canvas) {
      console.error(`Canvas with id "${this.canvasId}" not found`);
      return;
    }

    this.startTime = Date.now();
    this.setupScene();
    this.createLights();
    this.createObject();
    this.setupVisibilityObserver();
    this.setupResize();
    this.animate();
  }

  /**
   * Setup scene, camera, and renderer
   */
  setupScene() {
    // Scene
    this.scene = new this.THREE.Scene();

    // Camera
    const aspect = this.canvas.offsetWidth / this.canvas.offsetHeight;
    this.camera = new this.THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new this.THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /**
   * Create lighting setup
   */
  createLights() {
    // Ambient light for base illumination
    const ambientLight = new this.THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Directional light for main lighting
    const directionalLight = new this.THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Point light for dynamic effect (will orbit)
    this.pointLight = new this.THREE.PointLight(0x60a5fa, 0.8);
    this.pointLight.position.set(3, 0, 0);
    this.scene.add(this.pointLight);
  }

  /**
   * Create the main 3D object
   */
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

  /**
   * Setup Intersection Observer to pause when not visible
   */
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

  /**
   * Animation loop
   */
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    const time = (Date.now() - this.startTime) * 0.001;

    // Continuous rotation
    this.object.rotation.y += 0.005;

    // Wobble effect
    this.object.rotation.x = Math.sin(time * 0.5) * 0.1;

    // Orbit point light
    this.pointLight.position.x = Math.cos(time) * 3;
    this.pointLight.position.z = Math.sin(time) * 3;

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Handle window resize
   */
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

  /**
   * Clean up resources
   */
  destroy() {
    // Cancel animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Remove resize listener
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }

    // Dispose geometries and materials
    if (this.object) {
      this.object.geometry.dispose();
      this.object.material.dispose();
      this.scene.remove(this.object);
    }

    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    // Clear references
    this.scene = null;
    this.camera = null;
    this.object = null;
    this.pointLight = null;
  }
}
