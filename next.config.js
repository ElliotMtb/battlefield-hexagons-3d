/** @type {import('next').NextConfig} */
/**
 * MIGRATION NOTE: Next.js configuration file
 * - reactStrictMode: true (matches CRA behavior for development)
 * - images.unoptimized: true (required for Three.js textures to work properly)
 * - assetPrefix: handles production deployment paths correctly
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for Three.js textures
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : undefined,
  // Enable ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Enable TypeScript (if needed in future)
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

module.exports = nextConfig;
