import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Important for Docker
};

export default nextConfig;
