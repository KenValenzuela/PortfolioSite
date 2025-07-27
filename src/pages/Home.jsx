// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      /* full-height hero with simple gradient */
      className="min-h-screen bg-gradient-to-b from-violet-900 to-black flex flex-col xl:flex-row items-center justify-between px-10 lg:px-24 overflow-hidden relative"
    >
      {/* -------------  Intro text ------------- */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
        className="z-20 text-center xl:text-left"
      >
        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-100 leading-tight">
          Turning&nbsp;
          <span className="text-violet-400">data</span>
          &nbsp;into&nbsp;
          <span className="text-violet-400">decisions</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg lg:text-xl text-gray-300 mx-auto xl:mx-0">
          I’m <span className="font-semibold text-gray-100">Ken Valenzuela</span>, a
          full-stack data practitioner pursuing an MS in&nbsp;AI for Business.
          I build end-to-end products—dashboards, ML apps, &amp; immersive
          web experiences—that help real teams act on their data.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
          <Link
            to="/projects"
            className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 font-semibold text-white transition"
          >
            View Projects
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-lg border border-violet-400 hover:bg-violet-800/40 font-semibold text-violet-300 transition"
          >
            Hire&nbsp;Me
          </Link>
        </div>
      </motion.div>

      {/* -------------  Placeholder for 3D model ------------- */}
      {/* Replace the gradient box with your Spline component when ready */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 70 }}
        /* keep the absolute box inside the section so it doesn’t shift your text */
        className="w-full xl:w-1/2 h-96 xl:h-[34rem] bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 rounded-3xl shadow-2xl xl:static absolute bottom-0 -right-20 xl:right-0 xl:translate-x-0 translate-x-1/3 opacity-60 xl:opacity-100"
      />
    </section>
  );
}
