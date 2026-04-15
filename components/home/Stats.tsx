'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: 50, suffix: '+', label: 'Enterprise Projects Delivered', accent: '#ff3366' },
  { value: 98, suffix: '%', label: 'Client Retention Rate', accent: '#ff6b35' },
  { value: 2.1, suffix: 'M+', label: 'Annual Savings Unlocked', prefix: '$', accent: '#ffd700' },
  { value: 47, suffix: '×', label: 'Average Performance Gain', accent: '#00d4aa' },
];

function CountUp({ target, prefix = '', suffix = '', accent }: { target: number; prefix?: string; suffix?: string; accent: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (animated.current) return;
        animated.current = true;
        const isDecimal = target % 1 !== 0;
        gsap.to({}, {
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            setValue(parseFloat((this.progress() * target).toFixed(isDecimal ? 1 : 0)));
          },
          onComplete() { setValue(target); },
        });
      },
    });
  }, [target]);

  return (
    <div ref={ref} style={{
      fontFamily: 'Syne, sans-serif',
      fontSize: 'clamp(40px, 5vw, 64px)',
      fontWeight: 800,
      letterSpacing: '-0.04em',
      color: accent,
      lineHeight: 1,
    }}>
      {prefix}{value}{suffix}
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1,
        duration: 1,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} style={{ width: '100%', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '64px' }}>
          <p className="label" style={{ color: '#888', marginBottom: '12px', display: 'block' }}>Impact</p>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 52px)',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: '#111',
          }}>
            Numbers That<br />
            <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Matter</span>
          </h2>
        </div>

        <div className="rg-4">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ borderRight: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
              {/* Accent bar */}
              <div
                ref={(el) => { if (el) barRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: stat.accent,
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                }}
              />
              <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} accent={stat.accent} />
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: '#888',
                fontSize: '0.8rem',
                marginTop: '8px',
                lineHeight: 1.5,
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
