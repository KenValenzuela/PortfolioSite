// src/pages/Projects.jsx
import { motion } from "framer-motion";

const projects = [
  {
    title: "Buds for Brains – AI Bud-tender",
    tech: "Streamlit · OpenAI · Supabase · FAISS",
    desc: "Semantic-vector recommender that educates users on terpene profiles and logs personal strain experiences.",
    code: "https://github.com/KenValenzuela/buds-for-brains",
    live: "#", // replace with production link if deployed
  },
  {
    title: "Toasted Bean Coffee – KPI Dashboard",
    tech: "PostgreSQL · SQL · Streamlit · Plotly",
    desc: "Multi-page dashboard analyzing Square POS data to drive weekly menu, inventory, and promo decisions.",
    code: "https://github.com/KenValenzuela/toasted-bean-dashboard",
    live: "#",
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-black text-gray-200 px-6 py-24">
      <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 70, damping: 12, delay: i * 0.15 }}
            className="rounded-2xl bg-gray-800 hover:bg-gray-700 transition shadow-lg p-8 flex flex-col"
          >
            {/* title + tech */}
            <header>
              <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-violet-300 mb-4">{p.tech}</p>
            </header>

            <p className="flex-grow leading-relaxed mb-6">{p.desc}</p>

            <div className="mt-auto flex gap-4">
              {p.live !== "#" && (
                <a
                  href={p.live}
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 font-medium"
                >
                  Live Demo
                </a>
              )}
              <a
                href={p.code}
                className="px-4 py-2 rounded-lg border border-violet-400 hover:bg-violet-800/40 font-medium"
              >
                GitHub
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
