import type { MetadataRoute } from 'next'

// Set NEXT_PUBLIC_SITE_URL once the site has a production domain — falls
// back to a relative sitemap reference (valid, but less explicit) until then.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : '/sitemap.xml',
  }
}
