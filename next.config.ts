import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-build-output",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
