/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "script-src 'none' github-readme-stats.vercel.app; sandbox",
    domains: ["github-readme-stats.vercel.app"],
  },
};

module.exports = nextConfig;
