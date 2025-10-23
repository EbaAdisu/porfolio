export interface ProjectCategory {
    id: string
    name: string
    icon: string
    description: string
    color: string
}

export const projectCategories: ProjectCategory[] = [
    {
        id: 'all',
        name: 'All Projects',
        icon: '🚀',
        description: 'View all projects',
        color: 'hsl(var(--primary))',
    },
    {
        id: 'blockchain',
        name: 'Blockchain & Web3',
        icon: '🔗',
        description: 'Decentralized applications and smart contracts',
        color: '#8B5CF6',
    },
    {
        id: 'ai-ml',
        name: 'Machine Learning & AI',
        icon: '🤖',
        description: 'AI/ML models and intelligent systems',
        color: '#10B981',
    },
    {
        id: 'n8n',
        name: 'n8n Automation',
        icon: '🔄',
        description: 'Workflow automation and integrations',
        color: '#F59E0B',
    },
    {
        id: 'ai-agents',
        name: 'AI Agents & LangChain',
        icon: '🧠',
        description: 'Intelligent agents and RAG systems',
        color: '#3B82F6',
    },
    {
        id: 'fullstack',
        name: 'Full-Stack Web',
        icon: '🌐',
        description: 'Complete web applications',
        color: '#EF4444',
    },
    {
        id: 'mobile',
        name: 'Mobile Development',
        icon: '📱',
        description: 'Cross-platform mobile apps',
        color: '#8B5CF6',
    },
    {
        id: 'games',
        name: 'Game Development',
        icon: '🎮',
        description: 'Interactive games and simulations',
        color: '#EC4899',
    },
    {
        id: 'devops',
        name: 'DevOps & Cloud',
        icon: '🔐',
        description: 'Infrastructure and deployment',
        color: '#6366F1',
    },
    {
        id: 'data-science',
        name: 'Data Science',
        icon: '🔍',
        description: 'Data analysis and visualization',
        color: '#14B8A6',
    },
    {
        id: 'security',
        name: 'Cybersecurity',
        icon: '🛡️',
        description: 'Security tools and privacy',
        color: '#DC2626',
    },
    {
        id: 'creative',
        name: 'Creative Tech',
        icon: '🎨',
        description: 'Generative art and creative coding',
        color: '#F97316',
    },
]

export interface ComingSoonProject {
    id: string
    title: string
    description: string
    category: string
    technologies: string[]
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
    estimatedTime: string
    features: string[]
}

