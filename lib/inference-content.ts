// Copy for the AI Inference Engineering page. Shared by the server page
// (metadata + JSON-LD) and the client component that renders it.

export const INFERENCE_ACCENT = '#3366ff';
export const INFERENCE_PATH = '/services/ai-inference-engineering';

/** Answer-first definition an AI assistant can quote verbatim (AEO). */
export const INFERENCE_ANSWER =
  'AI inference engineering is the work of running trained AI models in production — fast, reliably and at the lowest possible cost. Aureus Global Systems (AGS) helps teams self-host open-source LLMs such as Llama, Mistral, Qwen and DeepSeek inside their own cloud with vLLM, TensorRT-LLM and Kubernetes, then cuts GPU spend with quantization, batching and autoscaling — as a delivered project or with inference engineers who join your team.';

export const problems = [
  { title: 'API bills that scale with every request', body: 'Per-token pricing looks cheap in a pilot. At production volume it becomes one of the largest lines in your cloud budget — and it grows with every new user.' },
  { title: 'Your data leaves your boundary', body: 'Every prompt sent to a third-party API is customer data, IP, or internal context leaving your environment. For regulated teams that is often a non-starter.' },
  { title: 'Expensive GPUs sitting idle', body: 'Over-provisioned GPU nodes, no request batching, and models running at full precision when they don\'t need to — most self-hosted setups waste a large share of the compute they pay for.' },
  { title: 'Latency nobody can explain', body: 'Slow time-to-first-token, p95 spikes under load, and no visibility into where the time goes. Users notice long before the dashboards do.' },
];

export const offerings = [
  {
    icon: '◇',
    title: 'Open Model Selection & Benchmarking',
    body: 'We shortlist open-weight models for your use case and benchmark them on your own prompts and data — quality, latency, throughput and cost per million tokens — so the choice is based on evidence, not leaderboards.',
    points: ['Llama, Mistral, Qwen, DeepSeek, Gemma and fine-tuned variants', 'Task-specific evaluation sets built from your data', 'Quality vs. cost trade-off report'],
  },
  {
    icon: '◈',
    title: 'Self-Hosted LLM Serving',
    body: 'Production-grade serving of open models inside your own cloud account or data centre, using high-throughput inference engines and an OpenAI-compatible API your applications can switch to with minimal code changes.',
    points: ['vLLM, SGLang, TGI, NVIDIA Triton and TensorRT-LLM', 'OpenAI-compatible endpoints and API gateway', 'Private networking — data never leaves your VPC'],
  },
  {
    icon: '◆',
    title: 'GPU Cost Optimization',
    body: 'We get more tokens out of every GPU-hour. Quantization, continuous batching, KV-cache tuning and right-sized instances — measured before and after, so you see exactly what changed.',
    points: ['Quantization: AWQ, GPTQ, FP8, INT4', 'Continuous batching, prefix caching, speculative decoding', 'GPU right-sizing, autoscaling and spot capacity'],
  },
  {
    icon: '◎',
    title: 'Kubernetes & Cloud Deployment',
    body: 'Inference platforms that scale with demand and scale to zero when idle — on the cloud and orchestration you already run, with infrastructure-as-code your team can own.',
    points: ['EKS, AKS, GKE with KServe or Ray Serve', 'Databricks Model Serving and Mosaic AI', 'Terraform, Helm and CI/CD for model releases'],
  },
  {
    icon: '◉',
    title: 'Inference Observability',
    body: 'Dashboards and alerts for the numbers that matter: time-to-first-token, tokens per second, p95 latency, GPU utilisation and cost per request — so performance and spend stay visible after go-live.',
    points: ['Prometheus, Grafana and OpenTelemetry', 'Per-model and per-tenant cost attribution', 'Load testing and capacity planning'],
  },
  {
    icon: '❖',
    title: 'API-to-Self-Hosted Migration',
    body: 'Moving off a paid LLM API without breaking your product. We run the open model side-by-side, compare outputs on real traffic, and cut over gradually with a rollback path.',
    points: ['Shadow traffic and output comparison', 'Prompt and evaluation porting', 'Hybrid routing: self-hosted by default, API as fallback'],
  },
];

