// src/pages/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { supabase } from '../lib/supabaseClient';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = new FormData(e.target);

    // simple honeypot
    if (form.get('website')) {
      setLoading(false);
      return;
    }

    const payload = {
      name:  form.get('name').trim(),
      email: form.get('email').trim().toLowerCase(),
      body:  form.get('message').trim()
    };

    const { error } = await supabase.from('messages').insert(payload);

    setLoading(false);

    if (error) {
      toast.error('Something went wrong — please retry.');
      console.error(error);
      return;
    }

    setSent(true);
    e.target.reset();
    toast.success('Message sent!');
  }

  /* ——— thank-you view ——— */
  if (sent) {
    return (
      <section className="min-h-screen flex flex-col gap-8 items-center justify-center bg-black text-gray-100 px-4">
        <h2 className="text-3xl font-bold">Thanks!</h2>
        <p>I’ll reply within 24 hrs.</p>
        <button
          onClick={() => setSent(false)}
          className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
        >
          Send another message
        </button>
      </section>
    );
  }

  /* ——— form view ——— */
  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-4 py-24">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="w-full max-w-lg bg-gray-800 rounded-xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Let’s Work Together
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* honeypot */}
          <input name="website" type="text" className="hidden" tabIndex="-1" autoComplete="off" />

          <Field id="name" label="Name" type="text" placeholder="Your name" required />
          <Field id="email" label="Email" type="email" placeholder="you@example.com" required />
          <TextArea id="message" label="Message" placeholder="Tell me about your project…" />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            aria-busy={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-semibold text-white shadow-md hover:shadow-lg hover:from-violet-700 hover:to-purple-700 transition disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send Message'}
          </motion.button>
        </form>

        {/* socials */}
        <div className="mt-8 flex justify-center gap-6 text-gray-400">
          {[FiGithub, FiLinkedin, FiInstagram].map((Icon, i) => (
            <a key={i} href="#" className="hover:text-violet-400 transition" aria-label={Icon.displayName}>
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ——— tiny helpers keep JSX clean ——— */
function Field({ id, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-gray-300">{label}</label>
      <input
        id={id}
        name={id}
        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-violet-500"
        {...props}
      />
    </div>
  );
}
function TextArea({ id, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-gray-300">{label}</label>
      <textarea
        id={id}
        name={id}
        rows="4"
        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-violet-500"
        {...props}
      />
    </div>
  );
}
