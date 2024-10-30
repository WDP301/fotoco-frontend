export const siteConfig = {
  name: process.env.FRONTEND_SITE_NAME || 'Fotoco',
  url: process.env.FRONTEND_URL || 'http://localhost:3000',
  baseApiURL: process.env.API_URL || 'http://localhost:4000/api/v1',
};

export type SiteConfig = typeof siteConfig;
