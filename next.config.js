/** @type {import('next').NextConfig} */
const isStaticExport = process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

if (isStaticExport) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;

  if (basePath) {
    nextConfig.basePath = basePath;
    nextConfig.assetPrefix = basePath;
  }
}

module.exports = nextConfig;
