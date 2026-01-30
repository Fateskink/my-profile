// Web Components Bundle - Component-based HTML like React/Vue
// Pattern: Custom Elements API (native browser feature)

// ==================== DATA ====================
const profileData = {
    name: {
        display: 'Nguyen Trong Thang',
        full: 'Nguyễn Trọng Thăng',
        english: 'Shayne Nguyen'
    },
    birthYear: 1997,
    workStartYear: 2022,
    contact: {
        email: 'shaynenguyen9@gmail.com',
        location: 'Hanoi, Vietnam',
        github: 'https://github.com/Fateskink',
        githubUsername: '@Fateskink'
    },
    skills: {
        backend: [
            { name: 'Rails', icon: 'rubyonrails/CC0000', title: 'Ruby on Rails' },
            { name: 'Golang', icon: 'go/00ADD8', title: 'Go' },
            { name: 'Python', icon: 'python/3776AB', title: 'Python' },
            { name: 'PHP', icon: 'php/777BB4', title: 'PHP' },
            { name: 'GraphQL', icon: 'graphql/E10098', title: 'GraphQL' },
            { name: 'gRPC', custom: 'grpc', title: 'gRPC' }
        ],
        frontend: [
            { name: 'Vue.js', icon: 'vuedotjs/4FC08D', title: 'Vue.js' },
            { name: 'React', icon: 'react/61DAFB', title: 'React' },
            { name: 'Next.js', icon: 'nextdotjs/FFFFFF', title: 'Next.js' },
            { name: 'TypeScript', icon: 'typescript/3178C6', title: 'TypeScript' },
            { name: 'Tailwind', icon: 'tailwindcss/06B6D4', title: 'TailwindCSS' },
            { name: 'JavaScript', icon: 'javascript/F7DF1E', title: 'JavaScript' }
        ],
        mobile: [
            { name: 'Flutter', icon: 'flutter/02569B', title: 'Flutter' },
            { name: 'Dart', icon: 'dart/0175C2', title: 'Dart' },
            { name: 'GetX', icon: 'flutter/02569B', title: 'GetX' }
        ],
        devops: [
            { name: 'AWS', custom: 'aws', title: 'AWS' },
            { name: 'Docker', icon: 'docker/2496ED', title: 'Docker' },
            { name: 'K8s', icon: 'kubernetes/326CE5', title: 'Kubernetes' },
            { name: 'Helm', icon: 'helm/0F1689', title: 'Helm' },
            { name: 'Airflow', icon: 'apacheairflow/017CEE', title: 'Apache Airflow' },
            { name: 'Git', icon: 'git/F05032', title: 'Git' }
        ],
        database: [
            { name: 'PostgreSQL', icon: 'postgresql/4169E1', title: 'PostgreSQL' },
            { name: 'MySQL', icon: 'mysql/4479A1', title: 'MySQL' },
            { name: 'Redis', icon: 'redis/DC382D', title: 'Redis' },
            { name: 'ClickHouse', icon: 'clickhouse/FFCC01', title: 'ClickHouse' },
            { name: 'DynamoDB', custom: 'dynamodb', title: 'DynamoDB' }
        ],
        ai: [
            { name: 'OpenAI', custom: 'openai', title: 'OpenAI' },
            { name: 'Claude', custom: 'claude', title: 'Claude Code' },
            { name: 'LangGraph', custom: 'langgraph', title: 'LangGraph' },
            { name: 'LangSmith', custom: 'langsmith', title: 'LangSmith' },
            { name: 'Scrapy', icon: 'scrapy/60A839', title: 'Scrapy' },
            { name: 'Playwright', custom: 'playwright', title: 'Playwright' }
        ]
    },
    projects: [
        {
            date: '06/2025',
            title: 'AI FinanceHub',
            description: 'Intelligent trading tool that unifies symbol mapping across brokers, streamlining trading workflow with AI-powered automation',
            tech: ['Golang', 'Python', 'React', 'Next.js', 'MQL5'],
            icon: 'trending'
        },
        {
            date: '07/2025',
            title: 'Yobimori',
            description: 'A mutual aid service that protects precious lives and families from marine accidents with IoT integration',
            tech: ['Microservices', 'Golang', 'GraphQL', 'Flutter', 'AWS Lambda'],
            link: 'https://yobimori.com/',
            icon: 'shield'
        },
        {
            date: '01/2025',
            title: 'Vibico System',
            description: 'Complete billiards platform including tournament organization, online academy, and mobile app with payment integration',
            tech: ['Golang', 'GraphQL', 'gRPC', 'Vue.js 3', 'Flutter', 'VNPay'],
            link: 'https://vibico.co/',
            icon: 'book'
        },
        {
            date: '07/2024',
            title: 'Redaiku',
            description: 'Construction job management system with admin console, client site and mobile application',
            tech: ['Golang', 'GraphQL', 'Vue.js 3', 'Flutter'],
            link: 'https://redaiku.com/',
            icon: 'building'
        },
        {
            date: '05/2023',
            title: 'Posiwill',
            description: 'Administration platform for microservices-based website with third-party integrations',
            tech: ['PHP Laravel', 'Vue.js 2', 'Zoom API', 'Slack API'],
            link: 'https://posiwill.jp/career/',
            icon: 'briefcase'
        },
        {
            date: '10/2022',
            title: 'Laclulu - UnicornCart',
            description: 'E-commerce platform built with advanced technologies and modern stack',
            tech: ['Ruby on Rails', 'GraphQL', 'Vue.js 3', 'TypeScript'],
            link: 'https://unicorncart.jp',
            icon: 'cart'
        }
    ]
};

