import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

export const metadata: Metadata = {
  title: 'Aureus Global Systems — Leading Data & AI Company',
  description:
    "We build the data and AI platforms that power tomorrow's decisions. Databricks, Snowflake, Cloud, Analytics & BI — delivered by experts.",
  keywords: ['data engineering', 'AI', 'artificial intelligence', 'databricks', 'snowflake', 'analytics', 'BI', 'cloud'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ width: '100%', overflowX: 'hidden' }}>
        <LenisProvider>
          <Nav />
          <main style={{ width: '100%', display: 'block' }}>{children}</main>
          <Footer />
          <ScrollToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
