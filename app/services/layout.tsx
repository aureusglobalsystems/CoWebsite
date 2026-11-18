import type { Metadata } from 'next';
import { SEO_META } from '@/lib/seo-meta';

export const metadata: Metadata = {
  title: SEO_META['/services'].title,
  description: SEO_META['/services'].description,
  alternates: { canonical: '/services' },
  openGraph: { title: 'Data & AI Engineering Services — Databricks, Snowflake, AI & BI', description: 'Data & AI engineering services: Databricks, Snowflake, AI/ML, AI inference engineering, analytics & BI and staff augmentation. Start a project or hire engineers.', url: '/services', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
