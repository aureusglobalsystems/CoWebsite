'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { readFirstTouch } from '@/components/FirstTouch';
import { AVAILABILITY, CAREERS_ACCENT as ACCENT, CLOUDS, COMMITMENT, DATABRICKS_CERTS, DATABRICKS_EXPERIENCE, LEVELS, LINKEDIN_URL, SKILLS, STATUS, TALENT_SHEET_URL } from '@/lib/careers';

const label: React.CSSProperties = { fontFamily: 'Space Mono, monospace', fontSize: '0.5rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '8px' };
const input: React.CSSProperties = { width: '100%', background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#111', outline: 'none' };

const empty = {
  name: '', email: '', phone: '', linkedin: '', resume: '', location: '', years: '',
  level: '', cloud: '', databricks: '', cert: '', skills: [] as string[], availability: '', commitment: '', status: '', rate: '', notes: '',
  consent: false, _gotcha: '',
};

export default function TalentForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const set = <K extends keyof typeof empty>(k: K, v: (typeof empty)[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSkill = (s: string) => set('skills', form.skills.includes(s) ? form.skills.filter((x) => x !== s) : [...form.skills, s]);

  const ready = form.name && form.email && form.linkedin && form.level && form.cloud && form.databricks && form.consent;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    if (!TALENT_SHEET_URL) { setStatus('error'); return; }
    setStatus('submitting');
    try {
      // Google Apps Script web app → private Google Sheet (see scripts/talent-network-apps-script.gs).
      // Apps Script does not send CORS headers, so the request is sent as text/plain with no-cors;
      // a network failure still throws and shows the error state.
      await fetch(TALENT_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...form,
          skills: form.skills.join(', '),
          consent: form.consent ? 'Yes' : 'No',
          ...readFirstTouch(),
        }),
      });
      setStatus('success');
      trackEvent('talent_signup', { level: form.level, cloud: form.cloud, availability: form.availability || 'unspecified' });
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div role="status" style={{ padding: '72px 0', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'white', fontSize: '1.5rem' }}>✓</div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.03em', marginBottom: '12px' }}>You&apos;re in the network</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto' }}>
          We&apos;ll be in touch when a project matches your skills and availability. We never share your profile with a client without asking you first.
        </p>
        <div style={{ marginTop: '32px', padding: '24px', border: '1px solid #ececec', borderRadius: '16px', maxWidth: '420px', marginInline: 'auto' }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', color: '#111', marginBottom: '6px' }}>One more thing</p>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '16px' }}>
            New Databricks roles are posted on our LinkedIn page first. Follow us so you see them as soon as they open.
          </p>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="calc-cta"
            onClick={() => trackEvent('linkedin_follow_click', { location: 'careers_success' })}>Follow AGS on LinkedIn ↗</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form._gotcha} onChange={(e) => set('_gotcha', e.target.value)} style={{ display: 'none' }} />

      <div className="form-row">
        <div>
          <label htmlFor="t-name" style={label}>Full name *</label>
          <input id="t-name" autoComplete="name" style={input} value={form.name} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div>
          <label htmlFor="t-email" style={label}>Email *</label>
          <input id="t-email" type="email" autoComplete="email" inputMode="email" style={input} value={form.email} onChange={(e) => set('email', e.target.value)} required suppressHydrationWarning />
        </div>
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="t-linkedin" style={label}>LinkedIn profile URL *</label>
          <input id="t-linkedin" type="url" inputMode="url" style={input} placeholder="https://linkedin.com/in/…" value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} required />
        </div>
        <div>
          <label htmlFor="t-phone" style={label}>Phone / WhatsApp</label>
          <input id="t-phone" type="tel" autoComplete="tel" inputMode="tel" style={input} placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
      </div>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={label}>Level *</legend>
        <div className="talent-levels">
          {LEVELS.map((l) => (
            <button type="button" key={l.value} aria-pressed={form.level === l.value}
              className={`need-option${form.level === l.value ? ' selected' : ''}`} onClick={() => set('level', l.value)}>
              <span><strong>{l.value}</strong><small>{l.hint}</small></span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={label}>Primary cloud *</legend>
        <div className="calc-chips">
          {CLOUDS.map((c) => (
            <button type="button" key={c} aria-pressed={form.cloud === c} className={`calc-chip${form.cloud === c ? ' on' : ''}`} onClick={() => set('cloud', c)}>{c}</button>
          ))}
        </div>
      </fieldset>

      <div className="form-row">
        <div>
          <label htmlFor="t-databricks" style={label}>Databricks experience *</label>
          <select id="t-databricks" style={{ ...input, appearance: 'none' }} value={form.databricks} onChange={(e) => set('databricks', e.target.value)} required>
            <option value="">Select…</option>
            {DATABRICKS_EXPERIENCE.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="t-cert" style={label}>Databricks certification</label>
          <select id="t-cert" style={{ ...input, appearance: 'none' }} value={form.cert} onChange={(e) => set('cert', e.target.value)}>
            <option value="">Select…</option>
            {DATABRICKS_CERTS.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="t-years" style={label}>Total years of experience</label>
          <input id="t-years" type="number" min={0} max={40} inputMode="numeric" style={input} value={form.years} onChange={(e) => set('years', e.target.value)} />
        </div>
        <div>
          <label htmlFor="t-location" style={label}>City, country</label>
          <input id="t-location" autoComplete="address-level2" style={input} value={form.location} onChange={(e) => set('location', e.target.value)} />
        </div>
      </div>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={label}>Other skills you use in production</legend>
        <div className="calc-chips">
          {SKILLS.map((s) => (
            <button type="button" key={s} aria-pressed={form.skills.includes(s)} className={`calc-chip${form.skills.includes(s) ? ' on' : ''}`} onClick={() => toggleSkill(s)}>{s}</button>
          ))}
        </div>
      </fieldset>

      <div className="form-row">
        <div>
          <label htmlFor="t-availability" style={label}>Available from</label>
          <select id="t-availability" style={{ ...input, appearance: 'none' }} value={form.availability} onChange={(e) => set('availability', e.target.value)}>
            <option value="">Select…</option>
            {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="t-commitment" style={label}>Looking for</label>
          <select id="t-commitment" style={{ ...input, appearance: 'none' }} value={form.commitment} onChange={(e) => set('commitment', e.target.value)}>
            <option value="">Select…</option>
            {COMMITMENT.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="t-status" style={label}>Current status</label>
          <select id="t-status" style={{ ...input, appearance: 'none' }} value={form.status} onChange={(e) => set('status', e.target.value)}>
            <option value="">Select…</option>
            {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="t-rate" style={label}>Expected rate</label>
          <input id="t-rate" style={input} placeholder="e.g. ₹2,50,000 / month or $35 / hour" value={form.rate} onChange={(e) => set('rate', e.target.value)} />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="t-resume" style={label}>Résumé link (optional)</label>
          <input id="t-resume" type="url" inputMode="url" style={input} placeholder="Google Drive / Dropbox link" value={form.resume} onChange={(e) => set('resume', e.target.value)} />
        </div>
      </div>

      <div>
        <label htmlFor="t-notes" style={label}>Anything else?</label>
        <textarea id="t-notes" style={{ ...input, height: '96px', resize: 'none' }} placeholder="Recent projects, certifications, time-zone preferences…" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
      </div>

      <label style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#555', lineHeight: 1.55, cursor: 'pointer' }}>
        <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} required style={{ marginTop: '3px', accentColor: ACCENT, width: '16px', height: '16px', flexShrink: 0 }} />
        <span>I agree that Aureus Global Systems may store my details and contact me about suitable projects. My profile will only be shared with a client after I agree to it for that role, and I can ask for my details to be deleted at any time. *</span>
      </label>

      {status === 'error' && (
        <p role="alert" style={{ fontFamily: 'Inter, sans-serif', color: '#ef4444', fontSize: '0.82rem' }}>
          Something went wrong. Please check your connection and try again in a minute.
        </p>
      )}

      <button type="submit" disabled={status === 'submitting' || !ready} style={{
        padding: '17px', borderRadius: '12px', border: 'none', background: '#111', color: 'white',
        fontFamily: 'Space Mono, monospace', fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase',
        cursor: ready ? 'pointer' : 'not-allowed', opacity: status === 'submitting' || !ready ? 0.5 : 1, transition: 'opacity 0.2s',
      }}>
        {status === 'submitting' ? 'Sending…' : ready ? 'Join the network →' : 'Fill the required fields (*) to join'}
      </button>
    </form>
  );
}
