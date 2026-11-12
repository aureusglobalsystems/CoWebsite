import type { Metadata } from 'next';
import Link from 'next/link';
import { posts } from '@/lib/posts';
import { serviceBySlug } from '@/lib/services-nav';
import { SITE_URL } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Insights — Data Engineering, AI & LLM Inference Guides | Aureus',
  description:
    'Practical guides on data engineering, Databricks, Snowflake, AI/ML and LLM inference from the engineers at Aureus Global Systems. Costs, trade-offs and how-tos.',
  alternates: { canonical: '/insights' },
  openGraph: { title: 'Insights from Aureus Global Systems', url: '/insights', type: 'website' },
};

const fmt = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function InsightsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Aureus Global Systems Insights',
    url: `${SITE_URL}/insights`,
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/insights/${p.slug}`, datePublished: p.date })),
  };

  return (
    <div style={{ width: '100%' }}>
      <JsonLd data={jsonLd} />
      <section style={{ width: '100%', padding: '140px 0 64px' }}>
        <div className="page-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '1px', background: '#ff3366' }} />
            <span className="label" style={{ color: '#ff3366' }}>Insights</span>
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 112px)', lineHeight: 0.93, marginBottom: '24px' }}>
            Field notes<br /><span className="outline-text">from the build.</span>
          </h1>
          <p style={{ color: '#777', maxWidth: '520px', fontSize: '1rem' }}>
            Straight answers on data platforms, AI and LLM inference — costs, trade-offs and what actually works in production.
          </p>
        </div>
      </section>

      <section style={{ width: '100%', padding: '0 0 112px' }}>
        <div className="page-container">
          <div className="rg-3" style={{ gap: '24px' }}>
            {posts.map((p) => {
              const svc = serviceBySlug(p.service);
              const accent = svc?.accent ?? '#ff3366';
              return (
                <Link key={p.slug} href={`/insights/${p.slug}`} className="card-link" style={{
                  display: 'flex', flexDirection: 'column', border: '1px solid #eee', borderRadius: '16px', padding: '32px',
                  textDecoration: 'none', background: 'white', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: accent }} />
                  <span className="label" style={{ color: '#aaa', marginBottom: '16px' }}>{fmt(p.date)} · {p.readingMinutes} min read</span>
                  <h2 style={{ fontSize: '22px', letterSpacing: '-0.03em', lineHeight: 1.2, color: '#111', marginBottom: '14px' }}>{p.title}</h2>
                  <p style={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.7, flex: 1 }}>{p.summary}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px' }}>
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="label" style={{ fontSize: '0.48rem', padding: '4px 10px', borderRadius: '100px', color: accent, background: accent + '12' }}>{t}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
