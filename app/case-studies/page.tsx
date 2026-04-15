'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/ui/TiltCard';

const ACCENT = '#00d4aa';

const S = {
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  body: { fontFamily: 'Inter, sans-serif', color: '#666', lineHeight: 1.7, fontSize: '0.88rem' } as React.CSSProperties,
};

const allCaseStudies = [
  {
    category: 'Databricks', tag: 'Databricks Migration', tagColor: '#ff3366',
    client: 'Global Retail Chain', industry: 'Retail', duration: '90 days',
    title: 'From Data Swamp to Lakehouse in 90 Days',
    challenge: "A 500-store retail chain was running a legacy Hadoop cluster built in 2016. Processing 10TB of daily transaction data took 14 hours. Overnight batch jobs failed 3× per week.",
    solution: 'We designed a Databricks Lakehouse with Delta Lake medallion architecture. Built Kafka → Spark Streaming pipelines for real-time transaction processing and Unity Catalog for governance.',
    outcomes: ['47× faster query performance (14h → 18min)', '99.9% pipeline uptime (from 85%)', '$2.1M annual infrastructure savings', 'Real-time inventory dashboards for 500 stores'],
    tech: ['Databricks', 'Delta Lake', 'Kafka', 'Apache Spark', 'Unity Catalog', 'Power BI'],
  },
  {
    category: 'Snowflake', tag: 'Snowflake Consulting', tagColor: '#29B5E8',
    client: 'FinTech Platform', industry: 'Financial Services', duration: '4 months',
    title: 'Snowflake at Scale — 500M Daily Transactions',
    challenge: 'A fast-growing payments platform was scaling from 10M to 500M daily transactions. Their Redshift warehouse ran at 95% capacity, costing $180K/month.',
    solution: 'Redesigned with Data Vault 2.0 in Snowflake, dbt for all transformations, zero-copy cloning for 6 dev/test environments, and multi-cluster warehouse configuration.',
    outcomes: ['68% reduction in costs ($180K → $58K/month)', '12× faster data delivery', 'Zero downtime during 90-day migration', '6 isolated dev environments at no extra cost'],
    tech: ['Snowflake', 'dbt', 'Airflow', 'Python', 'Fivetran', 'Tableau'],
  },
  {
    category: 'Analytics', tag: 'Analytics & BI', tagColor: '#00d4aa',
    client: 'Healthcare Network', industry: 'Healthcare', duration: '6 months',
    title: 'One Source of Truth for 120 Hospitals',
    challenge: '120 hospitals each defined "patient wait time" differently. Leadership was making decisions on Excel reports that contradicted each other.',
    solution: 'Built a unified Azure Synapse platform with a certified semantic layer, standardized KPI definitions, Power BI Premium with role-based access, and trained 50+ analysts.',
    outcomes: ['Single dashboard trusted by 5,000+ users', '3-day to 3-hour reporting cycle', 'Standardized KPIs across 120 hospitals', '$840K annual savings from manual reporting'],
    tech: ['Azure Synapse', 'Power BI Premium', 'Azure Data Factory', 'dbt'],
  },
  {
    category: 'Databricks', tag: 'Databricks Migration', tagColor: '#ff3366',
    client: 'Manufacturing Conglomerate', industry: 'Manufacturing', duration: '5 months',
    title: 'IoT Data Platform for 10,000 Machines',
    challenge: 'Sensor data from 10,000 factory machines was being dropped because the pipeline couldn\'t handle 2M events/second. Unplanned downtime cost $4M per year.',
    solution: 'Built a Databricks + Kafka streaming platform ingesting 2M events/second. Delta Live Tables for quality, MLflow for predictive maintenance, real-time anomaly detection.',
    outcomes: ['2M events/second with 0% data loss', '65% reduction in unplanned downtime', '$2.6M annual savings from prevented failures', '18-month ROI achieved in 4 months'],
    tech: ['Databricks', 'Delta Live Tables', 'Kafka', 'MLflow', 'Azure IoT Hub'],
  },
  {
    category: 'Snowflake', tag: 'Snowflake Consulting', tagColor: '#29B5E8',
    client: 'E-Commerce Platform', industry: 'E-Commerce', duration: '3 months',
    title: 'Self-Service Analytics for 200 Business Users',
    challenge: 'A $500M e-commerce company had a 3-person data team and 200 business users who needed data. Every report was a manual 2-week queue.',
    solution: 'Built a Snowflake platform with dbt, a certified semantic layer in Cube, Power BI Premium for self-service, automated data quality checks, and a data catalog.',
    outcomes: ['200 users self-serve their own data daily', '2-week queue → real-time', 'Data team freed for strategic work', '94% data accuracy (from 71%)'],
    tech: ['Snowflake', 'dbt', 'Cube', 'Power BI', 'Great Expectations', 'Airflow'],
  },
  {
    category: 'Analytics', tag: 'Staff Augmentation', tagColor: '#ffd700',
    client: 'Insurance Provider', industry: 'Insurance', duration: '6 months',
    title: '3 Senior Engineers. 6 Months. Platform Rebuilt.',
    challenge: 'A regional insurance provider lost 3 senior engineers. Delivery was stalled on a critical customer analytics project with a hard regulatory deadline.',
    solution: 'Embedded 3 Aureus senior engineers. Completed the platform on time, migrated 40 legacy ETL jobs to Airflow, and upskilled the existing 5-person team.',
    outcomes: ['Critical regulatory deadline met', '40 legacy ETL jobs modernized', '3 engineers certified in new stack', 'Zero delivery gaps during engagement'],
    tech: ['Azure Data Factory', 'Airflow', 'dbt', 'Azure Synapse', 'Power BI'],
  },
  {
    category: 'AI/ML', tag: 'AI & ML Engineering', tagColor: '#8b5cf6',
    client: 'D2C Retail Brand', industry: 'Retail / E-Commerce', duration: '4 months',
    title: 'ML Forecasting That Recovered $2.4M in Lost Revenue',
    challenge: 'A fast-growing D2C brand with 800 SKUs was making inventory decisions manually. Stockouts cost $3.2M in lost revenue the previous year. Their Excel-based forecast ran monthly and hit 67% accuracy — not good enough at their scale.',
    solution: 'Built an ML demand-forecasting platform on Databricks: an ensemble model combining gradient boosting with external signals — promotions, weather, social trends. MLflow tracked every experiment. Predictions refreshed daily and fed directly into their Snowflake inventory system via automated pipelines.',
    outcomes: ['Forecast accuracy improved from 67% → 91%', 'Stockout rate reduced by 74%', '$2.4M recovered revenue in first 6 months', 'Inventory holding costs down 28%'],
    tech: ['Databricks', 'MLflow', 'Mosaic AI', 'Snowflake', 'Python', 'LightGBM', 'FastAPI'],
  },
];

