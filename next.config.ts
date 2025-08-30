import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PORT: process.env.PORT || '8080',
  },
};

export default nextConfig;
