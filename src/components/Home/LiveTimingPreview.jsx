'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './LiveTimingPreview.module.css';

export default function LiveTimingPreview() {
  const timingData = [
    { pos: 1, name: "VER", color: "#3671C6", gap: "LEADER", tire: "S", s1: "27.145", s1State: "purple", s2: "28.301", s2State: "purple", s3: "25.600", s3State: "green", time: "1:21.046", speed: "342" },
    { pos: 2, name: "NOR", color: "#FF8000", gap: "+0.104", tire: "M", s1: "27.201", s1State: "green", s2: "28.199", s2State: "green", s3: "25.750", s3State: "purple", time: "1:21.150", speed: "345" },
    { pos: 3, name: "LEC", color: "#E8002D", gap: "+0.454", tire: "S", s1: "27.350", s1State: "yellow", s2: "28.400", s2State: "green", s3: "25.750", s3State: "green", time: "1:21.500", speed: "338" },
    { pos: 4, name: "HAM", color: "#27F4D2", gap: "+0.754", tire: "H", s1: "27.400", s1State: "yellow", s2: "28.500", s2State: "yellow", s3: "25.900", s3State: "green", time: "1:21.800", speed: "335" },
    { pos: 5, name: "PIA", color: "#FF8000", gap: "+0.920", tire: "M", s1: "27.450", s1State: "green", s2: "28.480", s2State: "green", s3: "26.036", s3State: "yellow", time: "1:21.966", speed: "344" },
  ];

  const getTireClass = (tire) => {
    switch(tire) {
      case 'S': return styles.tireSoft;
      case 'M': return styles.tireMedium;
      case 'H': return styles.tireHard;
      default: return '';
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h3 className={styles.subtitle}>AWS Data</h3>
          <h2 className={styles.title}>Live Telemetry</h2>
        </div>
        <Link href="/live" className={styles.viewAll}>
          Launch Data Center
        </Link>
      </div>

      <div className={styles.timingBoard}>
        {/* Simulated Broadcast Status Bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusItem}>
            <span className={styles.statusDot} />
            TRACK CLEAR
          </div>
          <div className={styles.statusGroup}>
            <div className={styles.statusItem}>AIR TEMP: <strong>24°C</strong></div>
            <div className={styles.statusItem}>TRACK TEMP: <strong>32°C</strong></div>
            <div className={styles.statusItem}>HUMIDITY: <strong>45%</strong></div>
          </div>
        </div>

        <div className={styles.timingHeader}>
          <div>POS</div>
          <div>DRIVER</div>
          <div>GAP</div>
          <div style={{ textAlign: 'center' }}>TYRE</div>
          <div className={styles.sectorHeader}>SECTOR 1</div>
          <div className={styles.sectorHeader}>SECTOR 2</div>
          <div className={styles.sectorHeader}>SECTOR 3</div>
          <div className={styles.speedTrap}>SPEED</div>
          <div className={styles.lapTimeHeader}>LAP TIME</div>
        </div>

        <div className={styles.rowsContainer}>
          {timingData.map((data, index) => (
            <motion.div 
              key={data.pos}
              className={styles.timingRow}
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: "easeOut" }}
            >
              <div className={styles.pos}>{data.pos}</div>
              
              <div className={styles.driver}>
                <div className={styles.driverColor} style={{ backgroundColor: data.color }} />
                <h3 className={styles.driverName}>{data.name}</h3>
              </div>

              <div className={styles.gap}>{data.gap}</div>

              <div className={styles.tireContainer}>
                <div className={`${styles.tireIcon} ${getTireClass(data.tire)}`}>
                  {data.tire}
                </div>
              </div>
              
              <div className={styles.sectorContainer}>
                <div className={`${styles.sectorBlock} ${styles[data.s1State]}`}>
                  <span className={styles.sectorValue}>{data.s1}</span>
                </div>
              </div>
              
              <div className={styles.sectorContainer}>
                <div className={`${styles.sectorBlock} ${styles[data.s2State]}`}>
                  <span className={styles.sectorValue}>{data.s2}</span>
                </div>
              </div>

              <div className={styles.sectorContainer}>
                <div className={`${styles.sectorBlock} ${styles[data.s3State]}`}>
                  <span className={styles.sectorValue}>{data.s3}</span>
                </div>
              </div>

              <div className={styles.speedValue}>{data.speed} <span className={styles.speedUnit}>KM/H</span></div>
              
              <div className={styles.lapTime}>{data.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