export const steps = [
  { number: '01', title: 'Assess', body: 'We review your current models, traffic patterns, latency targets, data-residency needs and what you spend today on APIs or GPUs.' },
  { number: '02', title: 'Benchmark', body: 'We test candidate open models and serving configurations against your real workloads and give you a clear cost, quality and latency comparison.' },
  { number: '03', title: 'Deploy', body: 'We build the self-hosted inference platform in your environment — serving engine, autoscaling, gateway, security and monitoring.' },
  { number: '04', title: 'Optimize', body: 'We tune quantization, batching and capacity against live traffic, then hand over runbooks — or stay on to keep improving cost per token.' },
];

export const stack = [
  { layer: 'Gateway', detail: 'Auth · rate limits · routing', tools: 'OpenAI-compatible API, LiteLLM, Kong' },
  { layer: 'Scheduler', detail: 'Queueing · continuous batching', tools: 'vLLM, SGLang, Ray Serve' },
  { layer: 'Serving Engine', detail: 'KV cache · paged attention', tools: 'vLLM, TensorRT-LLM, Triton, TGI' },
  { layer: 'Model', detail: 'Quantized open weights', tools: 'Llama, Mistral, Qwen, DeepSeek — AWQ / GPTQ / FP8' },
  { layer: 'GPU Infrastructure', detail: 'Autoscaling · spot · right-sizing', tools: 'NVIDIA H100 / A100 / L4, EKS, AKS, GKE, Databricks' },
];

export const tech = [
  'vLLM', 'SGLang', 'TensorRT-LLM', 'NVIDIA Triton', 'Hugging Face TGI', 'Ollama',
  'Llama', 'Mistral', 'Qwen', 'DeepSeek', 'Gemma',
  'Kubernetes', 'KServe', 'Ray Serve', 'Databricks Model Serving',
  'AWS', 'Azure', 'GCP', 'Terraform', 'Prometheus', 'Grafana',
];

export const faqs = [
  {
    q: 'What is AI inference engineering?',
    a: 'AI inference engineering is the work of running trained AI models in production — fast, reliably and at the lowest possible cost. It covers choosing and optimizing models, the serving engine, GPU infrastructure, autoscaling and monitoring. Training builds the model; inference engineering is what makes it usable and affordable for real users.',
  },
  {
    q: 'Is self-hosting an open-source LLM cheaper than using an API like OpenAI?',
    a: 'Often, at steady production volume — but not always. Self-hosting has fixed GPU costs, while APIs charge per token. The break-even depends on your traffic, model size and latency targets. We model both options on your actual usage during the assessment, so you know before you commit.',
  },
  {
    q: 'How do you reduce GPU costs for LLM inference?',
    a: 'The biggest levers are quantization (running models at lower precision such as INT4 or FP8 with minimal quality loss), continuous batching so each GPU serves many requests at once, KV-cache and prefix caching, choosing the right GPU type for the model, autoscaling to demand, and using spot capacity where it is safe to do so.',
  },
  {
    q: 'Which open models and serving frameworks do you work with?',
    a: 'We work with open-weight families such as Llama, Mistral, Qwen, DeepSeek and Gemma, served with vLLM, SGLang, Hugging Face TGI, NVIDIA Triton and TensorRT-LLM — on Kubernetes (EKS, AKS, GKE), Databricks Model Serving, or your own hardware.',
  },
  {
    q: 'Will our data stay private?',
    a: 'Yes. Self-hosted inference runs entirely inside your own cloud account or data centre. Prompts, outputs and model weights stay within your network boundary, which is one of the main reasons teams choose to self-host.',
  },
  {
    q: 'How long does a typical engagement take?',
    a: 'An assessment and benchmark usually takes two to four weeks. A production deployment of a self-hosted inference platform typically follows in four to eight weeks, depending on scale, security requirements and how many models you serve.',
  },
];
