'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip, SplitText);
}

export { gsap, ScrollTrigger, Flip, SplitText };
