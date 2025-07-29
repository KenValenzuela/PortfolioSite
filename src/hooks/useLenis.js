// useLenis.js  (replace completely)
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function useLenis() {
  const rafId = useRef(null);   // hold the current frame id

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    // respect motion‑reduction
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.lenis = { scrollTo: (y) => window.scrollTo(0, y), raf: () => {} };
      return;
    }

    // ensure only one live instance
    if (window.lenis) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false
    });
    window.lenis = lenis;

    const loop = (t) => {
      lenis.raf(t);
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current); // *** critical line ***
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
}
