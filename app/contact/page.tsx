'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ACCENT = '#8b5cf6';

const S = {
  container: { maxWidth: '1280px', margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  input: {
    width: '100%',
    background: '#fafafa',
    border: '1px solid #e8e8e8',
    borderRadius: '12px',
    padding: '14px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    color: '#111',
    outline: 'none',
    transition: 'border-color 0.2s',
  } as React.CSSProperties,
};

const serviceOptions = ['Databricks AI & Lakehouse', 'AI & ML Engineering', 'Snowflake Consulting', 'Analytics & BI', 'Staff Augmentation', 'Not Sure Yet'];
const timelineOptions = ['ASAP — urgent need', '1-3 months', '3-6 months', '6+ months', 'Just exploring'];

const nextSteps = [
  { number: '01', title: 'We Review', body: 'We review your message and match you with the right team member — usually within 24 hours.' },
  { number: '02', title: 'Discovery Call', body: 'A 45-minute no-commitment call to understand your situation, goals, and what success looks like.' },
  { number: '03', title: 'Proposal', body: 'A clear, detailed proposal — scope, approach, timeline, and pricing. No surprises.' },
  { number: '04', title: 'We Build', body: 'We kick off, embedded in your team or leading the project. Delivery starts immediately.' },
];

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service: '', timeline: '', message: '' });

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xqeyppdp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        gsap.fromTo('.success-msg', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const inputStyle = (name: string) => ({
    ...S.input,
    borderColor: focused === name ? ACCENT : '#e8e8e8',
  });

  return (
    <div style={{ width: '100%' }}>
      {/* Hero */}
      <section style={{ width: '100%', padding: '120px 0 80px' }}>
        <div style={S.container}>
          <div ref={heroRef} style={{ opacity: 0, marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '32px', height: '1px', background: ACCENT }} />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT }}>Get in Touch</span>
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 112px)', letterSpacing: '-0.04em', lineHeight: 0.93, color: '#111' }}>
              Let's Build<br />
              <span style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}>Something</span><br />
              <span style={{ color: ACCENT }}>Exceptional.</span>
            </h1>
          </div>

          {/* Split layout */}
          <div className="rg-2 contact-grid" style={{ gap: '80px', alignItems: 'start' }}>
            {/* Form */}
            <div>
              {status === 'success' ? (
                <div className="success-msg" style={{ padding: '80px 0', textAlign: 'center', opacity: 0 }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'white', fontSize: '1.5rem' }}>✓</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.03em', marginBottom: '12px' }}>Message Received</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', lineHeight: 1.6 }}>We'll be in touch within 24 hours.</p>
                  <a href="mailto:info@aureusglobalsystems.com" style={{ display: 'inline-block', marginTop: '24px', fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', textDecoration: 'none' }}>
                    Or email us directly →
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' }}>Name *</label>
                      <input style={inputStyle('name')} placeholder="Your name" value={form.name}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' }}>Email *</label>
                      <input type="email" style={inputStyle('email')} placeholder="work@company.com" value={form.email}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' }}>Company</label>
                      <input style={inputStyle('company')} placeholder="Company name" value={form.company}
                        onFocus={() => setFocused('company')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, company: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' }}>Phone</label>
                      <input style={inputStyle('phone')} placeholder="+1 555 000 0000" value={form.phone}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                        onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' }}>Service Interest</label>
                    <select style={{ ...inputStyle('service'), appearance: 'none' }} value={form.service}
                      onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                      onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service...</option>
                      {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' }}>Timeline</label>
                    <select style={{ ...inputStyle('timeline'), appearance: 'none' }} value={form.timeline}
                      onFocus={() => setFocused('timeline')} onBlur={() => setFocused('')}
                      onChange={e => setForm({ ...form, timeline: e.target.value })}>
                      <option value="">When do you need this?</option>
                      {timelineOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' }}>Tell Us About Your Project *</label>
                    <textarea style={{ ...inputStyle('message'), height: '128px', resize: 'none' as const }}
                      placeholder="What are you trying to build or fix? What's broken today? What does success look like?"
                      value={form.message}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                      onChange={e => setForm({ ...form, message: e.target.value })} required />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#ef4444', fontSize: '0.82rem' }}>
                      Something went wrong. Email us at info@aureusglobalsystems.com
                    </p>
                  )}

                  <button type="submit" disabled={status === 'submitting'} style={{
                    padding: '16px', borderRadius: '12px', border: 'none',
                    background: `linear-gradient(135deg, ${ACCENT}, #3366ff)`,
                    color: 'white', fontFamily: 'Space Mono, monospace',
                    fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase',
                    cursor: 'pointer', opacity: status === 'submitting' ? 0.6 : 1, transition: 'opacity 0.2s',
                  }}>
                    {status === 'submitting' ? 'Sending...' : 'Send Message →'}
                  </button>

                  <p style={{ fontFamily: 'Inter, sans-serif', color: '#bbb', fontSize: '0.78rem', textAlign: 'center' }}>
                    Or email:{' '}
                    <a href="mailto:info@aureusglobalsystems.com" style={{ color: '#888', textDecoration: 'underline' }}>
                      info@aureusglobalsystems.com
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Right side */}
            <div>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '48px' }}>What Happens Next</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '48px' }}>
                {nextSteps.map(step => (
                  <div key={step.number} style={{ display: 'flex', gap: '24px' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: ACCENT, flexShrink: 0, paddingTop: '3px', letterSpacing: '0.1em' }}>{step.number}</span>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', letterSpacing: '-0.02em', color: '#111', marginBottom: '6px' }}>{step.title}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.88rem', lineHeight: 1.7 }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ border: '1px solid #f0f0f0', borderRadius: '16px', padding: '28px' }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>Location</p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em', color: '#111' }}>India — Global Delivery</p>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.82rem', marginTop: '4px' }}>Available across all time zones</p>
                <div style={{ width: '48px', height: '1px', background: ACCENT, margin: '20px 0' }} />
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '8px' }}>Contact</p>
                <a href="mailto:info@aureusglobalsystems.com" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#111', textDecoration: 'none', transition: 'color 0.2s' }}>
                  info@aureusglobalsystems.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
