'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { driversData } from '../../data/mockData';
import styles from './DriverComparison.module.css';

export default function DriverComparison() {
  const [driverAId, setDriverAId] = useState('max-verstappen');
  const [driverBId, setDriverBId] = useState('lewis-hamilton');

  const driverA = driversData.find(d => d.id === driverAId);
  const driverB = driversData.find(d => d.id === driverBId);

  const maxStats = {
    wins: Math.max(...driversData.map(d => d.wins)),
    podiums: Math.max(...driversData.map(d => d.podiums)),
    poles: Math.max(...driversData.map(d => d.poles)),
    championships: Math.max(...driversData.map(d => d.championships)) || 1,
    points: Math.max(...driversData.map(d => d.points)) || 1
  };

  const renderStat = (driver, statKey, isRight = false) => {
    const val = driver[statKey];
    const pct = (val / maxStats[statKey]) * 100;

    return (
      <div className={`${styles.statRow} ${isRight ? styles.statRight : styles.statLeft}`}>
        <div className={styles.statHeader}>
          {!isRight && <span className={styles.statLabel}>{statKey}</span>}
          <span className={styles.statValue}>{val}</span>
          {isRight && <span className={styles.statLabel}>{statKey}</span>}
        </div>
        <div className={styles.barTrack}>
          <motion.div 
            className={styles.barFill}
            style={{ 
              backgroundColor: driver.color,
              [isRight ? 'right' : 'left']: 0,
              boxShadow: `0 0 10px ${driver.color}80`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.subtitle}>Head-to-Head</h3>
        <h2 className={styles.title}>Compare Drivers</h2>
      </div>

      <div className={styles.comparisonArena}>
        
        {/* Driver A Column */}
        <div className={styles.driverColumn}>
          <div className={styles.selectWrapper}>
            <select 
              className={styles.selectBox} 
              value={driverAId} 
              onChange={(e) => setDriverAId(e.target.value)}
            >
              {driversData.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.driverVisuals}>
            <img src={driverA.helmet} alt={`${driverA.name} helmet`} className={styles.helmetImage} />
            <h4 className={styles.driverName}>{driverA.name}</h4>
          </div>

          <div className={styles.statsContainer}>
            {renderStat(driverA, 'championships')}
            {renderStat(driverA, 'wins')}
            {renderStat(driverA, 'podiums')}
            {renderStat(driverA, 'poles')}
            {renderStat(driverA, 'points')}
          </div>
        </div>

        <div className={styles.vsColumn}>
          <div className={styles.vsCircle}>VS</div>
          <div className={styles.dividerLine} />
        </div>

        {/* Driver B Column */}
        <div className={styles.driverColumn}>
          <div className={styles.selectWrapper}>
            <select 
              className={styles.selectBox} 
              value={driverBId} 
              onChange={(e) => setDriverBId(e.target.value)}
            >
              {driversData.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.driverVisuals}>
            <img src={driverB.helmet} alt={`${driverB.name} helmet`} className={styles.helmetImage} />
            <h4 className={styles.driverName}>{driverB.name}</h4>
          </div>

          <div className={styles.statsContainer}>
            {renderStat(driverB, 'championships', true)}
            {renderStat(driverB, 'wins', true)}
            {renderStat(driverB, 'podiums', true)}
            {renderStat(driverB, 'poles', true)}
            {renderStat(driverB, 'points', true)}
          </div>
        </div>
      </div>
    </section>
  );
}
