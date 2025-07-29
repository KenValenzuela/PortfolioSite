// src/pages/Projects.jsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BLUE = "#60E7F0";
const BLUE_HOVER = "#46C9DB";
const GITHUB = "https://github.com/KenValenzuela";

/* ───────────── Project Data ───────────── */
const projects = [
  {
    title: "Green Sparrow Tattoo – Booking Platform",
    tech: "Next.js · Supabase · Framer Motion",
    desc: "Responsive site with a multi‑step booking flow, animated UI, and drag‑and‑drop image uploads. Replaced an outdated Wix site and boosted booking requests.",
    live: "https://www.greensparrowtattoocompany.com",
    img: "/images/gstc.webp",
    categories: ["WebDev", "Next.js", "Supabase"],
  },
  {
    title: "Buds for Brains – AI Budtender Assistant",
    tech: "Streamlit · OpenAI · Supabase · FAISS",
    desc: "Semantic‑vector search plus OpenAI embeddings let users explore strains, log experiences, and get personalized recommendations.",
    live: "https://budsforbrains.streamlit.app/",
    img: "/images/budsforbrains.webp",
    categories: ["AI", "Python", "Streamlit"],
  },
  {
    title: "Toasted Bean Coffee – Sales Analytics Dashboard",
    tech: "PostgreSQL · SQL · Streamlit · Plotly",
    desc: "Live dashboard for a mobile coffee truck. Tracks KPIs—revenue, AOV, product trends—to guide weekly ops and promos.",
    live: "#",
    img: "/images/toastedbean.webp",
    categories: ["Dashboard", "SQL", "DataViz"],
  },
];

/* ───────────── Categories ───────────── */
const categories = ["All", ...[...new Set(projects.flatMap(p => p.categories))].sort()];

/* ───────────── Animations ───────────── */
const parent = { show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } },
  exit:   { opacity: 0, y: 30, transition: { duration: 0.25 } },
};

export default function Projects() {
  const [active, setActive] = useState("All");

  const list = useMemo(
    () => (active === "All" ? projects : projects.filter(p => p.categories.includes(active))),
    [active]
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-200 px-6 py-24">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-5">Featured Projects</h2>

      {/* GitHub CTA */}
      <div className="text-center mb-14">
        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 rounded-full font-medium text-black transition"
          style={{ backgroundColor: BLUE }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = BLUE_HOVER)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = BLUE)}
        >
          View GitHub
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-1.5 rounded-full text-sm transition focus:outline-none"
            style={{
              backgroundColor: active === cat ? BLUE : "#374151",
              color:          active === cat ? "#000" : "#e5e7eb",
            }}
            onMouseEnter={e => {
              if (active !== cat) e.currentTarget.style.backgroundColor = "#4b5563";
            }}
            onMouseLeave={e => {
              if (active !== cat) e.currentTarget.style.backgroundColor = "#374151";
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        layout
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
      >
        <AnimatePresence mode="popLayout">
          {list.map(p => (
            <motion.article
              key={p.title}
              variants={item}
              initial="hidden"
              animate="show"
              exit="exit"
              layout
              className="rounded-2xl bg-gray-800 hover:bg-gray-700 transition shadow-lg p-8 flex flex-col"
            >
              {/* Image */}
              <img
                src={p.img}
                alt={`${p.title} screenshot`}
                loading="lazy"
                className="w-full h-48 object-cover rounded-xl mb-6 bg-gray-700"
              />

              {/* Header */}
              <header className="mb-4">
                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <p style={{ color: BLUE }} className="text-sm mt-1">
                  {p.tech}
                </p>
              </header>

              {/* Description */}
              <p className="flex-grow leading-relaxed mb-6">{p.desc}</p>

              {/* Live Link */}
              {p.live !== "#" && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto px-4 py-2 rounded-lg font-medium text-black transition self-start"
                  style={{ backgroundColor: BLUE }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = BLUE_HOVER)}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = BLUE)}
                >
                  Live Site
                </a>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Tech Footer */}
      <p className="mt-20 text-center text-sm">
        <span style={{ color: BLUE }}>Tech Stack:&nbsp;</span>
        Python · SQL · React · Node · Streamlit · Supabase · PostgreSQL ·
        Framer Motion · GSAP · OpenAI API
      </p>
    </section>
  );
}
