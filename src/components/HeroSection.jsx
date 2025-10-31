import { useState, useRef, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy-load Spline only when needed (keeps CSP-safe everywhere else)
const LazySpline = lazy(() => import("@splinetool/react-spline"));

export default function HeroSection() {
  const [show3D, setShow3D] = useState(false);
  const ref = useRef(null);

  // Show Spline only when ~200px from viewport
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow3D(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col-reverse xl:flex-row items-center justify-between px-4 lg:px-20 overflow-hidden text-white"
    >
      {/* text block */}
      <div className="z-10 mt-12 xl:mt-0 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="text-4xl sm:text-6xl font-bold leading-tight"
        >
          Building&nbsp;Fast
          <br />
          Reliable&nbsp;Results
        </motion.h1>

        <p className="mt-6 text-lg lg:text-xl text-gray-300">
          I’m a data-driven developer and analyst who blends front-end craft,
          machine-learning know-how, and business insight to ship tools that
          actually move metrics.
        </p>
      </div>

      {/* 3-D stage (lazy, only when in view) */}
      {show3D && (
        <Suspense fallback={<div className="w-[320px] h-[320px]" />}>
          <LazySpline
            scene="https://prod.spline.design/V7UYCIN6FD7eViG1/scene.splinecode"
            className="xl:w-[640px] xl:h-[640px] w-[320px] h-[320px]"
          />
        </Suspense>
      )}

      {/* animated accent orb + logo (always safe) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
        className="relative xl:w-[640px] xl:h-[640px] w-[320px] h-[320px] flex items-center justify-center"
        aria-hidden="true"
      >
        <motion.div
          animate={{ rotate: [0, 6, -4, 0], scale: [1, 1.05, 0.98, 1] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full blur-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(96,231,240,0.5),transparent_65%),radial-gradient(circle_at_70%_70%,rgba(51,94,234,0.45),transparent_60%)]"
        />
        <motion.img
          src="/kv_logo.webp"
          alt="Ken Valenzuela signature logo"
          className="relative w-full h-full object-contain drop-shadow-[0_0_40px_rgba(96,231,240,0.35)]"
          animate={{ y: [0, -12, 0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          fetchPriority="high"
          loading="eager"
        />
      </motion.div>
    </section>
  );
}
