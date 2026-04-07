import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-verify",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
