'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ─── Data ────────────────────────────────────────────────────────────────────

type Option = { value: number; label: string };
type Question = { id: number; text: string; options: Option[] };
type Section = {
  id: string;
  title: string;
  color: string;
  questions: Question[];
};

const SECTIONS: Section[] = [
  {
    id: 'infrastructure',
    title: 'Data Infrastructure',
    color: '#ff3366',
    questions: [
      {
        id: 1,
        text: 'How reliable are your data pipelines?',
        options: [
          { value: 1, label: 'Pipelines fail regularly, manual fixes weekly' },
          { value: 2, label: 'Mostly stable, but incidents happen monthly' },
          { value: 3, label: 'Generally reliable with some edge case failures' },
          { value: 4, label: 'Highly reliable, automated alerting in place' },
          { value: 5, label: '99.9%+ uptime, self-healing pipelines, full observability' },
        ],
      },
      {
        id: 2,
        text: 'How fresh is the data your business teams consume?',
        options: [
          { value: 1, label: 'Data is days or weeks stale' },
          { value: 2, label: 'Daily batch — T+1 is typical' },
          { value: 3, label: 'Multiple batches per day (every few hours)' },
          { value: 4, label: 'Near real-time (under 30 minutes)' },
          { value: 5, label: 'Real-time streaming with sub-minute latency' },
        ],
      },
      {
        id: 3,
        text: 'Can your platform handle 3× your current data volume today?',
        options: [
          { value: 1, label: "We'd need weeks of work to scale" },
          { value: 2, label: 'Possible but it would require significant manual effort' },
          { value: 3, label: 'We could scale with some planned work' },
          { value: 4, label: 'Largely elastic, would handle it with minor changes' },
          { value: 5, label: 'Fully elastic — auto-scales without intervention' },
        ],
      },
      {
        id: 4,
        text: 'How well do you govern cloud infrastructure costs?',
        options: [
          { value: 1, label: 'We have little visibility into what drives our bills' },
          { value: 2, label: 'We review costs monthly but lack granular control' },
          { value: 3, label: 'We have tagging and basic budgets in place' },
          { value: 4, label: 'We actively optimize with rightsizing and scheduling' },
          { value: 5, label: 'Full FinOps practice — cost per pipeline, per team, per workload' },
        ],
      },
      {
        id: 5,
        text: 'How quickly can you recover from a data incident?',
        options: [
          { value: 1, label: 'Recovery is manual and takes days' },
          { value: 2, label: 'We can recover but it takes many hours' },
          { value: 3, label: 'We have runbooks, recovery takes 1-4 hours' },
          { value: 4, label: 'Automated recovery for most scenarios, under 1 hour' },
          { value: 5, label: 'Tested DR procedures, recovery under 15 minutes' },
        ],
      },
    ],
  },
  {
    id: 'quality',
    title: 'Data Quality & Governance',
    color: '#ff6b35',
    questions: [
      {
        id: 6,
        text: 'Do you have a searchable catalog of your data assets?',
        options: [
          { value: 1, label: 'No catalog — finding data means asking colleagues' },
          { value: 2, label: 'Informal documentation (Confluence/Notion) that\'s usually outdated' },
          { value: 3, label: 'Partial catalog covering core datasets' },
          { value: 4, label: 'Comprehensive catalog with ownership and descriptions' },
          { value: 5, label: 'Full catalog with lineage, quality scores, and active governance' },
        ],
      },
      {
        id: 7,
        text: 'Do you have automated data quality monitoring?',
        options: [
          { value: 1, label: 'Quality issues are discovered by end users complaining' },
          { value: 2, label: 'Some manual checks run occasionally' },
          { value: 3, label: 'Basic automated checks on critical pipelines' },
          { value: 4, label: 'Automated checks across most pipelines with alerting' },
          { value: 5, label: 'Full DQ framework — expectations, anomaly detection, SLA tracking' },
        ],
      },
      {
        id: 8,
        text: 'Can you trace any metric back to its source data, end to end?',
        options: [
          { value: 1, label: 'No — lineage is unknown for most metrics' },
          { value: 2, label: 'We can trace some critical metrics manually' },
          { value: 3, label: 'Partial lineage for key datasets' },
          { value: 4, label: 'Most data assets have documented lineage' },
          { value: 5, label: 'Full automated lineage — click any metric, see the full chain' },
        ],
      },
      {
        id: 9,
        text: 'Is data access governed by role, with audit trails?',
        options: [
          { value: 1, label: 'Access is largely open or managed ad hoc' },
          { value: 2, label: 'Basic access controls, no consistent audit trail' },
          { value: 3, label: 'Role-based access on sensitive datasets' },
          { value: 4, label: 'RBAC across the platform with regular access reviews' },
          { value: 5, label: 'Fine-grained access control, full audit trail, compliance-ready' },
        ],
      },
      {
        id: 10,
        text: 'Is there one agreed definition for key business entities?',
        options: [
          { value: 1, label: 'Every team defines KPIs differently — constant debates' },
          { value: 2, label: 'Informal alignment exists but it breaks down regularly' },
          { value: 3, label: 'Core KPIs are documented and mostly agreed upon' },
          { value: 4, label: 'Certified metrics with a governance process' },
          { value: 5, label: 'Formal data contract layer — single source of truth for all entities' },
        ],
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Business Intelligence',
    color: '#ffd700',
    questions: [
      {
        id: 11,
        text: 'Can business users get the data they need without filing an IT ticket?',
        options: [
          { value: 1, label: 'Every data request goes through IT — queue is weeks long' },
          { value: 2, label: 'Some users can self-serve on limited datasets' },
          { value: 3, label: 'Most common requests are self-serve, edge cases go to IT' },
          { value: 4, label: 'Broad self-service with a semantic layer and governed datasets' },
          { value: 5, label: 'Full self-service — any user can safely query governed data in minutes' },
        ],
      },
      {
        id: 12,
        text: 'Does every team use the same definition of your core business metrics?',
        options: [
          { value: 1, label: "Metrics are defined differently in every team's spreadsheets" },
          { value: 2, label: 'Alignment exists informally but breaks down regularly' },
          { value: 3, label: 'Core metrics are documented and mostly agreed upon' },
          { value: 4, label: 'Certified metrics with a clear owner and governance process' },
          { value: 5, label: 'Contractual metric definitions — disputes are resolved in minutes, not meetings' },
        ],
      },
      {
        id: 13,
        text: 'How long does it take to deliver a new business report from scratch?',
        options: [
          { value: 1, label: 'Weeks — it requires significant engineering work' },
          { value: 2, label: 'About a week including reviews and sign-off' },
          { value: 3, label: '2-3 days for a standard report' },
          { value: 4, label: 'A few hours for most requests' },
          { value: 5, label: 'Self-serve — business teams build their own in minutes' },
        ],
      },
      {
        id: 14,
        text: 'What fraction of your decision-makers actively use data dashboards weekly?',
        options: [
          { value: 1, label: 'Under 20% — most decisions are made on gut or anecdotes' },
          { value: 2, label: "Around 40% — dashboards exist but aren't trusted or habitual" },
          { value: 3, label: 'Around 60% — regular users, occasional trust issues' },
          { value: 4, label: 'Around 80% — dashboards are the default for most decisions' },
          { value: 5, label: 'Over 90% — data-driven decisions are the cultural norm' },
        ],
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI & ML Readiness',
    color: '#8b5cf6',
    questions: [
      {
        id: 15,
        text: 'Is your historical data clean and complete enough to train production ML models?',
        options: [
          { value: 1, label: 'Our data has significant gaps, inconsistencies, and quality issues' },
          { value: 2, label: 'Core data is okay but would need significant prep work' },
          { value: 3, label: 'Most data is usable with moderate cleaning effort' },
          { value: 4, label: 'Data is largely model-ready with minor preprocessing' },
          { value: 5, label: 'Clean, versioned, documented datasets ready for training' },
        ],
      },
      {
        id: 16,
        text: 'Do you have a consistent process for building and managing ML features?',
        options: [
          { value: 1, label: 'Feature engineering is ad hoc — each data scientist does it differently' },
          { value: 2, label: 'Some shared notebooks/scripts but no formal process' },
          { value: 3, label: 'Informal standards, features reused within teams' },
          { value: 4, label: 'Feature store with some shared features across teams' },
          { value: 5, label: 'Mature feature platform — discoverable, versioned, monitored features' },
        ],
      },
      {
        id: 17,
        text: 'Do you have infrastructure to train, serve, and monitor ML models in production?',
        options: [
          { value: 1, label: 'No ML infrastructure — models live in notebooks' },
          { value: 2, label: 'We can train models but deployment is a manual process' },
          { value: 3, label: 'Some models in production, deployment is partly automated' },
          { value: 4, label: 'ML platform with automated training, deployment, and basic monitoring' },
          { value: 5, label: 'Full MLOps — automated retraining, drift detection, model governance' },
        ],
      },
      {
        id: 18,
        text: 'Has your organisation shipped any ML model to production in the past 12 months?',
        options: [
          { value: 1, label: 'No — ML is still in research/POC stage' },
          { value: 2, label: 'One or two pilots that never fully productionised' },
          { value: 3, label: 'A few models in production, maintained manually' },
          { value: 4, label: 'Multiple production models with proper monitoring' },
          { value: 5, label: 'ML in production is routine — models ship regularly and reliably' },
        ],
      },
    ],
  },
  {
    id: 'team',
    title: 'Team & Process',
    color: '#00d4aa',
    questions: [
      {
        id: 19,
        text: 'How structured is your data team?',
        options: [
          { value: 1, label: 'No dedicated data team — engineers do data work as a side task' },
          { value: 2, label: 'One or two data generalists, no clear roles' },
          { value: 3, label: 'Small dedicated team (data engineers + analysts), limited leadership' },
          { value: 4, label: 'Structured team with data engineering, analytics, and a data manager' },
          { value: 5, label: 'Full data organisation — engineering, analytics, science, and an executive sponsor' },
        ],
      },
      {
        id: 20,
        text: "What portion of your data team's time goes to building new things vs. fixing existing ones?",
        options: [
          { value: 1, label: 'Over 70% is firefighting and maintenance' },
          { value: 2, label: 'About 50/50 — half the week is reactive' },
          { value: 3, label: 'Around 60% building, 40% maintaining' },
          { value: 4, label: 'Around 75% building, 25% maintaining' },
          { value: 5, label: 'Over 85% building — the platform largely runs itself' },
        ],
      },
    ],
  },
];

type ScoreBand = {
  label: string;
  interpretation: string;
  color: string;
};

function getScoreBand(score: number): ScoreBand {
  if (score <= 30) return {
    label: 'Foundation Stage',
    interpretation: 'Significant gaps need addressing before AI delivers value. Focus on infrastructure and data quality first.',
    color: '#ef4444',
  };
  if (score <= 50) return {
    label: 'Building Stage',
    interpretation: 'Good start with critical gaps. Fix governance and reliability before scaling.',
    color: '#ff6b35',
  };
  if (score <= 70) return {
    label: 'Growth Stage',
    interpretation: 'Solid foundation. Ready for optimisation and early AI pilots.',
    color: '#ffd700',
  };
  if (score <= 85) return {
    label: 'Advanced Stage',
    interpretation: 'Mature platform. Ready for sophisticated AI/ML workloads and competitive differentiation.',
    color: '#00d4aa',
  };
  return {
    label: 'Best-in-Class',
    interpretation: 'Industry-leading. Focus on innovation and staying ahead.',
    color: '#8b5cf6',
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const scoreDisplayRef = useRef<HTMLSpanElement>(null);

  const totalQuestions = SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);
  const answered = Object.keys(answers).length;
  const allAnswered = answered === totalQuestions;

  const rawScore = Object.values(answers).reduce((a, b) => a + b, 0);
  // Scale: 20 questions × 5 max = 100 max, 20 min. Normalise to 0-100.
  const score = Math.round(((rawScore - totalQuestions) / (totalQuestions * 4)) * 100);
  const clampedScore = Math.max(0, Math.min(100, score));

  const sectionScores = SECTIONS.map((section) => {
    const qs = section.questions;
    const raw = qs.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
    const maxRaw = qs.length * 5;
    const minRaw = qs.length;
    const pct = raw === 0 ? 0 : Math.round(((raw - minRaw) / (maxRaw - minRaw)) * 100);
    return { ...section, pct: Math.max(0, Math.min(100, pct)), raw, count: qs.length };
  });

  const band = getScoreBand(clampedScore);

  // Reveal results when all answered
  useEffect(() => {
    if (allAnswered && !showResults) {
      setShowResults(true);
    }
  }, [allAnswered, showResults]);

  // Animate score counter when results appear
  useEffect(() => {
    if (showResults && resultsRef.current && scoreDisplayRef.current) {
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
      );

      const obj = { val: 0 };
      gsap.to(obj, {
        val: clampedScore,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.3,
        onUpdate: () => {
          if (scoreDisplayRef.current) {
            scoreDisplayRef.current.textContent = String(Math.round(obj.val));
          }
        },
      });
    }
  }, [showResults, clampedScore]);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .score-sidebar { display: none !important; }
          .print-only { display: block !important; }
          body { color: #111 !important; background: white !important; }
          .assessment-layout { display: block !important; }
          .question-card { break-inside: avoid; page-break-inside: avoid; }
          .results-section { break-inside: avoid; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
        input[type="radio"] { accent-color: #ff3366; }
        .option-label:hover { background: rgba(255, 51, 102, 0.04) !important; border-color: rgba(255, 51, 102, 0.3) !important; }
        @media (max-width: 1024px) {
          .assessment-layout { flex-direction: column !important; }
          .score-sidebar { position: static !important; width: 100% !important; max-width: 100% !important; }
        }
      `}</style>

      <div style={{ width: '100%', minHeight: '100vh', background: 'white', paddingTop: '64px' }}>

        {/* Header — AGS Branding */}
        <div style={{
          width: '100%',
          background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
          borderBottom: '3px solid transparent',
          borderImage: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff) 1',
          padding: '40px 24px',
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '6px',
              }}>Aureus Global Systems</div>
              <h1 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(24px, 4vw, 36px)',
                letterSpacing: '-0.04em',
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
              }}>Data Platform Readiness<br />Assessment</h1>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.82rem',
                marginTop: '8px',
              }}>20 questions · 5 sections · ~5 minutes</p>
            </div>

            <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => window.print()}
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}
              >
                Save as PDF ↓
              </button>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.45rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.4)',
              }}>{answered}/{totalQuestions} answered</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="no-print" style={{ width: '100%', height: '3px', background: '#f0f0f0' }}>
          <div style={{
            height: '100%',
            width: `${(answered / totalQuestions) * 100}%`,
            background: 'linear-gradient(90deg, #ff3366, #ff6b35)',
            transition: 'width 0.3s ease',
          }} />
        </div>

        {/* Main layout */}
        <div
          className="assessment-layout"
          style={{
            display: 'flex',
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '48px 24px',
            alignItems: 'flex-start',
          }}
        >
          {/* Questions column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {SECTIONS.map((section, sIdx) => (
              <div key={section.id} style={{ marginBottom: '56px' }}>
                {/* Section header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '28px',
                  paddingBottom: '16px',
                  borderBottom: `2px solid ${section.color}22`,
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: section.color,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.5rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: section.color,
                      marginBottom: '2px',
                    }}>Section {sIdx + 1}</div>
                    <h2 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: '20px',
                      letterSpacing: '-0.03em',
                      color: '#111',
                      margin: 0,
                    }}>{section.title}</h2>
                  </div>
                </div>

                {/* Questions */}
                {section.questions.map((question, qIdx) => (
                  <div
                    key={question.id}
                    className="question-card"
                    style={{
                      marginBottom: '32px',
                      padding: '24px',
                      border: '1px solid',
                      borderColor: answers[question.id] ? `${section.color}40` : '#f0f0f0',
                      borderRadius: '16px',
                      background: answers[question.id] ? `${section.color}04` : 'white',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '18px', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.5rem',
                        color: section.color,
                        flexShrink: 0,
                        paddingTop: '3px',
                        letterSpacing: '0.1em',
                        minWidth: '24px',
                      }}>Q{(sIdx === 0 ? 0 : SECTIONS.slice(0, sIdx).reduce((a, s) => a + s.questions.length, 0)) + qIdx + 1}</span>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        color: '#111',
                        lineHeight: 1.55,
                        margin: 0,
                      }}>{question.text}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {question.options.map((option) => {
                        const isSelected = answers[question.id] === option.value;
                        return (
                          <label
                            key={option.value}
                            className="option-label"
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              padding: '10px 14px',
                              borderRadius: '10px',
                              border: '1px solid',
                              borderColor: isSelected ? section.color : '#f0f0f0',
                              background: isSelected ? `${section.color}10` : 'transparent',
                              cursor: 'pointer',
                              transition: 'border-color 0.15s, background 0.15s',
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              flexShrink: 0,
                              marginTop: '1px',
                            }}>
                              <input
                                type="radio"
                                name={`q${question.id}`}
                                value={option.value}
                                checked={isSelected}
                                onChange={() => handleAnswer(question.id, option.value)}
                                style={{ margin: 0 }}
                              />
                              <span style={{
                                fontFamily: 'Space Mono, monospace',
                                fontSize: '0.45rem',
                                letterSpacing: '0.1em',
                                color: isSelected ? section.color : '#ccc',
                                minWidth: '12px',
                              }}>{option.value}</span>
                            </div>
                            <span style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.85rem',
                              color: isSelected ? '#111' : '#555',
                              lineHeight: 1.5,
                            }}>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Results section */}
            {showResults && (
              <div
                ref={resultsRef}
                className="results-section"
                style={{
                  opacity: 0,
                  padding: '40px',
                  borderRadius: '20px',
                  border: `2px solid ${band.color}`,
                  background: `${band.color}08`,
                  marginBottom: '40px',
                }}
              >
                {/* Score */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: band.color,
                    marginBottom: '16px',
                  }}>Your Score</div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(64px, 12vw, 96px)',
                    letterSpacing: '-0.04em',
                    color: band.color,
                    lineHeight: 1,
                  }}>
                    <span ref={scoreDisplayRef}>0</span>
                    <span style={{ fontSize: '0.4em', color: '#ccc' }}>/100</span>
                  </div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '22px',
                    letterSpacing: '-0.03em',
                    color: '#111',
                    marginTop: '12px',
                    marginBottom: '8px',
                  }}>{band.label}</div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#555',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    maxWidth: '480px',
                    margin: '0 auto',
                  }}>{band.interpretation}</p>
                </div>

                {/* Category breakdown */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#888',
                    marginBottom: '20px',
                  }}>Category Breakdown</div>
                  {sectionScores.map((section) => (
                    <div key={section.id} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: section.color, flexShrink: 0 }} />
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#333' }}>{section.title}</span>
                        </div>
                        <span style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.5rem',
                          letterSpacing: '0.1em',
                          color: section.color,
                        }}>{section.pct}%</span>
                      </div>
                      <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${section.pct}%`,
                          background: section.color,
                          borderRadius: '3px',
                          transition: 'width 1s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="no-print" style={{ textAlign: 'center' }}>
                  <a
                    href="/contact"
                    style={{
                      display: 'inline-block',
                      padding: '16px 36px',
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
                    Talk to our team about your results →
                  </a>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#888',
                    fontSize: '0.78rem',
                    marginTop: '12px',
                  }}>Free 45-minute discovery call. No commitment.</p>
                </div>

                {/* Print-only attribution */}
                <div className="print-only" style={{ textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.12em', color: '#888' }}>
                    aureusglobalsystems.com · info@aureusglobalsystems.com
                  </p>
                </div>
              </div>
            )}

            {/* Not-yet-answered notice */}
            {!showResults && (
              <div className="no-print" style={{
                padding: '24px',
                borderRadius: '12px',
                background: '#fafafa',
                border: '1px solid #f0f0f0',
                textAlign: 'center',
                marginBottom: '40px',
              }}>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.85rem', margin: 0 }}>
                  Answer all {totalQuestions} questions to see your results.{' '}
                  <strong style={{ color: '#111' }}>{totalQuestions - answered} remaining.</strong>
                </p>
              </div>
            )}
          </div>

          {/* Sticky score sidebar — screen only */}
          <div
            className="score-sidebar no-print"
            style={{
              width: '220px',
              flexShrink: 0,
              position: 'sticky',
              top: '80px',
            }}
          >
            <div style={{
              border: '1px solid #f0f0f0',
              borderRadius: '16px',
              padding: '24px',
              background: 'white',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.48rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#888',
                marginBottom: '16px',
              }}>Progress</div>

              {/* Progress ring */}
              <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 16px' }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#f0f0f0" strokeWidth="6" />
                  <circle
                    cx="40" cy="40" r="32"
                    fill="none"
                    stroke="url(#progressGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(answered / totalQuestions) * 201} 201`}
                    transform="rotate(-90 40 40)"
                    style={{ transition: 'stroke-dasharray 0.3s ease' }}
                  />
                  <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff3366" />
                      <stop offset="100%" stopColor="#ff6b35" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px',
                  color: '#111',
                }}>
                  {answered}/{totalQuestions}
                </div>
              </div>

              {/* Per-section progress */}
              {sectionScores.map((section) => {
                const secAnswered = section.questions.filter(q => answers[q.id] !== undefined).length;
                return (
                  <div key={section.id} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.72rem',
                        color: '#555',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '120px',
                      }}>{section.title}</span>
                      <span style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '0.42rem',
                        color: secAnswered === section.count ? section.color : '#ccc',
                      }}>{secAnswered}/{section.count}</span>
                    </div>
                    <div style={{ height: '3px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${(secAnswered / section.count) * 100}%`,
                        background: section.color,
                        borderRadius: '2px',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                  </div>
                );
              })}

              {showResults && (
                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.45rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#888',
                    marginBottom: '6px',
                  }}>Score</div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '32px',
                    letterSpacing: '-0.04em',
                    color: band.color,
                  }}>{clampedScore}</div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.7rem',
                    color: '#888',
                    marginBottom: '12px',
                  }}>{band.label}</div>
                  <a
                    href="/contact"
                    style={{
                      display: 'block',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
                      color: 'white',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.42rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      textAlign: 'center',
                    }}
                  >
                    Discuss Results →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
