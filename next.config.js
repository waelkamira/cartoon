/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // missingSuspenseWithCSRBailout: false,
  },

  // distDir: 'build',
  // output: 'export',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
    ],
  },
};

module.exports = nextConfig;
