import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * After every navigation, reset Lenis’ internal position to the top
 * without animation. Falls back to native scroll if Lenis is absent.
 */
export default function useRouteSnap() {
  const { pathname } = useLocation();

  useEffect(() => {
    const snap = () => {
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true });

        // Only call resize if the method exists in current build
        if (typeof window.lenis.resize === 'function') {
          window.lenis.resize();
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    snap(); // run once after DOM swap
  }, [pathname]);
}
