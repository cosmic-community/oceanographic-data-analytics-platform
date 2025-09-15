/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.cosmicjs.com',
      'imgix.cosmicjs.com'
    ],
  },
}

module.exports = nextConfig