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
        this.particleGeometry = new this.THREE.SphereGeometry(2, 8, 8);

        for (let i = 0; i < this.particleCount; i++) {
            // Gradient color from purple to blue
            const t = i / this.particleCount;
            const color = new this.THREE.Color();
            color.setHex(this.interpolateColor(0xa78bfa, 0x60a5fa, t));

            const material = new this.THREE.MeshBasicMaterial({ color });
            const particle = new this.THREE.Mesh(this.particleGeometry, material);

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

        // Only dispose materials (each unique), not geometry
        this.particles.forEach(particle => {
            particle.material.dispose();
        });

        // Dispose shared geometry once
        if (this.particleGeometry) {
            this.particleGeometry.dispose();
        }

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
