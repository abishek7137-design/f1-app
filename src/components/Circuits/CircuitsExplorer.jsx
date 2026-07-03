'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { circuitsData } from '../../data/mockData';
import { MapPin, Globe, Route, Activity, Flag } from 'lucide-react';
import CircuitGlobe from './CircuitGlobe';
import styles from './CircuitsExplorer.module.css';

export default function CircuitsExplorer() {
  const [selectedCircuit, setSelectedCircuit] = useState(circuitsData[0]);

  return (
    <section className={styles.section}>
      <div className={styles.heroOverlay}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(/images/circuits_hero_1782900749692.png)` }} />
        <div className={styles.heroGradient} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <motion.h3 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Global Calendar
          </motion.h3>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            World Circuits
          </motion.h1>
        </div>

        <div className={styles.mainLayout}>
          {/* Sidebar Navigation */}
          <div className={styles.circuitList}>
            {circuitsData.map((circuit) => (
              <button
                key={circuit.id}
                className={`${styles.circuitBtn} ${selectedCircuit.id === circuit.id ? styles.active : ''}`}
                onClick={() => setSelectedCircuit(circuit)}
              >
                <div className={styles.btnContent}>
                  <MapPin size={18} className={styles.btnIcon} />
                  <span>{circuit.country}</span>
                </div>
                {selectedCircuit.id === circuit.id && (
                  <motion.div layoutId="activeIndicator" className={styles.activeIndicator} />
                )}
              </button>
            ))}
          </div>

          {/* Circuit Details */}
          <div className={styles.circuitDetails}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCircuit.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={styles.detailsCard}
              >
                <div className={styles.cardHeader}>
                  <h2 className={styles.circuitName}>{selectedCircuit.name}</h2>
                  <div className={styles.locationTag}>
                    <Globe size={16} /> {selectedCircuit.city}, {selectedCircuit.country}
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <CircuitGlobe circuits={circuitsData} selectedCircuit={selectedCircuit} />
                </div>

                <div className={styles.infoGrid}>
                  <div className={styles.infoBox}>
                    <Route size={24} className={styles.infoIcon} />
                    <div>
                      <span className={styles.infoLabel}>Length</span>
                      <span className={styles.infoValue}>{selectedCircuit.length}</span>
                    </div>
                  </div>
                  <div className={styles.infoBox}>
                    <Activity size={24} className={styles.infoIcon} />
                    <div>
                      <span className={styles.infoLabel}>Corners</span>
                      <span className={styles.infoValue}>{selectedCircuit.corners}</span>
                    </div>
                  </div>
                  <div className={styles.infoBox}>
                    <Flag size={24} className={styles.infoIcon} />
                    <div>
                      <span className={styles.infoLabel}>Laps</span>
                      <span className={styles.infoValue}>{selectedCircuit.laps}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.layoutWrapper}>
                  <div className={styles.layoutLabel}>Circuit Map</div>
                  <img src={selectedCircuit.layoutImage} alt={`${selectedCircuit.name} layout`} className={styles.layoutImage} />
                </div>

                <div className={styles.recordBox}>
                  <div className={styles.recordLabel}>Lap Record</div>
                  <div className={styles.recordValue}>{selectedCircuit.lapRecord}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
