'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
}

export default function TiltCard({ children, className = '', style, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const hovered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      el.style.transform = `perspective(800px) rotateX(${pos.current.y}deg) rotateY(${pos.current.x}deg) scale3d(${hovered.current ? 1.02 : 1}, ${hovered.current ? 1.02 : 1}, 1)`;
      raf.current = requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      if (!hovered.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      target.current.x = dx * maxTilt;
      target.current.y = -dy * maxTilt;
    };

    const enter = () => { hovered.current = true; };
    const leave = () => {
      hovered.current = false;
      target.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', move);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', move);
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(raf.current);
    };
  }, [maxTilt]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d', ...style }}
    >
      {children}
    </div>
  );
}
