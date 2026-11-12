'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Mounts a heavy 3D scene only after the page has painted and the container
 * is on screen — keeps three.js out of the critical path (Core Web Vitals).
 * Unmounts nothing once shown, to avoid re-creating WebGL contexts.
 */
export default function LazyCanvas({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let idle: number | undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = () => setShow(true);
      // Wait for the browser to be idle so text and layout paint first.
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(start, { timeout: 800 });
      else idle = globalThis.setTimeout(start, 200) as unknown as number;
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (idle !== undefined) {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle);
        clearTimeout(idle);
      }
    };
  }, []);

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, ...style }}>
      {show && <div className="lazy-canvas-in" style={{ position: 'absolute', inset: 0 }}>{children}</div>}
    </div>
  );
}
