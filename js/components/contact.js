import { profileData } from '../data.js';

export function renderContact() {
    const currentYear = new Date().getFullYear();
    const age = currentYear - profileData.birthYear;
    const experience = currentYear - profileData.workStartYear;

    return `
        <section id="contact" class="py-20 px-4 relative">
            <div class="max-w-4xl mx-auto text-center animate-on-scroll">
                <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">Let's <span class="gradient-text">Connect</span></h2>
                <p class="text-xl text-slate-400 mb-12 font-mono">Open to discussing new projects and opportunities</p>

                <div class="grid md:grid-cols-3 gap-6 mb-12">
                    <!-- Email -->
                    <a href="mailto:${profileData.contact.email}" class="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-lg mb-2 text-white">Email</h3>
                        <p class="text-slate-400 text-sm font-mono break-all">${profileData.contact.email}</p>
                    </a>

                    <!-- Location -->
                    <div class="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
                        <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-lg mb-2 text-white">Location</h3>
                        <p class="text-slate-400 text-sm font-mono">${profileData.contact.location}</p>
                    </div>

                    <!-- GitHub -->
                    <a href="${profileData.contact.github}" target="_blank" rel="noopener noreferrer" class="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-lg mb-2 text-white">GitHub</h3>
                        <p class="text-slate-400 text-sm font-mono">${profileData.contact.githubUsername}</p>
                    </a>
                </div>

                <div class="bg-gradient-to-br from-purple-600/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-8">
                    <p class="text-lg mb-2 text-white font-semibold"><span id="age-display-footer">${age}</span> years old • <span id="experience-years-footer">${experience}+</span> years of experience</p>
                    <p class="text-slate-300 font-mono text-sm">Building scalable solutions across web, mobile, and AI platforms</p>
                </div>
            </div>
        </section>
    `;
}
