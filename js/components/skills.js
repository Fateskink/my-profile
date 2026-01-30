import { profileData } from '../data.js';
import { renderSkillIcon } from './skillIcons.js';

function renderSkillCategory(title, icon, skills) {
    const skillsHTML = skills.map(skill => `
        <div class="skill-badge rounded-lg p-3 text-center cursor-pointer" title="${skill.title}">
            ${renderSkillIcon(skill)}
            <span class="text-xs text-slate-300">${skill.name}</span>
        </div>
    `).join('');

    return `
        <div class="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer animate-on-scroll backdrop-blur-sm">
            <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                    ${icon}
                </div>
                <h3 class="text-2xl font-bold text-white">${title}</h3>
            </div>
            <div class="grid grid-cols-3 gap-3">
                ${skillsHTML}
            </div>
        </div>
    `;
}

export function renderSkills() {
    const icons = {
        backend: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
        </svg>`,
        frontend: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>`,
        mobile: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>`,
        devops: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
        </svg>`,
        database: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
        </svg>`,
        ai: `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>`
    };

    return `
        <section id="skills" class="py-20 px-4 relative">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-16 animate-on-scroll">
                    <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">Technical <span class="gradient-text">Arsenal</span></h2>
                    <p class="text-lg text-slate-400 font-mono">Technologies & Tools I Master</p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${renderSkillCategory('Backend', icons.backend, profileData.skills.backend)}
                    ${renderSkillCategory('Frontend', icons.frontend, profileData.skills.frontend)}
                    ${renderSkillCategory('Mobile', icons.mobile, profileData.skills.mobile)}
                    ${renderSkillCategory('DevOps & Cloud', icons.devops, profileData.skills.devops)}
                    ${renderSkillCategory('Database', icons.database, profileData.skills.database)}
                    ${renderSkillCategory('AI & Automation', icons.ai, profileData.skills.ai)}
                </div>
            </div>
        </section>
    `;
}
