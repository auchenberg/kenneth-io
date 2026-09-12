/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // output: 'export',

  transpilePackages: ['react-tweet'],

  async redirects() {
    return [
      {
        source: '/press',
        destination: '/about#press',
        permanent: true,
      },
      {
        source: '/post/insights-from-building-stripes-developer-platform-and-api-developer-experience-part-1',
        destination: '/post/insights-from-building-stripes-developer-platform-and-api-developer-experience',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}

module.exports = nextConfig
