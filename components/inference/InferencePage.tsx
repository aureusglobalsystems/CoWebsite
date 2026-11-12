'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';
import TiltCard from '@/components/ui/TiltCard';
import dynamic from 'next/dynamic';
import LazyCanvas from '@/components/ui/LazyCanvas';
import { RelatedInsights, type InsightItem } from '@/components/service/Sections';
import { trackEvent } from '@/lib/analytics';

const InferenceScene = dynamic(() => import('./InferenceScene'), { ssr: false });
import { INFERENCE_ACCENT as ACCENT, INFERENCE_ANSWER, problems, offerings, steps, stack, tech, faqs } from '@/lib/inference-content';

const S = {
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
  ctaBtn: {
    padding: '16px 32px', borderRadius: '100px',
    background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6)`,
    color: 'white', fontFamily: 'Space Mono, monospace',
    fontSize: '0.6rem', letterSpacing: '0.16em',
    textTransform: 'uppercase', textDecoration: 'none',
  } as React.CSSProperties,
};

const CONTACT_HREF = '/contact?service=AI%20Inference%20Engineering';

export default function InferencePage({ insights = [] }: { insights?: InsightItem[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.word'),
          { rotateX: 90, opacity: 0, y: 20 },
          { rotateX: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
        gsap.fromTo(heroRef.current.querySelectorAll('.fade-in'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.7 });
      }
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
      gsap.utils.toArray<HTMLElement>('.stack-layer').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: -40 }, {
          opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: '.stack-wrap', start: 'top 75%', toggleActions: 'play none none reverse' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} style={{ width: '100%' }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px', backgroundColor: '#fff',
      }}>
        <LazyCanvas style={{ zIndex: 0 }}>
          <InferenceScene />
        </LazyCanvas>
        {/* soften the scene behind the copy */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 75%)', pointerEvents: 'none' }} />

        <div ref={heroRef} style={{ ...S.container, position: 'relative', zIndex: 10, width: '100%', paddingTop: '120px', paddingBottom: '80px' }}>
          <nav aria-label="Breadcrumb" className="fade-in" style={{ marginBottom: '28px', opacity: 0 }}>
            <span className="label" style={{ color: '#aaa' }}>
              <Link href="/services" style={{ color: '#aaa', textDecoration: 'none' }}>Services</Link>
              <span style={{ margin: '0 10px' }}>/</span>
              <span style={{ color: ACCENT }}>AI Inference Engineering</span>
            </span>
          </nav>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(42px, 6.8vw, 100px)', letterSpacing: '-0.04em', lineHeight: 0.93,
            marginBottom: '32px', perspective: '800px', color: '#111',
          }}>
            {['AI', 'Inference'].map((w) => (
              <span key={w} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformStyle: 'preserve-3d' }}>{w}</span>
            ))}
            <br />
            <span className="word" style={{ display: 'inline-block', transformStyle: 'preserve-3d', WebkitTextStroke: '2px #111', color: 'transparent' }}>
              Engineering.
            </span>
          </h1>

          <p className="fade-in" style={{ ...S.body, color: '#555', fontSize: '1.05rem', maxWidth: '500px', marginBottom: '12px', opacity: 0 }}>
            Your models. Your GPUs. <span style={{ color: ACCENT, fontWeight: 500 }}>Your costs, under control.</span>
          </p>
          <p className="fade-in" style={{ ...S.body, color: '#888', maxWidth: '480px', marginBottom: '40px', opacity: 0 }}>
            We help teams self-host open-source LLMs and cut GPU inference costs — production-grade serving
            with vLLM, TensorRT-LLM and Kubernetes, running inside your own cloud.
          </p>

          <div className="fade-in hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '24px', opacity: 0, flexWrap: 'wrap' }}>
            <span onClick={() => trackEvent('cta_click', { service: 'ai-inference-engineering', location: 'hero' })}>
              <MagneticButton href={CONTACT_HREF} style={S.ctaBtn}>Book an Inference Assessment</MagneticButton>
            </span>
            <Link href="/contact?service=Staff%20Augmentation" onClick={() => trackEvent('hire_engineers_click', { service: 'ai-inference-engineering' })} style={{
              fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#555', textDecoration: 'underline', textUnderlineOffset: '4px',
            }}>Or hire inference engineers →</Link>
            <a href="#what-we-do" style={{
              fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#888', textDecoration: 'underline', textUnderlineOffset: '4px',
            }}>What We Do</a>
          </div>
        </div>
      </section>

      {/* ── In short (answer-first block for search & AI assistants) ── */}
      <section style={{ width: '100%', padding: '64px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ ...S.container, maxWidth: '920px' }}>
          <div className="reveal" style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: '28px' }}>
            <h2 style={{ ...S.eyebrow(ACCENT), marginBottom: '14px' }}>In short</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', lineHeight: 1.65, color: '#222' }}>{INFERENCE_ANSWER}</p>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────── */}
      <section style={{ width: '100%', background: '#111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, position: 'relative', zIndex: 2 }}>
          <p className="reveal" style={S.eyebrow('#666')}>Why Inference Engineering</p>
          <h2 className="reveal" style={S.h2('white')}>
            The model works.<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>Running it is the problem.</span>
          </h2>
          <div className="rg-2" style={{ gap: '24px' }}>
            {problems.map((p, i) => (
              <div key={p.title} className="reveal" style={{ border: '1px solid #222', borderRadius: '16px', padding: '32px', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#222')}
              >
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: ACCENT, letterSpacing: '0.1em' }}>0{i + 1}</span>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', color: 'white', margin: '16px 0 12px' }}>{p.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.88rem', lineHeight: 1.72 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do ───────────────────────────────────── */}
      <section id="what-we-do" style={{ width: '100%', padding: '96px 0', scrollMarginTop: '64px' }}>
        <div style={S.container}>
          <p className="reveal" style={S.eyebrow()}>Our AI Inference Engineering Services</p>
          <h2 className="reveal" style={S.h2()}>
            Self-host open models.<br />
            <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Pay less per token.</span>
          </h2>
          <div className="rg-3" style={{ gap: '24px' }}>
            {offerings.map((o) => (
              <TiltCard key={o.title}>
                <div className="reveal" style={{
                  height: '100%', background: 'white', border: '1px solid #f0f0f0', borderRadius: '16px',
                  padding: '32px', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(51,102,255,0.10)'; (e.currentTarget.firstChild as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; (e.currentTarget.firstChild as HTMLElement).style.opacity = '0'; }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${ACCENT}, #8b5cf6)`, opacity: 0, transition: 'opacity 0.3s' }} />
                  <span style={{ fontSize: '2rem', color: ACCENT, display: 'block', marginBottom: '20px' }}>{o.icon}</span>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '19px', letterSpacing: '-0.03em', lineHeight: 1.2, color: '#111', marginBottom: '12px' }}>{o.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: '#777', fontSize: '0.85rem', lineHeight: 1.72, marginBottom: '20px' }}>{o.body}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {o.points.map((pt) => (
                      <li key={pt} style={{ display: 'flex', gap: '10px', padding: '8px 0', borderTop: '1px solid #f5f5f5', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#555', lineHeight: 1.5 }}>
                        <span style={{ color: ACCENT, flexShrink: 0 }}>✓</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inference stack ──────────────────────────────── */}
      <section style={{ width: '100%', padding: '96px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.container}>
          <div className="rg-2" style={{ gap: '80px', alignItems: 'center' }}>
            <div>
              <p className="reveal" style={S.eyebrow()}>The Inference Stack</p>
              <h2 className="reveal" style={{ ...S.h2(), marginBottom: '24px' }}>
                Every layer,<br />
                <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>engineered.</span>
              </h2>
              <p className="reveal" style={{ ...S.body, maxWidth: '440px' }}>
                Cost and latency are decided across the whole path a request takes — from the API gateway down to the GPU.
                We design and tune each layer together, so a gain in one place isn&apos;t lost in another.
              </p>
            </div>

            <div className="stack-wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* request pulse travelling down the stack */}
              <div aria-hidden style={{ position: 'absolute', left: '22px', top: 0, bottom: 0, width: '2px', background: '#e8e8e8', overflow: 'hidden', borderRadius: '2px' }}>
                <div className="inference-pulse" style={{ width: '100%', height: '30%', background: `linear-gradient(180deg, transparent, ${ACCENT})` }} />
              </div>
              {stack.map((s, i) => (
                <div key={s.layer} className="stack-layer" style={{
                  position: 'relative', display: 'flex', alignItems: 'center', gap: '20px',
                  background: 'white', border: '1px solid #eee', borderRadius: '14px', padding: '18px 22px 18px 14px',
                }}>
                  <span style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                    background: 'white', border: `2px solid ${ACCENT}`,
                    boxShadow: i === stack.length - 1 ? `0 0 0 4px ${ACCENT}22` : 'none',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'baseline' }}>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.02em', color: '#111' }}>{s.layer}</h3>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>{s.detail}</span>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>{s.tools}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.container}>
          <p className="reveal" style={S.eyebrow()}>How We Work</p>
          <h2 className="reveal" style={S.h2()}>
            From API bill<br />
            <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>to your own platform.</span>
          </h2>
          <div className="rg-4" style={{ gap: '24px' }}>
            {steps.map((s) => (
              <div key={s.number} className="reveal" style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: '24px' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', color: '#bbb', letterSpacing: '0.1em' }}>{s.number}</span>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.03em', color: '#111', margin: '12px 0' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.86rem', color: '#777', lineHeight: 1.72 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech ─────────────────────────────────────────── */}
      <section style={{ width: '100%', padding: '72px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.container}>
          <p className="reveal" style={S.eyebrow()}>Technologies We Use</p>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tech.map((t) => (
              <span key={t} style={{
                fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '8px 14px', borderRadius: '100px', color: ACCENT, background: ACCENT + '0d', border: `1px solid ${ACCENT}30`,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ ...S.container, maxWidth: '920px' }}>
          <p className="reveal" style={S.eyebrow()}>FAQ</p>
          <h2 className="reveal" style={S.h2()}>
            AI inference,<br />
            <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>answered.</span>
          </h2>
          <div>
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} style={{ borderBottom: '1px solid #eee' }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px',
                      padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '-0.02em', color: open ? ACCENT : '#111', transition: 'color 0.2s', lineHeight: 1.3 }}>{f.q}</h3>
                    <span style={{ fontSize: '20px', color: ACCENT, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }}>+</span>
                  </button>
                  {/* answer stays in the DOM so crawlers can read it */}
                  <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <p style={{ ...S.body, paddingBottom: '24px', maxWidth: '760px' }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <RelatedInsights items={insights} accent={ACCENT} />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ width: '100%', background: '#111', padding: '112px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${ACCENT}, #8b5cf6, #ff3366)` }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <p className="reveal" style={{ ...S.eyebrow('#666'), marginBottom: '24px' }}>Start With an Assessment</p>
          <h2 className="reveal" style={{ ...S.h2('white'), marginBottom: '24px' }}>
            Find out what your inference<br />
            <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>should really cost.</span>
          </h2>
          <p className="reveal" style={{ ...S.body, color: '#888', maxWidth: '520px', margin: '0 auto 40px' }}>
            Tell us what you run today — models, traffic and spend. We&apos;ll come back with a self-hosting plan,
            a cost comparison and the quickest wins.
          </p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
            <MagneticButton href={CONTACT_HREF} style={S.ctaBtn}>Talk to an Inference Engineer</MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
