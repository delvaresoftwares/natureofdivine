/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.natureofthedivine.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.8,

  exclude: [
    '/admin',
    '/checkout',
    '/track',
    '/ticket/*',
    '/api/*',
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api', '/checkout', '/ticket'] },
    ],
  },
};