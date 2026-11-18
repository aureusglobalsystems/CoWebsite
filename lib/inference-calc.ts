// Planning model behind the AI inference cost calculator (/tools/ai-inference-cost-calculator).
// Pure functions + reference tables, shared by the client calculator and the server page copy.
// Numbers are deliberately conservative, rounded planning figures — the page says so, and the
// paid audit replaces them with measured benchmarks on the client's own prompts.

export type ModelSize = '8b' | '14b' | '32b' | '70b';
export type GpuId = 'l4' | 'a10g' | 'l40s' | 'a100' | 'h100';
export type Traffic = 'batch' | 'business' | 'always';

export const MODELS: { id: ModelSize; label: string; hint: string }[] = [
  { id: '8b', label: '7–8B', hint: 'Classification, extraction, routing' },
  { id: '14b', label: '12–14B', hint: 'Summaries, structured output, RAG' },
  { id: '32b', label: '27–32B', hint: 'Content generation, reasoning-lite' },
  { id: '70b', label: '70B', hint: 'Near-frontier quality, chat' },
];

export const GPUS: { id: GpuId; label: string; price: number }[] = [
  { id: 'l4', label: 'NVIDIA L4 (24 GB)', price: 0.8 },
  { id: 'a10g', label: 'NVIDIA A10G (24 GB)', price: 1.0 },
  { id: 'l40s', label: 'NVIDIA L40S (48 GB)', price: 1.8 },
  { id: 'a100', label: 'NVIDIA A100 (80 GB)', price: 2.5 },
  { id: 'h100', label: 'NVIDIA H100 (80 GB)', price: 3.0 },
];

/** GPUs per serving replica with a quantized (FP8/INT4) model. */
export const GPUS_PER_REPLICA: Record<ModelSize, Record<GpuId, number>> = {
  '8b': { l4: 1, a10g: 1, l40s: 1, a100: 1, h100: 1 },
  '14b': { l4: 1, a10g: 1, l40s: 1, a100: 1, h100: 1 },
  '32b': { l4: 2, a10g: 2, l40s: 1, a100: 1, h100: 1 },
  '70b': { l4: 4, a10g: 4, l40s: 2, a100: 1, h100: 1 },
};

/** Sustained output tokens/second per replica with continuous batching (vLLM/SGLang), quantized. */
export const THROUGHPUT: Record<ModelSize, Record<GpuId, number>> = {
  '8b': { l4: 900, a10g: 1100, l40s: 2200, a100: 3000, h100: 5500 },
  '14b': { l4: 450, a10g: 550, l40s: 1200, a100: 1700, h100: 3200 },
  '32b': { l4: 350, a10g: 400, l40s: 600, a100: 900, h100: 1800 },
  '70b': { l4: 300, a10g: 300, l40s: 500, a100: 500, h100: 1000 },
};

export const TRAFFIC: { id: Traffic; label: string; hint: string; minHours: number }[] = [
  { id: 'batch', label: 'Batch / async', hint: 'Jobs can queue; GPUs scale to zero', minHours: 0 },
  { id: 'business', label: 'Business hours', hint: '~12h × 22 days, real-time', minHours: 264 },
  { id: 'always', label: 'Always on (24/7)', hint: 'Real-time, round the clock', minHours: 730 },
];

export const API_TIERS = [
  { id: 'frontier', label: 'Frontier model', in: 3, out: 15 },
  { id: 'mid', label: 'Mid-tier model', in: 1, out: 4 },
  { id: 'small', label: 'Small / "mini" model', in: 0.15, out: 0.6 },
] as const;

export const WORKLOADS = [
  { id: 'classify', label: 'Text classification', inTok: 600, outTok: 20, model: '8b' as ModelSize },
  { id: 'extract', label: 'Data extraction', inTok: 1500, outTok: 300, model: '8b' as ModelSize },
  { id: 'rag', label: 'RAG / support answers', inTok: 3000, outTok: 400, model: '14b' as ModelSize },
  { id: 'generate', label: 'Content generation', inTok: 800, outTok: 900, model: '32b' as ModelSize },
] as const;

/** Prefill (input) tokens are processed far faster than generated tokens; weight them accordingly. */
export const INPUT_TOKEN_WEIGHT = 0.1;
/** Planned average GPU utilisation — headroom for peaks and latency targets. */
export const TARGET_UTILISATION = 0.6;
export const HOURS_PER_MONTH = 730;

export interface CalcInput {
  requestsPerMonth: number;
  inTokens: number;
  outTokens: number;
  apiIn: number;   // $ per 1M input tokens
  apiOut: number;  // $ per 1M output tokens
  model: ModelSize;
  gpu: GpuId;
  gpuPrice: number; // $ per GPU-hour
  traffic: Traffic;
  opsMonthly: number; // engineering / ops / monitoring overhead, $ per month
}

