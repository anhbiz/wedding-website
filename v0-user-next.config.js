/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Tắt strict mode để giảm số lần render
  images: {
    unoptimized: true, // Tắt tối ưu hóa ảnh
  },
}

module.exports = nextConfig

