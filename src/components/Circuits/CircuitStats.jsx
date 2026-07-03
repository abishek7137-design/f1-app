'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import styles from './CircuitStats.module.css';

const StatCounter = ({ value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const duration = 2000;
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * value));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className={styles.statBox}>
      <div className={styles.statValueWrapper}>
        <span className={styles.statValue}>{count}</span>
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

export default function CircuitStats({ circuitsData }) {
  const totalCircuits = circuitsData.length;
  const totalCountries = new Set(circuitsData.map(c => c.country)).size;
  const totalCorners = circuitsData.reduce((acc, curr) => acc + curr.corners, 0);
  const totalLaps = circuitsData.reduce((acc, curr) => acc + curr.laps, 0);

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.grid}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <StatCounter value={totalCircuits} label="Grand Prix Locations" />
          <StatCounter value={totalCountries} label="Host Countries" />
          <StatCounter value={totalCorners} label="Total Corners" />
          <StatCounter value={totalLaps} label="Total Racing Laps" />
        </motion.div>
      </div>
    </section>
  );
}
