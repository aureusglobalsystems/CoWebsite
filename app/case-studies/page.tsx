'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import TiltCard from '@/components/ui/TiltCard';
import { caseStudies as allCaseStudies } from '@/lib/case-studies';

const ACCENT = '#00d4aa';

const S = {
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  body: { fontFamily: 'Inter, sans-serif', color: '#666', lineHeight: 1.7, fontSize: '0.88rem' } as React.CSSProperties,
};



const categories = ['All', 'Databricks', 'Snowflake', 'Analytics', 'AI/ML'];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
  }, []);

  const filtered = activeFilter === 'All' ? allCaseStudies : allCaseStudies.filter(cs => cs.category === activeFilter);

  return (
    <div style={{ width: '100%' }}>
      {/* Hero */}
      <section style={{ width: '100%', padding: '120px 0 80px' }}>
        <div style={S.container}>
          <div ref={heroRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '32px', height: '1px', background: ACCENT }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>Proof</span>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 112px)', letterSpacing: '-0.04em', lineHeight: 0.93, color: '#111', marginBottom: '24px' }}>
              Proof,<br />
              <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Not Promises.</span>
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', maxWidth: '480px', lineHeight: 1.72, marginBottom: '48px' }}>
              Every case study below is a real engagement. Real client. Real outcome. Real numbers.
            </p>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '0.55rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  padding: '10px 20px', borderRadius: '100px',
                  border: `1px solid ${activeFilter === cat ? ACCENT : '#ddd'}`,
                  background: activeFilter === cat ? ACCENT : 'transparent',
                  color: activeFilter === cat ? 'white' : '#888',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section style={{ width: '100%', padding: '0 0 96px' }}>
        <div style={S.container}>
          <div className="rg-2" style={{ gap: '24px' }}>
            {filtered.map((cs, i) => (
              <TiltCard key={cs.title}>
                <div style={{
                  background: '#fff',
                  border: '1px solid #f0f0f0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'default',
                }}>
                  <div style={{ height: '3px', background: cs.tagColor }} />
                  <div style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <span style={{
                        fontFamily: 'Space Mono, monospace', fontSize: '0.5rem',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        padding: '5px 12px', borderRadius: '100px',
                        color: cs.tagColor, background: cs.tagColor + '15',
                      }}>{cs.tag}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cs.industry}</span>
                        <span style={{ color: '#ccc', fontSize: '0.45rem' }}>·</span>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cs.duration}</span>
                      </div>
                    </div>

                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{cs.client}</p>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1.2, color: '#111', marginBottom: '20px' }}>{cs.title}</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                      <div>
                        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Challenge</p>
                        <p style={S.body}>{cs.challenge}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Solution</p>
                        <p style={S.body}>{cs.solution}</p>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px', marginBottom: '20px' }}>
                      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>Outcomes</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {cs.outcomes.map((o, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: cs.tagColor, flexShrink: 0, marginTop: '1px' }}>✓</span>
                            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', color: '#111' }}>{o}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cs.tech.map(t => (
                        <span key={t} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', background: '#f8f8f8', color: '#888', borderRadius: '4px' }}>{t}</span>
                      ))}
                    </div>

                    <Link href={`/case-studies/${cs.slug}`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px',
                      fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: cs.tagColor, textDecoration: 'none', borderBottom: `1px solid ${cs.tagColor}55`, paddingBottom: '3px',
                    }}>
                      Read the full case study →
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ width: '100%', background: '#111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: 'white', marginBottom: '32px', lineHeight: 1.0 }}>
            Ready to Write Your<br />
            <span style={{ color: ACCENT }}>Case Study?</span>
          </h2>
          <a href="/contact" style={{
            display: 'inline-block', padding: '16px 36px', borderRadius: '100px',
            background: ACCENT, color: '#111',
            fontFamily: 'Space Mono, monospace', fontSize: '0.6rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 700,
          }}>Let's Talk</a>
        </div>
      </section>
    </div>
  );
}
