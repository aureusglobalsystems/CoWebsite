'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MagneticButton from '@/components/ui/MagneticButton';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', zIndex: 60, position: 'relative' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff3366, #3366ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>A</span>
            </div>
            <span style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700,
              fontSize: '14px', letterSpacing: '-0.02em', color: '#111',
            }}>
              Aureus Global
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-desktop-links">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
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
                </Link>
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
          <Link
            key={link.href}
            href={link.href}
            className={`mobile-nav-link${pathname === link.href ? ' active' : ''}`}
          >
            {link.label}
          </Link>
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
