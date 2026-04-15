'use client';

import { useEffect, useRef } from 'react';

export function useMagneticCursor(radius = 100, strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isHovered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;
      el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovered.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        targetRef.current.x = dx * strength;
        targetRef.current.y = dy * strength;
      }
    };

    const onMouseEnter = () => {
      isHovered.current = true;
    };

    const onMouseLeave = () => {
      isHovered.current = false;
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [radius, strength]);

  return ref;
}
