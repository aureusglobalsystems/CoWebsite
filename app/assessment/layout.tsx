import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Data & AI Readiness Assessment — Score Your Data Platform',
  description: 'Take the free data & AI readiness assessment from Aureus Global Systems. Score your data platform, governance and AI maturity and get practical next steps.',
  alternates: { canonical: '/assessment' },
  openGraph: { title: 'Free Data & AI Readiness Assessment — Score Your Data Platform', description: 'Take the free data & AI readiness assessment from Aureus Global Systems. Score your data platform, governance and AI maturity and get practical next steps.', url: '/assessment', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
