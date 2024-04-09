/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // output: 'export',

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

