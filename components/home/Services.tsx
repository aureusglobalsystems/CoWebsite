'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/ui/TiltCard';

const services = [
  { number: '01', slug: 'databricks', title: 'Databricks AI & Lakehouse', description: 'Your data and AI foundation, built right. We migrate legacy systems to Databricks Lakehouse, architect Delta Lake pipelines, and configure the ML infrastructure your data science team needs to move fast — without accumulating debt.', tags: ['Delta Lake', 'Mosaic AI', 'MLflow', 'Unity Catalog', 'Apache Spark'], accent: '#ff3366', icon: '◈' },
  { number: '02', slug: 'ai-ml', title: 'AI & ML Engineering', description: 'Production AI built on your data — not generic APIs. We design and deploy ML pipelines, RAG systems, and LLM integrations that connect directly to your governed data layer. Accurate, explainable, and maintained by a team that understands what\'s underneath.', tags: ['RAG', 'MLOps', 'LangChain', 'Azure OpenAI', 'Vector Search'], accent: '#8b5cf6', icon: '◆' },
  { number: '03', slug: 'snowflake', title: 'Snowflake Consulting', description: 'Design, implement, and optimize your Snowflake environment. From schema design and data modeling to cost optimization and performance tuning at enterprise scale.', tags: ['Data Vault', 'dbt', 'Snowpark', 'Cost Optimization'], accent: '#29B5E8', icon: '❄' },
  { number: '04', slug: 'analytics', title: 'Analytics & BI', description: 'Build analytics platforms your business teams actually use. From semantic layers to Power BI and Tableau dashboards — connected, fast, and trustworthy.', tags: ['Power BI', 'Tableau', 'Looker', 'Semantic Layer'], accent: '#ffd700', icon: '◉' },
  { number: '05', slug: 'staff-augmentation', title: 'Staff Augmentation', description: 'Embed battle-tested data and AI engineers directly into your team. Senior talent, production mindset, and zero ramp-up time — exactly when you need it.', tags: ['Senior Engineers', 'Flexible Terms', 'Global'], accent: '#00d4aa', icon: '◎' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } }
      );
    });
  }, []);

  const scrollTrack = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === 'right' ? 380 : -380, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} style={{ width: '100%', padding: '96px 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '12px' }}>
              What We Do
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#111' }}>
              Data & AI<br />
              <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Engineering Services</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            {(['left', 'right'] as const).map(dir => (
              <button key={dir} onClick={() => scrollTrack(dir)} style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid #e0e0e0', background: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', color: '#111', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ff3366'; (e.currentTarget as HTMLElement).style.color = '#ff3366'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e0e0e0'; (e.currentTarget as HTMLElement).style.color = '#111'; }}
              >
                {dir === 'left' ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll track — bleeds to edge */}
      <div
        ref={trackRef}
        className="services-track"
        style={{
          display: 'flex',
          gap: '24px',
          paddingLeft: 'max(16px, calc((100vw - 1280px) / 2 + 24px))',
          paddingRight: '48px',
          overflowX: 'auto',
          paddingBottom: '16px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {services.map((svc, i) => (
          <TiltCard key={i} style={{ flexShrink: 0, width: 'clamp(300px, 380px, 90vw)' } as any}>
            <div
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              style={{
                height: '100%',
                background: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '16px',
                padding: '32px',
                cursor: 'default',
                opacity: 0,
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s',
                willChange: 'transform',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.08)';
                const bar = el.querySelector('.svc-bar') as HTMLElement;
                if (bar) bar.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = 'none';
                const bar = el.querySelector('.svc-bar') as HTMLElement;
                if (bar) bar.style.opacity = '0';
              }}
            >
              {/* Spectrum top border */}
              <div className="svc-bar" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${svc.accent}, ${svc.accent}88)`,
                opacity: 0, transition: 'opacity 0.3s',
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <span style={{ fontSize: '2rem', color: svc.accent }}>{svc.icon}</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: '#ccc', letterSpacing: '0.1em' }}>{svc.number}</span>
              </div>

              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '12px', color: '#111' }}>{svc.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.85rem', lineHeight: 1.72, marginBottom: '24px' }}>{svc.description}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {svc.tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '0.48rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '5px 10px', borderRadius: '100px',
                    color: svc.accent, borderColor: svc.accent + '40', border: `1px solid ${svc.accent}40`,
                    background: svc.accent + '08',
                  }}>{tag}</span>
                ))}
              </div>

              <Link
                href={`/services#${svc.slug}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = svc.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >
                Learn more <span>→</span>
              </Link>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
