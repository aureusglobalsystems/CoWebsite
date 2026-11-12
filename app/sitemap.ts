import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { serviceNav } from '@/lib/services-nav';
import { caseStudies } from '@/lib/case-studies';
import { posts } from '@/lib/posts';
import { industries } from '@/lib/industries';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly', lastModified: Date = now) =>
    ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority });

  return [
    page('', 1, 'weekly'),
    page('/services', 0.9),
    ...serviceNav.map((s) => page(s.href, 0.9)),
    page('/industries', 0.8),
    ...industries.map((i) => page(`/industries/${i.slug}`, 0.8)),
    page('/case-studies', 0.8),
    ...caseStudies.map((c) => page(`/case-studies/${c.slug}`, 0.7)),
    page('/insights', 0.8, 'weekly'),
    ...posts.map((p) => page(`/insights/${p.slug}`, 0.7, 'monthly', new Date(p.date))),
    page('/about', 0.6),
    page('/assessment', 0.6),
    page('/contact', 0.7),
  ];
}
