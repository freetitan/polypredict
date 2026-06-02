/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/polypredict',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
