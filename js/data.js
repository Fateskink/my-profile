export const profileData = {
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
    bio: '4+ years of experience building scalable web and mobile applications with modern technologies. Specialized in microservices, AI integration, and full-stack development.',

    skills: {
        backend: [
            { name: 'Rails', icon: 'rubyonrails/CC0000', title: 'Ruby on Rails' },
            { name: 'Golang', icon: 'go/00ADD8', title: 'Go' },
            { name: 'Python', icon: 'python/3776AB', title: 'Python' },
            { name: 'PHP', icon: 'php/777BB4', title: 'PHP' },
            { name: 'GraphQL', icon: 'graphql/E10098', title: 'GraphQL' },
            { name: 'gRPC', icon: null, title: 'gRPC', custom: true }
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
            { name: 'AWS', icon: null, title: 'AWS', custom: true },
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
            { name: 'DynamoDB', icon: null, title: 'DynamoDB', custom: true }
        ],
        ai: [
            { name: 'OpenAI', icon: null, title: 'OpenAI', custom: true },
            { name: 'Claude', icon: null, title: 'Claude Code', custom: true },
            { name: 'LangGraph', icon: null, title: 'LangGraph', custom: true },
            { name: 'LangSmith', icon: null, title: 'LangSmith', custom: true },
            { name: 'Scrapy', icon: 'scrapy/60A839', title: 'Scrapy' },
            { name: 'Playwright', icon: null, title: 'Playwright', custom: true }
        ]
    },

    projects: [
        {
            date: '06/2025',
            title: 'AI FinanceHub',
            description: 'Intelligent trading tool that unifies symbol mapping across brokers, streamlining trading workflow with AI-powered automation',
            tech: ['Golang', 'Python', 'React', 'Next.js', 'MQL5'],
            link: null,
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
