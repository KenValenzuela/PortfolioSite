// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMenu,
  FiX,
  FiPhone,
  FiMail
} from "react-icons/fi";

const NAV = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const SOCIAL = [
  { href: "https://github.com/KenValenzuela", Icon: FiGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/ken-valenzuela", Icon: FiLinkedin, label: "LinkedIn" },
  { href: "https://instagram.com/k.valenzuela85", Icon: FiInstagram, label: "Instagram" }
];

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduce = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true, capture:false });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fade = prefersReduce.current
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  return (
    <header className={`${scrolled ? "backdrop-blur-md bg-black/60 shadow-md" : ""} absolute top-0 inset-x-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center">
            <img
              src="/kv_logo.webp"
              alt="KV Logo"
              className="h-10 w-10 rounded-full object-cover mr-3 border border-gray-300 dark:border-gray-600"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Ken Valenzuela
            </span>
          </Link>
        </motion.div>

        <nav className="hidden lg:flex space-x-8">
          {NAV.map(({ name, path }, i) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.7 + i * 0.15 }}
              className="relative group"
            >
              <Link
                to={path}
                className={`font-medium transition-colors duration-300 ${
                  pathname === path
                    ? "text-[#60E7F0]"
                    : "text-gray-800 dark:text-gray-200 hover:text-[#60E7F0]"
                }`}
              >
                {name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#60E7F0] group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {SOCIAL.map(({ href, Icon, label }, i) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.7 }}
              className="text-gray-300 hover:text-[#60E7F0] transition-colors"
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        <motion.button
          onClick={() => setModalOpen(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 120, damping: 15 }}
          className="hidden md:inline-block ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#60E7F0] to-[#9ef6ff] text-black font-bold hover:from-[#4ad7e2] hover:to-[#bbfbff] transition-all duration-300"
        >
          Hire me
        </motion.button>

        <button
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden text-gray-300"
        >
          {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            {...fade}
            className="lg:hidden px-6 pt-4 pb-6 bg-black text-white space-y-4"
          >
            {NAV.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="block text-lg font-medium hover:text-[#60E7F0] transition-colors"
              >
                {name}
              </Link>
            ))}
            <div className="pt-4 flex gap-4">
              {SOCIAL.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#60E7F0] transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Modal for Hire Me */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            {...fade}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 text-white rounded-lg p-6 w-[90%] max-w-md shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#60E7F0]">Let's Connect</h2>
              <p className="mb-4 text-gray-300">Interested in collaborating or hiring me?</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FiMail className="text-[#60E7F0]" />
                  <a href="mailto:kalonsov3@gmail.com" className="underline">
                    kalonsov3@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-[#60E7F0]" />
                  <a href="tel:+16027753291" className="underline">
                    602-775-3291
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FiInstagram className="text-[#60E7F0]" />
                  <a href="https://instagram.com/k.valenzuela85" target="_blank" className="underline">
                    @k.valenzuela85
                  </a>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="mt-6 w-full px-4 py-2 bg-[#60E7F0] text-black font-semibold rounded hover:bg-[#4ad7e2] transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
