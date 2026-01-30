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
