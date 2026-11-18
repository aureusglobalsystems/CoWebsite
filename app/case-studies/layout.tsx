import type { Metadata } from 'next';
import { SEO_META } from '@/lib/seo-meta';

export const metadata: Metadata = {
  title: SEO_META['/case-studies'].title,
  description: 'Data & AI engineering case studies from Aureus Global Systems: Databricks migrations, Snowflake platforms, ML forecasting and BI programmes, with outcomes.',
  alternates: { canonical: '/case-studies' },
  openGraph: { title: 'Data & AI Case Studies — Databricks, Snowflake, ML & BI Results', description: 'Data & AI engineering case studies from Aureus Global Systems: Databricks migrations, Snowflake platforms, ML forecasting and BI programmes, with outcomes.', url: '/case-studies', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
