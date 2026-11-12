'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

/**
 * Phone-only bar pinned to the bottom of the screen once the visitor scrolls
 * past the first screen, so "Start a project" is always one tap away.
 * Hidden on the contact page (they're already there).
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y > document.documentElement.scrollHeight - 160;
      setShow(y > window.innerHeight * 0.6 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [pathname]);

  if (pathname.startsWith('/contact')) return null;

  return (
    <div className={`mobile-cta-bar${show ? ' show' : ''}`} aria-hidden={!show}>
      <Link href="/contact" tabIndex={show ? 0 : -1} className="mobile-cta-primary"
        onClick={() => trackEvent('cta_click', { location: 'mobile_bar', page: pathname })}>
        Start a project →
      </Link>
      <Link href="/contact?service=Staff%20Augmentation" tabIndex={show ? 0 : -1} className="mobile-cta-secondary"
        onClick={() => trackEvent('hire_engineers_click', { location: 'mobile_bar', page: pathname })}>
        Hire engineers
      </Link>
    </div>
  );
}
