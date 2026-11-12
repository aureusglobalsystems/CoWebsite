// /llms.txt — a plain-text summary of the site for AI assistants and answer engines
// (proposed standard: https://llmstxt.org). Generated from the same data as the pages.

import { SITE_URL, SITE_NAME } from '@/lib/site';
import { serviceNav } from '@/lib/services-nav';
import { services } from '@/lib/services';
import { caseStudies } from '@/lib/case-studies';
import { posts } from '@/lib/posts';
import { INFERENCE_ANSWER } from '@/lib/inference-content';

export const dynamic = 'force-static';

export function GET() {
  const svcLines = serviceNav.map((n) => {
    const content = services.find((s) => s.slug === n.slug);
    const answer = content?.answer ?? (n.slug === 'ai-inference-engineering' ? INFERENCE_ANSWER : n.short);
    return `- [${n.title}](${SITE_URL}${n.href}): ${answer}`;
  });

  const body = `# ${SITE_NAME}

> ${SITE_NAME} (AGS) is a data & AI engineering company headquartered in India with global delivery. We design, build and run data platforms, AI/ML applications and LLM inference infrastructure — delivered as end-to-end projects, or by providing senior data, AI and ML engineers who join a client's team (staff augmentation).

Ways to engage: fixed-price projects, managed delivery teams, or resource augmentation (senior engineers embedded in your team, typically 3–12 months).
Contact: info@aureusglobalsystems.com · ${SITE_URL}/contact

## Services
${svcLines.join('\n')}

## Case studies
${caseStudies.map((c) => `- [${c.title}](${SITE_URL}/case-studies/${c.slug}): ${c.tag}, ${c.industry}. ${c.outcomes.slice(0, 2).join('; ')}.`).join('\n')}

## Insights
${posts.map((p) => `- [${p.title}](${SITE_URL}/insights/${p.slug}): ${p.summary}`).join('\n')}

## Company
- [About](${SITE_URL}/about)
- [All services](${SITE_URL}/services)
- [Free data & AI readiness assessment](${SITE_URL}/assessment)
- [Contact / start a project / hire engineers](${SITE_URL}/contact)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
