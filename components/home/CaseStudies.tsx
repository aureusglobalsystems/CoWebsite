'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/ui/TiltCard';

const caseStudies = [
  {
    tag: 'Databricks Migration', tagColor: '#ff3366', client: 'Global Retail Chain',
    title: 'From Data Swamp to Lakehouse in 90 Days',
    challenge: "Legacy Hadoop cluster couldn't handle 10TB/day of transaction data. Queries took hours. Zero real-time capability.",
    solution: 'Migrated to Databricks Lakehouse with Delta Lake medallion architecture. Built streaming pipelines with Kafka + Spark Streaming.',
    outcomes: ['47× faster query performance', '99.9% pipeline uptime', '$2.1M annual cost savings'],
    tech: ['Databricks', 'Delta Lake', 'Kafka', 'Apache Spark'],
  },
  {
    tag: 'Snowflake Consulting', tagColor: '#29B5E8', client: 'FinTech Platform',
    title: 'Snowflake at Scale — 500M Daily Transactions',
    challenge: 'Growing from 10M to 500M daily transactions with a fragile warehouse that could not scale cost-efficiently.',
    solution: 'Redesigned data architecture with Data Vault 2.0, dbt transformations, and zero-copy cloning for dev/test environments.',
    outcomes: ['68% reduction in warehouse costs', '12× faster data delivery', 'Zero downtime migration'],
    tech: ['Snowflake', 'dbt', 'Python', 'Airflow'],
  },
  {
    tag: 'Analytics & BI', tagColor: '#00d4aa', client: 'Healthcare Network',
    title: 'One Source of Truth for 120 Hospitals',
    challenge: '120 hospitals each using different KPIs and Excel reports. C-suite could not make data-driven decisions.',
    solution: 'Built a unified semantic layer on Azure Synapse, with Power BI Premium reports rolling up to executive dashboards.',
    outcomes: ['Single dashboard for 5,000 users', '3-day to 3-hour reporting cycle', '100% data trust achieved'],
    tech: ['Azure Synapse', 'Power BI', 'dbt', 'Azure Data Factory'],
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} style={{ width: '100%', padding: '96px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '12px' }}>
            Case Studies
          </p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#111' }}>
            Proof, Not Promises.
          </h2>
        </div>

        <div className="rg-3">
          {caseStudies.map((cs, i) => (
            <TiltCard key={i}>
              <div
                ref={(el) => { if (el) cardRefs.current[i] = el; }}
                style={{
                  height: '100%', background: 'white',
                  border: '1px solid #f0f0f0', borderRadius: '16px',
                  overflow: 'hidden', opacity: 0, cursor: 'default', position: 'relative',
                }}
              >
                {/* Top glow on hover */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace', fontSize: '0.48rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '5px 12px', borderRadius: '100px',
                      color: cs.tagColor, background: cs.tagColor + '15',
                    }}>{cs.tag}</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#ccc', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{cs.client}</span>
                  </div>

                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: '16px', color: '#111' }}>
                    {cs.title}
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Challenge</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.82rem', lineHeight: 1.65 }}>{cs.challenge}</p>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Solution</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.82rem', lineHeight: 1.65 }}>{cs.solution}</p>
                  </div>

                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', marginBottom: '16px' }}>
                    {cs.outcomes.map((o, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ color: cs.tagColor, flexShrink: 0, fontSize: '12px' }}>✓</span>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', color: '#111' }}>{o}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cs.tech.map((t) => (
                      <span key={t} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', background: '#f8f8f8', color: '#888', borderRadius: '4px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <a href="/case-studies" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'Space Mono, monospace', fontSize: '0.58rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: '#888', textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#111')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >
            See all case studies <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
