'use client';

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from './DriverCarousel.module.css';

const DriverCard = ({ driver, isActive, onClick }) => {
  // 3D Tilt Effect Setup using Framer Motion
  const x = useMotionValue(200);
  const y = useMotionValue(250);

  const rotateX = useTransform(y, [0, 500], [10, -10]);
  const rotateY = useTransform(x, [0, 400], [-10, 10]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(250);
  }

  return (
    <motion.div 
      className={`${styles.cardWrapper} ${isActive ? styles.active : ''}`}
      onClick={() => onClick(driver.id)}
      style={{
        perspective: 1000
      }}
    >
      <motion.div
        className={styles.card}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          borderColor: isActive ? driver.teamColor : 'rgba(255,255,255,0.1)',
          boxShadow: isActive ? `0 20px 40px ${driver.teamColor}40` : '0 10px 30px rgba(0,0,0,0.5)'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className={styles.cardBg} />
        
        {/* Number Watermark */}
        <div className={styles.numberWatermark}>{driver.number}</div>

        {/* Dynamic Glowing Border */}
        <motion.div 
          className={styles.teamGlow}
          style={{ background: driver.teamColor }}
        />

        {/* Portrait */}
        <div className={styles.portraitWrapper}>
          <img 
            src={driver.image} 
            alt={driver.lastName} 
            className={styles.portrait} 
          />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <span className={styles.firstName}>{driver.firstName}</span>
            <span className={styles.lastName}>{driver.lastName}</span>
          </div>
          <div className={styles.infoBottom}>
            <span className={styles.team} style={{ color: driver.teamColor }}>{driver.team}</span>
            <span className={styles.country}>{driver.country}</span>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default function DriverCarousel({ activeDriverId, onSelectDriver, allDrivers }) {
  // Only display the 4 requested drivers to ensure a perfectly curated layout
  const featuredDrivers = allDrivers.slice(0, 4);

  return (
    <section className={styles.carouselSection}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Featured Drivers</h2>
        <div className={styles.line} />
      </div>
      
      <div className={styles.trackWrapper}>
        <div className={styles.track}>
          {featuredDrivers.map(driver => (
            <DriverCard 
              key={driver.id} 
              driver={driver} 
              isActive={driver.id === activeDriverId} 
              onClick={onSelectDriver} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
