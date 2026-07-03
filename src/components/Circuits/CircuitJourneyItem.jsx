'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import styles from './CircuitJourney.module.css';
import { useResponsiveViewport, useResponsiveParallax } from '@/hooks/useResponsive';

export default function CircuitJourneyItem({ circuit, index }) {
  const viewport = useResponsiveViewport(0.2);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageScale = useResponsiveParallax(scrollYProgress, [0, 1], [1, 1.15], 'scale');
  const isEven = index % 2 === 0;

  const imageIndex = (index % 8) + 1;
  const currentImage = `/images/backgrounds/track-${String(imageIndex).padStart(2, '0')}.jpg`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section ref={sectionRef} className={`${styles.itemSection} ${isEven ? styles.row : styles.rowReverse}`}>
      <div className={styles.imageSide}>
        <motion.div className={styles.imageContainer} style={{ scale: imageScale }}>
          <img src={currentImage} alt={circuit.name} className={styles.image} />
        </motion.div>
        <div className={styles.imageOverlay} />
      </div>

      <motion.div 
        className={styles.contentSide}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <span className={styles.country}>{circuit.country}</span>
          <h3 className={styles.name}>{circuit.name}</h3>
        </motion.div>

        <motion.div className={styles.statsGrid} variants={itemVariants}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Length</span>
            <span className={styles.statValue}>{circuit.length}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Corners</span>
            <span className={styles.statValue}>{circuit.corners}</span>
          </div>
        </motion.div>

        <motion.button className={styles.exploreBtn} variants={itemVariants}>
          <span>View Circuit</span>
          <ChevronRight className={styles.btnIcon} size={16} />
          <motion.div className={styles.btnGlow} />
        </motion.button>
      </motion.div>
    </section>
  );
}
