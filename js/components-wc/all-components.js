// All Web Components in one file
// Data is from window.profileData (loaded in app-webcomponents.js)

// ============= NAVBAR COMPONENT =============
class NavbarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="fixed top-4 left-4 right-4 bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-xl z-50 transition-all duration-300" id="main-navbar">
                <div class="max-w-7xl mx-auto px-6 py-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-mono font-bold text-white">
                                NT
                            </div>
                            <span class="font-semibold text-lg text-white">Nguyễn Trọng Thăng</span>
                        </div>
                        <div class="hidden md:flex space-x-8">
                            <a href="#home" class="text-slate-300 hover:text-purple-400 transition-colors duration-200 cursor-pointer font-medium">Home</a>
                            <a href="#skills" class="text-slate-300 hover:text-purple-400 transition-colors duration-200 cursor-pointer font-medium">Skills</a>
                            <a href="#projects" class="text-slate-300 hover:text-purple-400 transition-colors duration-200 cursor-pointer font-medium">Projects</a>
                            <a href="#contact" class="text-slate-300 hover:text-purple-400 transition-colors duration-200 cursor-pointer font-medium">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        this.setupScrollEffect();
    }

    setupScrollEffect() {
        let lastScroll = 0;
        const navbar = this.querySelector('#main-navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.transform = currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }
}

customElements.define('navbar-component', NavbarComponent);

// ============= HERO SECTION =============
class HeroSection extends HTMLElement {
    connectedCallback() {
        const data = window.profileData;
        const currentYear = new Date().getFullYear();
        const experience = currentYear - data.workStartYear;
        const age = currentYear - data.birthYear;

        this.innerHTML = `
            <section id="home" class="min-h-screen flex items-center justify-center pt-24 px-4 relative overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                </div>

                <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 animate-on-scroll">
                    <div class="flex justify-center md:justify-end">
                        <div class="relative">
                            <div class="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
                            <img src="assets/avatar.jpg" alt="${data.name.full}" class="relative w-80 h-80 object-cover rounded-3xl border-4 border-purple-500/30 shadow-2xl">
                        </div>
                    </div>

                    <div>
                        <div class="inline-block mb-4 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full">
                            <span class="text-purple-300 font-medium font-mono text-sm">&lt;Full Stack Developer /&gt;</span>
                        </div>
                        <h1 class="text-5xl md:text-6xl font-bold mb-4 text-white">
                            Hi, I'm <span class="gradient-text">${data.name.display}</span>
                        </h1>
                        <p class="text-lg text-slate-400 mb-2 font-mono">${data.name.full} - ${data.name.english}</p>
                        <p class="text-xl text-slate-300 mb-6 leading-relaxed">
                            ${experience}+ years of experience building scalable web and mobile applications with modern technologies. Specialized in microservices, AI integration, and full-stack development.
                        </p>
                        <div class="flex flex-wrap gap-3 mb-8">
                            <div class="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span class="text-slate-300 text-sm">${data.contact.location}</span>
                            </div>
                            <div class="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <span class="text-slate-300 text-sm">${age} Years Old</span>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <a href="#projects" class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl font-medium">
                                View Projects
                            </a>
                            <a href="assets/Nguyen-Trong-Thang-2026.pdf" download class="px-8 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg hover:border-purple-500 hover:bg-slate-700 transition-all duration-200 cursor-pointer font-medium inline-flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span>Download CV</span>
                            </a>
                            <a href="#contact" class="px-8 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg hover:border-purple-500 hover:bg-slate-700 transition-all duration-200 cursor-pointer font-medium">
                                Contact Me
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('hero-section', HeroSection);
