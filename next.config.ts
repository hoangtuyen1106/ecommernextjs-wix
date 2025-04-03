import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.wixstatic.com"],
  },
  experimental: {
    staleTimes: {
      dynamic: 30
    }
  }
};

export default nextConfig;
