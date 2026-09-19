import { useState, useEffect } from 'react';

/**
 * Detects system prefers-reduced-motion preference
 */
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

/**
 * Detects device screen category and performance capability
 */
export function useDeviceTier() {
  const [tier, setTier] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    pixelRatio: 1,
  });

  useEffect(() => {
    const updateTier = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      setTier({ isMobile, isTablet, isDesktop, pixelRatio });
    };

    updateTier();
    window.addEventListener('resize', updateTier, { passive: true });
    return () => window.removeEventListener('resize', updateTier);
  }, []);

  return tier;
}
