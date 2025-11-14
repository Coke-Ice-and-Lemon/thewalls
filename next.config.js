/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'avatars.githubusercontent.com', 'img.youtube.com', 'lh3.googleusercontent.com'],
    unoptimized: true
  }
}

module.exports = nextConfig
