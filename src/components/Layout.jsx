// src/components/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import CustomCursor from "./CustomCursor";
import useLenis from "../hooks/useLenis";
import useRouteSnap from "../hooks/useRouteSnap";

export default function Layout() {
  useLenis();       // global smooth-scroll
  useRouteSnap();

  const { pathname } = useLocation();
  const showOrb = pathname === "/";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />
      <CustomCursor />

      {/* Decorative orb (home only) — replaces Spline to keep CSP-safe */}
      <motion.div
        initial={false}
        animate={{
          opacity: showOrb ? 1 : 0,
          pointerEvents: showOrb ? "auto" : "none",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute right-0 xl:right-[-20%] top-[-15%] lg:top-0 z-10"
        aria-hidden="true"
      >
        <motion.div
          className="relative xl:w-[600px] xl:h-[600px] w-[320px] h-[320px]"
          animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.04, 0.96, 1] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full blur-3xl bg-[radial-gradient(circle_at_35%_20%,rgba(96,231,240,0.45),transparent_65%),radial-gradient(circle_at_70%_75%,rgba(70,103,255,0.42),transparent_65%)]" />
          <img
            src="/kv_logo.webp"
            alt="Ken Valenzuela logo"
            className="relative w-full h-full object-contain opacity-80 mix-blend-screen"
            fetchPriority="high"
            loading="eager"
          />
        </motion.div>
      </motion.div>

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <Outlet key={pathname} />
      </AnimatePresence>
    </div>
  );
}
