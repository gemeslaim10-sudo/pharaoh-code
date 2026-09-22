import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Legacy hardcoded pages were archived (Desktop/pharaoh-code-archived-static-pages); keep old links alive.
  async redirects() {
    return [
      { source: '/System', destination: '/services', permanent: true },
      { source: '/design', destination: '/services', permanent: true },
      { source: '/SEO', destination: '/services', permanent: true },
    ];
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '35mb',
    },
    optimizePackageImports: ['framer-motion', 'swiper'],
  },
};

export default nextConfig;
