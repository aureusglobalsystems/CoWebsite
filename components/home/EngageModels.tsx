'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackEvent } from '@/lib/analytics';

const paths = [
  {
    eyebrow: 'Outcome-based',
    title: 'Start a project',
    body: 'Hand us the outcome. We scope it, architect it, build it and hand it over — a lakehouse migration, an AI application, an inference platform, a BI programme.',
    points: ['Fixed-price or managed team', 'Senior architect on every engagement', 'Documentation and handover included'],
    cta: 'Scope my project',
    href: '/contact',
    accent: '#ff3366',
    event: 'cta_click',
  },
  {
    eyebrow: 'Capacity-based',
    title: 'Hire engineers',
    body: 'Add senior data, AI and ML engineers to your own team. They work in your tools, your sprints and your Slack — and ramp up in days, not months.',
    points: ['Databricks, Snowflake, AI/ML & BI specialists', '1 engineer to a full pod', 'Flexible 3–12 month terms'],
    cta: 'Hire engineers',
    href: '/contact?service=Staff%20Augmentation',
    accent: '#00d4aa',
    event: 'hire_engineers_click',
  },
];

export default function EngageModels() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.engage-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ width: '100%', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
      <div className="page-container">
        <p className="label" style={{ color: '#888', marginBottom: '12px' }}>Two ways to work with us</p>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: '48px' }}>
          A project delivered.<br /><span className="outline-text">Or a team, extended.</span>
        </h2>
        <div className="rg-2" style={{ gap: '24px' }}>
          {paths.map((p) => (
            <div key={p.title} className="engage-card" style={{
              position: 'relative', overflow: 'hidden', borderRadius: '20px', padding: 'clamp(28px, 4vw, 44px)',
              border: '1px solid #eee', background: `linear-gradient(160deg, ${p.accent}0f, #ffffff 55%)`,
              display: 'flex', flexDirection: 'column', gap: '18px',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: p.accent }} />
              <span className="label" style={{ color: p.accent }}>{p.eyebrow}</span>
              <h3 style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-0.03em' }}>{p.title}</h3>
              <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.72 }}>{p.body}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {p.points.map((pt) => (
                  <li key={pt} style={{ display: 'flex', gap: '10px', padding: '8px 0', borderTop: '1px solid #f3f3f3', fontSize: '0.88rem', color: '#444' }}>
                    <span style={{ color: p.accent }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
              <Link href={p.href} onClick={() => trackEvent(p.event, { location: 'home_engage' })} className="label" style={{
                alignSelf: 'flex-start', padding: '14px 26px', borderRadius: '100px', background: '#111', color: 'white', textDecoration: 'none',
              }}>{p.cta} →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
