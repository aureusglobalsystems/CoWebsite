import type { Post } from '@/lib/post-types';

export const openaiToOpenSourcePlaybook: Post = {
  slug: 'migrate-openai-to-open-source-llm-playbook',
  title: 'Migrating from OpenAI APIs to Open-Source LLMs: A Step-by-Step Playbook',
  description:
    'A practical playbook for moving high-volume AI workloads from proprietary APIs to self-hosted open-source LLMs: audit, evaluate, benchmark, serve and roll out safely.',
  date: '2026-11-18',
  readingMinutes: 11,
  service: 'ai-inference-engineering',
  tags: ['LLM migration', 'Open-source LLMs', 'Self-hosting', 'vLLM', 'LLM cost', 'Inference'],
  summary:
    'Moving off a proprietary LLM API saves money only when it is done workload by workload, with an evaluation set built before any model is chosen. ' +
    'This playbook covers the nine steps we follow — from measuring what you spend today to a staged rollout with a fallback to the API — and the mistakes that erase the savings.',
  body: [
    {
      type: 'p',
      text: `Most teams start with a proprietary API, and they are right to. It is the fastest way to prove that an AI feature is worth having. The trouble starts later: the feature works, volume grows, and the per-token invoice becomes one of the larger lines in the cloud bill. At the same time, open-weight models have become good enough that many production tasks no longer need a frontier model at all.`,
    },
    {
      type: 'p',
      text: `The obvious move is to "switch to an open-source model". Done as a single big switch, it usually disappoints: quality drops on edge cases, GPUs sit half idle, and the engineering time quietly cancels the savings. Done as a sequence of measured, reversible steps, it is one of the most reliable cost reductions available to an AI team. This is the sequence.`,
    },
    {
      type: 'callout',
      text: `In short: measure spend per workflow, migrate the high-volume and well-defined tasks first (classification, extraction, routing, templated generation), build an evaluation set from your real traffic before choosing a model, start with the smallest model that passes, serve it quantized with continuous batching, and roll out behind an OpenAI-compatible endpoint with the original API as a fallback.`,
    },

    { type: 'h2', text: 'Step 1 — Measure what you spend, per workflow' },
    {
      type: 'p',
      text: `You cannot decide what to migrate from a single monthly invoice. Tag every API call with the feature or workflow that made it, then collect two to four weeks of data. For each workflow you want:`,
    },
    {
      type: 'ul',
      items: [
        'Requests per day, and how they are spread across the day and week (steady, business hours or bursty).',
        'Average and 95th-percentile input and output tokens per request.',
        'The model and price tier used, and the resulting cost per day.',
        'The latency the product actually needs — real-time for a user waiting, or minutes-to-hours for a background job.',
        'Where the output goes: shown to a user, stored as structured data, or fed into another system.',
      ],
    },
    {
      type: 'p',
      text: `In almost every audit, a small number of workflows account for most of the spend. Those are your migration candidates. Everything else can stay where it is.`,
    },

    { type: 'h2', text: 'Step 2 — Triage: which workloads should move' },
    {
      type: 'p',
      text: `Workloads differ enormously in how well they transfer to smaller open models. A useful rule: the narrower and more checkable the task, the better it migrates.`,
    },
    {
      type: 'table',
      rows: [
        ['Workload', 'Migration fit', 'Typical open model size'],
        ['Classification, tagging, routing, moderation', 'Excellent', '7–8B, often fine-tuned'],
        ['Structured extraction to JSON', 'Excellent', '7–14B with constrained decoding'],
        ['Summarisation and templated content', 'Good', '14–32B'],
        ['RAG answers over your documents', 'Good, needs careful evals', '14–70B'],
        ['Open-ended writing, complex reasoning, multi-step agents', 'Case by case — often stays on the API', '70B+ or frontier API'],
      ],
    },
    {
      type: 'p',
      text: `Combine fit with volume. A high-volume classification job is the ideal first migration: easy to evaluate, cheap to serve and large in savings. A low-volume reasoning task is rarely worth the effort, even if an open model could handle it.`,
    },

    { type: 'h2', text: 'Step 3 — Build the evaluation set before choosing a model' },
    {
      type: 'p',
      text: `This is the step most teams skip, and the one that decides whether the migration succeeds. Before you try a single open model, define what "good enough" means in numbers, on your own data.`,
    },
    {
      type: 'ul',
      items: [
        'Sample 300–1,000 real inputs per workflow from production logs, covering common cases and known hard ones. Remove or mask personal data.',
        'Record your current model\'s outputs as the baseline, and have a person check a subset so you know the baseline\'s own error rate.',
        'Pick metrics that match the task: accuracy or F1 for classification, field-level exact match and JSON validity for extraction, and a rubric scored by people or an LLM judge for generation.',
        'Set the acceptance bar up front — for example "within two points of the current model\'s F1, and 100% valid JSON".',
      ],
    },
    {
      type: 'p',
      text: `With this in place, every later decision — which model, how much quantization, whether to fine-tune — becomes a measurement instead of an opinion.`,
    },

    { type: 'h2', text: 'Step 4 — Shortlist and benchmark open models' },
    {
      type: 'p',
      text: `Start with current instruction-tuned models from the major open-weight families (Llama, Qwen, Mistral, Gemma, DeepSeek and others) and begin at the smallest size that could plausibly work. Run each candidate against your evaluation set with prompts adapted to that model — prompts tuned for one model rarely transfer perfectly to another.`,
    },
    {
      type: 'ul',
      items: [
        'Check the licence of every model for your commercial use and user numbers before you invest in it.',
        'For structured output, use constrained (guided) decoding so the model can only produce valid JSON for your schema. It often closes most of the quality gap on extraction tasks.',
        'Record quality, latency and output length for each model. A model that writes twice as many tokens costs twice as much to serve.',
      ],
    },

    { type: 'h2', text: 'Step 5 — Close quality gaps the cheap way first' },
    {
      type: 'p',
      text: `If the smallest model falls short of the bar, work through the fixes in order of cost: better prompts and a few well-chosen examples; constrained decoding; retrieval of relevant context; and only then fine-tuning. A LoRA fine-tune of a 7–8B model on a few thousand good examples routinely matches a much larger general model on a narrow task, and stays cheap to serve.`,
    },
    {
      type: 'p',
      text: `Training data often comes from your own labelled history. If you plan to use a proprietary model's outputs as training data, check that provider's terms of use first.`,
    },

    { type: 'h2', text: 'Step 6 — Choose the serving stack and hardware' },
    {
      type: 'p',
      text: `How you serve the model decides most of the cost. The same model on the same GPU can differ several-fold in cost per request depending on configuration.`,
    },
    {
      type: 'ul',
      items: [
        'Use a high-throughput inference engine such as vLLM or SGLang. Both provide continuous batching, prefix caching and an OpenAI-compatible API.',
        'Quantize. FP8 or 4-bit weights (AWQ, GPTQ) cut memory and cost substantially; confirm on your evaluation set that quality holds.',
        'Right-size the GPU. A quantized 7–8B model runs well on a single 24 GB card such as an L4 or A10G; 70B models need 80 GB-class GPUs or several smaller ones.',
        'Match capacity to the traffic pattern: steady real-time traffic suits reserved capacity, bursty traffic needs autoscaling, and batch jobs can scale to zero between runs.',
        'Consider a managed open-model endpoint as a middle step. You get most of the price advantage of open models without running GPUs yourself, and can self-host later if volume justifies it.',
      ],
    },
    {
      type: 'link',
      text: 'Want a first estimate before you benchmark? Enter your request volume, token counts and current API prices to see a self-hosted cost and the GPUs you would need.',
      label: 'Try the AI inference cost calculator',
      href: '/tools/ai-inference-cost-calculator',
    },

    { type: 'h2', text: 'Step 7 — Measure cost per request under realistic load' },
    {
      type: 'p',
      text: `Benchmarks on a laptop or a single request tell you nothing about cost. Load-test the serving stack with replayed production traffic at expected peak concurrency and measure sustained throughput, 95th-percentile latency and GPU utilisation. From those numbers, work out the cost per 1,000 requests and compare it with what the API charges today, including engineering and operations time.`,
    },
    {
      type: 'p',
      text: `If the saving does not survive this step, stop here for that workload. A cheaper API tier, shorter prompts or a batch API may be the better answer, and it is far cheaper to learn that now than after a rollout.`,
    },

    { type: 'h2', text: 'Step 8 — Roll out behind a fallback' },
    {
      type: 'p',
      text: `Because vLLM and SGLang expose OpenAI-compatible endpoints, the application change is often little more than a different base URL and model name. That makes a gradual, reversible rollout straightforward:`,
    },
    {
      type: 'ol',
      items: [
        'Shadow mode: send a copy of live traffic to the new model, keep serving the API response, and compare the outputs.',
        'Canary: serve 5–10% of real traffic from the open model and watch quality, latency and error rates.',
        'Ramp up in steps, keeping automatic fallback to the API on timeouts, invalid output or low-confidence results.',
        'Keep the API route for the hard cases. A router that sends the easy 80–90% to the open model and the rest to a frontier model often gives the best balance of cost and quality.',
      ],
    },

    { type: 'h2', text: 'Step 9 — Operate it like a product' },
    {
      type: 'p',
      text: `A self-hosted model is a production system. Monitor throughput, queue depth, latency, GPU utilisation and cost per request, and keep running your evaluation set on a schedule so quality drift is caught early. Plan how you will roll out new model versions and who is on call. These costs are real, which is why they belong in the business case from step 7.`,
    },

    { type: 'h2', text: 'Mistakes that erase the savings' },
    {
      type: 'ul',
      items: [
        'Migrating everything at once instead of the few workflows that hold most of the spend.',
        'Choosing a model from public leaderboards instead of your own evaluation set.',
        'Serving at full precision without batching, leaving expensive GPUs mostly idle.',
        'Sizing for average traffic and missing latency targets at peak — or sizing for peak around the clock and paying for idle GPUs.',
        'Leaving engineering and on-call time out of the cost comparison.',
        'Removing the API fallback before the new path has run cleanly through real traffic.',
      ],
    },

    { type: 'h2', text: 'A realistic timeline' },
    {
      type: 'table',
      rows: [
        ['Phase', 'Typical duration', 'Outcome'],
        ['Audit: usage analysis and triage', '1–2 weeks', 'Spend by workflow, migration shortlist, cost model'],
        ['Pilot: evals, benchmarks, serving', '3–4 weeks', 'One or two workflows running in your cloud, measured quality and cost'],
        ['Production rollout', '2–6 weeks per workflow', 'Shadow, canary and full traffic with fallback'],
      ],
    },
    {
      type: 'p',
      text: `The audit-then-pilot structure matters: it puts a measured number in front of the decision before any large commitment, and it gives you an honest way out if a workload is better left on the API.`,
    },

    { type: 'h2', text: 'How Aureus Global Systems helps' },
    {
      type: 'p',
      text: `We run this process as a fixed-scope engagement: an inference cost audit across your workflows, followed by a pilot that deploys open models in your own cloud with vLLM or SGLang, evaluates them against your current outputs and measures cost per request under load. If the numbers work, we take the workloads to production — or provide inference engineers who join your team to do it with you.`,
    },
  ],
};
