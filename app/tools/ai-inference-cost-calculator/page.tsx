import type { Metadata } from 'next';
import { SEO_META } from '@/lib/seo-meta';
import Link from 'next/link';
import CostCalculator from '@/components/tools/CostCalculator';
import { Faq } from '@/components/service/Sections';
import JsonLd from '@/components/seo/JsonLd';
import {
  CALC_ANSWER, CALC_FAQS, CALC_PATH, GPUS, INPUT_TOKEN_WEIGHT, TARGET_UTILISATION,
} from '@/lib/inference-calc';
import { SITE_URL, SITE_NAME, BOOKING_URL } from '@/lib/site';

const TITLE = 'AI Inference Cost Calculator — Self-Hosted LLM vs API Cost';
const DESCRIPTION =
  'Free calculator: compare what you pay for OpenAI-style LLM APIs with self-hosting an open-source model on your own GPUs. See monthly cost, annual savings and the GPUs you would need.';
const ACCENT = '#3366ff';

export const metadata: Metadata = {
  title: SEO_META[CALC_PATH].title,
  description: SEO_META[CALC_PATH].description,
  keywords: [
    'LLM cost calculator', 'self-hosted LLM cost', 'AI inference cost', 'OpenAI API cost vs self hosting',
    'GPU cost calculator LLM', 'open source LLM hosting cost', 'vLLM cost', 'reduce LLM API costs',
  ],
  alternates: { canonical: CALC_PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: CALC_PATH, siteName: SITE_NAME, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const eyebrow: React.CSSProperties = { fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT };
const h2: React.CSSProperties = { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.035em', lineHeight: 1, color: '#111', margin: '14px 0 28px' };
const body: React.CSSProperties = { fontFamily: 'Inter, sans-serif', color: '#555', fontSize: '0.98rem', lineHeight: 1.75 };

export default function Page() {
  const url = `${SITE_URL}${CALC_PATH}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: 'AI Inference Cost Calculator',
        url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any (web browser)',
        description: DESCRIPTION,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: CALC_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'AI Inference Engineering', item: `${SITE_URL}/services/ai-inference-engineering` },
          { '@type': 'ListItem', position: 3, name: 'AI Inference Cost Calculator', item: url },
        ],
      },
    ],
  };

  return (
    <div style={{ width: '100%' }}>
      <JsonLd data={jsonLd} />

      <section style={{ width: '100%', padding: '130px 0 40px' }}>
        <div className="page-container">
          <nav aria-label="Breadcrumb" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#999', marginBottom: '28px' }}>
            <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link> /{' '}
            <Link href="/services/ai-inference-engineering" style={{ color: '#999', textDecoration: 'none' }}>AI Inference Engineering</Link> /{' '}
            <span style={{ color: ACCENT }}>Cost calculator</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '1px', background: ACCENT }} />
            <span style={eyebrow}>Free tool</span>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(34px, 6vw, 80px)', letterSpacing: '-0.04em', lineHeight: 0.95, color: '#111', marginBottom: '24px' }}>
            API or self‑hosted?<br /><span className="outline-text">Do the maths.</span>
          </h1>
          <p style={{ ...body, maxWidth: '620px', fontSize: '1.05rem' }}>
            Compare what you pay for a proprietary LLM API with running an open-source model on your own GPUs —
            monthly cost, annual saving and the hardware you&apos;d need.
          </p>
        </div>
      </section>

      <section style={{ width: '100%', padding: '24px 0 96px' }}>
        <div className="page-container">
          <CostCalculator />
        </div>
      </section>

      {/* Answer-first block (AEO) */}
      <section style={{ width: '100%', padding: '80px 0', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div className="page-container" style={{ maxWidth: '920px' }}>
          <h2 style={{ ...eyebrow, marginBottom: '14px' }}>In short</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.6, color: '#222' }}>{CALC_ANSWER}</p>
        </div>
      </section>

      <section style={{ width: '100%', padding: '96px 0' }}>
        <div className="page-container" style={{ maxWidth: '920px' }}>
          <p style={eyebrow}>Method</p>
          <h2 style={h2}>How the estimate works</h2>
          <ul className="calc-method" style={body}>
            <li><strong>API cost</strong> = requests × (input tokens × input price + output tokens × output price).</li>
            <li><strong>GPU time</strong> comes from sustained throughput for a quantized (FP8/INT4) model served with continuous batching on vLLM or SGLang. Input tokens are counted at {Math.round(INPUT_TOKEN_WEIGHT * 100)}% of an output token because prompt processing is far faster than generation.</li>
            <li>GPUs are planned at {Math.round(TARGET_UTILISATION * 100)}% average utilisation, leaving headroom for traffic peaks and latency targets.</li>
            <li>Real-time traffic keeps at least one serving replica running for the whole serving window; batch workloads pay only for the hours they run.</li>
            <li>GPU prices are typical on-demand cloud rates ({GPUS.map((g) => `${g.label.replace('NVIDIA ', '').replace(/ \(.*\)/, '')} $${g.price.toFixed(2)}`).join(', ')} per hour). Reserved or spot capacity is usually cheaper.</li>
            <li>Engineering and operations are a monthly figure you control. Don&apos;t set it to zero: someone has to run it.</li>
          </ul>
          <p style={{ ...body, marginTop: '20px' }}>
            These are conservative planning numbers, not a quote. Throughput on your own prompts can be higher or lower —
            that is what an <Link href="/services/ai-inference-engineering" style={{ color: ACCENT }}>inference audit</Link> measures before you commit.
          </p>
          <p style={{ ...body, marginTop: '12px' }}>
            Planning a move? Read our step-by-step{' '}
            <Link href="/insights/migrate-openai-to-open-source-llm-playbook" style={{ color: ACCENT }}>playbook for migrating from OpenAI APIs to open-source LLMs</Link>.
          </p>
        </div>
      </section>

      <Faq faqs={CALC_FAQS} accent={ACCENT} />

      <section style={{ width: '100%', padding: '96px 0', background: '#0b0b0b', textAlign: 'center' }}>
        <div className="page-container" style={{ maxWidth: '760px' }}>
          <p style={{ ...eyebrow, color: '#8aa4ff' }}>Next step</p>
          <h2 style={{ ...h2, color: 'white' }}>Turn the estimate into a measured number.</h2>
          <p style={{ ...body, color: '#999', marginBottom: '36px' }}>
            In a fixed-scope audit we analyse your real usage, benchmark open models on your prompts and give you a cost model you can take to finance —
            then pilot the workloads that pay off.
          </p>
          <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?service=AI%20Inference%20Engineering" className="calc-cta">Talk to an inference engineer →</Link>
            {BOOKING_URL && (
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="calc-link" style={{ color: 'white' }}>Book a 30-min call ↗</a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
