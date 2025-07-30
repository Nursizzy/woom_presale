import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove trailing slashes
  trailingSlash: false,
  // Add base path for GitHub Pages
  basePath: process.env.GITHUB_ACTIONS ? '/woom_presale' : '',
};

export default nextConfig;
