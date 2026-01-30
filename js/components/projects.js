import { profileData } from '../data.js';

const projectIcons = {
    trending: `<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
    </svg>`,
    shield: `<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>`,
    book: `<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
    </svg>`,
    building: `<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
    </svg>`,
    briefcase: `<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>`,
    cart: `<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>`
};

function renderProjectCard(project) {
    const techStackHTML = project.tech.map(tech =>
        `<span class="px-3 py-1 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-lg text-sm font-mono">${tech}</span>`
    ).join('');

    const linkHTML = project.link ? `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200">
            <span class="font-mono">View Project</span>
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
        </a>
    ` : '';

    return `
        <div class="project-card rounded-2xl p-8 animate-on-scroll cursor-pointer">
            <div class="flex items-start justify-between mb-4">
                <span class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm rounded-lg font-mono">${project.date}</span>
                ${projectIcons[project.icon] || ''}
            </div>
            <h3 class="text-2xl font-bold mb-3 text-white">${project.title}</h3>
            <p class="text-slate-400 mb-4 leading-relaxed">${project.description}</p>
            <div class="flex flex-wrap gap-2 ${project.link ? 'mb-4' : ''}">
                ${techStackHTML}
            </div>
            ${linkHTML}
        </div>
    `;
}

export function renderProjects() {
    const projectsHTML = profileData.projects.map(renderProjectCard).join('');

    return `
        <section id="projects" class="py-20 px-4 relative">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16 animate-on-scroll">
                    <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">Featured <span class="gradient-text">Projects</span></h2>
                    <p class="text-lg text-slate-400 font-mono">Recent work and achievements</p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    ${projectsHTML}
                </div>
            </div>
        </section>
    `;
}
