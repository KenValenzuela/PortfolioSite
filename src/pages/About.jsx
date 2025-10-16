// src/pages/About.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const BLUE = "#60E7F0";

export default function About() {
  const [hovered, setHovered] = useState(null);

  const zoom = (key) => ({
    scale: hovered === key ? 1.03 : 1,
    transition: { duration: 0.25 }
  });

  const pics = [

    { src: "/images/cats.webp",      alt: "Two very lazy cats",           key: "cats" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-200 px-6 lg:px-24 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        About&nbsp;Me
      </motion.h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 leading-relaxed space-y-8 text-lg"
        >
          <p>
            Hi, I’m <strong>Ken Valenzuela</strong>. I build data‑driven tools and web apps for small teams that need answers without the enterprise price tag. My toolbox includes Python, SQL, React, Next.js and Supabase. I earned a B.S. in Data Science at Arizona State University and now consult and develop while pursuing a <span style={{ color: BLUE }}>Master’s in AI for Business</span>.
          </p>

          <p>
            Getting an ADHD diagnosis near the end of undergrad pushed me to truly understand my strengths and shortcomings. I've learned that short Pomodoro sprints, spaced‑repetition notes and consistent code drills (And remembering to go for a walk!) keep projects moving and let me ship clean releases on schedule.
          </p>

          <p>
            Recent work:
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <strong>Green Sparrow Tattoo</strong> – multi‑step booking site with Supabase storage, artist queue, rate limiting and embedded analytics.
              </li>
              <li>
                <strong>Toasted Bean Coffee</strong> – Streamlit dashboard that streams Square POS data into PostgreSQL, tracks revenue KPIs, item trends and sends a Monday summary email.
              </li>
              <li>
                <strong>Buds for Brains</strong> – AI Patient Service Representative built in Streamlit that pairs OpenAI embeddings with a FAISS index, offers recommendations paired with a chatbot, and logs user experiences with a journal feature.
              </li>
            </ul>
          </p>

          <p>
            My graduate focus is lightweight, explainable models that fit on modest hardware so owners can trace every prediction back to the numbers that drive it.
          </p>

          <p>
            Off the clock you’ll find me at the gym, grinding World of Warcraft's Solo Shuffle and 3's Arena modes, or trying to reclaim my desk space from my cats, 007 (Left) and Sawdust (Right)
          </p>
        </motion.div>

        {/* images */}
        <div className="md:w-1/2 flex flex-col gap-10">
          {pics.map(({ src, alt, key }) => (
            <motion.img
              key={key}
              src={src}
              alt={alt}
              className="w-full object-contain rounded-lg shadow-lg"
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              animate={zoom(key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
