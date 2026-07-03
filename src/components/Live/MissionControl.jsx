'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { liveDrivers, raceControlMessages, teamRadios } from '../../data/liveData';
import { AlertTriangle, Info, CloudRain, Wind, Thermometer, Radio } from 'lucide-react';
import styles from './MissionControl.module.css';

export default function MissionControl() {
  const [drivers, setDrivers] = useState(liveDrivers);

  // Simulate real-time gap changes
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(d => {
        if (d.pos === 1) return d;
        const gapNum = parseFloat(d.gap.replace('+', ''));
        const newGap = gapNum + (Math.random() * 0.2 - 0.1);
        return { ...d, gap: `+${newGap.toFixed(3)}` };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.raceStatus}>
          <div className={styles.statusPulse} />
          <h2>LIVE TRACKING: BAHRAIN GRAND PRIX - LAP 42/57</h2>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        
        {/* Left Column: Leaderboard & Telemetry */}
        <div className={styles.leaderboardPanel}>
          <div className={styles.panelHeader}>Live Leaderboard</div>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <span>POS</span>
              <span>DRIVER</span>
              <span>GAP</span>
              <span>INT</span>
              <span>TYRE</span>
              <span>S1</span>
              <span>S2</span>
              <span>S3</span>
            </div>
            <div className={styles.driverRows}>
              {drivers.map(driver => (
                <motion.div 
                  key={driver.id} 
                  className={styles.driverRow}
                  layout
                >
                  <span className={styles.colPos}>{driver.pos}</span>
                  <div className={styles.colDriver}>
                    <div className={styles.colorBar} style={{ backgroundColor: driver.color }} />
                    {driver.name}
                  </div>
                  <motion.span className={styles.colGap} key={driver.gap} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>{driver.gap}</motion.span>
                  <span className={styles.colInt}>{driver.int}</span>
                  <span className={styles.colTyre}>
                    <span className={`${styles.tyreDot} ${driver.tyre === 'H' ? styles.tyreWhite : styles.tyreYellow}`} />
                    {driver.tyre} ({driver.age})
                  </span>
                  <span className={styles.colSector}>{driver.s1}</span>
                  <span className={styles.colSector}>{driver.s2}</span>
                  <span className={styles.colSector}>{driver.s3}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Track Map & Race Control */}
        <div className={styles.rightColumn}>
          
          <div className={styles.weatherPanel}>
            <div className={styles.weatherItem}><Thermometer size={16}/> AIR: 24°C / TRACK: 31°C</div>
            <div className={styles.weatherItem}><Wind size={16}/> WIND: 5 km/h NW</div>
            <div className={styles.weatherItem}><CloudRain size={16}/> RAIN: 0%</div>
          </div>

          <div className={styles.trackMapPanel}>
            <div className={styles.panelHeader}>Track Positioning</div>
            <div className={styles.mapContainer}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Bahrain_International_Circuit--Grand_Prix_Layout.svg" alt="track" className={styles.trackSvg} />
              {/* Simulated dots */}
              <motion.div className={styles.carDot} style={{ top: '30%', left: '40%', backgroundColor: '#3671C6' }} />
              <motion.div className={styles.carDot} style={{ top: '32%', left: '38%', backgroundColor: '#FF8700' }} />
            </div>
          </div>

          <div className={styles.lowerPanels}>
            <div className={styles.raceControlPanel}>
              <div className={styles.panelHeader}>Race Control</div>
              <div className={styles.messages}>
                {raceControlMessages.map((msg, i) => (
                  <div key={i} className={styles.msgRow}>
                    <span className={styles.msgTime}>{msg.time}</span>
                    {msg.type === 'WARNING' && <AlertTriangle size={14} color="#FF8000" />}
                    {msg.type === 'VSC' && <AlertTriangle size={14} color="#FF8000" />}
                    {msg.type === 'INFO' && <Info size={14} color="#3671C6" />}
                    {msg.type === 'DANGER' && <AlertTriangle size={14} color="#E8002D" />}
                    <span className={`${styles.msgText} ${styles[`msg${msg.type}`]}`}>{msg.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.radioPanel}>
              <div className={styles.panelHeader}>Team Radio</div>
              <div className={styles.radios}>
                {teamRadios.map((radio, i) => (
                  <div key={i} className={styles.radioRow}>
                    <div className={styles.radioTop}>
                      <Radio size={14} color="var(--f1-red)" />
                      <span className={styles.radioDriver}>{radio.driver}</span>
                      <span className={styles.radioTime}>{radio.time}</span>
                    </div>
                    <div className={styles.radioMsg}>"{radio.msg}"</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
