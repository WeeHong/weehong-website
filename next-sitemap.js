const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [`${siteUrl}/blog-sitemap.xml`],
  },
  sitemapSize: 7000,
};
