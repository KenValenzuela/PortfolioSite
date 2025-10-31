// src/pages/Home.jsx
"use client";

import { useEffect } from "react";
import { motion as Motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const BLUE = "#60E7F0";
const BLUE_HOVER = "#46C9DB";

export default function Home() {
  const controls = useAnimation();

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
      <HeroSection />

      <section className="relative z-30 w-full bg-[#0f172a] py-24 px-6 sm:px-12 md:px-20 text-[#e0f7ff]">
        <div className="absolute inset-0 bg-[#0f172a] opacity-95" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          <Motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-extrabold text-[#60E7F0] drop-shadow-[0_0_12px_#60E7F0] sm:text-4xl lg:text-5xl">
              Behind the Work
            </h2>

            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Hi, I’m Ken. I blend data science, product design and ML engineering to build tools that deliver clear, measurable
              impact.
            </p>

            <Link
              to="/about"
              className="inline-block rounded-lg px-6 py-3 font-semibold text-black transition"
              style={{ backgroundColor: BLUE }}
              onMouseEnter={(event) => (event.currentTarget.style.backgroundColor = BLUE_HOVER)}
              onMouseLeave={(event) => (event.currentTarget.style.backgroundColor = BLUE)}
            >
              Learn More →
            </Link>
          </Motion.div>

          <Motion.div
            animate={controls}
            className="mx-auto w-full max-w-md overflow-hidden rounded-xl shadow-[0_0_25px_#60E7F0]"
          >
            <video
              src="/ken_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-auto w-full rounded-xl object-cover"
            />
          </Motion.div>
        </div>
      </section>
    </main>
  );
}
