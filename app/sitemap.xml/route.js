// app/sitemap.xml/route.js
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coinplus.co.in';
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // All pages from your app structure
  const pages = [
    // Home page - highest priority
    { path: '', priority: 1.0, changefreq: 'daily', lastmod: currentDate },
    
    // Main content pages
    { path: '/chitplans', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { path: '/about', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },
    { path: '/whyus', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { path: '/branches', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    
    // Contact and support
    { path: '/contactus', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { path: '/faqs', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    
    // Legal pages
    { path: '/privacy', priority: 0.5, changefreq: 'yearly', lastmod: currentDate },
    { path: '/terms', priority: 0.5, changefreq: 'yearly', lastmod: currentDate },
    { path: '/refund', priority: 0.5, changefreq: 'yearly', lastmod: currentDate },
    
    // Additional pages
    { path: '/careers', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
    { path: '/media', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
  ];

  // If you have dynamic content (blog posts, news, events), fetch them here
  // Example for blog posts:
  // try {
  //   const blogPosts = await getBlogPosts(); // Your function to fetch blog posts
  //   blogPosts.forEach(post => {
  //     pages.push({
  //       path: `/blog/${post.slug}`,
  //       priority: 0.7,
  //       changefreq: 'monthly',
  //       lastmod: post.updatedAt || post.createdAt
  //     });
  //   });
  // } catch (error) {
  //   console.error('Error fetching blog posts for sitemap:', error);
  // }

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}