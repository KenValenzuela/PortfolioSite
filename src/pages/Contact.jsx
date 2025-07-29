// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { supabase } from "../lib/supabaseClient";

const BLUE = "#60E7F0";
const BLUE_HOVER = "#46C9DB";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = new FormData(e.target);

    // honeypot
    if (form.get("website")) {
      setLoading(false);
      return;
    }

    const payload = {
      name: form.get("name").trim(),
      email: form.get("email").trim().toLowerCase(),
      body: form.get("message").trim(),
    };

    const { error } = await supabase.from("messages").insert(payload);
    setLoading(false);

    if (error) {
      toast.error("Something went wrong — please retry.");
      console.error(error);
      return;
    }

    setSent(true);
    e.target.reset();
    toast.success("Message sent!");
  }

  /* ——— thank‑you view ——— */
  if (sent) {
    return (
      <section className="min-h-screen flex flex-col gap-8 items-center justify-center bg-gradient-to-b from-black to-gray-900 text-gray-100 px-4">
        <h2 className="text-3xl font-bold">Thanks!</h2>
        <p>I’ll reply within 24 hrs.</p>
        <button
          onClick={() => setSent(false)}
          className="px-6 py-3 rounded-lg"
          style={{ backgroundColor: BLUE }}
        >
          Send another message
        </button>
      </section>
    );
  }

  /* ——— form view ——— */
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-24">
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
          {/* honeypot */}
          <input
            name="website"
            type="text"
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          <Field id="name" label="Name" type="text" placeholder="Your name" required />
          <Field
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <TextArea
            id="message"
            label="Message"
            placeholder="Tell me about your ambitions! What can we work on together?"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            aria-busy={loading}
            className="w-full py-3 rounded-lg font-semibold text-black shadow-md transition disabled:opacity-60"
            style={{
              background: `linear-gradient(90deg, ${BLUE} 0%, ${BLUE_HOVER} 100%)`,
            }}
          >
            {loading ? "Sending…" : "Send Message"}
          </motion.button>
        </form>


      </motion.div>
    </section>
  );
}

/* ——— helpers ——— */
function Field({ id, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-gray-300">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2"
        style={{ caretColor: BLUE, outlineColor: BLUE }}
        {...props}
      />
    </div>
  );
}
function TextArea({ id, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-gray-300">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows="4"
        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2"
        style={{ caretColor: BLUE, outlineColor: BLUE }}
        {...props}
      />
    </div>
  );
}
