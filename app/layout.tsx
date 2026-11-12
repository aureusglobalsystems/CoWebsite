import type { Metadata, Viewport } from 'next';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import MobileCtaBar from '@/components/layout/MobileCtaBar';
import { GoogleTagHead, GoogleTagBody } from '@/components/Analytics';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME, GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION } from '@/lib/site';
import { serviceNav } from '@/lib/services-nav';

const description =
  'Aureus Global Systems is a data & AI engineering company. We deliver Databricks, Snowflake, AI/ML, LLM inference and analytics projects — or provide senior engineers to join your team.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Aureus Global Systems — Data & AI Engineering Company | Databricks, Snowflake, AI',
  description,
  applicationName: SITE_NAME,
  keywords: [
    'data and AI company', 'data engineering company', 'AI engineering services', 'data engineering consulting',
    'Databricks consulting', 'Snowflake consulting', 'AI inference engineering', 'LLM development',
    'MLOps', 'Power BI consulting', 'hire data engineers', 'data engineering staff augmentation India',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', siteName: SITE_NAME, url: '/', locale: 'en_US',
    title: 'Aureus Global Systems — Data & AI Engineering Company',
    description,
  },
  twitter: { card: 'summary_large_image', title: 'Aureus Global Systems — Data & AI Engineering Company', description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
  verification: {
    ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
    ...(BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': BING_SITE_VERIFICATION } } : {}),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

// Sitewide entity data — tells search engines and AI assistants who we are and what we do.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['Aureus', 'AGS', 'Aureus Global Systems LLP'],
      url: SITE_URL,
      logo: `${SITE_URL}/brand/ags-icon.svg`,
      image: `${SITE_URL}/brand/ags-mark.svg`,
      email: 'info@aureusglobalsystems.com',
      description,
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      areaServed: 'Worldwide',
      sameAs: ['https://www.linkedin.com/company/aureusglobalsystemsllp/'],
      knowsAbout: [
        'Data engineering', 'Artificial intelligence', 'Machine learning', 'Large language models', 'LLM inference',
        'Retrieval-augmented generation', 'MLOps', 'Databricks', 'Snowflake', 'Delta Lake', 'Apache Spark', 'dbt',
        'Power BI', 'Tableau', 'Data governance', 'Cloud data platforms', 'GPU cost optimization', 'vLLM',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Data & AI engineering services',
        itemListElement: serviceNav.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.short, url: `${SITE_URL}${s.href}` },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagHead />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={orgJsonLd} />
      </head>
      <body style={{ width: '100%', overflowX: 'hidden' }}>
        <GoogleTagBody />
        <LenisProvider>
          <Nav />
          <main style={{ width: '100%', display: 'block' }}>{children}</main>
          <Footer />
          <ScrollToTop />
          <MobileCtaBar />
        </LenisProvider>
      </body>
    </html>
  );
}
