import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@react-pdf/renderer'],
  },
};

export default nextConfig;
