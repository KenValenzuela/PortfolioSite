// src/components/CustomCursor.jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  /* ─── skip on small screens ─── */
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 768px)').matches
  )
    return null;

  const dotRef    = useRef(null);
  const ringRef   = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* initial off-screen position */
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    /* fast dot, slower ring */
    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.15, ease: 'power3.out' });
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.15, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.40, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.40, ease: 'power3.out' });

    const move = ({ clientX, clientY }) => {
      xDot(clientX);  yDot(clientY);
      xRing(clientX); yRing(clientY);
    };

    const press   = () => gsap.to([dot, ring],  { scale: 0.6, duration: 0.2 });
    const release = () => gsap.to([dot, ring],  { scale: 1.0, duration: 0.2 });

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', press);
    window.addEventListener('mouseup',   release);

    /* cleanup on unmount */
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', press);
      window.removeEventListener('mouseup',   release);
    };
  }, []);

  return (
    <>
      {/* main cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[12px] h-[12px] bg-white rounded-full
                   pointer-events-none z-[999] mix-blend-difference"
      />

      {/* outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[32px] h-[32px] border border-white rounded-full
                   pointer-events-none z-[999] mix-blend-difference opacity-60"
      />
    </>
  );
}
