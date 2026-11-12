import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, caseStudyBySlug } from '@/lib/case-studies';
import { serviceBySlug } from '@/lib/services-nav';
import { SITE_URL, SITE_NAME, contactHref } from '@/lib/site';
import JsonLd from '@/components/seo/JsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) return {};
  const description = `${cs.tag} case study (${cs.industry}): ${cs.outcomes.slice(0, 2).join('; ')}. How Aureus Global Systems delivered it in ${cs.duration}.`.slice(0, 160);
  return {
    title: `${cs.title} — ${cs.tag} Case Study | Aureus`,
    description,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: { title: cs.title, description, url: `/case-studies/${slug}`, siteName: SITE_NAME, type: 'article' },
  };
}

const label: React.CSSProperties = { color: '#999', marginBottom: '12px', display: 'block' };

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);
  if (!cs) notFound();
  const svc = serviceBySlug(cs.service);
  const accent = cs.tagColor;
  const url = `${SITE_URL}/case-studies/${slug}`;
  const others = caseStudies.filter((c) => c.slug !== slug && c.service === cs.service).concat(caseStudies.filter((c) => c.service !== cs.service)).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: cs.title,
        description: `${cs.challenge} ${cs.solution}`,
        url,
        about: cs.tech,
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
          { '@type': 'ListItem', position: 3, name: cs.title, item: url },
        ],
      },
    ],
  };

  return (
    <article style={{ width: '100%' }}>
      <JsonLd data={jsonLd} />
      <header style={{ width: '100%', padding: '140px 0 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: accent }} />
        <div className="page-container">
          <nav aria-label="Breadcrumb" className="label" style={{ color: '#aaa', marginBottom: '28px' }}>
            <Link href="/case-studies" style={{ color: '#aaa', textDecoration: 'none' }}>Case Studies</Link>
            <span style={{ margin: '0 10px' }}>/</span>
            <span style={{ color: accent }}>{cs.tag}</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.98, maxWidth: '1000px', marginBottom: '32px' }}>{cs.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[cs.client, cs.industry, cs.duration].map((m) => (
              <span key={m} className="label" style={{ padding: '8px 14px', borderRadius: '100px', border: '1px solid #e5e5e5', color: '#666' }}>{m}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Outcomes strip */}
      <section style={{ width: '100%', background: '#111', padding: '56px 0' }}>
        <div className="page-container">
          <span className="label" style={{ ...label, color: '#666' }}>Outcomes</span>
          <div className="rg-4" style={{ gap: '24px' }}>
            {cs.outcomes.map((o) => (
              <div key={o} style={{ borderTop: `2px solid ${accent}`, paddingTop: '16px' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '17px', lineHeight: 1.3, color: 'white', letterSpacing: '-0.02em' }}>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ width: '100%', padding: '80px 0' }}>
        <div className="page-container rg-2" style={{ gap: '64px', alignItems: 'start' }}>
          <div>
            <h2 className="label" style={{ ...label, color: accent }}>The challenge</h2>
            <p className="article-p" style={{ fontSize: '1.1rem' }}>{cs.challenge}</p>
          </div>
          <div>
            <h2 className="label" style={{ ...label, color: accent }}>What we did</h2>
            <p className="article-p" style={{ fontSize: '1.1rem' }}>{cs.solution}</p>
          </div>
        </div>
        <div className="page-container" style={{ marginTop: '48px' }}>
          <h2 className="label" style={label}>Technology</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cs.tech.map((t) => (
              <span key={t} className="label" style={{ padding: '8px 14px', borderRadius: '100px', color: accent, background: accent + '12', border: `1px solid ${accent}30` }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container" style={{ paddingBottom: '80px' }}>
        <div style={{ borderRadius: '24px', padding: 'clamp(32px, 5vw, 56px)', background: `linear-gradient(135deg, ${accent}14, ${accent}05)`, border: `1px solid ${accent}30`, display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.1, marginBottom: '12px' }}>Facing something similar?</h2>
            <p style={{ color: '#666' }}>Tell us about it. We&apos;ll share how we&apos;d approach it — whether you need a project delivered or engineers on your team.</p>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href={contactHref(svc?.contact)} className="label" style={{ padding: '16px 28px', borderRadius: '100px', background: accent, color: 'white', textDecoration: 'none' }}>
              Discuss your project
            </Link>
            {svc && <Link href={svc.href} className="label" style={{ color: '#111', textDecoration: 'underline', textUnderlineOffset: '4px' }}>{svc.title} →</Link>}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section style={{ width: '100%', padding: '64px 0 112px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
          <div className="page-container">
            <p className="label" style={label}>More case studies</p>
            <div className="rg-2" style={{ gap: '20px' }}>
              {others.map((o) => (
                <Link key={o.slug} href={`/case-studies/${o.slug}`} className="card-link" style={{ display: 'block', padding: '28px', border: '1px solid #eee', borderRadius: '16px', background: 'white', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: o.tagColor }} />
                  <span className="label" style={{ color: o.tagColor }}>{o.tag}</span>
                  <h3 style={{ fontSize: '20px', lineHeight: 1.2, margin: '10px 0 8px', color: '#111' }}>{o.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#777' }}>{o.outcomes[0]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
