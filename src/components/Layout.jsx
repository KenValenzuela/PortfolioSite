// src/components/Layout.jsx
import { Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import CustomCursor from './CustomCursor';
import useLenis from '../hooks/useLenis';
import useRouteSnap from '../hooks/useRouteSnap';

const LazySpline = lazy(() => import('@splinetool/react-spline'));

export default function Layout() {
  useLenis(); // global smooth-scroll
  useRouteSnap();
  const { pathname } = useLocation();
  const showSpline = pathname === '/';

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-black to-gray-400">
      <Header />
      <CustomCursor />

      {/* Spline scene (visible only on Home) */}
      <motion.div
        initial={false}
        animate={{ opacity: showSpline ? 1 : 0, pointerEvents: showSpline ? 'auto' : 'none' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0 z-10"
      >
        {showSpline && (
          <Suspense fallback={null}>
            <LazySpline scene="https://prod.spline.design/V7UYCIN6FD7eViG1/scene.splinecode" />
          </Suspense>
        )}
      </motion.div>

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <Outlet key={pathname} />
      </AnimatePresence>
    </div>
  );
}