export const comingSoonProjects: ComingSoonProject[] = [
    // Blockchain & Web3
    {
        id: 'defi-dashboard',
        title: 'DeFi Dashboard',
        description:
            'Real-time cryptocurrency price tracker with portfolio management and wallet integration',
        category: 'blockchain',
        technologies: ['Web3', 'Ethers.js', 'The Graph', 'React', 'Next.js'],
        difficulty: 'Intermediate',
        estimatedTime: '3-4 weeks',
        features: [
            'Real-time price tracking',
            'Portfolio management',
            'Wallet integration',
            'DeFi protocol analytics',
        ],
    },
    {
        id: 'nft-marketplace',
        title: 'NFT Marketplace',
        description:
            'Create, buy, and sell NFTs with lazy minting and IPFS integration',
        category: 'blockchain',
        technologies: ['Solidity', 'Hardhat', 'Next.js', 'Pinata', 'IPFS'],
        difficulty: 'Advanced',
        estimatedTime: '6-8 weeks',
        features: [
            'NFT creation and minting',
            'Marketplace with buy/sell',
            'Lazy minting',
            'IPFS metadata storage',
        ],
    },
    {
        id: 'decentralized-messaging',
        title: 'Decentralized Messaging App',
        description:
            'Privacy-focused messaging app with IPFS storage and blockchain identity verification',
        category: 'blockchain',
        technologies: [
            'IPFS',
            'Web3.js',
            'React',
            'Node.js',
            'WebRTC',
            'Socket.io',
            'libp2p',
        ],
        difficulty: 'Advanced',
        estimatedTime: '6-8 weeks',
        features: [
            'Decentralized architecture',
            'IPFS message storage',
            'End-to-end encryption',
            'Real-time messaging',
            'File sharing',
            'Group chats',
            'Voice messages',
            'Cross-platform support',
        ],
    },

    // AI & ML
    {
        id: 'ai-code-reviewer',
        title: 'AI Code Review Assistant',
        description:
            'Automated code quality analysis with security vulnerability detection',
        category: 'ai-ml',
        technologies: ['Python', 'OpenAI API', 'LangChain', 'FastAPI'],
        difficulty: 'Advanced',
        estimatedTime: '4-5 weeks',
        features: [
            'Code quality analysis',
            'Security vulnerability detection',
            'Best practices suggestions',
            'Multi-language support',
        ],
    },
    {
        id: 'image-style-transfer',
        title: 'Image Style Transfer App',
        description: 'Real-time artistic style transfer with multiple presets',
        category: 'ai-ml',
        technologies: ['TensorFlow.js', 'React', 'Neural Style Transfer'],
        difficulty: 'Intermediate',
        estimatedTime: '2-3 weeks',
        features: [
            'Real-time style transfer',
            'Multiple style presets',
            'Custom style training',
            'Download styled images',
        ],
    },

    // n8n Automation
    {
        id: 'productivity-hub',
        title: 'Personal Productivity Hub',
        description: 'Automated email categorization and task management',
        category: 'n8n',
        technologies: ['n8n', 'Gmail API', 'Calendar API', 'Notion'],
        difficulty: 'Beginner',
        estimatedTime: '1-2 weeks',
        features: [
            'Automated email categorization',
            'Calendar sync across platforms',
            'Daily digest generation',
            'Task management automation',
        ],
    },
    {
        id: 'social-automation',
        title: 'Social Media Automation Suite',
        description: 'Cross-platform post scheduling and content repurposing',
        category: 'n8n',
        technologies: ['n8n', 'Twitter API', 'LinkedIn API', 'OpenAI'],
        difficulty: 'Intermediate',
        estimatedTime: '3-4 weeks',
        features: [
            'Cross-platform scheduling',
            'Content repurposing',
            'Analytics aggregation',
            'Hashtag optimization',
        ],
    },

    // AI Agents
    {
        id: 'research-assistant',
        title: 'Intelligent Research Assistant',
        description:
            'Multi-source information aggregation with automatic summarization',
        category: 'ai-agents',
        technologies: ['LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
        difficulty: 'Advanced',
        estimatedTime: '5-6 weeks',
        features: [
            'Multi-source aggregation',
            'Automatic summarization',
            'Source attribution',
            'PDF analysis',
        ],
    },
    {
        id: 'knowledge-base',
        title: 'Personal Knowledge Base',
        description: 'RAG system to chat with your documents',
        category: 'ai-agents',
        technologies: ['LangChain', 'ChromaDB', 'OpenAI', 'React'],
        difficulty: 'Intermediate',
        estimatedTime: '3-4 weeks',
        features: [
            'RAG implementation',
            'Chat with documents',
            'Semantic search',
            'Knowledge graph visualization',
        ],
    },

    // Full-Stack
    {
        id: 'collab-platform',
        title: 'Real-time Collaboration Platform',
        description: 'Live document editing like Google Docs',
        category: 'fullstack',
        technologies: ['Next.js', 'WebSockets', 'Yjs', 'MongoDB'],
        difficulty: 'Advanced',
        estimatedTime: '6-8 weeks',
        features: [
            'Live document editing',
            'Presence awareness',
            'Comments and annotations',
            'Version history',
        ],
    },
    {
        id: 'smart-loan-tracker',
        title: 'Smart Loan Tracker App',
        description:
            'Comprehensive loan management with payment optimization and debt reduction visualization',
        category: 'fullstack',
        technologies: [
            'Next.js',
            'TypeScript',
            'Prisma',
            'PostgreSQL',
            'Chart.js',
            'React Hook Form',
            'Tailwind CSS',
            'NextAuth.js',
        ],
        difficulty: 'Intermediate',
        estimatedTime: '4-5 weeks',
        features: [
            'Multi-loan management',
            'Payment calculator',
            'Debt snowball/avalanche strategies',
            'Visual analytics',
            'Payment reminders',
            'Export reports',
            'Refinancing calculator',
            'Goal setting',
            'Mobile responsive',
            'Data security',
        ],
    },

    // Mobile
    {
        id: 'expense-tracker',
        title: 'Cross-Platform Expense Tracker',
        description: 'Receipt scanning with OCR and ML category detection',
        category: 'mobile',
        technologies: ['React Native', 'Firebase', 'TensorFlow Lite'],
        difficulty: 'Intermediate',
        estimatedTime: '4-5 weeks',
        features: [
            'Receipt scanning with OCR',
            'Category auto-detection',
            'Budget alerts',
            'Cloud sync',
        ],
    },

    // Games
    {
        id: 'multiplayer-card-game',
        title: 'Multiplayer Card Game',
        description: 'Real-time WebSocket gameplay with ELO rating',
        category: 'games',
        technologies: ['Phaser.js', 'Socket.io', 'Node.js'],
        difficulty: 'Advanced',
        estimatedTime: '5-6 weeks',
        features: [
            'Real-time gameplay',
            'ELO rating system',
            'Matchmaking',
            'In-game chat',
        ],
    },

    // DevOps
    {
        id: 'k8s-dashboard',
        title: 'Kubernetes Dashboard',
        description: 'Cluster monitoring and management interface',
        category: 'devops',
        technologies: ['React', 'Kubernetes API', 'Prometheus'],
        difficulty: 'Advanced',
        estimatedTime: '6-7 weeks',
        features: [
            'Cluster monitoring',
            'Pod log aggregation',
            'Resource visualization',
            'Deployment automation',
        ],
    },

    // Data Science
    {
        id: 'data-viz-dashboard',
        title: 'Interactive Data Visualization Dashboard',
        description: 'Real-time data streaming with custom chart builder',
        category: 'data-science',
        technologies: ['D3.js', 'React', 'WebSockets', 'Python'],
        difficulty: 'Intermediate',
        estimatedTime: '4-5 weeks',
        features: [
            'Real-time data streaming',
            'Custom chart builder',
            'Export capabilities',
            'Collaborative annotations',
        ],
    },

    // Security
    {
        id: 'password-manager',
        title: 'Zero-Knowledge Password Manager',
        description: 'Client-side encryption with breach detection',
        category: 'security',
        technologies: ['Web Crypto API', 'IndexedDB', 'React'],
        difficulty: 'Advanced',
        estimatedTime: '5-6 weeks',
        features: [
            'Client-side encryption',
            'Password strength analyzer',
            'Breach detection',
            'Secure sharing',
        ],
    },

    // Creative
    {
        id: 'ai-art-generator',
        title: 'AI Art Generator',
        description: 'Text-to-image generation with style mixing',
        category: 'creative',
        technologies: ['Stable Diffusion', 'React', 'IPFS'],
        difficulty: 'Advanced',
        estimatedTime: '4-5 weeks',
        features: [
            'Text-to-image generation',
            'Style mixing',
            'Art evolution animation',
            'NFT minting integration',
        ],
    },
]

// Helper function to get projects by category
export function getProjectsByCategory(
    categoryId: string,
    comingSoon: boolean = false
) {
    if (categoryId === 'all') {
        return comingSoon ? comingSoonProjects : []
    }
    return comingSoon
        ? comingSoonProjects.filter((p) => p.category === categoryId)
        : []
}

// Helper function to get category by ID
export function getCategoryById(categoryId: string) {
    return projectCategories.find((cat) => cat.id === categoryId)
}
