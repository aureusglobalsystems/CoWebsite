'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

const ACCENT = '#f59e0b';

const S = {
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  body: { fontFamily: 'Inter, sans-serif', color: '#666', lineHeight: 1.72, fontSize: '0.95rem' } as React.CSSProperties,
  label: (color = '#888') => ({
    fontFamily: 'Space Mono, monospace', fontSize: '0.55rem',
    letterSpacing: '0.18em', textTransform: 'uppercase' as const,
    color, display: 'block', marginBottom: '48px',
  }),
};

const services = [
  {
    number: '01', slug: 'databricks', title: 'Databricks AI & Lakehouse', tagline: 'The data foundation your AI actually needs.', accent: '#ff3366', icon: '◈',
    description: "Databricks is where data and AI converge — and we've worked in it long enough to know exactly where teams go wrong. Whether you're migrating from Hadoop, a legacy warehouse, or a fragile Spark cluster, we build the Lakehouse architecture that handles both analytics workloads and machine learning pipelines without compromise. Delta Lake medallion design, Unity Catalog governance, Mosaic AI workspace, and MLflow — set up right from day one, so your team isn't refactoring six months later.",
    deliverables: ['Current-state audit and migration roadmap', 'Medallion architecture design (Bronze/Silver/Gold layers)', 'Delta Lake pipeline build and data migration', 'Unity Catalog governance and fine-grained access controls', 'Mosaic AI and ML workspace configuration', 'MLflow experiment tracking, model registry and serving', 'Databricks Vector Search for AI/ML retrieval workloads', 'Team training and full runbook documentation'],
    tech: ['Databricks', 'Delta Lake', 'Mosaic AI', 'MLflow', 'Unity Catalog', 'Apache Spark', 'Vector Search', 'Kafka'],
  },
  {
    number: '02', slug: 'ai-ml', title: 'AI & ML Engineering', tagline: "AI that runs on your data, not someone else's assumptions.", accent: '#8b5cf6', icon: '◆',
    description: "Most AI projects fail not because of the model — but because the data feeding it is messy, ungoverned, or disconnected from reality. We build AI systems on top of solid data foundations: RAG pipelines grounded in your actual knowledge base, ML models trained on clean versioned datasets, and LLM integrations that connect to real-time operational data. The result is AI your team can trust, explain to a stakeholder, and maintain long after the first demo.",
    deliverables: ['RAG (Retrieval-Augmented Generation) pipeline design and build', 'LLM integration with enterprise data sources (Azure OpenAI, AWS Bedrock, Gemini)', 'Vector database setup and embedding pipeline (Databricks Vector Search, Pinecone, pgvector)', 'ML model development, training and versioning with MLflow', 'MLOps pipeline: automated retraining, monitoring and drift detection', 'Model serving infrastructure (Databricks Model Serving, FastAPI)', 'AI application development — intelligent search, document processing, internal tools', 'Evaluation frameworks and guardrails for production LLM systems'],
    tech: ['Mosaic AI', 'MLflow', 'LangChain', 'Azure OpenAI', 'AWS Bedrock', 'Pinecone', 'Python', 'FastAPI'],
  },
  {
    number: '03', slug: 'snowflake', title: 'Snowflake Consulting', tagline: 'Scale without the surprise bills.', accent: '#29B5E8', icon: '❄',
    description: "Snowflake is powerful — and expensive when misused. We design Snowflake environments that scale efficiently, with Data Vault 2.0 modeling, dbt transformation layers, Snowpark for Python workloads, and aggressive cost governance.",
    deliverables: ['Snowflake architecture design and setup', 'Data Vault 2.0 or dimensional modeling', 'dbt transformation layer implementation', 'Snowpark Python workload migration', 'Zero-copy cloning for dev/test environments', 'Cost optimization and governance framework'],
    tech: ['Snowflake', 'dbt', 'Snowpark', 'Python', 'Airflow', 'Fivetran'],
  },
  {
    number: '04', slug: 'analytics', title: 'Analytics & BI', tagline: 'Dashboards your team will actually open.', accent: '#ffd700', icon: '◉',
    description: "Most BI projects fail because the data isn't trusted. We start with the semantic layer — a single source of truth — then build Power BI or Tableau dashboards that connect directly to governed, certified data.",
    deliverables: ['Semantic layer design (dbt metrics, Cube, or AtScale)', 'Power BI Premium or Tableau deployment', 'Executive dashboard and operational reporting', 'Self-service analytics enablement', 'Data catalog and lineage documentation', 'User adoption and training program'],
    tech: ['Power BI', 'Tableau', 'Looker', 'dbt Metrics', 'Azure Synapse', 'Cube'],
  },
  {
    number: '05', slug: 'staff-augmentation', title: 'Staff Augmentation', tagline: 'Senior talent. Zero ramp-up. When you need it.', accent: '#00d4aa', icon: '◎',
    description: "Sometimes you need hands — senior ones. We embed battle-tested data and AI engineers directly into your team, working in your tools, your sprint cycles, and your Slack.",
    deliverables: ['Senior data & AI engineer placement (1–5+ engineers)', 'Flexible engagement terms (3–12 months)', 'Skill alignment with your tech stack', 'Weekly progress reporting to stakeholders', 'Knowledge transfer and documentation standards', 'Optional extension or transition to managed team'],
    tech: ['Your Stack', 'Databricks', 'Snowflake', 'AWS/Azure/GCP', 'dbt', 'Airflow'],
  },
];

