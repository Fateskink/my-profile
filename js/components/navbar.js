import { profileData } from '../data.js';

export function renderNavbar() {
    return `
        <nav class="fixed top-4 left-4 right-4 bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-xl z-50 transition-all duration-300">
            <div class="max-w-7xl mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-mono font-bold text-white">
                            NT
                        </div>
                        <span class="font-semibold text-lg text-white">${profileData.name.full}</span>
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
}
