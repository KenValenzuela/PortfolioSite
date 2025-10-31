// src/components/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import CustomCursor from "./CustomCursor";
import useLenis from "../hooks/useLenis";
import useRouteSnap from "../hooks/useRouteSnap";

export default function Layout() {
  useLenis();
  useRouteSnap();

  const { pathname } = useLocation();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />
      <CustomCursor />

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <Outlet key={pathname} />
      </AnimatePresence>
    </div>
  );
}
