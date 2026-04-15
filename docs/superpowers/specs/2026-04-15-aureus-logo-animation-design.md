# Aureus Nav Logo — Signature Writing Animation

**Date:** 2026-04-15
**Status:** Approved

---

## What we're changing

Replace the current nav logo (gradient circle + "Aureus Global" in Syne bold) with the word **"Aureus"** rendered in Dancing Script (signature style) with a one-time GSAP writing animation on page load.

---

## Visual design

- **Font:** Dancing Script 700 (already loaded in `globals.css`)
- **Colour:** Spectrum gradient `#ff3366 → #ff6b35` (matches existing site accent)
- **Text:** "Aureus" only (drop "Global" from the logo mark)
- **No icon/circle** — the signature wordmark is the entire logo

---

## Animation

Single continuous writing motion — pen never lifts — from A through s.

| Parameter | Value |
|-----------|-------|
| Duration  | 1.8 s |
| Easing    | `power1.inOut` (GSAP) |
| Plays     | Once on mount |

**Three layers in sync, all starting at t=0:**

1. **Stroke sweep** — `stroke-dashoffset` animates from 3000 → 0 on the SVG `<text>`, tracing the letter outlines as continuous ink
2. **Fill reveal** — a `<clipPath>` rect sweeps left→right in sync, revealing the gradient-filled text directly behind the pen tip
3. **Pen tip dot** — a small circle (`r=1.8`) rides the leading edge of the clip rect, disappears on completion

**Completion (after 1.8 s):**
- Pen tip fades out (0.2 s)
- Stroke `strokeWidth` → 0 (0.25 s)
- Fill text remains, fully visible at gradient colour

---

## Implementation

**File:** `components/layout/Nav.tsx` — logo `<Link>` block only. No other changes.

**SVG structure:**
```
<svg width="140" height="44" viewBox="0 0 140 44" overflow="visible">
  <defs>
    <linearGradient id="navPenGrad">   <!-- stroke colour -->
    <linearGradient id="navFillGrad">  <!-- fill colour -->
    <clipPath id="navFillClip">
      <rect id ref via useRef, animated by GSAP />
    </clipPath>
  </defs>

  <!-- Layer 1: stroke trace -->
  <text ref={strokeRef} ... fill="transparent" stroke="url(#navPenGrad)" />

  <!-- Layer 2: gradient fill, revealed by clip -->
  <text ref={fillRef}   ... fill="url(#navFillGrad)" clip-path="url(#navFillClip)" />

  <!-- Layer 3: pen tip dot -->
  <circle ref={tipRef} r="1.8" />
</svg>
```

**GSAP hook:** `useGSAP` from `@gsap/react` (already in `package.json`). Run once on mount with no ScrollTrigger dependency.

**Text width constant:** ~132 SVG units for "Aureus" at font-size 30, font-weight 700, Dancing Script. Confirmed visually in the preview; may need a ±4 px tweak after real render.

**IDs must be unique per-page:** Use stable IDs (`navPenGrad`, `navFillGrad`, `navFillClip`) — Nav renders once so no collision risk.

---

## What does NOT change

- Nav scroll behaviour (hide/show, blur backdrop, rainbow hairline)
- Mobile hamburger menu and drawer
- Desktop nav links and CTA button
- All other pages and components
