import type { Metadata } from 'next';
import { SEO_META } from '@/lib/seo-meta';

export const metadata: Metadata = {
  title: SEO_META['/about'].title,
  description: 'Aureus Global Systems is a data & AI engineering company delivering Databricks, Snowflake, AI/ML, LLM inference and BI projects worldwide from India.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About Aureus Global Systems — Data & AI Engineering Company', description: 'Aureus Global Systems is a data & AI engineering company delivering Databricks, Snowflake, AI/ML, LLM inference and BI projects worldwide from India.', url: '/about', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
