import type { Metadata } from 'next';
import Link from 'next/link';
import { industries } from '@/lib/industries';
import { SITE_URL } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Industries — Data & AI for Banking, Retail, Healthcare & Manufacturing | Aureus',
  description:
    'Data & AI engineering for banking and financial services, retail and e-commerce, healthcare and life sciences, and manufacturing — projects or senior engineers.',
  alternates: { canonical: '/industries' },
  openGraph: { title: 'Industries we serve — Aureus Global Systems', url: '/industries', type: 'website' },
};

export default function IndustriesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Industries — Aureus Global Systems',
    url: `${SITE_URL}/industries`,
    hasPart: industries.map((i) => ({ '@type': 'WebPage', name: i.name, url: `${SITE_URL}/industries/${i.slug}` })),
  };

  return (
    <div style={{ width: '100%' }}>
      <JsonLd data={jsonLd} />
      <section style={{ width: '100%', padding: '140px 0 64px' }}>
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '1px', background: '#ff3366' }} />
            <span className="label" style={{ color: '#ff3366' }}>Industries</span>
          </div>
          <h1 style={{ fontSize: 'clamp(42px, 8vw, 108px)', lineHeight: 0.94, marginBottom: '24px' }}>
            Your sector.<br /><span className="outline-text">Our engineers.</span>
          </h1>
          <p style={{ color: '#777', maxWidth: '540px', fontSize: '1rem' }}>
            Data platforms and AI built around the realities of your industry — its data, its regulators and its customers.
          </p>
        </div>
      </section>

      <section style={{ width: '100%', padding: '0 0 112px' }}>
        <div className="page-container">
          <div className="rg-2" style={{ gap: '24px' }}>
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="card-link" style={{
                display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid #eee', borderRadius: '18px', padding: 'clamp(24px, 4vw, 36px)',
                textDecoration: 'none', background: 'white', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: i.accent }} />
                <span style={{ fontSize: '1.8rem', color: i.accent }}>{i.icon}</span>
                <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', letterSpacing: '-0.03em', color: '#111' }}>{i.name}</h2>
                <p style={{ fontSize: '0.9rem', color: '#777', lineHeight: 1.7 }}>{i.answer}</p>
                <span className="label" style={{ color: i.accent }}>Explore {i.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
