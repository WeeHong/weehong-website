const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/resume", "/blogs/*"],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap-0.xml`],
  },
};
