// src/pages/Experience.jsx
import { motion } from "framer-motion";

const BLUE = "#60E7F0";
const BLUE_HOVER = "#46C9DB";

/* ───────────── Roles ───────────── */
const jobs = [
  {
    title: "Independent Data & AI Consultant",
    company: "Self‑employed · Contract",
    period: "May 2025 – present",
    location: "Mesa, AZ / Remote",
    bullets: [
      "Deliver end‑to‑end analytics, dashboards, and web solutions for small businesses on project or retainer terms.",
      "Shipped Green Sparrow Tattoo’s Next.js booking platform, lifting weekly appointments by ~40 %.",
      "Built Toasted Bean Coffee’s PostgreSQL + Streamlit KPI dashboard; owners now track revenue, AOV, and product trends in real time.",
      "Embed with client teams just long enough to hand off code, docs, and training so they stay self‑sufficient.",
    ],
  },
  {
    title: "Junior Data Analyst",
    company: "Cerberean Group LLC",
    period: "Aug 2024 – Nov 2024",
    location: "Phoenix, AZ",
    bullets: [
      "Maintained Excel dashboards monitoring average order value across eight dispensaries (AZ, MI, MO).",
      "Flagged US $800 k in vendor‑credit leakage by auditing invoices and renegotiating sponsor terms.",
      "Wrote Looker SQL for SKU‑level demand trends to guide re‑orders and promo timing.",
    ],
  },
  {
    title: "Patient Service Representative",
    company: "Cerberean Group LLC",
    period: "Mar 2023 – Jul 2024",
    location: "Mesa, AZ",
    bullets: [
      "Advised 50–100 patients daily while ensuring regulatory compliance.",
      "Flagged aging inventory to improve rotation and reduce write‑offs; earned multiple 5‑star reviews.",
      "Cross‑trained on intake, packaging, and POS to stabilize throughput during peak hours.",
    ],
  },
  {
    title: "Sales Lead",
    company: "EXPRESS",
    period: "May 2022 – Mar 2023",
    location: "Scottsdale, AZ",
    bullets: [
      "Led store in loyalty‑card sign‑ups and was promoted within 10 months.",
      "Tracked daily KPIs in Excel and coached peers on upsell tactics.",
      "Floated between two high‑traffic sites to cover staffing gaps and maintain sales targets.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-200 px-6 lg:px-24 py-24">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-16"
      >
        Experience
      </motion.h2>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-12">
        {jobs.map((job, idx) => (
          <motion.div
            key={job.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: idx * 0.1,
            }}
            className="relative pl-8"
          >
            <span
              className="absolute left-0 top-2 w-3 h-3 rounded-full"
              style={{ backgroundColor: BLUE }}
            />
            <h3 className="text-xl font-semibold">
              {job.title} · <span style={{ color: BLUE }}>{job.company}</span>
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              {job.period}&nbsp;|&nbsp;{job.location}
            </p>
            <ul className="list-disc ml-5 space-y-2 leading-relaxed">
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Recruiter FAQ / CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mt-24 bg-gray-800 rounded-2xl p-10 space-y-6"
      >
        <h3 className="text-2xl font-semibold mb-3" style={{ color: BLUE }}>
          What does this mean for you?
        </h3>
        <ul className="list-disc ml-5 space-y-3 leading-relaxed">
          <li>
            <span className="font-medium">Proven impact:</span> I’ve lifted
            revenue and conversions for two small businesses in under six
            months.
          </li>
          <li>
            <span className="font-medium">Full‑stack execution:</span> From data
            modeling to front‑end polish, I own the pipeline end‑to‑end.
          </li>
          <li>
            <span className="font-medium">Fast onboarding, faster hand‑off:</span>{" "}
            I embed quickly, document thoroughly, and leave teams self‑sufficient.
          </li>
          <li>
            <span className="font-medium">Flexible engagement:</span> Contract,
            project, or advisory—no long‑term overhead unless you need it.
          </li>
        </ul>

        {/* Contact CTA */}
        <div className="text-center pt-4">
          <a
            href="/contact"
            className="inline-block px-6 py-3 rounded-full font-medium text-black transition"
            style={{ backgroundColor: BLUE }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = BLUE_HOVER)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = BLUE)}
          >
            Let’s Talk
          </a>
        </div>
      </motion.div>
    </section>
  );
}
