'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Wider viewBox so "Aureus Global Systems" at font-size 130 fits fully
const VB_W = 1500;
const VB_H = 220;

export default function Signature() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const maskRectRef = useRef<SVGRectElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!maskRectRef.current || !underlineRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Start fully hidden
    maskRectRef.current.setAttribute('width', '0');

    // Underline stroke animation
    const uLen = underlineRef.current.getTotalLength();
    gsap.set(underlineRef.current, { strokeDasharray: uLen, strokeDashoffset: uLen });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 72%',
      end: 'bottom 8%',
      scrub: 1.5,
      onUpdate(self) {
        const p = self.progress;

        // Text left-to-right reveal: 0 → 85% of scroll travel
        const textP = Math.min(p / 0.85, 1);
        if (maskRectRef.current) {
          // Overshoot slightly to ensure trailing chars are fully uncovered
          maskRectRef.current.setAttribute('width', String(textP * (VB_W + 60)));
        }

        // Pink underline flourish: 70% → 100% of scroll travel
        const underP = Math.max(0, (p - 0.70) / 0.30);
        if (underlineRef.current) {
          gsap.set(underlineRef.current, { strokeDashoffset: uLen * (1 - underP) });
        }

        // Glow
        if (glowRef.current) {
          glowRef.current.style.opacity = String(textP * 0.8);
        }
      },
    });

    // Tagline
    gsap.fromTo(taglineRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="signature-section"
      style={{
        width: '100%',
        padding: '120px 0 160px',
        position: 'relative',
        overflow: 'hidden',
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      {/* Radial glow */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,51,102,0.08) 0%, transparent 70%)',
        transition: 'opacity 0.1s',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--section-pad-x, 24px)' }}>
        {/* Tagline */}
        <p ref={taglineRef} style={{
          fontFamily: 'Space Mono, monospace', fontSize: '0.58rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#888', textAlign: 'center', marginBottom: '64px', opacity: 0,
        }}>
          We don't just build data platforms. We put our name on them.
        </p>

        {/* SVG signature */}
        <div style={{ width: '100%', userSelect: 'none', position: 'relative' }}>
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            style={{ width: '100%', overflow: 'visible' }}
            aria-label="Aureus Global Systems"
          >
            <defs>
              {/* clipPath in userSpaceOnUse — units match the viewBox */}
              <clipPath id="sig-clip" clipPathUnits="userSpaceOnUse">
                <rect
                  ref={maskRectRef}
                  x="0"
                  y="-30"
                  width="0"
                  height={VB_H + 60}
                />
              </clipPath>
            </defs>

            {/* Ghost — faint guide, always visible */}
            <text
              x={VB_W / 2}
              y="165"
              textAnchor="middle"
              fontFamily="Caveat, cursive"
              fontSize="130"
              fontWeight="700"
              fill="none"
              stroke="#efefef"
              strokeWidth="1"
            >
              Aureus Global Systems
            </text>

            {/* Ink text — revealed left-to-right by clipPath */}
            <g clipPath="url(#sig-clip)">
              <text
                x={VB_W / 2}
                y="165"
                textAnchor="middle"
                fontFamily="Caveat, cursive"
                fontSize="130"
                fontWeight="700"
                fill="#111111"
              >
                Aureus Global Systems
              </text>
            </g>

            {/* Pink flourish underline */}
            <path
              ref={underlineRef}
              d={`M 80 190 Q ${VB_W * 0.25} 208 ${VB_W / 2} 200 Q ${VB_W * 0.75} 192 ${VB_W - 80} 190`}
              fill="none"
              stroke="#ff3366"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Footer row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '24px', marginTop: '56px', flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ccc' }}>
            Est. 2024
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#ff3366', '#ff6b35', '#ffd700', '#00d4aa', '#3366ff'].map(c => (
              <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ccc' }}>
            India — Global Delivery
          </span>
        </div>
      </div>
    </section>
  );
}
