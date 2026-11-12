'use client';

import { useState } from 'react';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import { trackEvent } from '@/lib/analytics';

export const S = {
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  body: { fontFamily: 'Inter, sans-serif', color: '#666', lineHeight: 1.72, fontSize: '0.95rem' } as React.CSSProperties,
  eyebrow: (color = '#888') => ({
    fontFamily: 'Space Mono, monospace', fontSize: '0.58rem',
    letterSpacing: '0.18em', textTransform: 'uppercase' as const,
    color, display: 'block', marginBottom: '16px',
  }),
  h2: (color = '#111') => ({
    fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)',
    letterSpacing: '-0.04em', lineHeight: 1.0, color, marginBottom: '48px',
  }) as React.CSSProperties,
};

export const outline = (color = '#111'): React.CSSProperties => ({ WebkitTextStroke: `2px ${color}`, color: 'transparent' });

export const ctaStyle = (accent: string, accent2: string): React.CSSProperties => ({
  padding: '16px 32px', borderRadius: '100px',
  background: `linear-gradient(135deg, ${accent}, ${accent2})`,
  color: 'white', fontFamily: 'Space Mono, monospace',
  fontSize: '0.6rem', letterSpacing: '0.16em',
  textTransform: 'uppercase', textDecoration: 'none',
});

export function Faq({ faqs, accent }: { faqs: { q: string; a: string }[]; accent: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
      <div style={{ ...S.container, maxWidth: '920px' }}>
        <p className="reveal" style={S.eyebrow()}>FAQ</p>
        <h2 className="reveal" style={S.h2()}>Questions,<br /><span style={outline()}>answered.</span></h2>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} style={{ borderBottom: '1px solid #eee' }}>
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px',
                padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '-0.02em', color: isOpen ? accent : '#111', transition: 'color 0.2s', lineHeight: 1.3 }}>{f.q}</h3>
                <span style={{ fontSize: '20px', color: accent, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>+</span>
              </button>
              {/* answer stays in the DOM so crawlers can read it */}
              <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ ...S.body, paddingBottom: '24px', maxWidth: '760px' }}>{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export type ProofItem = { slug: string; title: string; client: string; industry: string; outcomes: string[]; tagColor: string };

export function RelatedCaseStudies({ items, accent }: { items: ProofItem[]; accent: string }) {
  if (!items.length) return null;
  return (
    <section style={{ width: '100%', padding: '96px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
      <div style={S.container}>
        <p className="reveal" style={S.eyebrow()}>Proof</p>
        <h2 className="reveal" style={S.h2()}>Recent<br /><span style={outline()}>engagements.</span></h2>
        <div className="rg-2" style={{ gap: '24px' }}>
          {items.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="reveal card-link" style={{
              display: 'block', background: 'white', border: '1px solid #eee', borderRadius: '16px', padding: '32px',
              textDecoration: 'none', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: c.tagColor }} />
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{c.client} · {c.industry}</p>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1.2, color: '#111', marginBottom: '16px' }}>{c.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                {c.outcomes.slice(0, 3).map((o) => (
                  <li key={o} style={{ display: 'flex', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#555', padding: '3px 0' }}>
                    <span style={{ color: c.tagColor }}>✓</span>{o}
                  </li>
                ))}
              </ul>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>Read the case study →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export type InsightItem = { slug: string; title: string; summary: string; readingMinutes: number };

export function RelatedInsights({ items, accent }: { items: InsightItem[]; accent: string }) {
  if (!items.length) return null;
  return (
    <section style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
      <div style={S.container}>
        <p className="reveal" style={S.eyebrow()}>Insights</p>
        <h2 className="reveal" style={S.h2()}>Further<br /><span style={outline()}>reading.</span></h2>
        <div className="rg-3" style={{ gap: '24px' }}>
          {items.map((p) => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="reveal card-link" style={{
              display: 'flex', flexDirection: 'column', border: '1px solid #eee', borderRadius: '16px', padding: '28px', textDecoration: 'none', background: 'white',
            }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa', marginBottom: '14px' }}>{p.readingMinutes} min read</span>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', lineHeight: 1.25, color: '#111', marginBottom: '12px' }}>{p.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.84rem', color: '#777', lineHeight: 1.65, flex: 1 }}>{p.summary}</p>
              <span style={{ marginTop: '18px', fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LeadMagnet({ title, body, cta, href, accent, service }: { title: string; body: string; cta: string; href: string; accent: string; service: string }) {
  return (
    <section style={{ width: '100%', padding: '72px 0' }}>
      <div style={S.container}>
        <div className="reveal" style={{
          position: 'relative', overflow: 'hidden', borderRadius: '24px', padding: 'clamp(32px, 5vw, 56px)',
          background: `linear-gradient(135deg, ${accent}12, ${accent}05)`, border: `1px solid ${accent}30`,
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px',
        }}>
          <div style={{ maxWidth: '640px' }}>
            <span style={{ ...S.eyebrow(accent), marginBottom: '12px' }}>Free · No obligation</span>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: '#111', marginBottom: '14px' }}>{title}</h2>
            <p style={{ ...S.body, margin: 0 }}>{body}</p>
          </div>
          <span onClick={() => trackEvent('lead_magnet_click', { service })}>
            <MagneticButton href={href} style={ctaStyle(accent, '#111')}>{cta}</MagneticButton>
          </span>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ heading, outlineText, body, accent, accent2, href, label, bookingUrl, service }: {
  heading: string; outlineText: string; body: string; accent: string; accent2: string; href: string; label: string; bookingUrl?: string; service: string;
}) {
  return (
    <section style={{ width: '100%', background: '#111', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${accent}, ${accent2}, #ff3366)` }} />
      <div className="film-grain-overlay" />
      <div style={{ ...S.container, position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2 className="reveal" style={{ ...S.h2('white'), marginBottom: '24px' }}>
          {heading}<br /><span style={outline('white')}>{outlineText}</span>
        </h2>
        <p className="reveal" style={{ ...S.body, color: '#888', maxWidth: '520px', margin: '0 auto 40px' }}>{body}</p>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span onClick={() => trackEvent('cta_click', { service, location: 'final_cta' })}>
            <MagneticButton href={href} style={ctaStyle(accent, accent2)}>{label}</MagneticButton>
          </span>
          {bookingUrl && (
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent('book_call_click', { service })}
              style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'white', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
              Book a 30-min call ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
