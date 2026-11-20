import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/legal/LegalPage';
import { TRADEMARK_NOTICE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use | Aureus Global Systems',
  description: 'The terms that apply when you use the Aureus Global Systems LLP website, its content, tools and forms.',
  alternates: { canonical: '/terms' },
};

const sections: LegalSection[] = [
  {
    h: 'About these terms',
    p: ['This website is operated by Aureus Global Systems LLP, a limited liability partnership registered in India ("AGS", "we", "us"). By using the site you agree to these terms. If you do not agree, please do not use the site.'],
  },
  {
    h: 'Information only, no offer or advice',
    p: [
      'Content on the site, including articles, case studies, the readiness assessment and the cost calculator, is general information. It is not professional, legal, financial or technical advice for your situation, and it is not an offer to provide services.',
      'Case studies describe representative engagements. Client details are withheld or anonymised, some are composites, and results depend on each client’s circumstances. Past results do not guarantee future results.',
      'Calculator and assessment outputs are estimates based on the inputs you enter and on indicative assumptions. Check them before relying on them.',
      'Any services we provide are governed only by a separate written agreement signed by AGS.',
    ],
  },
  {
    h: 'Careers and talent network',
    p: ['Joining our talent network is not an application for employment or an offer of work. Any engagement is an independent consulting contract, subject to client selection, a signed written agreement and background verification. AGS never charges candidates a fee.'],
  },
  {
    h: 'Intellectual property',
    p: [
      'The site’s text, design, graphics, code and the Aureus and AGS names and logos belong to AGS or its licensors. You may view and share pages for your own non-commercial reference, with attribution. You may not copy, republish or sell site content without our written permission.',
      TRADEMARK_NOTICE,
    ],
  },
  {
    h: 'Acceptable use',
    list: [
      'Do not submit false information or someone else’s personal data without their permission.',
      'Do not attempt to disrupt, overload, scrape at scale or gain unauthorised access to the site or our systems.',
      'Do not use the site for any unlawful purpose.',
    ],
  },
  {
    h: 'Third-party links',
    p: ['The site links to other websites and services, such as LinkedIn and booking tools. We do not control them and are not responsible for their content or practices.'],
  },
  {
    h: 'No warranty',
    p: ['The site is provided "as is" and "as available". To the extent the law allows, we make no warranty that it is accurate, complete, current, uninterrupted or free of errors or harmful components.'],
  },
  {
    h: 'Limitation of liability',
    p: ['To the extent the law allows, AGS is not liable for any indirect, incidental or consequential loss, or for any loss of profit, revenue or data, arising from your use of the site or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.'],
  },
  {
    h: 'Privacy',
    p: ['Our Privacy Policy explains how we handle personal data submitted through the site.'],
  },
  {
    h: 'Changes',
    p: ['We may update the site and these terms at any time. The date at the top shows when the terms last changed.'],
  },
  {
    h: 'Governing law',
    p: ['These terms are governed by the laws of India. The courts at Indore, Madhya Pradesh have exclusive jurisdiction over any dispute arising from them.'],
  },
  {
    h: 'Contact',
    p: ['Questions about these terms: info@aureusglobalsystems.com.'],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="20 November 2026"
      intro="These terms apply when you use aureusglobalsystems.com, including its content, tools and forms."
      sections={sections}
    />
  );
}
