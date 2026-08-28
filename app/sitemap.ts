import type { MetadataRoute } from 'next'

// Set NEXT_PUBLIC_SITE_URL once the site has a production domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/work/go-social', '/work/modrek-design-system', '/resume']
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }))
}
