'use client';

import { useState, useEffect } from 'react';
import { useTransform } from 'framer-motion';

/**
 * Returns a viewport configuration object dynamically adjusted for screen size.
 * @param {number} desktopAmount - The threshold amount for desktop triggers (e.g. 0.4)
 * @param {number} mobileAmount - The threshold amount for mobile triggers (default 0.1)
 * @returns {object} { once: true, amount: number, margin: string }
 */
export function useResponsiveViewport(desktopAmount = 0.4, mobileAmount = 0.1) {
  const [viewport, setViewport] = useState({
    once: true,
    amount: typeof window !== 'undefined' && window.innerWidth < 1200 ? mobileAmount : desktopAmount,
    margin: "0px 0px 0px 0px"
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobileOrTablet = window.innerWidth < 1200;
      setViewport({
        once: true,
        amount: isMobileOrTablet ? mobileAmount : desktopAmount,
        margin: isMobileOrTablet ? "0px 0px -50px 0px" : "0px 0px 0px 0px" // Slight negative margin on mobile ensures triggers fire just as it enters
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [desktopAmount, mobileAmount]);

  return viewport;
}

/**
 * Scales a parallax output array based on screen width.
 * Desktop: 100%, Tablet: 70%, Mobile: 50%
 */
export function useResponsiveParallax(scrollValue, inputRange, outputRange, type = 'translate') {
  const [scaledOutput, setScaledOutput] = useState(outputRange);

  useEffect(() => {
    const handleResize = () => {
      let multiplier = 1;
      if (window.innerWidth < 768) {
        multiplier = 0.5; // Mobile
      } else if (window.innerWidth < 1200) {
        multiplier = 0.7; // Tablet
      }

      const newOutput = outputRange.map(val => {
        if (type === 'scale') {
           // For scale, we scale the delta from 1.0
           const delta = val - 1;
           return 1 + (delta * multiplier);
        }

        if (typeof val === 'number') {
          return val * multiplier;
        } else if (typeof val === 'string') {
          const num = parseFloat(val);
          if (isNaN(num)) return val;
          const unit = val.replace(num, '');
          return `${num * multiplier}${unit}`;
        }
        return val;
      });

      setScaledOutput(newOutput);
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(outputRange), type]);

  return useTransform(scrollValue, inputRange, scaledOutput);
}
