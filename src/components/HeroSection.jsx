import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* Lightweight typewriter effect (no external deps) */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [dir, setDir] = useState("fwd"); // fwd | bck
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const cur = words[wordIdx];
    let t;
    if (dir === "fwd") {
      if (charIdx < cur.length) {
        t = setTimeout(() => {
          setCharIdx((v) => v + 1);
          setTxt(cur.slice(0, charIdx + 1));
        }, speed);
      } else {
        t = setTimeout(() => setDir("bck"), pause);
      }
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => {
          setCharIdx((v) => v - 1);
          setTxt(cur.slice(0, charIdx - 1));
        }, speed / 2);
      } else {
        setDir("fwd");
        setWordIdx((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(t);
  }, [charIdx, dir, wordIdx, words, speed, pause]);

  return txt;
}

export default function HeroSection() {
  const headline = useTypewriter(
    [
      "Turning data into decisions",
      "Building fast, reliable results",
      "Delivering insight at scale",
    ],
    80,
    2500
  );

  return (
    <section
      className="
        min-h-screen
        bg-gradient-to-b from-blue-900 to-black
        flex flex-col md:flex-row
        items-center justify-between
        gap-10 md:gap-12
        px-4 lg:px-20 py-16
        overflow-hidden text-white
      "
    >
      {/* Left: Headline + subcopy */}
      <div
        className="
          order-0
          max-w-2xl
          text-center md:text-left
        "
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_0_15px_#60E7F0]"
        >
          <span className="text-[#60E7F0]">{headline}</span>
          <span className="animate-pulse">|</span>
        </motion.h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300">
          I’m a data-driven developer and analyst who blends front-end craft,
          ML know-how, and business insight to ship tools that actually move metrics.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="/projects"
            className="px-6 py-3 rounded-lg font-semibold text-black transition"
            style={{ backgroundColor: "#60E7F0" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#46C9DB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#60E7F0")}
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Right: Logo orb (contained) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="
          order-1
          w-[62vw] sm:w-[420px] md:w-[460px] lg:w-[540px]
          aspect-square
          relative
          flex items-center justify-center
          pointer-events-none select-none opacity-90
          mx-auto md:mx-0
        "
        aria-hidden="true"
      >
        {/* Inner glow only (absolute INSIDE the wrapper; wrapper is in-flow) */}
        <motion.div
          animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.05, 0.98, 1] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          className="
            absolute inset-0 rounded-full blur-3xl
            bg-[radial-gradient(circle_at_30%_20%,rgba(96,231,240,0.5),transparent_65%),radial-gradient(circle_at_70%_70%,rgba(51,94,234,0.45),transparent_60%)]
          "
        />
        <motion.img
          src="/kv_logo.webp"
          alt="Ken Valenzuela logo"
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
