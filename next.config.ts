import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'skypark.kg',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
