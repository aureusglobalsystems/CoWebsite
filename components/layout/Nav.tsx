'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MagneticButton from '@/components/ui/MagneticButton';
import { serviceNav } from '@/lib/services-nav';
import AgsLogo from '@/components/brand/AgsLogo';
import { industryNav as industries } from '@/lib/industries-nav';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/insights', label: 'Insights' },
  { href: '/assessment', label: 'Assessment' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (!mobileOpen) {
        setHidden(y > lastScroll.current && y > 120);
      }
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Logo entrance: the spectrum bar sweeps in under AGS.
  // Home has an intro loader — wait for it; other pages play immediately.
  useGSAP(() => {
    const bar = logoRef.current?.querySelector('.ags-bar');
    if (!bar) return;
    gsap.set(bar, { scaleX: 0 });
    const play = () => gsap.to(bar, { scaleX: 1, duration: 1.1, ease: 'power3.inOut', delay: 0.15 });
    if (document.querySelector('[data-ags-loader]')) {
      window.addEventListener('agsLoaderDone', play, { once: true });
      return () => window.removeEventListener('agsLoaderDone', play);
    }
    play();
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), background 0.4s',
          background: scrolled || mobileOpen ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        }}
      >
        {/* Rainbow hairline */}
        {scrolled && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)',
          }} />
        )}

        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 24px', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link ref={logoRef} href="/" aria-label="Aureus Global Systems — home" style={{ textDecoration: 'none', zIndex: 60, position: 'relative', display: 'block' }}>
            <AgsLogo height={30} withName barClassName="ags-bar" idSuffix="nav" className="nav-logo" />
          </Link>

          {/* Desktop nav links */}
          <div className="nav-desktop-links">
            {links.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              const linkEl = (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: active ? '#ff3366' : '#111',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: '-4px', left: 0, right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, #ff3366, #ff6b35)',
                    }} />
                  )}
                  {link.href === '/services' && <span aria-hidden style={{ marginLeft: '6px', fontSize: '0.5rem' }}>▾</span>}
                </Link>
              );
              if (link.href !== '/services') return linkEl;
              return (
                <div key={link.href} className="nav-dropdown">
                  {linkEl}
                  <div className="nav-dropdown-panel" role="menu">
                    <div className="nav-dropdown-grid">
                      {serviceNav.map((svc) => (
                        <Link key={svc.slug} href={svc.href} role="menuitem" className="nav-dropdown-item" style={{ ['--accent' as string]: svc.accent }}>
                          <span style={{ color: svc.accent, fontSize: '1.1rem', lineHeight: 1 }}>{svc.icon}</span>
                          <span>
                            <span className="nav-dropdown-title">
                              {svc.title}
                              {svc.isNew && <span className="nav-new-pill" style={{ background: svc.accent }}>New</span>}
                            </span>
                            <span className="nav-dropdown-short">{svc.short}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="nav-dropdown-industries">
                      <span className="label">Industries</span>
                      {industries.map((ind) => (
                        <Link key={ind.slug} href={`/industries/${ind.slug}`}>{ind.name}</Link>
                      ))}
                    </div>
                    <div className="nav-dropdown-foot">
                      <Link href="/services">All services overview →</Link>
                      <Link href="/contact?service=Staff%20Augmentation">Hire engineers →</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <MagneticButton
            href="/contact"
            className="nav-desktop-cta"
            style={{
              padding: '10px 20px', borderRadius: '100px',
              background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
              color: 'white', fontFamily: 'Space Mono, monospace',
              fontSize: '0.58rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            Get Started
          </MagneticButton>

          {/* Hamburger button */}
          <button
            className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      <div className={`mobile-nav-drawer${mobileOpen ? ' open' : ''}`}>
        {/* Spectrum dots */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {['#ff3366', '#ff6b35', '#ffd700', '#00d4aa', '#3366ff'].map(c => (
            <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
          ))}
        </div>

        {links.map((link) => (
          <div key={link.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link
              href={link.href}
              className={`mobile-nav-link${pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
            {link.href === '/services' && (
              <div className="mobile-nav-sub">
                {serviceNav.map((svc) => (
                  <Link key={svc.slug} href={svc.href} style={{ color: pathname === svc.href ? svc.accent : undefined }}>
                    <span style={{ color: svc.accent }}>{svc.icon}</span> {svc.title}
                  </Link>
                ))}
                <Link href="/industries" style={{ marginTop: '6px', color: '#999' }}>Industries →</Link>
              </div>
            )}
          </div>
        ))}

        <Link
          href="/contact"
          style={{
            marginTop: '16px',
            padding: '14px 32px', borderRadius: '100px',
            background: 'linear-gradient(135deg, #ff3366, #ff6b35)',
            color: 'white', fontFamily: 'Space Mono, monospace',
            fontSize: '0.6rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', textDecoration: 'none',
          }}
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
