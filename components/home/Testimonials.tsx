'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote: "Aureus didn't just build our data platform — they transformed how we think about data. The migration from our legacy warehouse was seamless and our query times dropped from hours to seconds.",
    highlight: 'seamless',
    author: 'VP of Engineering',
    company: 'Global Retail Chain',
    accent: '#ff3366',
  },
  {
    quote: 'We went from 12-hour data delivery cycles to real-time dashboards. The team at Aureus understood our business deeply — not just the technology. Their production-first mindset is rare.',
    highlight: 'real-time dashboards',
    author: 'Chief Data Officer',
    company: 'FinTech Platform',
    accent: '#00d4aa',
  },
  {
    quote: 'Our 120 hospitals finally speak the same data language. Aureus built what we thought was impossible — a unified analytics platform that everyone trusts. That trust is everything in healthcare.',
    highlight: 'everyone trusts',
    author: 'Director of Analytics',
    company: 'Healthcare Network',
    accent: '#3366ff',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const tl = gsap.timeline();
    tl.to([quoteRef.current, authorRef.current], { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in',
      onComplete: () => setCurrent(idx) })
      .fromTo([quoteRef.current, authorRef.current], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 });
    startInterval();
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
      gsap.fromTo([quoteRef.current, authorRef.current], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05 });
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const t = testimonials[current];

  const renderQuote = (quote: string, highlight: string, accent: string) => {
    const parts = quote.split(highlight);
    if (parts.length !== 2) return <>{quote}</>;
    return <>{parts[0]}<span style={{ color: accent }}>{highlight}</span>{parts[1]}</>;
  };

  return (
    <section style={{
      width: '100%', background: '#111', padding: '96px 0',
      position: 'relative', overflow: 'hidden', borderTop: '1px solid #1a1a1a',
    }}>
      {/* Rainbow top stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)',
      }} />
      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        opacity: 0.12, pointerEvents: 'none', zIndex: 1, mixBlendMode: 'overlay',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#444', display: 'block', textAlign: 'center', marginBottom: '48px' }}>
          What Clients Say
        </p>

        <div style={{ textAlign: 'center' }}>
          <p ref={quoteRef} style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: 'clamp(18px, 2.2vw, 26px)',
            color: 'white', lineHeight: 1.35, marginBottom: '40px',
          }}>
            "{renderQuote(t.quote, t.highlight, t.accent)}"
          </p>

          <div ref={authorRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '32px', height: '1px', background: t.accent, marginBottom: '12px' }} />
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'white' }}>{t.author}</p>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#555' }}>{t.company}</p>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '48px' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: '6px', height: '6px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: i === current ? t.accent : '#333',
              transform: i === current ? 'scale(1.5)' : 'scale(1)',
              transition: 'all 0.3s', padding: 0,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
