import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'**',
      },
      {
        protocol: 'http',
        hostname:'**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