export interface CalcResult {
  apiMonthly: number;
  selfMonthly: number;
  gpuMonthly: number;
  savingsMonthly: number;
  savingsAnnual: number;
  savingsPct: number;
  gpusPerReplica: number;
  replicaHoursNeeded: number;
  replicaHoursPaid: number;
  avgReplicas: number;
  busyPct: number;
  apiPer1k: number;
  selfPer1k: number;
  verdict: 'strong' | 'maybe' | 'no';
}

const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function calculate(i: CalcInput): CalcResult {
  const req = safe(i.requestsPerMonth);
  const inTok = safe(i.inTokens);
  const outTok = safe(i.outTokens);

  const apiMonthly = (req * (inTok * safe(i.apiIn) + outTok * safe(i.apiOut))) / 1e6;

  const gpusPerReplica = GPUS_PER_REPLICA[i.model][i.gpu];
  const tps = THROUGHPUT[i.model][i.gpu];
  const weightedTokens = req * (outTok + inTok * INPUT_TOKEN_WEIGHT);
  const replicaHoursNeeded = weightedTokens / (tps * 3600 * TARGET_UTILISATION);
  const minHours = TRAFFIC.find((t) => t.id === i.traffic)?.minHours ?? 0;
  // Real-time traffic keeps at least one replica up for the serving window; above that we pay for what we use.
  const replicaHoursPaid = Math.max(replicaHoursNeeded, minHours);
  const gpuMonthly = replicaHoursPaid * gpusPerReplica * safe(i.gpuPrice);
  const selfMonthly = gpuMonthly + safe(i.opsMonthly);

  const savingsMonthly = apiMonthly - selfMonthly;
  const savingsPct = apiMonthly > 0 ? savingsMonthly / apiMonthly : 0;
  const verdict: CalcResult['verdict'] = savingsPct >= 0.5 ? 'strong' : savingsPct >= 0.2 ? 'maybe' : 'no';

  return {
    apiMonthly,
    selfMonthly,
    gpuMonthly,
    savingsMonthly,
    savingsAnnual: savingsMonthly * 12,
    savingsPct,
    gpusPerReplica,
    replicaHoursNeeded,
    replicaHoursPaid,
    avgReplicas: replicaHoursNeeded / HOURS_PER_MONTH,
    busyPct: replicaHoursPaid > 0 ? Math.min(1, (replicaHoursNeeded * TARGET_UTILISATION) / replicaHoursPaid) : 0,
    apiPer1k: req > 0 ? (apiMonthly / req) * 1000 : 0,
    selfPer1k: req > 0 ? (selfMonthly / req) * 1000 : 0,
    verdict,
  };
}

export const CALC_PATH = '/tools/ai-inference-cost-calculator';

/** Answer-first summary for AI assistants (AEO) and the page intro. */
export const CALC_ANSWER =
  'Self-hosting an open-source LLM is usually cheaper than a proprietary API once a workload is high-volume and predictable — typically from a few million requests a month for classification or extraction. ' +
  'The saving comes from matching the task to the smallest model that holds quality (often 7–8B parameters), quantizing it (FP8/INT4), and serving it with continuous batching (vLLM or SGLang) so GPUs stay busy. ' +
  'At low or very spiky volume, a cheaper API tier or a batch API is often the better choice.';

export const CALC_FAQS = [
  {
    q: 'When is self-hosting an LLM cheaper than using an API?',
    a: 'When the workload is high-volume and steady enough to keep GPUs busy. Classification and extraction at a few million requests per month usually cross the line first, because a quantized 7–8B model handles them well on a single low-cost GPU. Low-volume or bursty workloads usually stay cheaper on an API.',
  },
  {
    q: 'How accurate is this calculator?',
    a: 'It is a planning estimate. Throughput figures are conservative averages for quantized models served with continuous batching; real numbers depend on prompt length, latency targets, the model and the quantization method. An inference audit replaces these assumptions with benchmarks on your own prompts.',
  },
  {
    q: 'What costs does self-hosting add besides GPUs?',
    a: 'Engineering to set up and maintain the serving stack, monitoring, evaluation against your current outputs, and on-call for production. The calculator includes these as a monthly operations figure you can change.',
  },
  {
    q: 'Will an open-source model match the quality of my current API model?',
    a: 'For well-defined tasks such as classification, extraction and templated generation, a smaller open model — sometimes fine-tuned — often matches it. Open-ended reasoning and long-form writing need careful testing. A pilot should compare quality on a sample of your real inputs before anything moves to production.',
  },
];
