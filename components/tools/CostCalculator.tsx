'use client';

import { useEffect, useRef, useState } from 'react';
import {
  API_TIERS, GPUS, MODELS, TRAFFIC, WORKLOADS, calculate,
  type CalcInput, type GpuId, type ModelSize, type Traffic,
} from '@/lib/inference-calc';
import { trackEvent } from '@/lib/analytics';
import { BOOKING_URL } from '@/lib/site';

const ACCENT = '#3366ff';
const CONTACT_HREF = '/contact?service=AI%20Inference%20Engineering';

const usd = (n: number, digits = 0) =>
  (n < 0 ? '−' : '') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

const DEFAULT: CalcInput = {
  requestsPerMonth: 1_000_000,
  inTokens: 1500,
  outTokens: 300,
  apiIn: 3,
  apiOut: 15,
  model: '8b',
  gpu: 'l4',
  gpuPrice: 0.8,
  traffic: 'always',
  opsMonthly: 1000,
};

function Field({ label, hint, children, htmlFor }: { label: string; hint?: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div className="calc-field">
      <label htmlFor={htmlFor} className="calc-label">{label}</label>
      {children}
      {hint && <span className="calc-hint">{hint}</span>}
    </div>
  );
}

function NumberInput({ id, value, onChange, step = 1, min = 0, prefix, suffix }: {
  id: string; value: number; onChange: (n: number) => void; step?: number; min?: number; prefix?: string; suffix?: string;
}) {
  return (
    <div className="calc-input-wrap">
      {prefix && <span className="calc-affix">{prefix}</span>}
      <input id={id} type="number" inputMode="decimal" min={min} step={step} className="calc-input"
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))} />
      {suffix && <span className="calc-affix">{suffix}</span>}
    </div>
  );
}

