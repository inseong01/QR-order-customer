/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  rewrites() {
    return [
      {
        source: '/visitor/api/menu',
        destination: 'http://localhost:3001/data/menu'
      }
    ]
  }
};

export default nextConfig;
