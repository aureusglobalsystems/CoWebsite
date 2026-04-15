'use client';

import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' },
];

const LABEL: React.CSSProperties = {
  fontFamily: 'Space Mono, monospace',
  fontSize: '0.55rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
};

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#111',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Rainbow hairline */}
      <div style={{
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, #ff3366, #ff6b35, #ffd700, #00d4aa, #3366ff)',
        flexShrink: 0,
      }} />

      {/* Film grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        opacity: 0.12, pointerEvents: 'none', zIndex: 1, mixBlendMode: 'overlay',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '64px 24px',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Main row */}
        <div className="rg-footer">
          {/* Brand */}
          <div>
            <span style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '32px',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #ff3366, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              display: 'block',
              marginBottom: '16px',
            }}>Aureus</span>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.82rem', lineHeight: 1.72, maxWidth: '280px' }}>
              Enterprise data engineering consultancy. We build the data platforms that power tomorrow's decisions.
            </p>
            <p style={{ ...LABEL, color: '#555', marginTop: '12px', display: 'block' }}>India — Global Delivery</p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ ...LABEL, color: '#555', display: 'block', marginBottom: '20px' }}>Navigation</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: '#888',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p style={{ ...LABEL, color: '#555', display: 'block', marginBottom: '20px' }}>Contact</p>
            <a
              href="mailto:info@aureusglobalsystems.com"
              style={{
                fontFamily: 'Inter, sans-serif', color: '#888', fontSize: '0.82rem',
                display: 'block', marginBottom: '16px', textDecoration: 'none',
                transition: 'color 0.2s', wordBreak: 'break-all',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'white')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}
            >
              info@aureusglobalsystems.com
            </a>
            <a
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', border: '1px solid #333', borderRadius: '100px',
                ...LABEL, color: '#888', textDecoration: 'none',
                transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ff3366'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#333'; (e.currentTarget as HTMLElement).style.color = '#888'; }}
            >
              Start a Project
              <span style={{ color: '#ff3366' }}>→</span>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="footer-bottom" style={{
          paddingTop: '24px',
          borderTop: '1px solid #222',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ ...LABEL, color: '#444', fontSize: '0.5rem' }}>Est. 2024</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#ff3366', '#ff6b35', '#ffd700', '#00d4aa', '#3366ff'].map((c) => (
                <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
              ))}
            </div>
            <span style={{ ...LABEL, color: '#444', fontSize: '0.5rem' }}>India Global Delivery</span>
          </div>
          <p style={{ ...LABEL, color: '#444', fontSize: '0.5rem' }}>
            © {new Date().getFullYear()} Aureus Global Systems LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
