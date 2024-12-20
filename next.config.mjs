/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onofrsiptqngmwfzenlr.supabase.co',
        port: '',
        pathname: '/storage/**',
        search: ''
      }
    ]
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
