import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data & AI Engineering Services — Databricks, Snowflake, AI & BI',
  description: 'Data & AI engineering services: Databricks, Snowflake, AI/ML, AI inference engineering, analytics & BI and staff augmentation. Start a project or hire engineers.',
  alternates: { canonical: '/services' },
  openGraph: { title: 'Data & AI Engineering Services — Databricks, Snowflake, AI & BI', description: 'Data & AI engineering services: Databricks, Snowflake, AI/ML, AI inference engineering, analytics & BI and staff augmentation. Start a project or hire engineers.', url: '/services', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
