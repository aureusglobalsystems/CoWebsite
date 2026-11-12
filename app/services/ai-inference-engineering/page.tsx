import type { Metadata } from 'next';
import InferencePage from '@/components/inference/InferencePage';
import { faqs, offerings, INFERENCE_PATH, INFERENCE_ANSWER } from '@/lib/inference-content';
import { posts } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

const title = 'AI Inference Engineering Services — Self-Host LLMs, Cut GPU Costs';
const description =
  'AI inference engineering consultancy. We self-host open-source LLMs (Llama, Mistral, Qwen, DeepSeek) on vLLM, TensorRT-LLM and Kubernetes in your cloud, and cut GPU inference costs with quantization, batching and autoscaling.';

export const metadata: Metadata = {
  title: `${title} | Aureus`,
  description,
  keywords: [
    'AI inference engineering', 'inference engineering services', 'LLM inference optimization',
    'self-host open source LLM', 'self-hosted LLM consulting', 'reduce GPU inference costs',
    'LLM serving', 'vLLM consulting', 'TensorRT-LLM', 'model serving', 'GPU cost optimization',
    'private LLM deployment',
  ],
  alternates: { canonical: INFERENCE_PATH },
  openGraph: {
    title,
    description,
    url: INFERENCE_PATH,
    siteName: 'Aureus Global Systems',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'AI Inference Engineering',
      serviceType: 'AI Inference Engineering',
      url: `${SITE_URL}${INFERENCE_PATH}`,
      description: INFERENCE_ANSWER,
      areaServed: 'Worldwide',
      provider: { '@id': `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Inference Engineering Services',
        itemListElement: offerings.map((o) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: o.title, description: o.body },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: 'AI Inference Engineering', item: `${SITE_URL}${INFERENCE_PATH}` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <InferencePage insights={posts.filter((p) => p.service === 'ai-inference-engineering').map(({ slug, title, summary, readingMinutes }) => ({ slug, title, summary, readingMinutes }))} />
    </>
  );
}