const models = [
  { title: 'Resource Augmentation', desc: 'Embed our engineers into your team. You manage the work, we provide senior talent.', best: 'Teams with capacity gaps', commitment: 'Minimum 3 months' },
  { title: 'Managed Team', desc: 'We own the delivery. Your stakeholders set the goals, we handle everything else.', best: 'New platform builds', commitment: '6-12+ months' },
  { title: 'Fixed-Price Project', desc: 'Scoped deliverables at a fixed price. Perfect for migrations and defined platform builds.', best: 'Well-defined migrations', commitment: 'Project-based' },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* Hero */}
      <section style={{ width: '100%', padding: '120px 0 80px' }}>
        <div style={S.container}>
          <div ref={heroRef} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '32px', height: '1px', background: ACCENT }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>What We Do</span>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 112px)', letterSpacing: '-0.04em', lineHeight: 0.93, color: '#111', marginBottom: '24px' }}>
              Data & AI<br />
              <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Services.</span>
            </h1>
            <p style={{ ...S.body, maxWidth: '480px', marginTop: '24px' }}>
              Five core service lines built for the data & AI era. Production-grade engineering, honest communication, and results that hold up after we're gone.
            </p>
          </div>
        </div>
      </section>

      {/* Service Deep-Dives */}
      {services.map((svc, i) => (
        <section key={i} id={svc.slug} style={{ width: '100%', background: i % 2 === 1 ? '#fafafa' : '#fff', padding: '96px 0', borderTop: '1px solid #f0f0f0' }}>
          <div style={S.container}>
            <div className="rg-2" style={{ gap: '80px', alignItems: 'start', ...(i % 2 === 1 ? { direction: 'rtl' } : {}) }}>
              <div style={{ direction: 'ltr' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '2rem', color: svc.accent }}>{svc.icon}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: '#ccc', letterSpacing: '0.1em' }}>{svc.number}</span>
                </div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#111', marginBottom: '8px' }}>
                  {svc.title}
                </h2>
                <p style={{ color: svc.accent, fontFamily: 'Inter, sans-serif', marginBottom: '24px', fontSize: '0.95rem' }}>{svc.tagline}</p>
                <p style={{ ...S.body, marginBottom: '32px' }}>{svc.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {svc.tech.map((t) => (
                    <span key={t} style={{
                      fontFamily: 'Space Mono, monospace', fontSize: '0.5rem',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '6px 12px', borderRadius: '100px',
                      color: svc.accent, background: svc.accent + '12',
                      border: `1px solid ${svc.accent}30`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ direction: 'ltr' }}>
                <p style={S.label()}>What You Get</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {svc.deliverables.map((d, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <span style={{ color: svc.accent, flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#555', lineHeight: 1.5 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Engagement Models */}
      <section style={{ width: '100%', background: '#111', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)' }} />
        <div className="film-grain-overlay" />
        <div style={{ ...S.container, position: 'relative', zIndex: 2 }}>
          <p style={S.label('#444')}>How We Work Together</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: 'white', marginBottom: '48px', lineHeight: 1.0 }}>
            Engagement Models
          </h2>
          <div className="rg-3" style={{ gap: '24px', marginBottom: '64px' }}>
            {models.map((m, i) => (
              <div key={i} style={{ border: '1px solid #222', borderRadius: '16px', padding: '32px', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#222')}
              >
                <div style={{ width: '32px', height: '2px', background: ACCENT, marginBottom: '24px' }} />
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px', letterSpacing: '-0.03em', color: 'white', marginBottom: '12px' }}>{m.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '24px' }}>{m.desc}</p>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>
                  Best for: <span style={{ color: '#888' }}>{m.best}</span>
                </p>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginTop: '6px' }}>
                  Commitment: <span style={{ color: '#888' }}>{m.commitment}</span>
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <MagneticButton href="/contact" style={{
              padding: '16px 36px', borderRadius: '100px',
              background: `linear-gradient(135deg, ${ACCENT}, #ff6b35)`,
              color: 'white', fontFamily: 'Space Mono, monospace',
              fontSize: '0.6rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Discuss Your Needs
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
