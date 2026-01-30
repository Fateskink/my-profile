import { profileData } from '../data.js';

export function renderFooter() {
    return `
        <footer class="py-8 px-4 border-t border-slate-800">
            <div class="max-w-6xl mx-auto text-center">
                <p class="text-slate-500 font-mono text-sm">© 2025 ${profileData.name.full} (${profileData.name.english}). All rights reserved.</p>
            </div>
        </footer>

        <!-- Floating Turtle Mascot -->
        <a href="${profileData.contact.github}" target="_blank" rel="noopener noreferrer">
            <img src="assets/turtle.png" alt="Turtle Mascot" class="turtle-mascot" title="Visit my GitHub! 🐢">
        </a>
    `;
}
