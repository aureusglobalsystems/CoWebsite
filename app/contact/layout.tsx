import type { Metadata } from 'next';
import { SEO_META } from '@/lib/seo-meta';

export const metadata: Metadata = {
  title: SEO_META['/contact'].title,
  description: 'Talk to Aureus Global Systems about a data or AI project, or hire senior data, AI and ML engineers. We aim to reply within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Aureus Global Systems — Start a Data & AI Project or Hire Engineers', description: 'Talk to Aureus Global Systems about a data or AI project, or hire senior data, AI and ML engineers. We aim to reply within one business day.', url: '/contact', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
