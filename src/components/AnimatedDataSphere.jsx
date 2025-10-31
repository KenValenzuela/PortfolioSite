import { motion } from "framer-motion";

const ringVariants = {
  animate: (delay = 0) => ({
    rotate: 360,
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 28,
      delay,
    },
  }),
};

const glowVariants = {
  initial: { opacity: 0.45, scale: 0.85 },
  animate: {
    opacity: [0.45, 0.75, 0.45],
    scale: [0.85, 1.05, 0.85],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut",
    },
  },
};

const orbVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 18,
      ease: "linear",
    },
  },
};

export default function AnimatedDataSphere({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* blurred glow */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 rounded-full bg-cyan-400/30 blur-3xl"
      />

      {/* core sphere */}
      <div className="relative z-10 h-full w-full max-w-[22rem] max-h-[22rem] aspect-square">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 via-blue-500/40 to-indigo-600/30 backdrop-blur" />
        <div className="absolute inset-[14%] rounded-full border border-cyan-300/30" />

        {/* orbiting rings */}
        {[0, 0.6, 1.2].map((delay, idx) => (
          <motion.div
            key={idx}
            custom={delay}
            variants={ringVariants}
            animate="animate"
            className="absolute inset-0 rounded-full border border-cyan-400/20"
            style={{ transformOrigin: "center" }}
          >
            <div
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(96,231,240,0.8)]"
            />
          </motion.div>
        ))}

        {/* drifting data points */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const start = (idx / 8) * 360;
          const duration = 8 + (idx % 3) * 2;
          return (
            <motion.span
              key={idx}
              className="absolute h-1.5 w-1.5 rounded-full bg-cyan-100/80"
              style={{
                top: `${15 + (idx % 4) * 18}%`,
                left: `${12 + ((idx * 3) % 5) * 18}%`,
                boxShadow: "0 0 10px rgba(96,231,240,0.8)",
              }}
              animate={{ rotate: [start, start + 360] }}
              transition={{ repeat: Infinity, ease: "linear", duration }}
              whileHover={{ scale: 1.6 }}
            />
          );
        })}

        {/* slow parallax arcs */}
        <motion.div
          variants={orbVariants}
          animate="animate"
          className="absolute inset-[26%] rounded-full border border-cyan-200/20"
        />
      </div>
    </div>
  );
}