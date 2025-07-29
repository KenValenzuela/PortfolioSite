import { useState, useRef, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
const LazySpline = lazy(() => import("@splinetool/react-spline"));   // 60 kB defers until visible

export default function HeroSection() {
  const [show3D, setShow3D] = useState(false);
  const ref = useRef(null);

  // ——— show Spline only when hero is ~200 px from viewport ———
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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
      className="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col-reverse xl:flex-row items-center justify-between px-4 lg:px-20 overflow-hidden"
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
          Building&nbsp;Fast<br />Reliable&nbsp;Results
        </motion.h1>

        <p className="mt-6 text-lg lg:text-xl text-gray-300">
          I’m a data‑driven developer and analyst who blends front‑end craft,
          machine‑learning know‑how, and business insight to ship tools that
          actually move metrics.
        </p>
      </div>

      {/* 3‑D stage (lazy) */}
      {show3D && (
        <Suspense fallback={<div className="w-[320px] h-[320px]" />}>
          <LazySpline
            scene="https://prod.spline.design/V7UYCIN6FD7eViG1/scene.splinecode"
            className="xl:w-[640px] xl:h-[640px] w-[320px] h-[320px]"
          />
        </Suspense>
      )}
    </section>
  );
}
