// src/pages/Home.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const BLUE = "#60E7F0";
const BLUE_HOVER = "#46C9DB";

/* ─────────────────────────────────────────────────────────
   Lightweight typewriter effect (no external deps)
   ───────────────────────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [direction, setDir]     = useState("fwd"); // fwd | bck
  const [text, setText]         = useState("");

  useEffect(() => {
    const current = words[wordIdx];
    let timer;

    if (direction === "fwd") {
      if (charIdx < current.length) {
        timer = setTimeout(() => {
          setCharIdx(charIdx + 1);
          setText(current.slice(0, charIdx + 1));
        }, speed);
      } else {
        timer = setTimeout(() => setDir("bck"), pause);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setCharIdx(charIdx - 1);
          setText(current.slice(0, charIdx - 1));
        }, speed / 2);
      } else {
        setDir("fwd");
        setWordIdx((wordIdx + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, direction, wordIdx, words, speed, pause]);

  return text;
}

export default function Home() {
  /* controls for looping opacity on video frame */
  const controls = useAnimation();

  /* typewriter headline phrases */
  const headline = useTypewriter([
    "Turning data into decisions",
    "Building fast, reliable results",
    "Delivering insight at scale"
  ]);

  /* subtle pulse on video thumbnail */
  useEffect(() => {
    const loop = async () => {
      while (true) {
        await controls.start({ opacity: 0.3, transition: { duration: 2 } });
        await controls.start({ opacity: 1, transition: { duration: 2 } });
      }
    };
    loop();
  }, [controls]);

  return (
    <main className="overflow-x-hidden font-[Orbitron] bg-gradient-to-b from-black via-[#0a0f1e] to-[#0f172a] text-[#e0f7ff]">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col xl:flex-row items-center justify-between px-10 lg:px-24 pt-20 relative z-20 overflow-hidden">
        {/* headline & cta */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
          className="z-20 text-center xl:text-left"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_0_15px_#60E7F0]">
            <span className="text-[#60E7F0]">{headline}</span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg lg:text-xl text-gray-300 mx-auto xl:mx-0">
            End‑to‑end dashboards, ML apps & immersive web experiences that transform raw data into
            decisive action.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-lg font-semibold text-black transition"
              style={{ backgroundColor: BLUE }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = BLUE_HOVER)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BLUE)}
            >
              View Projects
            </Link>
          </div>
        </motion.div>

        {/* decorative spline */}
        <Spline
          scene="https://prod.spline.design/V7UYCIN6FD7eViG1/scene.splinecode"
          className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0 pointer-events-none select-none z-10"
        />
      </section>

      {/* ─── About Teaser ─────────────────────────────────────── */}
      <section className="relative w-full bg-[#0f172a] py-24 px-6 md:px-20 text-[#e0f7ff] z-30">
        <div className="absolute inset-0 bg-[#0f172a] opacity-95 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#60E7F0] drop-shadow-[0_0_12px_#60E7F0]">
              Behind the Work
            </h2>

            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Hi! My name is Ken, (Yes, just like the Barbie doll) and I'm so happy you're here! This site is an extension of myself to show you how I  blend data science, analytics, product design, and machine
              learning engineering to craft tools that resonate; systems built for clarity, impact,
              and scale.
            </p>

            <Link
              to="/about"
              className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold text-black transition"
              style={{ backgroundColor: BLUE }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = BLUE_HOVER)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BLUE)}
            >
              Learn More →
            </Link>
          </motion.div>

          {/* looping video preview */}
          <motion.div
            animate={controls}
            className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-[0_0_25px_#60E7F0]"
          >
            <video
              src="/ken_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover rounded-xl"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
