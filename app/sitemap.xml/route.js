// app/sitemap.xml/route.js
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coinplus.co.in';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Base pages from your app structure
  const pages = [
    // Home page - highest priority
    { path: '', priority: 1.0, changefreq: 'daily', lastmod: currentDate },
    
    // Main content pages
    { path: '/chitplans', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { path: '/about', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },
    { path: '/whyus', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { path: '/branches', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { path: '/home', priority: 0.8, changefreq: 'weekly', lastmod: currentDate },
    
    // Media section
    { path: '/media/blog', priority: 0.8, changefreq: 'weekly', lastmod: currentDate },
    { path: '/media/events', priority: 0.7, changefreq: 'weekly', lastmod: currentDate },
    { path: '/media/gallery', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
    { path: '/media/news', priority: 0.8, changefreq: 'daily', lastmod: currentDate },
    
    // Contact and support
    { path: '/contactus', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { path: '/faqs', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    
    // Legal pages
    { path: '/privacy', priority: 0.5, changefreq: 'yearly', lastmod: currentDate },
    { path: '/terms', priority: 0.5, changefreq: 'yearly', lastmod: currentDate },
    { path: '/refund', priority: 0.5, changefreq: 'yearly', lastmod: currentDate },
    
    // Additional pages
    { path: '/careers', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
  ];

  // Fetch blog posts from API
  try {
    const blogRes = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (blogRes.ok) {
      const blogPosts = await blogRes.json();
      blogPosts.forEach(post => {
        pages.push({
          path: `/media/blog/${post.id}`,
          priority: 0.7,
          changefreq: 'monthly',
          lastmod: post.updatedAt?.split('T')[0] || post.createdAt?.split('T')[0] || currentDate
        });
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Fetch news articles
  try {
    const newsRes = await fetch(`${baseUrl}/api/admin/news`, {
      next: { revalidate: 3600 }
    });
    
    if (newsRes.ok) {
      const newsArticles = await newsRes.json();
      newsArticles.forEach(article => {
        pages.push({
          path: `/media/news/${article.id}`,
          priority: 0.7,
          changefreq: 'weekly',
          lastmod: article.updatedAt?.split('T')[0] || article.createdAt?.split('T')[0] || currentDate
        });
      });
    }
  } catch (error) {
    console.error('Error fetching news for sitemap:', error);
  }

  // Fetch events
  try {
    const eventsRes = await fetch(`${baseUrl}/api/admin/events`, {
      next: { revalidate: 3600 }
    });
    
    if (eventsRes.ok) {
      const events = await eventsRes.json();
      events.forEach(event => {
        pages.push({
          path: `/media/events/${event.id}`,
          priority: 0.6,
          changefreq: 'monthly',
          lastmod: event.updatedAt?.split('T')[0] || event.createdAt?.split('T')[0] || currentDate
        });
      });
    }
  } catch (error) {
    console.error('Error fetching events for sitemap:', error);
  }

  // Fetch gallery items
  try {
    const galleryRes = await fetch(`${baseUrl}/api/admin/gallery`, {
      next: { revalidate: 3600 }
    });
    
    if (galleryRes.ok) {
      const galleryItems = await galleryRes.json();
      galleryItems.forEach(item => {
        pages.push({
          path: `/media/gallery/${item.id}`,
          priority: 0.5,
          changefreq: 'monthly',
          lastmod: item.updatedAt?.split('T')[0] || item.createdAt?.split('T')[0] || currentDate
        });
      });
    }
  } catch (error) {
    console.error('Error fetching gallery for sitemap:', error);
  }

  // Fetch branches
  try {
    const branchesRes = await fetch(`${baseUrl}/api/branches`, {
      next: { revalidate: 3600 }
    });
    
    if (branchesRes.ok) {
      const branches = await branchesRes.json();
      branches.forEach(branch => {
        pages.push({
          path: `/branches/${branch.id}`,
          priority: 0.7,
          changefreq: 'monthly',
          lastmod: branch.updatedAt?.split('T')[0] || branch.createdAt?.split('T')[0] || currentDate
        });
      });
    }
  } catch (error) {
    console.error('Error fetching branches for sitemap:', error);
  }

  // Generate XML with proper formatting
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}

// Optional: Add revalidation
export const revalidate = 3600; // Revalidate every hour