/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'fotoco-image-storage.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:9999',
    SOCKET_URL: process.env.SOCKET_URL || 'http://localhost:9999',
    FRONTEND_SITE_NAME: process.env.FRONTEND_SITE_NAME || 'Fotoco',
  },
};

export default nextConfig;
