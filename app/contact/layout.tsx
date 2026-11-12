import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Aureus Global Systems — Start a Data & AI Project or Hire Engineers',
  description: 'Talk to Aureus Global Systems about a data or AI project, or hire senior data, AI and ML engineers. A senior engineer replies within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Aureus Global Systems — Start a Data & AI Project or Hire Engineers', description: 'Talk to Aureus Global Systems about a data or AI project, or hire senior data, AI and ML engineers. A senior engineer replies within one business day.', url: '/contact', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