// Custom SVG Icons
const customIcons = {
    grpc: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="#4285F4" opacity="0.2"/><path d="M7 8h10M7 12h10M7 16h6" stroke="#4285F4" stroke-width="2" stroke-linecap="round"/><circle cx="17" cy="16" r="2" fill="#4285F4"/></svg>',
    aws: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.226.726-1.644.487-.417 1.133-.626 1.955-.626.272 0 .551.024.847.064.296.04.6.104.918.176v-.583c0-.607-.127-1.031-.375-1.277-.255-.246-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.12.016c-.104 0-.16-.08-.16-.232v-.367c0-.12.016-.207.056-.263.04-.056.112-.112.215-.168.28-.143.615-.263 1.005-.36.391-.096.807-.144 1.246-.144.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.264 0 .536-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.279-.512.056-.191.088-.423.088-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.918 0 .375.095.655.295.838.191.184.48.28.823.28zm6.41.862c-.135 0-.224-.024-.28-.08-.055-.048-.103-.16-.151-.311L7.547 5.675c-.048-.16-.072-.263-.072-.32 0-.128.064-.2.192-.2h.783c.144 0 .24.025.288.08.056.048.096.16.144.312l1.447 5.703 1.342-5.703c.04-.16.088-.264.144-.312.056-.048.151-.08.287-.08h.638c.144 0 .24.025.288.08.056.048.104.16.144.312l1.358 5.767 1.491-5.767c.048-.16.096-.264.144-.312.056-.048.152-.08.288-.08h.743c.128 0 .2.065.2.2 0 .04-.009.08-.017.128-.008.048-.024.128-.056.24l-2.072 6.047c-.048.16-.096.263-.152.311-.056.048-.144.08-.279.08h-.687c-.144 0-.24-.024-.288-.08-.056-.055-.104-.159-.143-.319L13.414 6.3l-1.335 5.655c-.04.16-.088.264-.143.32-.056.055-.152.08-.288.08zm10.285.215c-.415 0-.83-.048-1.229-.144-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.375c0-.152.056-.232.16-.232.04 0 .08.008.12.016.04.008.104.032.168.056.231.104.48.184.75.24.27.056.535.08.807.08.455 0 .806-.08 1.053-.24.248-.16.375-.384.375-.67 0-.2-.064-.368-.191-.512-.128-.144-.375-.271-.743-.384l-1.06-.335c-.535-.168-.926-.416-1.166-.75-.24-.335-.36-.71-.36-1.117 0-.32.072-.599.207-.846.136-.247.32-.455.551-.623.232-.168.504-.296.823-.375.32-.08.655-.12 1.014-.12.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .263.215c.048.08.072.168.072.279v.351c0 .152-.056.24-.16.24a.554.554 0 0 1-.223-.056 2.91 2.91 0 0 0-1.15-.231c-.415 0-.735.063-.95.207-.216.144-.32.36-.32.655 0 .2.072.375.215.527.144.152.407.296.791.431l1.037.335c.527.168.911.4 1.142.695.231.296.344.647.344 1.062 0 .335-.072.631-.216.894-.144.263-.336.48-.575.662-.24.184-.527.32-.863.416-.351.104-.719.152-1.117.152z" fill="#FF9900"/></svg>',
    openai: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/></svg>',
    claude: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="#CC9B7A" opacity="0.2"/><path d="M6 8h12M6 12h8M6 16h10" stroke="#CC9B7A" stroke-width="2" stroke-linecap="round"/></svg>',
    langgraph: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2" fill="#1C3C8A"/><circle cx="6" cy="12" r="2" fill="#1C3C8A"/><circle cx="18" cy="12" r="2" fill="#1C3C8A"/><circle cx="12" cy="19" r="2" fill="#1C3C8A"/><line x1="12" y1="7" x2="12" y2="17" stroke="#1C3C8A" stroke-width="1.5"/><line x1="10" y1="6" x2="7.5" y2="11" stroke="#1C3C8A" stroke-width="1.5"/><line x1="14" y1="6" x2="16.5" y2="11" stroke="#1C3C8A" stroke-width="1.5"/></svg>',
    langsmith: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#1C3C8A" opacity="0.6"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#1C3C8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    playwright: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#2EAD33" opacity="0.2"/><path d="M8 12l3 3 5-5" stroke="#2EAD33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#2EAD33" stroke-width="1.5" stroke-linecap="round"/></svg>',
    dynamodb: '<svg class="w-8 h-8 mx-auto mb-2 tech-icon" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#527FFF" opacity="0.3"/><path d="M12 7l-7 3.5v7l7 3.5 7-3.5v-7L12 7z" fill="#527FFF"/><circle cx="12" cy="12" r="2" fill="white"/></svg>'
};

const projectIcons = {
    trending: '<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>',
    shield: '<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
    book: '<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
    building: '<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
    briefcase: '<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    cart: '<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
};

// ==================== HELPER FUNCTIONS ====================
const renderSkillIcon = (skill) => {
    if (skill.custom && customIcons[skill.custom]) {
        return customIcons[skill.custom];
    }
    return `<img src="https://cdn.simpleicons.org/${skill.icon}" alt="${skill.name}" class="w-8 h-8 mx-auto mb-2 tech-icon">`;
};

// ==================== NAVBAR COMPONENT ====================
class NavbarComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="fixed top-4 left-4 right-4 bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-xl z-50 transition-all duration-300" id="main-navbar">
                <div class="max-w-7xl mx-auto px-6 py-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-mono font-bold text-white">NT</div>
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

