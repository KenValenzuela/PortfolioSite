"use client";

import { motion } from "framer-motion";

const BLUE = "#60E7F0";

const PROJECTS = [
  {
    title: "Buds for Brains",
    summary:
      "I built this after seeing customers overwhelmed at the counter and later noticing how manual the industry’s data flows are. It’s a personalized cannabis assistant that combines education, journaling, and retrieval to help people find what actually works for them.",
    workflow: [
      "Observed recurring patient questions in-store (focus, sleep, different effects), then mapped them to terpene profiles, forms, and tolerances.",
      "Moved to a corporate analyst role and documented data gaps; designed a pipeline that links product chemistry with user-reported outcomes.",
      "Implemented a RAG chat assistant that cites sources, a guided survey for preferences/effects, an explorer for terpene/effect filters, and a journal for feedback loops.",
      "Added predictive modeling (XGBoost) to impute missing terpene fields; wired FAISS embeddings to support fast semantic lookups.",
      "Shipped auth and storage with Supabase; built the UI in Streamlit to iterate quickly with real users.",
    ],
    lessons: [
      "Education first wins trust: transparent citations and simple explanations beat black-box answers.",
      "Cold-start is solved by good defaults and a short survey; personalization improves rapidly once journaling starts.",
      "Tight context beats bigger models for reliability; retrieval quality (chunking, metadata) matters most.",
    ],
    ongoing: [
      "Refining prompt/metadata schemas to reduce hallucinations and improve per-user recall.",
      "Expanding evaluator sets for model updates and stress-testing on new product catalogs.",
      "Exploring offline-friendly journaling and opt-in data donation for community insights.",
    ],
  },
  {
    title: "Green Sparrow Tattoo",
    summary:
      "Helping friends run a smoother studio with a booking system and informational site. Goal: less back-and-forth, clearer intake, and easier day-to-day operations for artists and clients.",
    workflow: [
      "Mapped the studio’s intake and scheduling pain points (custom briefs, flash drops, walk-ins) into clean Supabase tables.",
      "Built a Next.js site that handles booking requests, artist availability windows, and client-facing info in one place.",
      "Added email/SMS confirmations and basic status updates to reduce DMs; kept routes minimal so the blog can live-document changes.",
      "Outlined artist-centric controls (pause bookings, set flash events, upload sketches) to keep flexibility in their hands.",
    ],
    lessons: [
      "Studios value operational flexibility over visual flourishes; give artists control and clear state over slick effects.",
      "A visible event log (who approved what, when) defuses weekend confusion and prevents rework.",
    ],
    ongoing: [
      "Lightweight artist portal for uploads and revision threads to retire Instagram DMs.",
      "Cash-flow snapshots (deposits vs. supplies) and simple reports to guide staffing and promo days.",
    ],
  },
  {
    title: "Toasted Bean Coffee",
    summary:
      "For my friends’ mobile coffee truck, I’m building better dashboards from Square POS to focus on sales, people, and hotspots. The objective is daily decisions, not just pretty charts.",
    workflow: [
      "Modeled POS exports (Square) for Tableau so we can track revenue, AOV, item mix, modifiers, and repeat customers.",
      "Designed location/event tagging to attribute sales to pop-ups, markets, and recurring bookings without changing the POS.",
      "Published Tableau views: sales by day and hour, staffable demand windows, item trends, and location profitability.",
      "Drafted hotspot logic that combines sales density with time-of-day and simple weather overlays for scheduling.",
    ],
    lessons: [
      "Adoption happens when every view answers a daily question (where to park, how to staff, what to prep).",
      "Trust beats latency: explain filters, publish versioned SQL, and show how each metric is calculated.",
    ],
    ongoing: [
      "Add cohort views (time-to-repeat, churn risk) and inventory prompts for prep lists.",
      "Pilot a ‘morning brief’ that emails the top 3 actions with links to the underlying Tableau views.",
    ],
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0b1224] to-[#111a33] text-gray-200 py-24 px-6 sm:px-10 lg:px-24">
      <section className="max-w-5xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#e0f7ff]">
            Project Notes &amp; Iteration Log
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This page documents how I ship and iterate. I use it to keep builds live, improve documentation, and show the reasoning behind each release.
          </p>
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm sm:text-base font-medium bg-[#10213d]/80 border border-[#60E7F0]/40">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BLUE }} />
            Built to showcase real-world delivery, not hypotheticals.
          </div>
        </motion.div>

        <div className="space-y-12">
          {PROJECTS.map(({ title, summary, workflow, lessons, ongoing }) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10 shadow-[0_0_40px_rgba(96,231,240,0.08)]"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#60E7F0]/10 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-12 h-12 rounded-full flex items-center justify-center border border-[#60E7F0]/60 text-[#60E7F0] font-semibold tracking-wide">
                    {title
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#f4fbff]">
                      {title}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-[#60E7F0]">
                      Workflow snapshot
                    </h3>
                    <ul className="space-y-3 text-gray-200">
                      {workflow.map((item) => (
                        <li key={item} className="flex gap-3 text-sm sm:text-base leading-relaxed">
                          <span className="mt-1 block w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm uppercase tracking-[0.3em] text-[#60E7F0]">
                        What I learned
                      </h3>
                      <ul className="space-y-3 text-gray-200">
                        {lessons.map((item) => (
                          <li key={item} className="flex gap-3 text-sm sm:text-base leading-relaxed">
                            <span className="mt-1 block w-2 h-2 rounded-full bg-white/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-sm uppercase tracking-[0.3em] text-[#60E7F0]">
                        Continuing the build
                      </h3>
                      <ul className="space-y-3 text-gray-200">
                        {ongoing.map((item) => (
                          <li key={item} className="flex gap-3 text-sm sm:text-base leading-relaxed">
                            <span className="mt-1 block w-2 h-2 rounded-full bg-white/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#60E7F0]/40 bg-[#0c162d]/80 px-8 py-10 space-y-5 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#f4fbff]">
            Let&apos;s turn these learnings into your roadmap
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tell me your outcomes and I&apos;ll walk through the systems above, share private repos, or pair on a scoped exercise. This page stays live so you can see how I iterate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm sm:text-base">
            <a
              href="/Ken_Valenzuela_Resume.pdf"
              className="px-6 py-3 rounded-lg font-semibold text-black transition"
              style={{ backgroundColor: BLUE }}
            >
              Download Resume
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg border border-[#60E7F0]/60 text-[#60E7F0] hover:bg-[#60E7F0]/10 transition"
            >
              Schedule a call
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
