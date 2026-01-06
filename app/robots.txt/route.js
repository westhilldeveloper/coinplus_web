export async function GET() {
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coinplus.co.in';

  const robotsTxt = isProd
    ? `
User-agent: *
Allow: /

Disallow: /api/
Disallow: /_next/
Disallow: /dashboard/
Disallow: /auth/

Sitemap: ${baseUrl}/sitemap.xml
    `.trim()
    : `
User-agent: *
Disallow: /
    `.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
