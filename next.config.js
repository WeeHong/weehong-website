/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["github-readme-stats.vercel.app"],
  },
};

module.exports = nextConfig;
