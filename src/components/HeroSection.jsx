import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import AnimatedDataSphere from "./AnimatedDataSphere";

const HERO_PHRASES = [
  "Turning data into decisions",
  "Building fast, reliable results",
  "Delivering insight at scale",
];

const HIGHLIGHTS = [
  { metric: "18+", label: "Dashboards launched" },
  { metric: "300ms", label: "Avg. interaction latency" },
  { metric: "12", label: "Experiments shipped" },
];

function useTypewriter(words, speed = 80, pause = 2200) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [text, setText] = useState("");

  useEffect(() => {
    const current = words[wordIdx];
    let timer;

    if (direction === "forward") {
      if (charIdx < current.length) {
        timer = setTimeout(() => {
          setCharIdx(charIdx + 1);
          setText(current.slice(0, charIdx + 1));
        }, speed);
      } else {
        timer = setTimeout(() => setDirection("backward"), pause);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setCharIdx(charIdx - 1);
          setText(current.slice(0, charIdx - 1));
        }, speed / 2);
      } else {
        setDirection("forward");
        setWordIdx((wordIdx + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, direction, pause, speed, wordIdx, words]);

  return text;
}

export default function HeroSection() {
  const [showGraphic, setShowGraphic] = useState(false);
  const sectionRef = useRef(null);
  const headline = useTypewriter(HERO_PHRASES);

  const highlightItems = useMemo(
    () =>
      HIGHLIGHTS.map((item, idx) => (
        <Motion.li
          key={item.metric}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + idx * 0.12, type: "spring", stiffness: 80, damping: 14 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base backdrop-blur"
        >
          <span className="block text-lg font-semibold text-cyan-300 sm:text-xl">
            {item.metric}
          </span>
          <span className="mt-1 block text-slate-300/80">{item.label}</span>
        </Motion.li>
      )),
    []
  );

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowGraphic(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#01030a] via-[#050e1f] to-[#020617] px-6 pt-28 pb-20 sm:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] bg-[radial-gradient(circle_at_20%_50%,rgba(14,165,233,0.18),transparent_65%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 lg:flex-row lg:items-start">
        <div className="w-full max-w-xl text-center lg:text-left">
          <Motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200"
          >
            Data Experience Engineer
          </Motion.span>

          <Motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 70, damping: 16 }}
            className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="text-cyan-300">{headline}</span>
            <span className="animate-pulse text-cyan-200">_</span>
          </Motion.h1>

          <Motion.p
            className="mt-6 text-base text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          >
            I design and build immersive data experiences— performant dashboards, realtime analytics, and machine-learning powered
            interfaces that keep teams moving.
          </Motion.p>

          <Motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-black shadow-[0_8px_24px_rgba(34,211,238,0.35)] transition hover:bg-cyan-300"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-cyan-300/40 px-6 py-3 font-semibold text-cyan-200 transition hover:border-cyan-200 hover:text-cyan-100"
            >
              Book a Call
            </Link>
          </Motion.div>

          <Motion.ul className="mt-12 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            {highlightItems}
          </Motion.ul>
        </div>

        <div className="relative flex w-full max-w-[28rem] justify-center lg:max-w-none lg:flex-1">
          {showGraphic ? (
            <AnimatedDataSphere className="w-full max-w-[28rem]" />
          ) : (
            <div className="h-[22rem] w-[22rem] rounded-full border border-cyan-200/20" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
