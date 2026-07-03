'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './HorizontalGallery.module.css';
import CircuitCard from './CircuitCard';

export default function HorizontalGallery({ circuits }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Allow vertical scroll if deltaX is larger (native horizontal scrolling via touchpad)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      
      // If we're at the very start and trying to scroll up, let the page scroll up naturally
      if (el.scrollLeft <= 0 && e.deltaY < 0) return;
      
      // If we're at the very end and trying to scroll down, let the page scroll down naturally
      if (Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft) <= 1 && e.deltaY > 0) return;

      e.preventDefault();
      el.scrollBy({
        left: e.deltaY,
        behavior: 'auto'
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const handleScroll = (e) => {
    const el = e.target;
    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    // The padding start is 10vw. Card is 75vw. Gap is 3rem (48px).
    // An easier approximation is to find which card center is closest to scrollCenter.
    
    // Total width divided by number of circuits is the stride length roughly.
    const scrollableWidth = el.scrollWidth - el.clientWidth;
    const progress = el.scrollLeft / scrollableWidth;
    
    // Avoid NaN if not scrollable
    if (isNaN(progress)) return;
    
    let index = Math.round(progress * (circuits.length - 1));
    index = Math.max(0, Math.min(index, circuits.length - 1));
    
    setActiveIndex(index);
  };

  return (
    <div className={styles.gallerySection}>
      <div className={styles.progressIndicator}>
        <span className={styles.current}>{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.total}>{String(circuits.length).padStart(2, '0')}</span>
      </div>

      <div 
        className={styles.scrollContainer} 
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div className={styles.paddingStart} />
        {circuits.map((circuit) => (
          <div key={circuit.id} className={styles.cardWrapper}>
            <CircuitCard circuit={circuit} />
          </div>
        ))}
        <div className={styles.paddingEnd} />
      </div>
    </div>
  );
}
