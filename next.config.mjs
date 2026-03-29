/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles the Node.js server automatically; do NOT set output: 'export'
  // unless you want a fully static site with no API routes or SSR.
  // Leaving output unset is the correct default for Vercel + Next.js 14.

  images: {
    // Allow images from common external sources used in portfolios.
    // Add or remove domains as needed by the app/ layer.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
    // Use modern formats for better compression (Vercel supports both).
    formats: ["image/avif", "image/webp"],
    // Keep device sizes aligned with Tailwind CSS breakpoints.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Minify output with SWC (default in Next 14, but explicit for clarity).
  swcMinify: true,

  // Strict mode helps catch React issues early in development.
  reactStrictMode: true,

  // Compress responses with gzip (Vercel's edge also handles this,
  // but enabling here provides a fallback for self-hosted previews).
  compress: true,

  // Forward trailing-slash behavior: disabled keeps URLs canonical.
  trailingSlash: false,

  // Prevent the X-Powered-By header from leaking framework info.
  poweredByHeader: false,
};

export default nextConfig;
