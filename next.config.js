/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // basePath 移除，Cloudflare Pages 通常不需要
  // 如果需要子路径部署，可以使用自定义域名或 Cloudflare 的路由规则
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // 确保静态导出兼容性
}

module.exports = nextConfig
