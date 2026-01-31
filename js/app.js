// Component Loader - Like PHP includes but client-side
// Pattern: Giống <?php include 'header.php'; ?> nhưng dùng fetch

// Load all components
async function loadComponents() {
    const components = [
        { id: 'navbar', file: 'components/navbar.html' },
        { id: 'hero', file: 'components/hero.html' },
        { id: 'skills', file: 'components/skills.html' },
        { id: 'projects', file: 'components/projects.html' },
        { id: 'contact', file: 'components/contact.html' },
        { id: 'footer', file: 'components/footer.html' }
    ];

    // Load all components in parallel
    await Promise.all(
        components.map(async ({ id, file }) => {
            try {
                const response = await fetch(file + '?v=' + Date.now());
                const html = await response.text();
                document.getElementById(id).innerHTML = html;
            } catch (error) {
                console.error(`Failed to load ${file}:`, error);
            }
        })
    );

    // After all components loaded, initialize
    initializeApp();

    // Initialize Three.js lazy loader
    import('./three/lazy-loader.js')
        .then(({ initLazyLoader }) => {
            initLazyLoader();
        })
        .catch(error => {
            console.error('Failed to initialize Three.js lazy loader:', error);
        });
}

// Initialize app after components loaded
function initializeApp() {
    // Calculate dynamic values
    const birthYear = 1997;
    const workStartYear = 2022;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const experience = currentYear - workStartYear;

    // Update age and experience displays
    document.querySelectorAll('#age-display, #age-display-footer').forEach(el => {
        if (el) el.textContent = age;
    });
    document.querySelectorAll('#experience-years, #experience-years-footer').forEach(el => {
        if (el) el.textContent = experience + '+';
    });

    // Setup smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Setup scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Setup navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Dispatch custom event to initialize carousel after components loaded
    const carouselInitEvent = new CustomEvent('initCarousel');
    document.dispatchEvent(carouselInitEvent);
}

// Start loading components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