export default function CostCalculator() {
  const [v, setV] = useState<CalcInput>(DEFAULT);
  const [workload, setWorkload] = useState<string>('extract');
  const [tier, setTier] = useState<string>('frontier');
  const [copied, setCopied] = useState(false);
  const touched = useRef(false);
  const resultsRef = useRef<HTMLElement>(null);
  const [resultsVisible, setResultsVisible] = useState(true);

  // On small screens the results sit below the inputs; show a sticky summary until they scroll into view.
  useEffect(() => {
    const el = resultsRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setResultsVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const set = <K extends keyof CalcInput>(key: K, val: CalcInput[K]) => {
    if (!touched.current) { touched.current = true; trackEvent('calculator_used', { tool: 'inference_cost' }); }
    setV((prev) => ({ ...prev, [key]: val }));
  };

  const r = calculate(v);
  const max = Math.max(r.apiMonthly, r.selfMonthly, 1);
  const gpu = GPUS.find((g) => g.id === v.gpu)!;
  const model = MODELS.find((m) => m.id === v.model)!;
  // replicaHoursNeeded already includes utilisation headroom, so this is the peak-ready replica count.
  const replicas = Math.max(1, Math.ceil(r.avgReplicas - 1e-9));

  const verdictText = {
    strong: 'Strong candidate for self-hosting. The saving is large enough to cover tuning, evaluation and a margin for error.',
    maybe: 'Worth a closer look. The case depends on real throughput on your prompts — exactly what a short audit measures.',
    no: 'Probably not worth self-hosting at this volume. A cheaper API tier, prompt trimming or a batch API is likely the better first step.',
  }[r.verdict];

  const summary = [
    'AI inference cost estimate (aureusglobalsystems.com)',
    `Workload: ${v.requestsPerMonth.toLocaleString('en-US')} requests/month, ${v.inTokens} in / ${v.outTokens} out tokens`,
    `Current API: ${usd(r.apiMonthly)}/month (${usd(r.apiMonthly * 12)}/year)`,
    `Self-hosted ${model.label} model on ${gpu.label}: ${usd(r.selfMonthly)}/month incl. ${usd(v.opsMonthly)} ops`,
    `Estimated saving: ${usd(r.savingsAnnual)}/year (${Math.round(r.savingsPct * 100)}%)`,
  ].join('\n');

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* clipboard blocked */ }
    trackEvent('calculator_copy', { tool: 'inference_cost' });
  };

  return (
    <div className="calc-grid">
      {/* Inputs */}
      <div className="calc-inputs">
        <fieldset className="calc-group">
          <legend className="calc-step"><span>01</span> Your workload</legend>
          <div className="calc-chips" role="group" aria-label="Workload type">
            {WORKLOADS.map((w) => (
              <button key={w.id} type="button" aria-pressed={workload === w.id}
                className={`calc-chip${workload === w.id ? ' on' : ''}`}
                onClick={() => { setWorkload(w.id); set('inTokens', w.inTok); set('outTokens', w.outTok); set('model', w.model); }}>
                {w.label}
              </button>
            ))}
          </div>
          <Field label="Requests per month" htmlFor="c-req" hint={`${v.requestsPerMonth.toLocaleString('en-US')} ≈ ${Math.round(v.requestsPerMonth / 30).toLocaleString('en-US')} a day`}>
            <NumberInput id="c-req" value={v.requestsPerMonth} step={10000} onChange={(n) => set('requestsPerMonth', n)} />
          </Field>
          <div className="calc-row">
            <Field label="Avg input tokens / request" htmlFor="c-in">
              <NumberInput id="c-in" value={v.inTokens} step={50} onChange={(n) => { setWorkload(''); set('inTokens', n); }} />
            </Field>
            <Field label="Avg output tokens / request" htmlFor="c-out">
              <NumberInput id="c-out" value={v.outTokens} step={10} onChange={(n) => { setWorkload(''); set('outTokens', n); }} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="calc-group">
          <legend className="calc-step"><span>02</span> Your current API</legend>
          <div className="calc-chips" role="group" aria-label="Current API tier">
            {API_TIERS.map((t) => (
              <button key={t.id} type="button" aria-pressed={tier === t.id}
                className={`calc-chip${tier === t.id ? ' on' : ''}`}
                onClick={() => { setTier(t.id); set('apiIn', t.in); set('apiOut', t.out); }}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="calc-row">
            <Field label="Input price / 1M tokens" htmlFor="c-pin">
              <NumberInput id="c-pin" prefix="$" value={v.apiIn} step={0.05} onChange={(n) => { setTier(''); set('apiIn', n); }} />
            </Field>
            <Field label="Output price / 1M tokens" htmlFor="c-pout">
              <NumberInput id="c-pout" prefix="$" value={v.apiOut} step={0.1} onChange={(n) => { setTier(''); set('apiOut', n); }} />
            </Field>
          </div>
          <p className="calc-note">Tier prices are illustrative. Enter the rates on your current invoice for a real comparison.</p>
        </fieldset>

        <fieldset className="calc-group">
          <legend className="calc-step"><span>03</span> Self-hosted setup</legend>
          <div className="calc-row">
            <Field label="Open model size" htmlFor="c-model" hint={model.hint}>
              <select id="c-model" className="calc-input calc-select" value={v.model} onChange={(e) => set('model', e.target.value as ModelSize)}>
                {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label} parameters</option>)}
              </select>
            </Field>
            <Field label="GPU" htmlFor="c-gpu">
              <select id="c-gpu" className="calc-input calc-select" value={v.gpu}
                onChange={(e) => { const g = GPUS.find((x) => x.id === e.target.value)!; set('gpu', g.id as GpuId); set('gpuPrice', g.price); }}>
                {GPUS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
            </Field>
          </div>
          <div className="calc-row">
            <Field label="GPU price / hour" htmlFor="c-gp" hint="Typical on-demand cloud price — edit to yours">
              <NumberInput id="c-gp" prefix="$" value={v.gpuPrice} step={0.05} onChange={(n) => set('gpuPrice', n)} />
            </Field>
            <Field label="Engineering & ops / month" htmlFor="c-ops" hint="Monitoring, updates, on-call">
              <NumberInput id="c-ops" prefix="$" value={v.opsMonthly} step={100} onChange={(n) => set('opsMonthly', n)} />
            </Field>
          </div>
          <div className="calc-field">
            <span className="calc-label">Traffic pattern</span>
            <div className="calc-chips" role="group" aria-label="Traffic pattern">
              {TRAFFIC.map((t) => (
                <button key={t.id} type="button" aria-pressed={v.traffic === t.id} title={t.hint}
                  className={`calc-chip${v.traffic === t.id ? ' on' : ''}`}
                  onClick={() => set('traffic', t.id as Traffic)}>
                  {t.label}
                </button>
              ))}
            </div>
            <span className="calc-hint">{TRAFFIC.find((t) => t.id === v.traffic)?.hint}</span>
          </div>
        </fieldset>
      </div>

      {/* Results */}
      <aside className="calc-results" id="calc-results" ref={resultsRef} aria-live="polite">
        <span className="calc-res-label">Estimated annual saving</span>
        <div className="calc-hero" style={{ color: r.savingsAnnual > 0 ? 'white' : '#888' }}>
          {r.savingsAnnual > 0 ? usd(r.savingsAnnual) : 'No saving'}
        </div>
        <p className="calc-sub">
          {r.savingsAnnual > 0
            ? <>{Math.round(r.savingsPct * 100)}% lower than your current API bill of {usd(r.apiMonthly * 12)} a year</>
            : <>Self-hosting would cost {usd(-r.savingsAnnual)} more per year at this volume</>}
        </p>

        <div className="calc-bars" role="img" aria-label={`Monthly cost: current API ${usd(r.apiMonthly)}, self-hosted ${usd(r.selfMonthly)}`}>
          {[
            { name: 'Current API', val: r.apiMonthly, color: '#8a8a8a' },
            { name: 'Self-hosted', val: r.selfMonthly, color: ACCENT },
          ].map((b) => (
            <div key={b.name} className="calc-bar-row" title={`${b.name}: ${usd(b.val)} per month`}>
              <div className="calc-bar-head"><span>{b.name}</span><strong>{usd(b.val)}<small>/mo</small></strong></div>
              <div className="calc-bar-track"><div className="calc-bar" style={{ width: `${Math.max(1.5, (b.val / max) * 100)}%`, background: b.color }} /></div>
            </div>
          ))}
        </div>

        <dl className="calc-details">
          <div><dt>Self-hosted breakdown</dt><dd>{usd(r.gpuMonthly)} GPU + {usd(v.opsMonthly)} ops</dd></div>
          <div><dt>Serving footprint</dt><dd>{replicas} × {r.gpusPerReplica > 1 ? `${r.gpusPerReplica} GPUs` : 'GPU'} at peak-ready capacity</dd></div>
          <div><dt>Cost per 1,000 requests</dt><dd>{usd(r.apiPer1k, 2)} API → {usd(r.selfPer1k, 2)} self-hosted</dd></div>
          <div><dt>Paid GPU time doing work</dt><dd>{Math.round(r.busyPct * 100)}%</dd></div>
        </dl>

        <p className={`calc-verdict v-${r.verdict}`}>{verdictText}</p>

        <div className="calc-ctas">
          <a href={CONTACT_HREF} className="calc-cta" onClick={() => trackEvent('cta_click', { location: 'calculator', service: 'ai-inference-engineering' })}>
            Get a measured audit →
          </a>
          {BOOKING_URL && (
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="calc-link"
              onClick={() => trackEvent('book_call_click', { location: 'calculator' })}>
              Book a 30-min call ↗
            </a>
          )}
          <button type="button" className="calc-link" onClick={copy}>{copied ? 'Copied ✓' : 'Copy summary'}</button>
        </div>
      </aside>

      <a href="#calc-results" className={`calc-mobile-summary${resultsVisible ? '' : ' show'}`} aria-hidden={resultsVisible} tabIndex={resultsVisible ? -1 : 0}>
        <span>
          <small>Est. annual saving</small>
          <strong>{r.savingsAnnual > 0 ? usd(r.savingsAnnual) : 'No saving'}</strong>
        </span>
        <span className="calc-mobile-pct">{r.savingsAnnual > 0 ? `−${Math.round(r.savingsPct * 100)}%` : ''} See breakdown ↓</span>
      </a>
    </div>
  );
}
