'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Technology.module.css';
import { useResponsiveParallax } from '@/hooks/useResponsive';

export default function Technology() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yBg = useResponsiveParallax(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yText = useResponsiveParallax(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacityText = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className={styles.section}>
      <motion.div 
        className={styles.background} 
        style={{ 
          y: yBg, 
          backgroundImage: `url('/f1-sequence/00850.jpg')` 
        }}
      />
      
      <div className={styles.overlay} />

      <motion.div className={styles.content} style={{ y: yText, opacity: opacityText }}>
        <p className={styles.subtitle}>Innovation</p>
        <h2 className={styles.title}>The Apex of Engineering</h2>
        <p className={styles.description}>
          Aerodynamics shaped by the wind. Power units that defy conventional physics. 
          Formula 1 is the ultimate laboratory where the future of mobility is forged at 350km/h.
        </p>
      </motion.div>
    </section>
  );
}
