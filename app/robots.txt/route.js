export async function GET() {
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coinplus.co.in';

  const robotsTxt = isProd
    ? `
# Allow all bots to crawl
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /_not-found
Disallow: /_next/
Disallow: /dashboard/

# Disallow authentication pages
Disallow: /admin/login

# Disallow specific query parameters
Disallow: /*?*

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for heavy bots (optional)
Crawl-delay: 10
    `.trim()
    : `
# Block all bots in development
User-agent: *
Disallow: /
    `.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}