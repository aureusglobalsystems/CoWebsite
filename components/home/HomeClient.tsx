'use client';

import { useState } from 'react';
import Loader from '@/components/home/Loader';
import Hero from '@/components/home/Hero';
import HardTruths from '@/components/home/HardTruths';
import Services from '@/components/home/Services';
import EngageModels from '@/components/home/EngageModels';
import LeadMagnet from '@/components/home/LeadMagnet';
import StickyProcess from '@/components/home/StickyProcess';
import CaseStudies from '@/components/home/CaseStudies';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import HomeFaq, { type HomeInsight } from '@/components/home/HomeFaq';
import Signature from '@/components/home/Signature';

const INTRO_KEY = 'agsIntroSeen';

export default function HomeClient({ insights }: { insights: HomeInsight[] }) {
  const [loaded, setLoaded] = useState(false);

  const finish = () => {
    try { sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* storage blocked — fine */ }
    setLoaded(true);
    window.dispatchEvent(new CustomEvent('agsLoaderDone'));
  };


  return (
    <>
      {!loaded && <Loader onComplete={finish} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}>
        <Hero />
        <HardTruths />
        <Services />
        <EngageModels />
        <LeadMagnet />
        <StickyProcess />
        <CaseStudies />
        <Testimonials />
        <Stats />
        <HomeFaq insights={insights} />
        <Signature />
      </div>
    </>
  );
}
