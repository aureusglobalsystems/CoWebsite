'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';

const ACCENT = '#3366ff';

const S = {
  section: { width: '100%' } as React.CSSProperties,
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  eyebrow: (color = ACCENT) => ({
    display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px',
  } as React.CSSProperties),
  eyebrowLine: (color = ACCENT) => ({ width: '32px', height: '1px', background: color } as React.CSSProperties),
  eyebrowText: (color = ACCENT) => ({
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.58rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color,
  }),
  h1: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: 'clamp(48px, 8vw, 112px)',
    letterSpacing: '-0.04em',
    lineHeight: 0.93,
    color: '#111',
  } as React.CSSProperties,
  h2: {
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    fontSize: 'clamp(28px, 3.5vw, 48px)',
    letterSpacing: '-0.04em',
    lineHeight: 1.0,
    color: '#111',
  } as React.CSSProperties,
  body: {
    fontFamily: 'Inter, sans-serif',
    color: '#666',
    lineHeight: 1.72,
    fontSize: '0.95rem',
  } as React.CSSProperties,
  card: {
    background: '#fff',
    border: '1px solid #f0f0f0',
    borderRadius: '16px',
    padding: '32px',
  } as React.CSSProperties,
  label: (color = '#888') => ({
    fontFamily: 'Space Mono, monospace',
    fontSize: '0.55rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color,
    display: 'block',
    marginBottom: '48px',
  }),
};

const beliefs = [
  { quote: 'Production is the only measure that matters.', body: "We don't celebrate green tests on staging. We celebrate data that moves decisions in production." },
  { quote: 'Complexity is a failure of clarity.', body: "The best architecture is the simplest one that meets your scale. We resist complexity for its own sake." },
  { quote: 'We inherit your outcomes, not just your tickets.', body: "When we build your platform, we're accountable for its performance — long after deployment." },
];

const expertise = [
  { icon: '◈', title: 'Databricks & Delta Lake', body: "Medallion architecture, Unity Catalog, MLflow, AutoML. We've built Lakehouse platforms processing petabytes daily." },
  { icon: '❄', title: 'Snowflake', body: "Data Vault 2.0, Snowpark, zero-copy cloning, cost optimization. From startup to enterprise — we've scaled it all." },
  { icon: '☁', title: 'Cloud Data Platforms', body: "AWS, Azure, and GCP native services. Data Factory, Glue, BigQuery — multi-cloud by design." },
  { icon: '◉', title: 'Analytics & BI', body: "Semantic layers, Power BI Premium, Tableau, Looker. We build dashboards that people actually open every morning." },
];

