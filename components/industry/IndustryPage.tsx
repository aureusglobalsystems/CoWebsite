'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import LazyCanvas from '@/components/ui/LazyCanvas';
import { trackEvent } from '@/lib/analytics';
import type { IndustryContent } from '@/lib/industry-types';
import type { SceneShape } from '@/lib/service-types';
import { S, outline, ctaStyle, Faq, RelatedCaseStudies, FinalCta, type ProofItem } from '@/components/service/Sections';

const ServiceScene = dynamic(() => import('@/components/service/ServiceScene'), { ssr: false });

export type ServiceLink = { slug: string; href: string; title: string; accent: string; icon: string };

type Props = {
  industry: IndustryContent;
  shape: SceneShape;
  services: ServiceLink[];
  caseStudies: ProofItem[];
  bookingUrl?: string;
};

export default function IndustryPage({ industry, shape, services, caseStudies, bookingUrl }: Props) {
  const accent = industry.accent;
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const svcBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
  const usedServices = services.filter((s) => industry.useCases.some((u) => u.service === s.slug));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.word'), { rotateX: 90, opacity: 0, y: 20 },
          { rotateX: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.15 });
        gsap.fromTo(heroRef.current.querySelectorAll('.fade-in'), { opacity: 0, y: 20 },
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

  return (
    <div ref={rootRef} style={{ width: '100%' }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative', width: '100%', minHeight: '92vh', overflow: 'hidden', display: 'flex', alignItems: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px', backgroundColor: '#fff',
      }}>
        <LazyCanvas style={{ zIndex: 0 }}>
          <ServiceScene shape={shape} accent={accent} />
        </LazyCanvas>
        <div className="hero-fade" aria-hidden />

        <div ref={heroRef} style={{ ...S.container, position: 'relative', zIndex: 10, width: '100%', paddingTop: '120px', paddingBottom: '80px' }}>
          <nav aria-label="Breadcrumb" className="fade-in" style={{ marginBottom: '28px', opacity: 0 }}>
            <span className="label" style={{ color: '#aaa' }}>
              <Link href="/industries" style={{ color: '#aaa', textDecoration: 'none' }}>Industries</Link>
              <span style={{ margin: '0 10px' }}>/</span>
              <span style={{ color: accent }}>{industry.name}</span>
            </span>
          </nav>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(38px, 6.4vw, 92px)',
            letterSpacing: '-0.04em', lineHeight: 0.96, marginBottom: '28px', perspective: '800px', color: '#111', maxWidth: '1000px',
          }}>
            {industry.hero.line1.split(' ').map((w, i) => (
              <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformStyle: 'preserve-3d' }}>{w}</span>
            ))}
            <br />
            <span className="word" style={{ display: 'inline-block', transformStyle: 'preserve-3d', ...outline() }}>{industry.hero.line2}</span>
          </h1>

          <p className="fade-in" style={{ ...S.body, color: '#666', fontSize: '1.02rem', maxWidth: '540px', marginBottom: '36px', opacity: 0 }}>{industry.hero.intro}</p>

          <div className="fade-in hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: 0, flexWrap: 'wrap' }}>
            <span onClick={() => trackEvent('cta_click', { industry: industry.slug, location: 'hero' })}>
              <MagneticButton href="/contact" style={ctaStyle('#ff3366', '#ff6b35')}>Start a project →</MagneticButton>
            </span>
            <Link href="/contact?service=Staff%20Augmentation" className="hero-btn-secondary"
              onClick={() => trackEvent('hire_engineers_click', { industry: industry.slug })}>Hire engineers</Link>
          </div>
        </div>
      </section>

      {/* ── In short ─────────────────────────────────────── */}
      <section style={{ width: '100%', padding: '64px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ ...S.container, maxWidth: '920px' }}>
          <div className="reveal" style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '28px' }}>
            <h2 style={{ ...S.eyebrow(accent), marginBottom: '14px' }}>In short</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.02rem, 1.6vw, 1.22rem)', lineHeight: 1.65, color: '#222' }}>{industry.answer}</p>
          </div>
        </div>
      </section>

      {/* ── Challenges ───────────────────────────────────── */}
      <section style={{ width: '100%', background: '#111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, position: 'relative', zIndex: 2 }}>
          <p className="reveal" style={S.eyebrow('#666')}>What we see in {industry.name.toLowerCase()}</p>
          <h2 className="reveal" style={S.h2('white')}>The hard part<br /><span style={outline('white')}>isn&apos;t the model.</span></h2>
          <div className="rg-2" style={{ gap: '24px' }}>
            {industry.challenges.map((c, i) => (
              <div key={c.title} className="reveal hover-accent-border" style={{ border: '1px solid #222', borderRadius: '16px', padding: '32px', ['--accent' as string]: accent }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: accent, letterSpacing: '0.1em' }}>0{i + 1}</span>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', color: 'white', margin: '16px 0 12px' }}>{c.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.88rem', lineHeight: 1.72 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────── */}
      <section style={{ width: '100%', padding: '96px 0' }}>
        <div style={S.container}>
          <p className="reveal" style={S.eyebrow()}>Data & AI use cases</p>
          <h2 className="reveal" style={S.h2()}>What we build<br /><span style={outline()}>for {industry.name.split(' ')[0].toLowerCase()} teams.</span></h2>
          <div className="rg-3" style={{ gap: '20px' }}>
            {industry.useCases.map((u) => {
              const svc = svcBySlug[u.service];
              return (
                <div key={u.title} className="reveal offering-card" style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', ['--accent' as string]: accent }}>
                  <div className="offering-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accent }} />
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', lineHeight: 1.25, color: '#111', marginBottom: '10px' }}>{u.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: '#777', fontSize: '0.86rem', lineHeight: 1.7, flex: 1 }}>{u.body}</p>
                  {svc && (
                    <Link href={svc.href} style={{ marginTop: '18px', display: 'inline-flex', gap: '8px', alignItems: 'center', fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: svc.accent, textDecoration: 'none' }}>
                      <span>{svc.icon}</span>{svc.title} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Compliance ───────────────────────────────────── */}
      {industry.compliance.length > 0 && (
        <section style={{ width: '100%', padding: '64px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          <div style={S.container}>
            <h2 className="reveal" style={S.eyebrow()}>Built with your regulations in mind</h2>
            <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {industry.compliance.map((c) => (
                <span key={c} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 14px', borderRadius: '100px', color: '#333', background: '#fff', border: '1px solid #e6e6e6' }}>{c}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedCaseStudies items={caseStudies} accent={accent} />

      {/* ── Services used ────────────────────────────────── */}
      {usedServices.length > 0 && (
        <section style={{ width: '100%', padding: '80px 0', borderTop: '1px solid #f0f0f0' }}>
          <div style={S.container}>
            <p className="reveal" style={S.eyebrow()}>Services behind it</p>
            <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {usedServices.map((s) => (
                <Link key={s.slug} href={s.href} className="card-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 20px', border: '1px solid #eee', borderRadius: '14px', textDecoration: 'none', color: '#111', background: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>
                  <span style={{ color: s.accent }}>{s.icon}</span>{s.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq faqs={industry.faqs} accent={accent} />

      <FinalCta
        heading={`Data & AI for`} outlineText={`${industry.name}.`}
        body="Tell us what you're working on — a project to deliver or engineers to add to your team. A senior engineer replies within one business day."
        accent={accent} accent2="#ff3366" href="/contact" label="Start the conversation" bookingUrl={bookingUrl} service={industry.slug}
      />
    </div>
  );
}
