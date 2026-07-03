'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { driversStandings } from '../../../data/driversData';
import styles from './DriverStandingsAnimated.module.css';
import { useResponsiveViewport } from '@/hooks/useResponsive';

// Custom hook to animate the number counter
const AnimatedNumber = ({ value }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    let totalDuration = 1500;
    let incrementTime = (totalDuration / end);

    let timer = setInterval(() => {
      start += 1;
      setCurrent(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{current}</span>;
};

export default function DriverStandingsAnimated() {
  const viewport = useResponsiveViewport(0.2);
  const maxPoints = driversStandings[0].points; // Verstappen at 210

  const getRowGlow = (index) => {
    if (index === 0) return 'rgba(255,215,0,0.15)'; // Gold
    if (index === 1) return 'rgba(192,192,192,0.15)'; // Silver
    if (index === 2) return 'rgba(205,127,50,0.15)'; // Bronze
    return 'rgba(15,15,15,0.8)';
  };

  const getBorderGlow = (index) => {
    if (index === 0) return '#FFD700';
    if (index === 1) return '#C0C0C0';
    if (index === 2) return '#CD7F32';
    return null;
  };

  const renderTrend = (trend) => {
    if (trend === 'up') return <TrendingUp size={16} color="#00FF00" />;
    if (trend === 'down') return <TrendingDown size={16} color="#FF0000" />;
    return <Minus size={16} color="rgba(255,255,255,0.3)" />;
  };

  return (
    <section className={styles.standingsSection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>2026 World Championship</h2>
          <p className={styles.subtitle}>Current Driver Standings</p>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.carbonOverlay} />
          
          <div className={styles.tableHeader}>
            <div className={styles.colPos}>POS</div>
            <div className={styles.colDriver}>DRIVER</div>
            <div className={styles.colPoints}>PTS</div>
            <div className={styles.colStats}>WINS</div>
            <div className={styles.colStats}>PODIUMS</div>
            <div className={styles.colStats}>FASTEST</div>
            <div className={styles.colGap}>GAP</div>
            <div className={styles.colTrend}>FORM</div>
          </div>

          <div className={styles.tableBody}>
            {driversStandings.map((driver, index) => {
              const position = index + 1;
              const isTop3 = position <= 3;
              const accentColor = getBorderGlow(index) || driver.teamColor;
              
              return (
                <motion.div 
                  key={driver.id}
                  className={styles.row}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{
                    backgroundColor: getRowGlow(index),
                    borderLeft: `4px solid ${accentColor}`
                  }}
                  whileHover="hover"
                >
                  
                  {/* Position */}
                  <div className={styles.colPos}>
                    {isTop3 ? (
                      <Trophy size={20} color={accentColor} />
                    ) : (
                      <span className={styles.posNum}>{position}</span>
                    )}
                  </div>

                  {/* Driver Info */}
                  <div className={styles.colDriver}>
                    
                    <div className={styles.driverMeta}>
                      <span className={styles.driverName}>{driver.name}</span>
                      <span className={styles.driverTeam} style={{ color: driver.teamColor }}>
                        {driver.team}
                      </span>
                    </div>

                    <div className={styles.countryFlag}>
                      {driver.country}
                    </div>
                  </div>

                  {/* Points (Animated) */}
                  <div className={styles.colPoints}>
                    <strong><AnimatedNumber value={driver.points} /></strong>
                  </div>

                  {/* Stats */}
                  <div className={styles.colStats}>{driver.wins}</div>
                  <div className={styles.colStats}>{driver.podiums}</div>
                  <div className={styles.colStats}>{driver.fastestLaps}</div>
                  
                  {/* Gap & Trend */}
                  <div className={styles.colGap}>{driver.gap}</div>
                  <div className={styles.colTrend}>{renderTrend(driver.trend)}</div>

                  {/* Hover Progress Bar Overlay */}
                  <motion.div 
                    className={styles.rowProgressBar}
                    variants={{
                      hover: { opacity: 0.1, width: `${(driver.points / maxPoints) * 100}%` }
                    }}
                    initial={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ backgroundColor: accentColor }}
                  />

                  {/* Static Progress Indicator */}
                  <div className={styles.staticProgress}>
                    <motion.div 
                      className={styles.staticProgressFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(driver.points / maxPoints) * 100}%` }}
                      viewport={viewport}
                      transition={{ duration: 1.5, delay: index * 0.05 }}
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
