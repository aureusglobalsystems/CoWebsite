'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  radius?: number;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  style,
  onClick,
  href,
  radius = 100,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const hovered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      raf.current = requestAnimationFrame(tick);
    };

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius && hovered.current) {
        target.current.x = dx * strength;
        target.current.y = dy * strength;
      } else {
        target.current.x = 0;
        target.current.y = 0;
      }
    };

    const enter = () => { hovered.current = true; };
    const leave = () => {
      hovered.current = false;
      target.current.x = 0;
      target.current.y = 0;
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
  }, [radius, strength]);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={ref as any}
      href={href}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
      style={{ willChange: 'transform', ...style }}
    >
      {children}
    </Tag>
  );
}
