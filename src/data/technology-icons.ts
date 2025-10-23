export const technologyIcons: Record<string, string> = {
    // Frontend
    React: '⚛️',
    'Next.js': '▲',
    'Vue.js': '💚',
    Angular: '🅰️',
    TypeScript: '🔷',
    JavaScript: '🟨',
    HTML: '🌐',
    CSS: '🎨',
    Tailwind: '🎯',
    Sass: '💎',

    // Backend
    Python: '🐍',
    'Node.js': '🟢',
    Express: '🚀',
    FastAPI: '⚡',
    Django: '🎸',
    Flask: '🌶️',
    Java: '☕',
    Spring: '🍃',
    'C#': '🔷',
    '.NET': '🔷',

    // Databases
    MongoDB: '🍃',
    PostgreSQL: '🐘',
    MySQL: '🐬',
    Redis: '🔴',
    Firebase: '🔥',
    Supabase: '⚡',

    // AI/ML
    TensorFlow: '🧠',
    PyTorch: '🔥',
    OpenAI: '🤖',
    LangChain: '🔗',
    Pinecone: '🌲',
    ChromaDB: '🎨',

    // Blockchain
    Solidity: '⛓️',
    Web3: '🌐',
    'Ethers.js': '⚡',
    Hardhat: '⛏️',
    IPFS: '📁',

    // Mobile
    'React Native': '📱',
    Flutter: '🦋',
    Swift: '🍎',
    Kotlin: '🟣',

    // DevOps
    Docker: '🐳',
    Kubernetes: '☸️',
    AWS: '☁️',
    Vercel: '▲',
    GitHub: '🐙',
    GitLab: '🦊',

    // Tools
    n8n: '🔄',
    Figma: '🎨',
    Webpack: '📦',
    Vite: '⚡',
    ESLint: '🔍',
    Prettier: '💅',
}

export function getTechnologyIcon(tech: string): string {
    return technologyIcons[tech] || '🔧'
}
