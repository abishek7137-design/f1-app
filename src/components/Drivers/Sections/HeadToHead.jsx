'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './HeadToHead.module.css';

export default function HeadToHead({ currentDriver, allDrivers }) {
  const [driverAId, setDriverAId] = useState(currentDriver.id);
  const [driverBId, setDriverBId] = useState(allDrivers.find(d => d.id !== currentDriver.id)?.id || allDrivers[0].id);

  // Sync Driver A if global driver changes
  useEffect(() => {
    setDriverAId(currentDriver.id);
    if (driverBId === currentDriver.id) {
      setDriverBId(allDrivers.find(d => d.id !== currentDriver.id)?.id || allDrivers[0].id);
    }
  }, [currentDriver, allDrivers, driverBId]);

  const driverA = allDrivers.find(d => d.id === driverAId);
  const driverB = allDrivers.find(d => d.id === driverBId);

  if (!driverA || !driverB) return null;

  const stats = [
    { label: 'Championships', key: 'championships' },
    { label: 'Wins', key: 'wins' },
    { label: 'Podiums', key: 'podiums' },
    { label: 'Pole Positions', key: 'poles' },
    { label: 'Fastest Laps', key: 'fastestLaps' }
  ];

  return (
    <section className={styles.h2hSection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Head to Head</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.comparisonEngine}>
          
          {/* Driver Selectors */}
          <div className={styles.selectors}>
            
            {/* Driver A Selector */}
            <div className={styles.selectorWrapper} style={{ '--team-color': driverA.teamColor }}>
              <div className={styles.selectorGlow} />
              <select 
                className={styles.dropdown}
                value={driverAId}
                onChange={(e) => setDriverAId(e.target.value)}
              >
                {allDrivers.map(d => (
                  <option key={d.id} value={d.id} disabled={d.id === driverBId}>{d.firstName} {d.lastName}</option>
                ))}
              </select>
              <ChevronDown className={styles.dropdownIcon} size={20} />
            </div>

            <div className={styles.vsBadge}>VS</div>

            {/* Driver B Selector */}
            <div className={styles.selectorWrapper} style={{ '--team-color': driverB.teamColor }}>
              <div className={styles.selectorGlow} />
              <select 
                className={styles.dropdown}
                value={driverBId}
                onChange={(e) => setDriverBId(e.target.value)}
              >
                {allDrivers.map(d => (
                  <option key={d.id} value={d.id} disabled={d.id === driverAId}>{d.firstName} {d.lastName}</option>
                ))}
              </select>
              <ChevronDown className={styles.dropdownIcon} size={20} />
            </div>

          </div>

          {/* Stats Comparison */}
          <div className={styles.statsContainer}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${driverAId}-${driverBId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={styles.statsList}
              >
                {stats.map((stat, idx) => {
                  const valA = driverA[stat.key];
                  const valB = driverB[stat.key];
                  const maxVal = Math.max(valA, valB, 1); // avoid / 0
                  const pctA = (valA / maxVal) * 100;
                  const pctB = (valB / maxVal) * 100;

                  return (
                    <div key={idx} className={styles.statRow}>
                      <div className={styles.statValA} style={{ color: valA >= valB ? '#fff' : 'rgba(255,255,255,0.4)' }}>{valA}</div>
                      
                      <div className={styles.barArea}>
                        {/* Bar A */}
                        <div className={`${styles.barWrapper} ${styles.barWrapperLeft}`}>
                          <motion.div 
                            className={styles.barFill} 
                            style={{ backgroundColor: driverA.teamColor }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pctA}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                          />
                        </div>
                        
                        <div className={styles.statLabel}>{stat.label}</div>
                        
                        {/* Bar B */}
                        <div className={`${styles.barWrapper} ${styles.barWrapperRight}`}>
                          <motion.div 
                            className={styles.barFill} 
                            style={{ backgroundColor: driverB.teamColor }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pctB}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                          />
                        </div>
                      </div>

                      <div className={styles.statValB} style={{ color: valB >= valA ? '#fff' : 'rgba(255,255,255,0.4)' }}>{valB}</div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
