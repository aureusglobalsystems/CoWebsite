'use client';

import { useState } from 'react';
import Link from 'next/link';

const FILM_GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

function DocumentPreview() {
  return (
    <div style={{
      position: 'relative',
      width: '260px',
      height: '340px',
      margin: '0 auto',
    }}>
      {/* Shadow / back card */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        width: '240px',
        height: '320px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        transform: 'rotate(3deg)',
      }} />

      {/* Main card */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '240px',
        height: '320px',
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        transform: 'rotate(-1.5deg)',
      }}>
        {/* AGS gradient header */}
        <div style={{
          width: '100%',
          height: '56px',
          background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '8px',
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            border: '2px solid rgba(255,255,255,0.6)',
          }} />
          <div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.38rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1,
            }}>Aureus Global Systems</div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.32rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1,
              marginTop: '2px',
            }}>Data Platform Report</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '0.7rem',
            letterSpacing: '-0.02em',
            color: '#111',
            lineHeight: 1.2,
            marginBottom: '12px',
          }}>
            Data Platform<br />Readiness<br />Assessment
          </div>

          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.3rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#ff3366',
            marginBottom: '12px',
          }}>20 Questions · 5 Sections</div>

          {/* Fake lines */}
          {[100, 85, 92, 70, 88, 60, 78].map((w, i) => (
            <div key={i} style={{
              height: '5px',
              background: i === 0 ? '#111' : '#e8e8e8',
              borderRadius: '3px',
              width: `${w}%`,
              marginBottom: '7px',
            }} />
          ))}

          <div style={{ height: '1px', background: '#f0f0f0', margin: '12px 0' }} />

          {/* Score bars */}
          {[
            { label: 'Infrastructure', pct: 68, color: '#ff3366' },
            { label: 'Governance', pct: 52, color: '#ff6b35' },
            { label: 'Analytics', pct: 80, color: '#ffd700' },
          ].map((bar) => (
            <div key={bar.label} style={{ marginBottom: '8px' }}>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.28rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#888',
                marginBottom: '3px',
              }}>{bar.label}</div>
              <div style={{
                height: '4px',
                background: '#f0f0f0',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${bar.pct}%`,
                  background: bar.color,
                  borderRadius: '2px',
                }} />
              </div>
            </div>
          ))}

          <div style={{ height: '1px', background: '#f0f0f0', margin: '12px 0' }} />

          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.28rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ccc',
          }}>Free · aureusglobalsystems.com</div>
        </div>
      </div>
    </div>
  );
}

export default function LeadMagnet() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xqeyppdp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: 'Data Platform Assessment' }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${focusedField === name ? 'rgba(255,51,102,0.6)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px',
    padding: '13px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    color: 'white',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  });

  return (
    <section style={{
      width: '100%',
      background: '#111',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Rainbow hairline */}
      <div style={{
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)',
        flexShrink: 0,
      }} />

      {/* Film grain */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: FILM_GRAIN,
        opacity: 0.12,
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'overlay',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '96px 24px',
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}
        className="lead-magnet-grid"
      >
        {/* Left: copy + doc preview */}
        <div>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '28px', height: '1px', background: '#ff3366' }} />
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ff3366',
            }}>Free Resource</span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 52px)',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'white',
            marginBottom: '20px',
          }}>
            Is Your Data Platform<br />
            <span style={{
              background: 'linear-gradient(90deg, #ff3366, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Ready for AI?</span>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: '#888',
            fontSize: '0.95rem',
            lineHeight: 1.72,
            maxWidth: '440px',
            marginBottom: '48px',
          }}>
            A practical 20-question assessment built from 50+ real platform engagements.
            Find out exactly where your stack stands — and what to fix first.
          </p>

          {/* Document preview */}
          <DocumentPreview />
        </div>

        {/* Right: form */}
        <div>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '40px',
          }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '1.4rem',
                }}>✓</div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '22px',
                  letterSpacing: '-0.03em',
                  color: 'white',
                  marginBottom: '10px',
                }}>You&apos;re all set!</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#888',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                }}>
                  Take the assessment now to see exactly where your platform stands.
                </p>
                <Link href="/assessment" style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
                  color: 'white',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}>
                  Start Assessment →
                </Link>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '20px',
                  letterSpacing: '-0.03em',
                  color: 'white',
                  marginBottom: '6px',
                }}>Get Your Free Assessment</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#666',
                  fontSize: '0.82rem',
                  marginBottom: '28px',
                }}>Takes 5 minutes. Instant results.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.48rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#666',
                      display: 'block',
                      marginBottom: '7px',
                    }}>Name *</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      required
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={{
                        ...inputStyle('name'),
                        // placeholder color via global — inline not possible
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.48rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#666',
                      display: 'block',
                      marginBottom: '7px',
                    }}>Work Email *</label>
                    <input
                      type="email"
                      placeholder="work@company.com"
                      value={form.email}
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={inputStyle('email')}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      color: '#ef4444',
                      fontSize: '0.8rem',
                    }}>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
                      color: 'white',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.6rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      opacity: status === 'submitting' ? 0.6 : 1,
                      transition: 'opacity 0.2s',
                      marginTop: '4px',
                    }}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Get Free Assessment →'}
                  </button>

                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#555',
                    fontSize: '0.72rem',
                    textAlign: 'center',
                    marginTop: '4px',
                  }}>
                    No spam. Unsubscribe any time.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Social proof */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '24px',
            paddingLeft: '4px',
          }}>
            <div style={{ display: 'flex', gap: '-4px' }}>
              {['#ff3366', '#ff6b35', '#ffd700'].map((c, i) => (
                <div key={c} style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: c,
                  border: '2px solid #111',
                  marginLeft: i > 0 ? '-8px' : '0',
                }} />
              ))}
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: '#666',
              fontSize: '0.78rem',
              lineHeight: 1.4,
            }}>
              Used by <span style={{ color: 'white' }}>50+ data teams</span> to identify platform gaps
            </p>
          </div>
        </div>
      </div>

      {/* Responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .lead-magnet-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding: 64px 16px !important;
          }
        }
        input::placeholder, textarea::placeholder {
          color: #555;
        }
      `}</style>
    </section>
  );
}
