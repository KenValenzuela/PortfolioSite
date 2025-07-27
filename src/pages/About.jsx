// src/pages/About.jsx
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="min-h-screen bg-gray-900 text-gray-200 px-6 lg:px-24 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        About&nbsp;Me
      </motion.h2>

      <div className="max-w-4xl mx-auto leading-relaxed space-y-6 text-lg">
        <p>
          I’m <span className="font-semibold">Ken Valenzuela</span>, a Mesa-based
          data analyst turned full-stack builder currently pursuing an
          <span className="text-violet-300"> MS in Artificial Intelligence for Business</span> at
          Arizona State University. My passion lies in bridging raw data and
          real-world decision-making through intuitive tools—dashboards,
          recommender systems, and interactive web apps.
        </p>

        <p>
          Professionally I’ve audited multi-state retail KPIs, uncovered
          <span className="font-semibold"> $800 k +</span> in vendor credit leakage, and designed
          executive dashboards reviewed by C-Suite leadership. On campus, I’ve
          sharpened my statistical modeling and machine-learning chops while
          TA-ing peers on Python and SQL.
        </p>

        <p>
          Outside of code you’ll find me experimenting with specialty coffee,
          playing in WoW Arena, and reading about the intersection of ethics and
          AI. I’m actively seeking <span className="font-semibold">entry-level data or full-stack
          roles</span> where I can own analytics pipelines and ship customer-facing
          features end-to-end.
        </p>

        <p>
          <span className="text-violet-300">Tech Highlights: </span>
          Python · SQL · React · Streamlit · Supabase · Framer Motion · GSAP ·
          PostgreSQL · OpenAI API
        </p>
      </div>
    </section>
  );
}
