'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const truths = [
  {
    number: '001',
    headline: '80% of data projects fail before production.',
    body: "Not because the technology wasn't good enough — but because no one owned the outcome. We put our name on every platform we build.",
  },
  {
    number: '002',
    headline: 'Your data warehouse is only as smart as its architecture.',
    body: "Medallion architecture isn't a buzzword. It's the difference between a data swamp and a competitive edge. We build it right the first time.",
  },
  {
    number: '003',
    headline: "Speed and quality aren't a trade-off. They're a choice.",
    body: "Enterprise-grade doesn't mean slow. With the right team and the right tools, you get both — faster than you expect.",
  },
];

export default function HardTruths() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    rowRefs.current.forEach((row) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.3 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} style={{ width: '100%', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '64px' }}>
          <p className="label" style={{ color: '#888', marginBottom: '12px', display: 'block' }}>Hard Truths</p>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', maxWidth: '300px' }}>
            We believe in saying what others won't.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {truths.map((truth, i) => (
            <div
              key={i}
              ref={(el) => { if (el) rowRefs.current[i] = el; }}
              className="group"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '48px',
                padding: '32px 0',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'default',
                transition: 'background 0.3s, padding 0.3s',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#ffffff';
                (e.currentTarget as HTMLElement).style.padding = '32px 16px';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.padding = '32px 0';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.6rem',
                color: '#ccc',
                paddingTop: '4px',
                flexShrink: 0,
                transition: 'color 0.3s',
                letterSpacing: '0.1em',
              }}>
                {truth.number}
              </span>

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(18px, 2.5vw, 28px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  marginBottom: '12px',
                  color: '#111',
                }}>
                  {truth.headline}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#888',
                  lineHeight: 1.72,
                  maxWidth: '640px',
                  fontSize: '0.9rem',
                }}>
                  {truth.body}
                </p>
              </div>

              <span style={{
                color: '#ccc',
                fontSize: '1.25rem',
                flexShrink: 0,
                transition: 'color 0.3s, transform 0.3s',
              }}>
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
