'use client';

import { useEffect, useRef, useState } from 'react';

export interface MotionState {
  scrollProgress: number;
  cursorX: number;
  cursorY: number;
  isVisible: boolean;
}

export function useMotionState(elementRef: React.RefObject<HTMLElement | null>) {
  const [state, setState] = useState<MotionState>({
    scrollProgress: 0,
    cursorX: 0,
    cursorY: 0,
    isVisible: false,
  });

  const rafRef = useRef<number>(0);
  const targetRef = useRef({ scrollProgress: 0, cursorX: 0, cursorY: 0 });
  const currentRef = useRef({ scrollProgress: 0, cursorX: 0, cursorY: 0 });

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // IntersectionObserver for visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState((prev) => ({ ...prev, isVisible: entry.isIntersecting }));
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    // Cursor tracking
    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.cursorX = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.cursorY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Scroll tracking
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.bottom / (windowH + rect.height)));
      targetRef.current.scrollProgress = progress;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // LERP animation loop
    const animate = () => {
      const t = currentRef.current;
      const g = targetRef.current;
      t.scrollProgress += (g.scrollProgress - t.scrollProgress) * 0.1;
      t.cursorX += (g.cursorX - t.cursorX) * 0.1;
      t.cursorY += (g.cursorY - t.cursorY) * 0.1;

      // Apply CSS custom properties
      el.style.setProperty('--motion-progress', String(t.scrollProgress));
      el.style.setProperty('--cursor-x', String(t.cursorX));
      el.style.setProperty('--cursor-y', String(t.cursorY));

      setState((prev) => ({
        ...prev,
        scrollProgress: t.scrollProgress,
        cursorX: t.cursorX,
        cursorY: t.cursorY,
      }));

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [elementRef]);

  return state;
}
