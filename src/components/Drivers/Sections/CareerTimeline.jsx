'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Award } from 'lucide-react';
import styles from './CareerTimeline.module.css';

export default function CareerTimeline({ driver }) {
  const [activeYear, setActiveYear] = useState(driver.timeline[0]?.year);

  // Sync state if driver changes
  useEffect(() => {
    setActiveYear(driver.timeline[0]?.year);
  }, [driver]);

  if (!driver.timeline || driver.timeline.length === 0) return null;

  const activeData = driver.timeline.find(t => t.year === activeYear) || driver.timeline[0];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <History size={32} color={driver.teamColor} />
          <h2 className={styles.title}>Career Timeline</h2>
        </div>

        {/* Interactive Timeline Track */}
        <div className={styles.trackContainer}>
          <div className={styles.trackLine} />
          <div className={styles.yearsWrapper}>
            {driver.timeline.map((point) => {
              const isActive = point.year === activeYear;
              return (
                <div 
                  key={point.year} 
                  className={`${styles.yearNode} ${isActive ? styles.activeNode : ''}`}
                  onClick={() => setActiveYear(point.year)}
                >
                  <div className={styles.dot} style={{ borderColor: isActive ? driver.teamColor : 'rgba(255,255,255,0.2)' }}>
                    {isActive && (
                      <motion.div 
                        className={styles.dotFill}
                        layoutId="activeTimelineDot"
                        style={{ backgroundColor: driver.teamColor }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>
                  <span className={styles.yearText} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                    {point.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Display Panel */}
        <div className={styles.displayPanel} style={{ borderTopColor: driver.teamColor }}>
          <div className={styles.panelGlow} style={{ background: driver.teamColor }} />
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${driver.id}-${activeYear}`}
              className={styles.panelContent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              
              <div className={styles.infoGrid}>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Team</span>
                  <span className={styles.value} style={{ color: driver.teamColor }}>{activeData.team}</span>
                </div>
                
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Car</span>
                  <span className={styles.value}>{activeData.car}</span>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.label}>Championship Position</span>
                  <span className={styles.value}>P{activeData.position}</span>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.label}>Race Wins</span>
                  <span className={styles.value}>{activeData.wins}</span>
                </div>
              </div>

              <div className={styles.achievementBlock}>
                <Award size={24} color="#FFD700" />
                <p className={styles.achievementText}>{activeData.achievement}</p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
