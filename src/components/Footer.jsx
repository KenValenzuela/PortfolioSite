// src/components/Footer.jsx
"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const BLUE       = "#60E7F0";
const BLUE_HOVER = "#46C9DB";

const NAV_ITEMS = [
  { href: "/",           label: "Home" },
  { href: "/about",      label: "About" },
  { href: "/projects",   label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact",    label: "Contact" }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-black text-gray-300 pt-12 pb-8 px-6 lg:px-24"
    >
      {/* ─── Top Row ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Navigation Links */}
        <nav className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className="transition"
              style={{ color: "#e5e7eb" }}
              onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={e => (e.currentTarget.style.color = "#e5e7eb")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-start gap-6">
          <a
            href="mailto:kalonsov3@gmail.com"
            aria-label="Email"
            className="text-xl transition"
            style={{ color: "#e5e7eb" }}
            onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={e => (e.currentTarget.style.color = "#e5e7eb")}
          >
            <FiMail />
          </a>
          <a
            href="https://github.com/KenValenzuela"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-xl transition"
            style={{ color: "#e5e7eb" }}
            onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={e => (e.currentTarget.style.color = "#e5e7eb")}
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ken-valenzuela"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-xl transition"
            style={{ color: "#e5e7eb" }}
            onMouseEnter={e => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={e => (e.currentTarget.style.color = "#e5e7eb")}
          >
            <FiLinkedin />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700 my-8" />

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500">
        © {year} Ken Valenzuela. All rights reserved.
      </p>
    </motion.footer>
  );
}
