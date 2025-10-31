import { motion as Motion } from "framer-motion";
import { useId } from "react";

const RING_CONFIGS = [
  {
    size: "88%",
    tilt: 62,
    duration: 46,
    border: "border-cyan-400/30",
    dotColor: "bg-cyan-200",
  },
  {
    size: "68%",
    tilt: 36,
    duration: 34,
    border: "border-sky-300/35",
    dotColor: "bg-sky-200",
  },
  {
    size: "52%",
    tilt: 78,
    duration: 28,
    border: "border-blue-300/30",
    dotColor: "bg-blue-200",
  },
];

const STREAMS = [
  { left: "18%", delay: 0 },
  { left: "34%", delay: 0.8 },
  { left: "50%", delay: 0.4 },
  { left: "66%", delay: 1.1 },
  { left: "78%", delay: 0.2 },
];

const PARTICLES = [
  { top: "16%", left: "24%", delay: 0 },
  { top: "32%", left: "72%", delay: 0.6 },
  { top: "44%", left: "18%", delay: 0.9 },
  { top: "58%", left: "82%", delay: 0.3 },
  { top: "70%", left: "28%", delay: 1.2 },
  { top: "78%", left: "64%", delay: 1.8 },
];

const ARC_PATHS = [
  {
    d: "M 54 156 C 112 92 148 92 202 156",
    delay: 0.4,
    duration: 6.4,
  },
  {
    d: "M 62 176 C 126 122 164 122 196 176",
    delay: 1.2,
    duration: 7.2,
  },
  {
    d: "M 72 196 C 130 148 164 148 184 196",
    delay: 0.9,
    duration: 8,
  },
];

export default function AnimatedDataSphere({ className = "" }) {
  const gradientId = useId();

  return (
    <div
      className={`relative isolate aspect-square overflow-visible ${className}`}
    >
      <div className="absolute inset-[-18%] rounded-full bg-gradient-to-br from-cyan-400/20 via-transparent to-indigo-600/20 blur-3xl" />
      <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-cyan-500/40 via-blue-500/30 to-slate-900/80 opacity-80" />

      <Motion.div
        className="absolute inset-[22%] rounded-full bg-gradient-to-br from-sky-300/30 via-transparent to-transparent"
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [0.92, 1.04, 0.92],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <Motion.div
        className="absolute inset-[30%] rounded-full border border-cyan-200/30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        style={{ rotateX: 48 }}
      />

      {STREAMS.map(({ left, delay }, idx) => (
        <Motion.div
          key={`stream-${idx}`}
          className="absolute top-[18%] bottom-[24%] w-px origin-top bg-gradient-to-b from-cyan-200/40 via-cyan-200/90 to-transparent"
          style={{ left }}
          animate={{ scaleY: [0.6, 1, 0.7], opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 3.6,
            ease: "easeInOut",
            delay,
          }}
        />
      ))}

      {RING_CONFIGS.map((ring, idx) => (
        <Motion.div
          key={`ring-${idx}`}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${ring.border}`}
          style={{ width: ring.size, height: ring.size, rotateX: ring.tilt }}
          animate={{ rotateZ: 360 }}
          transition={{ repeat: Infinity, duration: ring.duration, ease: "linear" }}
        >
          <span
            className={`absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(96,231,240,0.9)] ${ring.dotColor}`}
          />
        </Motion.div>
      ))}

      {PARTICLES.map(({ top, left, delay }, idx) => (
        <Motion.span
          key={`particle-${idx}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-100/90 shadow-[0_0_10px_rgba(94,234,212,0.9)]"
          style={{ top, left }}
          animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3.8, delay, ease: "easeInOut" }}
        />
      ))}

      <Motion.svg
        viewBox="0 0 256 256"
        className="absolute inset-[10%]"
        initial={false}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(165,243,252,0.9)" />
            <stop offset="55%" stopColor="rgba(56,189,248,0.4)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.05)" />
          </radialGradient>
        </defs>

        <circle
          cx="128"
          cy="128"
          r="70"
          fill={`url(#${gradientId})`}
          opacity="0.6"
        />

        {ARC_PATHS.map(({ d, delay, duration }, idx) => (
          <Motion.path
            key={`arc-${idx}`}
            d={d}
            stroke="rgba(125, 211, 252, 0.65)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="220"
            initial={{ strokeDashoffset: 220, opacity: 0 }}
            animate={{ strokeDashoffset: [220, 0], opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 1.6,
              duration,
              ease: "easeInOut",
              delay,
            }}
          />
        ))}
      </Motion.svg>
    </div>
  );
}
