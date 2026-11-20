import type { Metadata } from 'next';
import Link from 'next/link';
import { SEO_META } from '@/lib/seo-meta';
import TalentForm from '@/components/careers/TalentForm';
import { Faq } from '@/components/service/Sections';
import JsonLd from '@/components/seo/JsonLd';
import { CAREERS_ACCENT as ACCENT, CAREERS_FAQS, CAREERS_LEVELS, CAREERS_PATH, CAREERS_STEPS, CAREERS_TRACKS, LINKEDIN_URL } from '@/lib/careers';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const OG_TITLE = 'Remote Databricks data engineer roles — join the AGS consultant network';
const OG_DESC = 'Remote contract projects for Databricks data engineers on Azure, AWS and GCP — Data Engineer, Senior, Lead and Solutions Architect.';

export const metadata: Metadata = {
  title: SEO_META[CAREERS_PATH].title,
  description: SEO_META[CAREERS_PATH].description,
  keywords: [
    'remote Databricks data engineer', 'Databricks data engineer contract', 'Azure Databricks data engineer remote',
    'AWS Databricks data engineer', 'GCP data engineer remote', 'Databricks solutions architect contract',
    'lead data engineer remote contract', 'freelance data engineer India',
  ],
  alternates: { canonical: CAREERS_PATH },
  openGraph: { title: OG_TITLE, description: OG_DESC, url: CAREERS_PATH, siteName: SITE_NAME, type: 'website' },
  twitter: { card: 'summary_large_image', title: OG_TITLE, description: OG_DESC },
};

const eyebrow: React.CSSProperties = { fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT };
const h2: React.CSSProperties = { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.035em', lineHeight: 1, color: '#111', margin: '14px 0 28px' };
const body: React.CSSProperties = { fontFamily: 'Inter, sans-serif', color: '#555', fontSize: '0.98rem', lineHeight: 1.75 };

const promises = [
  ['Remote, always', 'Work from anywhere. Some clients ask for a few hours of overlap with US, UK or European hours.'],
  ['Databricks, every project', 'Lakehouse builds and migrations on Azure, AWS and GCP inside client teams — not ticket queues.'],
  ['Clear rates', 'Rate agreed with you before your profile goes to any client.'],
  ['Your consent first', 'We never share your profile without asking you for that specific role.'],
];

export default function CareersPage() {
  const url = `${SITE_URL}${CAREERS_PATH}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${url}#page`, name: OG_TITLE, url, description: OG_DESC, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#organization` } },
      { '@type': 'FAQPage', mainEntity: CAREERS_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Careers', item: url },
        ],
      },
    ],
  };

  return (
    <div style={{ width: '100%' }}>
      <JsonLd data={jsonLd} />

      <section style={{ width: '100%', padding: '130px 0 56px' }}>
        <div className="page-container">
          <nav aria-label="Breadcrumb" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '28px' }}>
            <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link> / <span style={{ color: ACCENT }}>Careers</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '1px', background: ACCENT }} />
            <span style={eyebrow}>Careers · Consultant network</span>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(34px, 6.4vw, 88px)', letterSpacing: '-0.04em', lineHeight: 0.95, color: '#111', marginBottom: '24px' }}>
            Remote Databricks work.<br /><span className="outline-text">Azure, AWS, GCP.</span>
          </h1>
          <p style={{ ...body, maxWidth: '640px', fontSize: '1.05rem' }}>
            Join the AGS consultant network for remote contract projects as a Data Engineer, Senior Data Engineer, Lead or
            Solutions Architect on Databricks — on Azure, AWS or GCP. Tell us what you do best; we&apos;ll call you when a project fits.
          </p>
        </div>
      </section>

      <section style={{ width: '100%', padding: '0 0 96px' }}>
        <div className="page-container">
          <div className="rg-2 contact-grid" style={{ gap: 'clamp(48px, 7vw, 80px)', alignItems: 'start' }}>
            <div id="join">
              <TalentForm />
            </div>
            <div>
              <p style={{ ...eyebrow, color: '#888', marginBottom: '40px' }}>How it works</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginBottom: '48px' }}>
                {CAREERS_STEPS.map((s) => (
                  <div key={s.n} style={{ display: 'flex', gap: '24px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: ACCENT, flexShrink: 0, paddingTop: '3px', letterSpacing: '0.1em' }}>{s.n}</span>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', color: '#111', marginBottom: '6px' }}>{s.title}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.88rem', lineHeight: 1.7 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ border: '1px solid #f0f0f0', borderRadius: '16px', padding: '28px', display: 'grid', gap: '18px' }}>
                {promises.map(([t, d]) => (
                  <div key={t}>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#111', marginBottom: '4px' }}>{t}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.84rem', lineHeight: 1.6 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ width: '100%', padding: '96px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div className="page-container">
          <p style={eyebrow}>Who we look for</p>
          <h2 style={h2}>Databricks data engineers, on three clouds.</h2>
          <div className="careers-tracks">
            {CAREERS_TRACKS.map((t) => (
              <div key={t.title} className="careers-track">
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: '#111', marginBottom: '10px' }}>{t.title}</h3>
                <p style={{ ...body, fontSize: '0.9rem', color: '#777' }}>{t.body}</p>
              </div>
            ))}
          </div>
          <h3 style={{ ...eyebrow, color: '#888', margin: '56px 0 20px' }}>Levels</h3>
          <div className="careers-levels">
            {CAREERS_LEVELS.map((l) => (
              <div key={l.title} className="careers-level">
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: '#111', marginBottom: '6px' }}>{l.title}</p>
                <p style={{ ...body, fontSize: '0.86rem', color: '#777', lineHeight: 1.6 }}>{l.body}</p>
              </div>
            ))}
          </div>
          <p style={{ ...body, marginTop: '32px', maxWidth: '720px' }}>
            Hands-on Databricks experience in production — PySpark, Delta Lake and at least one cloud — is required for every role.
            Certifications help but are not essential.
          </p>
        </div>
      </section>

      <Faq faqs={CAREERS_FAQS} accent={ACCENT} />

      <section style={{ width: '100%', padding: '96px 0', background: '#0b0b0b', textAlign: 'center' }}>
        <div className="page-container" style={{ maxWidth: '720px' }}>
          <p style={{ ...eyebrow, color: '#4fe3c1' }}>Two minutes</p>
          <h2 style={{ ...h2, color: 'white' }}>Be first in line for the next project.</h2>
          <p style={{ ...body, color: '#999', marginBottom: '36px' }}>
            Databricks projects often need to start within weeks. Engineers already in the network hear about them first.
          </p>
          <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#join" className="calc-cta">Join the network →</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="calc-link" style={{ color: 'white' }}>Follow us on LinkedIn for new roles ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