const categories = ['All', 'Databricks', 'Snowflake', 'Analytics', 'AI/ML'];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
  }, []);

  const filtered = activeFilter === 'All' ? allCaseStudies : allCaseStudies.filter(cs => cs.category === activeFilter);

  return (
    <div style={{ width: '100%' }}>
      {/* Hero */}
      <section style={{ width: '100%', padding: '120px 0 80px' }}>
        <div style={S.container}>
          <div ref={heroRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '32px', height: '1px', background: ACCENT }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>Proof</span>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 112px)', letterSpacing: '-0.04em', lineHeight: 0.93, color: '#111', marginBottom: '24px' }}>
              Proof,<br />
              <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Not Promises.</span>
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', maxWidth: '480px', lineHeight: 1.72, marginBottom: '48px' }}>
              Every case study below is a real engagement. Real client. Real outcome. Real numbers.
            </p>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '0.55rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  padding: '10px 20px', borderRadius: '100px',
                  border: `1px solid ${activeFilter === cat ? ACCENT : '#ddd'}`,
                  background: activeFilter === cat ? ACCENT : 'transparent',
                  color: activeFilter === cat ? 'white' : '#888',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section style={{ width: '100%', padding: '0 0 96px' }}>
        <div style={S.container}>
          <div className="rg-2" style={{ gap: '24px' }}>
            {filtered.map((cs, i) => (
              <TiltCard key={cs.title}>
                <div style={{
                  background: '#fff',
                  border: '1px solid #f0f0f0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'default',
                }}>
                  <div style={{ height: '3px', background: cs.tagColor }} />
                  <div style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <span style={{
                        fontFamily: 'Space Mono, monospace', fontSize: '0.5rem',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        padding: '5px 12px', borderRadius: '100px',
                        color: cs.tagColor, background: cs.tagColor + '15',
                      }}>{cs.tag}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cs.industry}</span>
                        <span style={{ color: '#ccc', fontSize: '0.45rem' }}>·</span>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cs.duration}</span>
                      </div>
                    </div>

                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{cs.client}</p>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.03em', lineHeight: 1.2, color: '#111', marginBottom: '20px' }}>{cs.title}</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                      <div>
                        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Challenge</p>
                        <p style={S.body}>{cs.challenge}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>Solution</p>
                        <p style={S.body}>{cs.solution}</p>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px', marginBottom: '20px' }}>
                      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>Outcomes</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {cs.outcomes.map((o, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ color: cs.tagColor, flexShrink: 0, marginTop: '1px' }}>✓</span>
                            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', color: '#111' }}>{o}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cs.tech.map(t => (
                        <span key={t} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.45rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', background: '#f8f8f8', color: '#888', borderRadius: '4px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ width: '100%', background: '#111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: 'white', marginBottom: '32px', lineHeight: 1.0 }}>
            Ready to Write Your<br />
            <span style={{ color: ACCENT }}>Case Study?</span>
          </h2>
          <a href="/contact" style={{
            display: 'inline-block', padding: '16px 36px', borderRadius: '100px',
            background: ACCENT, color: '#111',
            fontFamily: 'Space Mono, monospace', fontSize: '0.6rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 700,
          }}>Let's Talk</a>
        </div>
      </section>
    </div>
  );
}
