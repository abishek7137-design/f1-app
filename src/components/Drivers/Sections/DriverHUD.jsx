'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import styles from './DriverHUD.module.css';

const Gauge = ({ label, value, color }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.gaugeWrapper}>
      <div className={styles.svgContainer}>
        <svg width="120" height="120" viewBox="0 0 100 100" className={styles.svg}>
          {/* Background Track */}
          <circle 
            cx="50" cy="50" r={radius} 
            fill="transparent" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="6" 
          />
          {/* Animated Value Track */}
          <motion.circle 
            cx="50" cy="50" r={radius} 
            fill="transparent" 
            stroke={color} 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
          />
        </svg>
        <div className={styles.gaugeValue} style={{ color }}>{value}</div>
      </div>
      <div className={styles.gaugeLabel}>{label}</div>
    </div>
  );
};

export default function DriverHUD({ driver }) {
  if (!driver.hud) return null;
  const hud = driver.hud;

  return (
    <section className={styles.hudSection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <Activity size={32} color={driver.teamColor} />
          <h2 className={styles.title}>Performance Telemetry</h2>
        </div>

        <div className={styles.hudGrid} style={{ '--team-color': driver.teamColor }}>
          <Gauge label="Reaction Time" value={hud.reaction} color={driver.teamColor} />
          <Gauge label="Qualifying Pace" value={hud.qualifying} color={driver.teamColor} />
          <Gauge label="Race Pace" value={hud.racePace} color={driver.teamColor} />
          <Gauge label="Wet Weather" value={hud.wetWeather} color={driver.teamColor} />
          <Gauge label="Tyre Management" value={hud.tyreManagement} color={driver.teamColor} />
          <Gauge label="Consistency" value={hud.consistency} color={driver.teamColor} />
          <Gauge label="Overtaking" value={hud.overtaking} color={driver.teamColor} />
          <Gauge label="Mental Strength" value={hud.mentalStrength} color={driver.teamColor} />
        </div>

      </div>
    </section>
  );
}
