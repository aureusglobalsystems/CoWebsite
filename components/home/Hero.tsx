'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LazyCanvas from '@/components/ui/LazyCanvas';
import { trackEvent } from '@/lib/analytics';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Start the intro once the loader is gone (or straight away when it isn't shown).
    const tl = gsap.timeline({ paused: true, delay: 0.15 });

    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { rotateX: 90, opacity: 0, y: 20 },
        { rotateX: 0, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        0
      );
    }
    tl.fromTo(badgeRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.3);
    tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7)
      .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.0);

    const play = () => tl.play();
    if (document.querySelector('[data-ags-loader]')) {
      window.addEventListener('agsLoaderDone', play, { once: true });
    } else {
      play();
    }
    return () => { window.removeEventListener('agsLoaderDone', play); tl.kill(); };
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      paddingBottom: '64px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      backgroundColor: '#fff',
    }}>
      {/* R3F Canvas */}
      <LazyCanvas style={{ zIndex: 0 }}>
        <HeroScene />
      </LazyCanvas>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        paddingTop: '80px',
      }}>
        <a
          ref={badgeRef}
          href="/services/ai-inference-engineering"
          className="hero-badge"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '7px 14px 7px 10px', marginBottom: '20px',
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
            AI Inference Engineering<span className="hide-mobile"> — self-host open LLMs, cut GPU costs</span>
          </span>
          <span className="hero-badge-arrow" style={{ color: '#3366ff', fontSize: '0.85rem' }}>→</span>
        </a>

        <p className="label" style={{ color: '#888', marginBottom: '24px', display: 'block' }}>
          Data & AI Engineering Company · India — Global Delivery
        </p>

        <h1
          ref={headingRef}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(52px, 9vw, 128px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.93,
            marginBottom: '32px',
            perspective: '800px',
          }}
        >
          <span className="sr-only">Aureus Global Systems, a data and AI engineering company: </span>
          {['Data', 'First.'].map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformStyle: 'preserve-3d' }}>
              {word}
            </span>
          ))}
          <br />
          {['AI', 'Ready.'].map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em', transformStyle: 'preserve-3d' }}>
              {word}
            </span>
          ))}
          <br />
          <span className="word" style={{
            display: 'inline-block',
            transformStyle: 'preserve-3d',
            WebkitTextStroke: '2px #111',
            color: 'transparent',
          }}>
            Delivered.
          </span>
        </h1>

        <p ref={subRef} style={{
          fontFamily: 'Inter, sans-serif',
          color: '#888',
          fontSize: '1rem',
          maxWidth: '500px',
          lineHeight: 1.72,
          marginBottom: '40px',
          opacity: 0,
        }}>
          We design, build and run the data platforms, AI applications and LLM
          infrastructure behind modern businesses — as projects we deliver end-to-end,
          or as senior engineers who join your team.
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
        <div className="hero-cta-row" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span onClick={() => trackEvent('cta_click', { location: 'home_hero' })}>
          <MagneticButton
            href="/contact"
            style={{
              padding: '16px 32px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
              color: 'white',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Start a Project
          </MagneticButton>
          </span>
          <Link
            href="/contact?service=Staff%20Augmentation"
            onClick={() => trackEvent('hire_engineers_click', { location: 'home_hero' })}
            style={{
              padding: '15px 28px',
              borderRadius: '100px',
              border: '1px solid #111',
              background: 'rgba(255,255,255,0.7)',
              color: '#111',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Hire Engineers
          </Link>
          <a
            href="/services"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#888',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            All Services
          </a>
        </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: 0,
      }}>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(180deg, transparent, #ff3366)',
          animation: 'pulse 2s infinite',
        }} />
        <span className="label" style={{ color: '#888', fontSize: '0.5rem' }}>Scroll</span>
      </div>
    </section>
  );
}
