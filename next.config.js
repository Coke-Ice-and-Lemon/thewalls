/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'avatars.githubusercontent.com'],
    unoptimized: true
  }
}

module.exports = nextConfig
