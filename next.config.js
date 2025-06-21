/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // 性能优化
  experimental: {
    optimizeCss: true,
  },
  // 压缩配置
  compress: true,
  // 减少不必要的重定向
  trailingSlash: false,
  // 优化字体加载
  optimizeFonts: true,
  // 减少构建输出
  output: 'standalone',
}

module.exports = nextConfig 