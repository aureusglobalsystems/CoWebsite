'use client';

import { useState } from 'react';
import Loader from '@/components/home/Loader';
import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import HardTruths from '@/components/home/HardTruths';
import Services from '@/components/home/Services';
import LeadMagnet from '@/components/home/LeadMagnet';
import StickyProcess from '@/components/home/StickyProcess';
import CaseStudies from '@/components/home/CaseStudies';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import Signature from '@/components/home/Signature';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => { setLoaded(true); window.dispatchEvent(new CustomEvent('agsLoaderDone')); }} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}>
        <Hero />
        <Marquee />
        <HardTruths />
        <Services />
        <LeadMagnet />
        <StickyProcess />
        <CaseStudies />
        <Testimonials />
        <Stats />
        <Signature />
      </div>
    </>
  );
}
