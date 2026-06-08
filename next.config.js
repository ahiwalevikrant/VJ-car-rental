/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "VJ-car-rental";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig = {
  images: {
    unoptimized: true,
  },
};

if (isGithubPages) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  nextConfig.basePath = basePath;
  nextConfig.assetPrefix = basePath;
}

module.exports = nextConfig;
