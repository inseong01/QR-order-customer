/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

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
};

export default bundleAnalyzer(nextConfig);
