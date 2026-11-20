import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aureus Global Systems',
  description: 'How Aureus Global Systems LLP collects, uses, shares and protects personal data, and how to exercise your rights under the DPDP Act 2023.',
  alternates: { canonical: '/privacy' },
};

const EMAIL = 'info@aureusglobalsystems.com';

const sections: LegalSection[] = [
  {
    h: 'Who we are',
    p: [
      'Aureus Global Systems LLP ("AGS", "we", "us") is a limited liability partnership registered in India (LLPIN ACS-4348), with its registered office at A 167, Sun City, Panda, Rao, Mhow, Indore, Madhya Pradesh 453331. We are the data fiduciary for personal data collected through aureusglobalsystems.com (the "site").',
      `For any privacy question or request, write to ${EMAIL} with "Privacy" in the subject line.`,
    ],
  },
  {
    h: 'What we collect',
    list: [
      'Contact and enquiry forms: your name, work email, company, role, the service you are interested in and your message.',
      'Readiness assessment and resource downloads: your answers, score, name and email if you choose to give them.',
      'Talent network (careers page): your name, email, phone, LinkedIn and résumé links, level, specialism, skills, experience, availability, expected rate, location, notes and consent.',
      'How you found us: the referring website, campaign tags (UTM parameters) and first page visited, kept in your browser for the session and sent with a form only when you submit it.',
      'Usage data: pages viewed, device and browser type, approximate location and similar data collected by Google Analytics (through Google Tag Manager) and Vercel Web Analytics.',
    ],
    p: ['We do not ask for government ID numbers, bank details or other sensitive data through the site. Please do not include them in forms.'],
  },
  {
    h: 'Why we use it',
    list: [
      'To reply to enquiries and provide the services you ask about.',
      'To match talent-network members with suitable client projects and contact them about those projects.',
      'To understand how the site is used and improve it.',
      'To keep the site secure, prevent spam and fraud, and meet legal obligations.',
    ],
    p: ['We process personal data on the basis of your consent, which you give when you submit a form, and for the other lawful uses allowed by the Digital Personal Data Protection Act, 2023. We do not sell personal data.'],
  },
  {
    h: 'Who we share it with',
    list: [
      'Service providers that run the site and our tools for us: Vercel (hosting and analytics), Google (Analytics, Tag Manager and Workspace, including Google Sheets), Formspree (form delivery) and our email and calendar providers. They may only use the data to provide their service to us.',
      'Clients: we share a talent-network member’s profile with a client only after that person agrees, for that specific role.',
      'Authorities or advisers, where the law requires it or to protect our legal rights.',
    ],
    p: ['Some of these providers store data outside India. Where they do, we rely on their contractual and security commitments, and we follow any restrictions the Government of India notifies.'],
  },
  {
    h: 'How long we keep it',
    list: [
      'Enquiries: for as long as needed to respond and for up to 3 years for business records, unless a contract requires longer.',
      'Talent-network profiles: until you ask us to delete them, and in any case we delete inactive profiles after 24 months.',
      'Analytics data: according to the retention settings of Google Analytics and Vercel.',
    ],
  },
  {
    h: 'How we protect it',
    p: ['We limit access to personal data to people who need it, use accounts protected by multi-factor authentication, and use providers with recognised security practices. No method of transmission or storage is completely secure, but we take reasonable security safeguards as required by law.'],
  },
  {
    h: 'Your rights',
    p: [`Under the DPDP Act 2023 you can ask us to give you a summary of your personal data, correct, complete or update it, erase it, and withdraw your consent at any time. You can also nominate someone to exercise these rights for you. Write to ${EMAIL}. We may need to confirm your identity first.`,
      'If you are not satisfied with our response, you can complain to the Data Protection Board of India once it accepts complaints.'],
  },
  {
    h: 'Cookies and similar technologies',
    p: ['Google Analytics may set cookies to tell visits apart. Vercel Web Analytics does not use cookies. We keep campaign and referral details in your browser’s session storage, which is cleared when you close the tab. You can block or delete cookies in your browser settings; the site will still work.'],
  },
  {
    h: 'Children',
    p: ['The site and our services are for businesses and professionals. We do not knowingly collect personal data from anyone under 18. If you believe a child has given us data, contact us and we will delete it.'],
  },
  {
    h: 'Changes to this policy',
    p: ['We may update this policy. The date at the top shows when it last changed. Significant changes will be shown on this page.'],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="20 November 2026"
      intro="This policy explains what personal data Aureus Global Systems LLP collects through this website, why, who we share it with and the choices you have."
      sections={sections}
    />
  );
}
