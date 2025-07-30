import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove trailing slashes
  trailingSlash: false,
  // Add base path for GitHub Pages
  basePath: isGitHubPages ? '/woom_presale' : '',
  assetPrefix: isGitHubPages ? '/woom_presale/' : '',
};

export default nextConfig;
