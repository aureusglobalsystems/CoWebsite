import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Aureus Global Systems — Data & AI Engineering Company',
  description: 'Aureus Global Systems is a data & AI engineering company delivering Databricks, Snowflake, AI/ML, LLM inference and BI projects worldwide from India.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About Aureus Global Systems — Data & AI Engineering Company', description: 'Aureus Global Systems is a data & AI engineering company delivering Databricks, Snowflake, AI/ML, LLM inference and BI projects worldwide from India.', url: '/about', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