const whyUs = [
  { title: 'Outcome-Driven', body: 'We measure success by business impact, not deliverables. KPIs first, architecture second.' },
  { title: 'Production-First', body: 'Every decision we make is through the lens of "will this hold in production at 3am?"' },
  { title: 'Enterprise Standards', body: 'SOC2-ready data ops, full documentation, and handoffs that stick.' },
  { title: 'Transparent Partners', body: "Weekly stakeholder updates, no black boxes, and we say no when something won't work." },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.06,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      });
    });
  }, []);

  const addRef = (i: number) => (el: HTMLElement | null) => { if (el) itemRefs.current[i] = el; };

  return (
    <div style={{ width: '100%' }}>
      {/* ── Hero ── */}
      <section style={{ ...S.section, padding: '120px 0 80px' }}>
        <div style={S.container}>
          <div ref={heroRef} style={{ opacity: 0 }}>
            <div style={S.eyebrow()}>
              <div style={S.eyebrowLine()} />
              <span style={S.eyebrowText()}>About Aureus</span>
            </div>

            <h1 style={S.h1}>
              We Build<br />
              <span style={{ color: ACCENT }}>Data Platforms</span><br />
              <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>That Last.</span>
            </h1>

            <div className="rg-2" style={{ gap: '48px', marginTop: '64px' }}>
              <div>
                <p style={S.label()}>Who We Are</p>
                <p style={S.body}>
                  Aureus Global Systems is a leading data & AI company founded in 2024.
                  We are a team of senior data engineers, AI architects, and analytics specialists who have
                  collectively delivered over 50 data and AI platforms across retail, fintech, healthcare,
                  and manufacturing.
                </p>
              </div>
              <div>
                <p style={S.label()}>Our Mission</p>
                <p style={S.body}>
                  To give every organization — regardless of size — access to the same data engineering
                  excellence that powers the world's most data-driven companies. Production-grade,
                  enterprise-standard, and built to scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section style={{ ...S.section, background: '#fafafa', padding: '96px 0' }}>
        <div style={S.container}>
          <p style={S.label()}>Our Approach</p>
          <div className="rg-3" style={{ gap: '24px' }}>
            {[
              { title: 'Outcome-Driven', icon: '→', body: 'Every architectural choice traces back to a business metric. We start with the KPI, then choose the technology.' },
              { title: 'Production-First', icon: '◉', body: "We build as if we're the ones on call at 3am. Monitoring, alerting, and runbooks are day-one requirements." },
              { title: 'Enterprise Standards', icon: '◈', body: "Full documentation, clean handoffs, SOC2-compatible data operations. Your security team will be satisfied." },
            ].map((item, i) => (
              <div key={i} ref={addRef(i) as any} style={{ ...S.card, opacity: 0 }}>
                <span style={{ fontSize: '1.5rem', color: ACCENT, display: 'block', marginBottom: '16px' }}>{item.icon}</span>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.03em', marginBottom: '12px', color: '#111' }}>{item.title}</h3>
                <p style={S.body}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beliefs ── */}
      <section style={{ ...S.section, padding: '96px 0' }}>
        <div style={S.container}>
          <p style={S.label()}>What We Believe</p>
          <div className="rg-3" style={{ gap: '48px' }}>
            {beliefs.map((belief, i) => (
              <div key={i} ref={addRef(3 + i) as any} style={{ opacity: 0 }}>
                <div style={{ width: '32px', height: '2px', background: ACCENT, marginBottom: '20px' }} />
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.03em', marginBottom: '12px', color: '#111', lineHeight: 1.3 }}>
                  "{belief.quote}"
                </h3>
                <p style={{ ...S.body, fontSize: '0.85rem' }}>{belief.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Expertise ── */}
      <section style={{ ...S.section, background: '#fafafa', padding: '96px 0' }}>
        <div style={S.container}>
          <p style={S.label()}>Core Expertise</p>
          <div className="rg-2" style={{ gap: '24px', alignItems: 'start' }}>
            {expertise.map((item, i) => (
              <TiltCard key={i}>
                <div ref={addRef(6 + i) as any} style={{ ...S.card, opacity: 0, display: 'flex', alignItems: 'flex-start', gap: '20px', cursor: 'default' }}>
                  <span style={{ fontSize: '1.5rem', color: ACCENT, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.03em', marginBottom: '8px', color: '#111' }}>{item.title}</h3>
                    <p style={{ ...S.body, fontSize: '0.85rem' }}>{item.body}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ ...S.section, padding: '96px 0' }}>
        <div style={S.container}>
          <p style={S.label()}>Why Choose Us</p>
          <div className="rg-4" style={{ gap: '32px' }}>
            {whyUs.map((item, i) => (
              <div key={i} ref={addRef(10 + i) as any} style={{ opacity: 0, borderTop: `2px solid ${ACCENT}`, paddingTop: '24px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', marginBottom: '8px', color: '#111' }}>{item.title}</h3>
                <p style={{ ...S.body, fontSize: '0.82rem' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ ...S.section, background: '#111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ ...S.h2, color: 'white', marginBottom: '24px' }}>
            Ready to Build<br />
            <span style={{ color: ACCENT }}>Something Exceptional?</span>
          </h2>
          <p style={{ ...S.body, color: '#888', maxWidth: '420px', margin: '0 auto 40px' }}>
            Let's talk about your data platform — what it could be, and what it'll take to get there.
          </p>
          <MagneticButton
            href="/contact"
            style={{
              padding: '16px 36px',
              borderRadius: '100px',
              background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)`,
              color: 'white',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Start a Conversation
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
