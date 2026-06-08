// ─────────────────────────────────────────────────────────────────
//  app/sitemap.ts
//  Next.js App Router — auto-generates /sitemap.xml on every build.
//  Submit the URL https://www.talenti.in/sitemap.xml in
//  Google Search Console → Sitemaps.
// ─────────────────────────────────────────────────────────────────

import type { MetadataRoute } from "next";

const BASE_URL = "https://www.talenti.in";

// Add new pages here as you build them out.
// priority: 1.0 = homepage, 0.9 = top service pages, 0.8 = industry pages,
//           0.7 = blog posts, 0.5 = utility pages (privacy, terms)

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages (add to this list as you create new routes) ──
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // ── These pages don't exist yet — create them for max SEO impact ──
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/leadership`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // ── Service pages — highest commercial intent ──
    {
      url: `${BASE_URL}/services/executive-search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/it-recruitment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/rpo-solutions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/permanent-hiring`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/hr-consulting`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/ai-recruitment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/talent-mapping`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/services/employer-branding`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // ── Industry pages — niche, low competition ──
    {
      url: `${BASE_URL}/industries/information-technology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/industries/bfsi-recruitment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/industries/airport-project-hiring`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/industries/renewable-energy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/industries/manufacturing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/industries/epc-infrastructure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // ── Legal pages ──
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Blog posts — add dynamically from your CMS/Supabase when ready ──
  // Example (uncomment and adapt once blog posts have real URLs):
  //
  // const blogPosts = await fetchBlogPostsFromSupabase();
  // const blogSitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
  //   url: `${BASE_URL}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.7,
  // }));
  //
  // return [...staticPages, ...blogSitemap];

  // ── Static blog pages (hardcoded until Supabase blog is live) ──
  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/ai-executive-search-india`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/rpo-enterprise-hiring-india`,
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/employer-branding-ai-2025`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return [...staticPages, ...blogPages];
}
