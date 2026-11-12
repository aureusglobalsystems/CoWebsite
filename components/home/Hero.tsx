'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LazyCanvas from '@/components/ui/LazyCanvas';
import { trackEvent } from '@/lib/analytics';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

// Rotating phrase in the sub-headline — what we build.
const BUILDS = [
  { text: 'lakehouses on Databricks', color: '#ff3366' },
  { text: 'RAG apps & AI agents', color: '#8b5cf6' },
  { text: 'self-hosted LLM platforms', color: '#3366ff' },
  { text: 'Snowflake warehouses', color: '#29B5E8' },
  { text: 'dashboards people trust', color: '#e6a800' },
];

// "What do you need?" — routes each visitor to the right page in one click.
const INTENTS = [
  { icon: '◈', title: 'Build or migrate a data platform', sub: 'Databricks · Snowflake · Lakehouse', href: '/services/databricks-consulting', accent: '#ff3366', id: 'data_platform' },
  { icon: '◆', title: 'Ship an AI or LLM application', sub: 'RAG · agents · MLOps', href: '/services/ai-ml-engineering', accent: '#8b5cf6', id: 'ai_app' },
  { icon: '◇', title: 'Cut LLM & GPU inference costs', sub: 'Self-host open models · vLLM', href: '/services/ai-inference-engineering', accent: '#3366ff', id: 'inference', isNew: true },
  { icon: '◎', title: 'Add senior engineers to my team', sub: 'Data · AI · ML · BI engineers', href: '/services/data-engineering-staff-augmentation', accent: '#00d4aa', id: 'engineers' },
];

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
  const [buildIdx, setBuildIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Start the intro once the loader is gone (or straight away when it isn't shown).
    const tl = gsap.timeline({ paused: true, delay: 0.15 });

    if (headingRef.current) {
      tl.fromTo(
        headingRef.current.querySelectorAll('.word'),
        { rotateX: 90, opacity: 0, y: 20 },
        { rotateX: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        0
      );
    }
    tl.fromTo(badgeRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.3)
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7);
    if (panelRef.current) {
      tl.fromTo(panelRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 0.6)
        .fromTo(panelRef.current.querySelectorAll('.intent'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }, 0.85);
    }
    tl.fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.2);

    const play = () => tl.play();
    if (document.querySelector('[data-ags-loader]')) {
      window.addEventListener('agsLoaderDone', play, { once: true });
    } else {
      play();
    }
    return () => { window.removeEventListener('agsLoaderDone', play); tl.kill(); };
  }, []);

  // Cycle the rotating phrase (paused for visitors who prefer reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setBuildIdx((i) => (i + 1) % BUILDS.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  const build = BUILDS[buildIdx];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      backgroundColor: '#fff',
    }}>
      <LazyCanvas style={{ zIndex: 0 }}>
        <HeroScene />
      </LazyCanvas>
      {/* Soft fade behind the copy so particles never fight the text */}
      <div className="hero-fade" aria-hidden />

      <div className="hero-grid" style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px',
        margin: '0 auto', padding: '112px 24px 96px',
      }}>
        {/* ── Left: message ───────────────────────────── */}
        <div>
          <Link
            ref={badgeRef}
            href="/services/ai-inference-engineering"
            className="hero-badge"
            onClick={() => trackEvent('cta_click', { location: 'home_hero_badge' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '7px 14px 7px 10px', marginBottom: '28px',
              borderRadius: '100px', border: '1px solid #3366ff33',
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)',
              textDecoration: 'none', opacity: 0,
            }}
          >
            <span style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
              <span className="hero-badge-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#3366ff' }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#3366ff' }} />
            </span>
            <span className="label" style={{ color: '#3366ff', fontWeight: 700 }}>New</span>
            <span style={{ width: '1px', height: '12px', background: '#3366ff33' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#111', fontWeight: 500 }}>
              AI Inference Engineering<span className="hide-mobile"> — cut GPU costs</span>
            </span>
            <span className="hero-badge-arrow" style={{ color: '#3366ff', fontSize: '0.85rem' }}>→</span>
          </Link>

          <h1
            ref={headingRef}
            style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(38px, 6.4vw, 84px)', letterSpacing: '-0.045em', lineHeight: 0.94,
              whiteSpace: 'nowrap',
              marginBottom: '28px', perspective: '800px',
            }}
          >
            <span className="sr-only">Aureus Global Systems, a data and AI engineering company: </span>
            {['Data', 'First.'].map((word, i) => (
              <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.22em', transformStyle: 'preserve-3d' }}>{word}</span>
            ))}
            <br />
            {['AI', 'Ready.'].map((word, i) => (
              <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.22em', transformStyle: 'preserve-3d' }}>{word}</span>
            ))}
            <br />
            <span className="word" style={{ display: 'inline-block', transformStyle: 'preserve-3d', WebkitTextStroke: '2px #111', color: 'transparent' }}>
              Delivered.
            </span>
          </h1>

          <p ref={subRef} style={{ fontFamily: 'Inter, sans-serif', color: '#666', fontSize: '1.06rem', maxWidth: '520px', lineHeight: 1.7, marginBottom: '36px', opacity: 0 }}>
            We build{' '}
            <span className="hero-rotator" aria-live="polite">
              <span key={buildIdx} className="hero-rotator-word" style={{ color: build.color }}>{build.text}</span>
            </span>
            <br />
            for teams that need it done right — as a project we deliver end-to-end,
            or with senior engineers who join your team.
          </p>

          <div ref={ctaRef} style={{ opacity: 0 }}>
            <div className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span onClick={() => trackEvent('cta_click', { location: 'home_hero' })}>
                <MagneticButton
                  href="/contact"
                  style={{
                    padding: '17px 32px', borderRadius: '100px',
                    background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
                    boxShadow: '0 10px 30px rgba(255, 51, 102, 0.28)',
                    color: 'white', fontFamily: 'Space Mono, monospace', fontSize: '0.62rem',
                    letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
                  }}
                >
                  Start a Project →
                </MagneticButton>
              </span>
              <Link
                href="/contact?service=Staff%20Augmentation"
                onClick={() => trackEvent('hire_engineers_click', { location: 'home_hero' })}
                className="hero-btn-secondary"
              >
                Hire Engineers
              </Link>
            </div>

            <ul className="hero-trust">
              <li><span>✓</span>Senior engineers only</li>
              <li><span>✓</span>Reply within one business day</li>
              <li><span>✓</span>India-based · global delivery</li>
            </ul>
          </div>
        </div>

        {/* ── Right: "What do you need?" ─────────────── */}
        <div ref={panelRef} className="hero-panel" style={{ opacity: 0 }}>
          <div className="hero-panel-head">
            <span className="label" style={{ color: '#111', fontWeight: 700 }}>What do you need?</span>
            <span className="hero-panel-dots" aria-hidden>
              <i style={{ background: '#ff3366' }} /><i style={{ background: '#ffd700' }} /><i style={{ background: '#00d4aa' }} />
            </span>
          </div>

          <nav aria-label="Find the right service">
            {INTENTS.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                className="intent"
                onClick={() => trackEvent('hero_intent_click', { intent: it.id })}
                style={{ ['--accent' as string]: it.accent }}
              >
                <span className="intent-icon" style={{ color: it.accent, background: it.accent + '14' }}>{it.icon}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="intent-title">
                    {it.title}
                    {it.isNew && <span className="nav-new-pill" style={{ background: it.accent }}>New</span>}
                  </span>
                  <span className="intent-sub">{it.sub}</span>
                </span>
                <span className="intent-arrow" aria-hidden>→</span>
              </Link>
            ))}
          </nav>

          <Link href="/assessment" className="hero-panel-foot" onClick={() => trackEvent('cta_click', { location: 'home_hero_assessment' })}>
            <span>Not sure yet? <strong>Take the free data & AI readiness assessment</strong></span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} className="hide-mobile" style={{
        position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0, zIndex: 10,
      }}>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, transparent, #ff3366)', animation: 'pulse 2s infinite' }} />
        <span className="label" style={{ color: '#888', fontSize: '0.5rem' }}>Scroll</span>
      </div>
    </section>
  );
}
