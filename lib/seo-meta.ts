// Search-result titles and descriptions, kept to Google/Bing display limits
// (title ≤ 60 chars, description 120–160 chars). On-page H1s and Open Graph titles can be longer;
// these only control the <title> and <meta name="description"> tags.

export interface SeoMeta {
  title: string;
  description?: string;
}

export const SEO_META: Record<string, SeoMeta> = {
  '/': {
    title: 'Aureus Global Systems — Data & AI Engineering Company',
    description:
      'Data & AI engineering company: Databricks, Snowflake, AI/ML, LLM inference and analytics projects, or senior engineers who join your team.',
  },
  '/about': { title: 'About Aureus Global Systems — Data & AI Engineering' },
  '/services': {
    title: 'Data & AI Engineering Services: Databricks, Snowflake, AI',
    description:
      'Databricks, Snowflake, AI/ML, LLM inference and BI services — delivered as fixed-scope projects or by senior engineers who join your team.',
  },
  '/services/databricks-consulting': { title: 'Databricks Consulting: Lakehouse Builds & Migration' },
  '/services/ai-ml-engineering': { title: 'AI/ML Engineering: RAG, LLM Apps & MLOps | Aureus' },
  '/services/ai-inference-engineering': {
    title: 'AI Inference Engineering: Self-Host LLMs | Aureus',
    description:
      'We self-host open-source LLMs (Llama, Qwen, Mistral) on vLLM and Kubernetes in your cloud, and cut GPU inference costs with quantization and batching.',
  },
  '/services/snowflake-consulting': { title: 'Snowflake Consulting: Migration, dbt & Cost | Aureus' },
  '/services/analytics-bi-consulting': { title: 'Analytics & BI Consulting: Power BI & Tableau' },
  '/services/data-engineering-staff-augmentation': { title: 'Data Engineering Staff Augmentation | Aureus' },
  '/tools/ai-inference-cost-calculator': {
    title: 'AI Inference Cost Calculator: Self-Hosted vs API',
    description:
      'Free calculator: compare LLM API spend with self-hosting an open-source model on your own GPUs. See monthly cost, annual savings and GPUs needed.',
  },
  '/industries': { title: 'Data & AI for Banking, Retail, Healthcare | Aureus' },
  '/industries/banking-financial-services': { title: 'Data Engineering & AI for Banks | Aureus' },
  '/industries/retail-ecommerce': { title: 'Retail Data Analytics & AI Forecasting | Aureus' },
  '/industries/healthcare-life-sciences': { title: 'Healthcare Data Platforms & Analytics | Aureus' },
  '/industries/manufacturing': { title: 'Manufacturing Data Analytics & IoT | Aureus' },
  '/case-studies': { title: 'Data & AI Case Studies: Databricks, Snowflake, ML' },
  '/case-studies/databricks-lakehouse-migration-retail': { title: 'Databricks Lakehouse Migration in 90 Days | Aureus' },
  '/case-studies/snowflake-fintech-500m-transactions': { title: 'Snowflake at 500M Daily Transactions | Aureus' },
  '/case-studies/healthcare-analytics-semantic-layer': { title: 'One Semantic Layer for 120 Hospitals | Aureus' },
  '/case-studies/databricks-iot-streaming-manufacturing': { title: 'Databricks IoT Platform for 10,000 Machines' },
  '/case-studies/snowflake-self-service-analytics-ecommerce': { title: 'Self-Service Snowflake Analytics for 200 Users' },
  '/case-studies/staff-augmentation-insurance-platform': { title: 'Insurance Platform Rebuilt by 3 Senior Engineers' },
  '/case-studies/ml-demand-forecasting-d2c-retail': { title: 'ML Demand Forecasting Recovers $2.4M | Aureus' },
  '/insights': { title: 'Data Engineering, AI & LLM Inference Guides | Aureus' },
  '/insights/migrate-openai-to-open-source-llm-playbook': {
    title: 'OpenAI to Open-Source LLM Migration Playbook',
    description:
      'A 9-step playbook for moving workloads from OpenAI APIs to self-hosted open-source LLMs: pick workloads, build evals, choose a model, serve it, cut over.',
  },
  '/insights/self-hosting-llms-vs-api-cost': { title: 'Self-Hosting LLMs vs API: The Real Cost | Aureus' },
  '/insights/vllm-vs-tensorrt-llm-vs-sglang': { title: 'vLLM vs TensorRT-LLM vs SGLang (2026) | Aureus' },
  '/insights/databricks-vs-snowflake-2026': { title: 'Databricks vs Snowflake in 2026: How to Choose' },
  '/assessment': { title: 'Free Data & AI Readiness Assessment | Aureus' },
  '/careers': {
    title: 'Remote Data Engineer & Databricks Roles | Aureus',
    description:
      'Remote contract roles for data and AI engineers: Databricks on Azure, AWS and GCP, plus Snowflake, BI and AI/ML. Join the AGS consultant network.',
  },
  '/contact': { title: 'Contact Us: Data & AI Projects or Hire Engineers' },
};

/** Trim text to max chars at a word boundary (for generated descriptions). */
export function clip(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:—-]+$/, '') + '…';
}
