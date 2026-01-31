// Lazy loader for Three.js components using Intersection Observer
export class ThreeLazyLoader {
    constructor() {
        this.loaded = {
            threeCore: false,
            globalParticles: false,
            skillsParticles: false
        };
        this.THREE = null;
        this.observers = [];
        this.globalParticles = null;   // Store instance reference for cleanup
        this.skillsParticles = null;   // Store instance reference for cleanup
        this.loadThreeCorePromise = null;  // Prevent concurrent Three.js imports
    }

    async init() {
        console.log('ThreeLazyLoader initializing...');
        // Load global particles immediately
        await this.loadGlobalParticles();
        // Setup observer for skills section (optional, can be disabled)
        // this.setupSkillsObserver();
    }

    setupSkillsObserver() {
        const skillsSection = document.querySelector('#skills');
        console.log('Setting up skills observer, found section:', skillsSection);
        if (!skillsSection) {
            console.warn('Skills section not found');
            return;
        }

        const observer = new IntersectionObserver(
            async (entries) => {
                console.log('Skills section intersection:', entries[0].isIntersecting);
                if (entries[0].isIntersecting && !this.loaded.skillsParticles) {
                    await this.loadSkillsParticles();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(skillsSection);
        this.observers.push(observer);
    }

    async loadThreeCore() {
        if (this.loaded.threeCore) return;

        // Return existing promise if already loading
        if (this.loadThreeCorePromise) {
            return this.loadThreeCorePromise;
        }

        this.loadThreeCorePromise = (async () => {
            try {
                const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
                this.THREE = THREE;
                this.loaded.threeCore = true;
                console.log('Three.js core loaded');
            } catch (error) {
                console.error('Failed to load Three.js:', error);
                this.loadThreeCorePromise = null;  // Reset on error to allow retry
                throw error;
            }
        })();

        return this.loadThreeCorePromise;
    }

    async loadGlobalParticles() {
        try {
            // Load Three.js core first
            await this.loadThreeCore();

            // Import and initialize global particles
            const { GlobalParticles } = await import('./global-particles.js?v=' + Date.now());
            this.globalParticles = new GlobalParticles(this.THREE);
            this.globalParticles.init();

            this.loaded.globalParticles = true;
            console.log('Global particles background loaded');
        } catch (error) {
            console.error('Failed to load global particles background:', error);
        }
    }

    async loadSkillsParticles() {
        try {
            // Ensure Three.js is loaded
            await this.loadThreeCore();

            // Import and initialize skills particles
            const { SkillsParticles } = await import('./skills-particles.js?v=' + Date.now());
            this.skillsParticles = new SkillsParticles('#skills', this.THREE);
            this.skillsParticles.init();

            this.loaded.skillsParticles = true;
            console.log('Skills particles loaded');
        } catch (error) {
            console.error('Failed to load skills particles:', error);
        }
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];

        // Clean up Three.js components
        if (this.globalParticles) {
            this.globalParticles.destroy();
        }
        if (this.skillsParticles) {
            this.skillsParticles.destroy();
        }
    }
}

// Export singleton instance
export function initLazyLoader() {
    const loader = new ThreeLazyLoader();
    loader.init();
    return loader;
}
