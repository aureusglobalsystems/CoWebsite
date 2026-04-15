# Aureus Signature Logo Animation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the gradient-circle + text logo with a Dancing Script "Aureus" wordmark that writes itself with a continuous GSAP animation on mount, in both Nav and Footer.

**Architecture:** Two `<svg>` layers (stroke trace + clipped fill) animate in perfect sync via a single GSAP timeline. Footer uses the same font/gradient but is purely static — no animation.

**Tech Stack:** Next.js 16, React 19, GSAP 3 + `@gsap/react`, Dancing Script (already loaded in `globals.css`)

---

## Files

| File | Change |
|------|--------|
| `components/layout/Nav.tsx` | Replace logo block (lines 79–94) with animated SVG; add `useGSAP` + `gsap` imports and four refs |
| `components/layout/Footer.tsx` | Replace logo block (lines 55–65) with static Dancing Script gradient span |

No new files. No CSS changes (Dancing Script already imported).

---

## Task 1 — Animated logo in Nav.tsx

**Files:**
- Modify: `components/layout/Nav.tsx`

- [ ] **Step 1: Add imports**

At the top of `components/layout/Nav.tsx`, add after the existing `import { useEffect, useRef, useState }` line:

```tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
```

- [ ] **Step 2: Add four refs inside the Nav component**

Inside `export default function Nav()`, after the existing `const lastScroll = useRef(0);` line, add:

```tsx
const strokeRef   = useRef<SVGTextElement>(null);
const fillRef     = useRef<SVGTextElement>(null);
const fillRectRef = useRef<SVGRectElement>(null);
const tipRef      = useRef<SVGCircleElement>(null);
```

- [ ] **Step 3: Add the GSAP animation hook**

After the last `useEffect` block (the body-scroll lock one, ending around line 45), add:

```tsx
useGSAP(() => {
  const stroke   = strokeRef.current;
  const fill     = fillRef.current;
  const fillRect = fillRectRef.current;
  const tip      = tipRef.current;
  if (!stroke || !fill || !fillRect || !tip) return;

  const FULL_W = 132; // advance width of "Aureus" at Dancing Script 700 30px
  const DASH   = 3000; // safely larger than any letter-outline perimeter

  // Initial state
  gsap.set(stroke,   { strokeDasharray: DASH, strokeDashoffset: DASH, strokeWidth: 1.2 });
  gsap.set(fillRect, { attr: { width: 0 } });
  gsap.set(tip,      { attr: { cx: 4 }, opacity: 1 });

  const tl = gsap.timeline();

  // All three layers start at t=0 and run in perfect sync
  tl.fromTo(stroke,
    { strokeDashoffset: DASH },
    { strokeDashoffset: 0, duration: 1.8, ease: 'power1.inOut' },
    0
  );
  tl.fromTo(tip,
    { attr: { cx: 4 } },
    { attr: { cx: 4 + FULL_W }, duration: 1.8, ease: 'power1.inOut' },
    0
  );
  tl.fromTo(fillRect,
    { attr: { width: 0 } },
    { attr: { width: FULL_W + 6 }, duration: 1.8, ease: 'power1.inOut' },
    0
  );

  // Completion: pen tip disappears, stroke fades out
  tl.to(tip,    { opacity: 0, duration: 0.2, ease: 'power2.out' });
  tl.to(stroke, { strokeWidth: 0, duration: 0.25, ease: 'power2.out' }, '<');
}, []);
```

- [ ] **Step 4: Replace the logo JSX**

Find this block in the `return` (around line 79–94):

```tsx
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
```

Replace it with:

```tsx
<Link href="/" style={{ textDecoration: 'none', zIndex: 60, position: 'relative', display: 'block' }}>
  <svg
    width="140" height="44" viewBox="0 0 140 44"
    style={{ overflow: 'visible', display: 'block' }}
    aria-label="Aureus"
  >
    <defs>
      <linearGradient id="navPenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff3366" />
        <stop offset="100%" stopColor="#ff6b35" />
      </linearGradient>
      <linearGradient id="navFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff3366" />
        <stop offset="100%" stopColor="#ff6b35" />
      </linearGradient>
      <clipPath id="navFillClip">
        <rect ref={fillRectRef} x="-2" y="0" width="0" height="44" />
      </clipPath>
    </defs>

    {/* Layer 1 — stroke trace (pen drawing the letters) */}
    <text
      ref={strokeRef}
      x="4" y="36"
      fontFamily="'Dancing Script', cursive"
      fontSize="30"
      fontWeight="700"
      fill="transparent"
      stroke="url(#navPenGrad)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >Aureus</text>

    {/* Layer 2 — gradient fill revealed by sweeping clip rect */}
    <text
      ref={fillRef}
      x="4" y="36"
      fontFamily="'Dancing Script', cursive"
      fontSize="30"
      fontWeight="700"
      fill="url(#navFillGrad)"
      clipPath="url(#navFillClip)"
    >Aureus</text>

    {/* Pen tip dot — rides the leading edge */}
    <circle ref={tipRef} r="1.8" cx="4" cy="26" fill="#ff3366" opacity="0" />
  </svg>
</Link>
```

- [ ] **Step 5: Verify the page loads and animation plays**

```bash
cd "/Users/tanishkchaturvedi/Desktop/Tanishk Chaturvedi/WORK/PERSONAL/AGS_WEBSITE/CoWebsite"
npm run dev
```

Open http://localhost:3000. Expected:
- "Aureus" in Dancing Script traces its stroke from left to right over 1.8 s
- Gradient fill appears behind the stroke as the pen tip moves
- Pen tip dot disappears; final state is a clean gradient "Aureus" signature

- [ ] **Step 6: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "feat: replace nav logo with animated Dancing Script signature"
```

---

## Task 2 — Static logo in Footer.tsx

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Replace the footer logo block**

Find this block in `Footer.tsx` (around lines 55–65):

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
  <div style={{
    width: '32px', height: '32px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff3366, #3366ff)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <span style={{ color: 'white', fontSize: '12px', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>A</span>
  </div>
  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.02em' }}>
    Aureus Global Systems
  </span>
</div>
```

Replace with:

```tsx
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
```

- [ ] **Step 2: Verify footer renders correctly**

With the dev server still running, scroll to the bottom of http://localhost:3000. Expected:
- "Aureus" in Dancing Script with pink→orange gradient on the dark footer background
- No layout breakage in the brand column below (description text and "India — Global Delivery" label still present)

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: replace footer logo with Dancing Script signature wordmark"
```

---

## Self-Review

- Spec coverage: animation (1.8s, power1.inOut, three layers) ✓ — footer static logo ✓ — "Aureus" only (no "Global") ✓ — gradient #ff3366→#ff6b35 ✓
- No placeholders or TBDs
- `fillRectRef` typed as `SVGRectElement`, `strokeRef`/`fillRef` as `SVGTextElement`, `tipRef` as `SVGCircleElement` — consistent throughout
- IDs `navPenGrad`, `navFillGrad`, `navFillClip` are stable and unique (Nav is a singleton)
