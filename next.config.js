/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'teknogoal.com',
      },
      {
        protocol: 'http',
        hostname: 'teknogoal.com',
      },
      {
        protocol: 'https',
        hostname: '*.teknogoal.com',
      },
      {
        protocol: 'http',
        hostname: '*.teknogoal.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      // Teknoloji logoları için yeni domainler
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cursor.sh',
      }
    ],
  },
};

module.exports = nextConfig; 