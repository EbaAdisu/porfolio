import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    typescript: {
        // Temporarily ignore build errors while in development
        ignoreBuildErrors: true,
    },
    eslint: {
        // Temporarily ignore eslint errors during builds
        ignoreDuringBuilds: true,
    },
}

export default nextConfig
