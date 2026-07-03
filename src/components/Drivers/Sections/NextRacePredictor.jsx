'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flag, CloudRain, Sun, Cloud, Thermometer, Wind } from 'lucide-react';
import styles from './NextRacePredictor.module.css';

export default function NextRacePredictor({ driver }) {
  if (!driver.nextRace) return null;
  const race = driver.nextRace;

  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'rain': return <CloudRain size={24} />;
      case 'clear': return <Sun size={24} />;
      case 'overcast': return <Cloud size={24} />;
      default: return <Sun size={24} />;
    }
  };

  return (
    <section className={styles.predictorSection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <Flag size={32} color={driver.teamColor} />
          <h2 className={styles.title}>Next Race Intelligence</h2>
          <p className={styles.subtitle}>AI Performance Prediction</p>
        </div>

        <div className={styles.predictionCard} style={{ '--team-color': driver.teamColor }}>
          <div className={styles.cardBg} />
          <div className={styles.glassGlow} />

          <div className={styles.grid}>
            
            {/* Grand Prix Details */}
            <div className={styles.gpBlock}>
              <span className={styles.label}>Destination</span>
              <h3 className={styles.gpName}>{race.circuit} Grand Prix</h3>
              
              <div className={styles.weatherBox}>
                {getWeatherIcon(race.weather)}
                <span>{race.weather} Conditions</span>
              </div>
            </div>

            {/* Prediction */}
            <div className={styles.targetBlock}>
              <span className={styles.label}>AI Target</span>
              <div className={styles.predictionResult} style={{ color: driver.teamColor }}>
                {race.prediction}
              </div>
            </div>

            {/* Metrics */}
            <div className={styles.metricsBlock}>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Win Probability</span>
                <span className={styles.metricValue}>{race.winProb}%</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Optimal Strategy</span>
                <span className={styles.metricValue}>{race.tyre} Tyres</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
