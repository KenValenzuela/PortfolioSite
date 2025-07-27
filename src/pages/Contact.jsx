// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form  = new FormData(e.target);
    const data  = Object.fromEntries(form);
    const resp  = await fetch("/api/contact", {
      method: "POST",
      body:   JSON.stringify(data)
    });

    setLoading(false);
    if (!resp.ok) return alert("Something went wrong – please try again.");

    setSent(true);
    e.target.reset();
  }

  /* ----- thank-you view ----- */
  if (sent) {
    return (
      <section className="min-h-screen flex flex-col gap-8 items-center justify-center bg-black text-gray-100 px-4">
        <h2 className="text-3xl font-bold">Thanks! 🎉</h2>
        <p>I’ll reply to you within 24 hrs.</p>
        <button
          onClick={() => setSent(false)}
          className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
        >
          Send another message
        </button>
      </section>
    );
  }

  /* ----- form view ----- */
  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-4 py-24">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="w-full max-w-lg bg-gray-800 rounded-xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Let’s Work Together
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Tell me about your project…"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-semibold text-white shadow-md hover:shadow-lg hover:from-violet-700 hover:to-purple-700 transition"
          >
            {loading ? "Sending…" : "Send Message"}
          </motion.button>
        </form>

        {/* socials */}
        <div className="mt-8 flex justify-center gap-6 text-gray-400">
          {[FiGithub, FiLinkedin, FiInstagram].map((Icon, i) => (
            <a key={i} href="#" className="hover:text-violet-400 transition">
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
