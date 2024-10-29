const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: 'service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/your-domain\.com\/.*$/, // استبدل your-domain.com بنطاق موقعك
      handler: 'NetworkFirst', // استخدام استراتيجية الشبكة أولاً مع النسخ الاحتياطي من الكاش عند عدم الاتصال
      options: {
        cacheName: 'pages-cache',
        expiration: {
          maxEntries: 50, // الحد الأقصى للصفحات المخزنة
          maxAgeSeconds: 30 * 24 * 60 * 60, // مدة التخزين 30 يوماً
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif)$/, // تخزين الصور في الكاش
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.(?:js|css)$/, // تخزين الملفات الثابتة في الكاش
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources-cache',
      },
    },
  ],
});

const nextConfig = {
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
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.exoclick.com',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
