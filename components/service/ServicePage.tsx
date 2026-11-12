'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import TiltCard from '@/components/ui/TiltCard';
import LazyCanvas from '@/components/ui/LazyCanvas';
import { trackEvent } from '@/lib/analytics';
import type { ServiceContent } from '@/lib/service-types';
import type { ServiceNavItem } from '@/lib/services-nav';
import { S, outline, ctaStyle, Faq, RelatedCaseStudies, RelatedInsights, LeadMagnet, FinalCta, type ProofItem, type InsightItem } from './Sections';

const ServiceScene = dynamic(() => import('./ServiceScene'), { ssr: false });

type Props = {
  service: ServiceContent;
  nav: ServiceNavItem;
  caseStudies: ProofItem[];
  insights: InsightItem[];
  bookingUrl?: string;
};

export default function ServicePage({ service, nav, caseStudies, insights, bookingUrl }: Props) {
  const accent = nav.accent;
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactHref = `/contact?service=${encodeURIComponent(service.contactOption)}`;
  const hireHref = `/contact?service=${encodeURIComponent('Staff Augmentation')}`;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.word'),
          { rotateX: 90, opacity: 0, y: 20 },
          { rotateX: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 });
        gsap.fromTo(heroRef.current.querySelectorAll('.fade-in'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.5 });
      }
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const words1 = service.hero.line1.split(' ');

  return (
    <div ref={rootRef} style={{ width: '100%' }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px', backgroundColor: '#fff',
      }}>
        <LazyCanvas style={{ zIndex: 0 }}>
          <ServiceScene shape={service.shape} accent={accent} />
        </LazyCanvas>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0) 75%)', pointerEvents: 'none' }} />

        <div ref={heroRef} style={{ ...S.container, position: 'relative', zIndex: 10, width: '100%', paddingTop: '120px', paddingBottom: '80px' }}>
          <nav aria-label="Breadcrumb" className="fade-in" style={{ marginBottom: '28px', opacity: 0 }}>
            <span className="label" style={{ color: '#aaa' }}>
              <Link href="/services" style={{ color: '#aaa', textDecoration: 'none' }}>Services</Link>
              <span style={{ margin: '0 10px' }}>/</span>
              <span style={{ color: accent }}>{nav.title}</span>
            </span>
          </nav>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(40px, 6.6vw, 96px)',
            letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '32px', perspective: '800px', color: '#111', maxWidth: '1000px',
          }}>
            {words1.map((w, i) => (
              <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformStyle: 'preserve-3d' }}>{w}</span>
            ))}
            <br />
            <span className="word" style={{ display: 'inline-block', transformStyle: 'preserve-3d', ...outline() }}>{service.hero.line2}</span>
          </h1>

          <p className="fade-in" style={{ ...S.body, color: '#555', fontSize: '1.05rem', maxWidth: '520px', marginBottom: '12px', opacity: 0 }}>
            {service.hero.tagline} <span style={{ color: accent, fontWeight: 500 }}>{service.hero.highlight}</span>
          </p>
          <p className="fade-in" style={{ ...S.body, color: '#888', maxWidth: '500px', marginBottom: '40px', opacity: 0 }}>{service.hero.intro}</p>

          <div className="fade-in hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '24px', opacity: 0, flexWrap: 'wrap' }}>
            <span onClick={() => trackEvent('cta_click', { service: service.slug, location: 'hero' })}>
              <MagneticButton href={contactHref} style={ctaStyle(accent, '#111')}>{service.hero.cta}</MagneticButton>
            </span>
            <Link href={hireHref} onClick={() => trackEvent('hire_engineers_click', { service: service.slug })} style={{
              fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#555', textDecoration: 'underline', textUnderlineOffset: '4px',
            }}>Or hire our engineers →</Link>
          </div>
        </div>
      </section>

      {/* ── In short (answer-first block for search & AI assistants) ── */}
      <section style={{ width: '100%', padding: '64px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ ...S.container, maxWidth: '920px' }}>
          <div className="reveal" style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '28px' }}>
            <h2 style={{ ...S.eyebrow(accent), marginBottom: '14px' }}>In short</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', lineHeight: 1.65, color: '#222' }}>{service.answer}</p>
          </div>
        </div>
      </section>

      {/* ── Problems ─────────────────────────────────────── */}
      <section style={{ width: '100%', background: '#111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, position: 'relative', zIndex: 2 }}>
          <p className="reveal" style={S.eyebrow('#666')}>Sound familiar?</p>
          <h2 className="reveal" style={S.h2('white')}>
            {service.problemsHeading[0]}<br /><span style={outline('white')}>{service.problemsHeading[1]}</span>
          </h2>
          <div className="rg-2" style={{ gap: '24px' }}>
            {service.problems.map((p, i) => (
              <div key={p.title} className="reveal hover-accent-border" style={{ border: '1px solid #222', borderRadius: '16px', padding: '32px', ['--accent' as string]: accent }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: accent, letterSpacing: '0.1em' }}>0{i + 1}</span>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', color: 'white', margin: '16px 0 12px' }}>{p.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.88rem', lineHeight: 1.72 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offerings ────────────────────────────────────── */}
      <section id="what-we-do" style={{ width: '100%', padding: '96px 0', scrollMarginTop: '64px' }}>
        <div style={S.container}>
          <p className="reveal" style={S.eyebrow()}>What we do</p>
          <h2 className="reveal" style={S.h2()}>
            {service.offeringsHeading[0]}<br /><span style={outline()}>{service.offeringsHeading[1]}</span>
          </h2>
          <div className="rg-3" style={{ gap: '24px' }}>
            {service.offerings.map((o) => (
              <TiltCard key={o.title}>
                <div className="reveal offering-card" style={{
                  height: '100%', background: 'white', border: '1px solid #f0f0f0', borderRadius: '16px',
                  padding: '32px', position: 'relative', overflow: 'hidden', ['--accent' as string]: accent,
                }}>
                  <div className="offering-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accent }} />
                  <span style={{ fontSize: '2rem', color: accent, display: 'block', marginBottom: '20px' }}>{o.icon}</span>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '19px', letterSpacing: '-0.03em', lineHeight: 1.2, color: '#111', marginBottom: '12px' }}>{o.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: '#777', fontSize: '0.85rem', lineHeight: 1.72, marginBottom: '20px' }}>{o.body}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {o.points.map((pt) => (
                      <li key={pt} style={{ display: 'flex', gap: '10px', padding: '8px 0', borderTop: '1px solid #f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#555', lineHeight: 1.5 }}>
                        <span style={{ color: accent, flexShrink: 0 }}>✓</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnet {...service.leadMagnet} href={contactHref} accent={accent} service={service.slug} />

      {/* ── Process ──────────────────────────────────────── */}
      <section style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.container}>
          <p className="reveal" style={S.eyebrow()}>How we work</p>
          <h2 className="reveal" style={S.h2()}>Four steps.<br /><span style={outline()}>No surprises.</span></h2>
          <div className="rg-4" style={{ gap: '24px' }}>
            {service.steps.map((s, i) => (
              <div key={s.title} className="reveal" style={{ borderTop: `2px solid ${accent}`, paddingTop: '24px' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', color: '#bbb', letterSpacing: '0.1em' }}>0{i + 1}</span>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.03em', color: '#111', margin: '12px 0' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.86rem', color: '#777', lineHeight: 1.72 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedCaseStudies items={caseStudies} accent={accent} />

      {/* ── Two ways to work with us ─────────────────────── */}
      <section style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.container}>
          <p className="reveal" style={S.eyebrow()}>Two ways to work with us</p>
          <h2 className="reveal" style={S.h2()}>A project<br /><span style={outline()}>or a team.</span></h2>
          <div className="rg-2" style={{ gap: '24px' }}>
            {[
              { t: 'Start a project', d: `We scope, own and deliver the outcome — architecture, build, rollout and handover — on a fixed-price or managed-team basis.`, href: contactHref, label: 'Scope my project', ev: 'cta_click' },
              { t: 'Hire our engineers', d: `Senior ${nav.title.replace(' & Lakehouse', '')} engineers who join your team, your sprints and your tools — typically ready to start within weeks, not months.`, href: hireHref, label: 'Hire engineers', ev: 'hire_engineers_click' },
            ].map((c) => (
              <div key={c.t} className="reveal" style={{ border: '1px solid #eee', borderRadius: '16px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.03em', color: '#111' }}>{c.t}</h3>
                <p style={{ ...S.body, flex: 1 }}>{c.d}</p>
                <Link href={c.href} onClick={() => trackEvent(c.ev, { service: service.slug, location: 'ways' })} style={{
                  alignSelf: 'flex-start', fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}55`, paddingBottom: '4px',
                }}>{c.label} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech ─────────────────────────────────────────── */}
      <section style={{ width: '100%', padding: '72px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.container}>
          <h2 className="reveal" style={S.eyebrow()}>Technologies we use</h2>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {service.tech.map((t) => (
              <span key={t} style={{
                fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '8px 14px', borderRadius: '100px', color: accent, background: accent + '0d', border: `1px solid ${accent}30`,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <Faq faqs={service.faqs} accent={accent} />
      <RelatedInsights items={insights} accent={accent} />

      <FinalCta
        heading="Let's talk about"
        outlineText={`your ${nav.title.split(' ')[0]} work.`}
        body="Tell us where you are today and what you need — a project delivered or engineers on your team. You'll hear back from a senior engineer within one business day."
        accent={accent} accent2="#8b5cf6" href={contactHref} label="Start the conversation"
        bookingUrl={bookingUrl} service={service.slug}
      />
    </div>
  );
}
