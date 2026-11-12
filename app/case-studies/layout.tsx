import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data & AI Case Studies — Databricks, Snowflake, ML & BI Results',
  description: 'Data & AI engineering case studies from Aureus Global Systems: Databricks migrations, Snowflake platforms, ML forecasting and BI programmes, with outcomes.',
  alternates: { canonical: '/case-studies' },
  openGraph: { title: 'Data & AI Case Studies — Databricks, Snowflake, ML & BI Results', description: 'Data & AI engineering case studies from Aureus Global Systems: Databricks migrations, Snowflake platforms, ML forecasting and BI programmes, with outcomes.', url: '/case-studies', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
