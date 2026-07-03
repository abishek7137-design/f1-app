'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './NextRace.module.css';

const NextRace = () => {
  return (
    <section className={`container ${styles.section}`}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className={styles.subtitle}>Up Next</h3>
        <h2 className={styles.title}>Next Grand Prix</h2>
      </motion.div>

      <motion.div 
        className={styles.raceCard}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={styles.aerialBackground} style={{ backgroundImage: 'url(/images/circuits/next_gp_aerial.png)' }}>
          <div className={styles.aerialOverlay} />
        </div>
        
        <div className={styles.raceContentWrapper}>
          <div className={styles.raceHeader}>
          <div className={styles.raceInfo}>
            <span className={styles.country}>Italy</span>
            <h3 className={styles.raceName}>Monza Grand Prix</h3>
            <span className={styles.circuit}>Autodromo Nazionale Monza</span>
          </div>
          
          <div className={styles.countdown}>
            <div className={styles.timeUnit}>
              <span className={styles.number}>05</span>
              <span className={styles.label}>Days</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>12</span>
              <span className={styles.label}>Hrs</span>
            </div>
            <div className={styles.timeUnit}>
              <span className={styles.number}>45</span>
              <span className={styles.label}>Mins</span>
            </div>
          </div>
        </div>

        <div className={styles.raceBody}>
          <div className={styles.trackMap}>
            <div className={styles.mapContainer}>
              <svg viewBox="0 0 1000 1000" className={styles.svgTrack}>
                <defs>
                  <filter id="f1-red-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Track Base */}
                <path 
                  d="M250,750 L680,750 C710,750 710,725 725,725 C740,725 735,745 755,715 C775,675 770,485 755,415 C745,365 720,375 735,350 C750,325 755,295 725,265 C695,235 660,250 620,280 C580,310 525,370 480,390 C435,410 380,410 350,370 C320,330 290,340 280,370 C270,400 300,420 280,450 L180,550 C120,610 100,680 140,720 C170,750 210,750 250,750 Z" 
                  className={styles.trackBase} 
                />
                
                {/* Animated Outline */}
                <motion.path 
                  d="M250,750 L680,750 C710,750 710,725 725,725 C740,725 735,745 755,715 C775,675 770,485 755,415 C745,365 720,375 735,350 C750,325 755,295 725,265 C695,235 660,250 620,280 C580,310 525,370 480,390 C435,410 380,410 350,370 C320,330 290,340 280,370 C270,400 300,420 280,450 L180,550 C120,610 100,680 140,720 C170,750 210,750 250,750 Z" 
                  className={styles.trackHighlight}
                  filter="url(#f1-red-glow)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />

                {/* Looping Racing Dot */}
                <circle r="12" fill="#fff" filter="url(#f1-red-glow)" opacity="0">
                  <animateMotion 
                    dur="5s" 
                    repeatCount="indefinite" 
                    path="M250,750 L680,750 C710,750 710,725 725,725 C740,725 735,745 755,715 C775,675 770,485 755,415 C745,365 720,375 735,350 C750,325 755,295 725,265 C695,235 660,250 620,280 C580,310 525,370 480,390 C435,410 380,410 350,370 C320,330 290,340 280,370 C270,400 300,420 280,450 L180,550 C120,610 100,680 140,720 C170,750 210,750 250,750 Z" 
                  />
                  <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="5s" begin="3s" fill="freeze" />
                </circle>

                {/* Start / Finish */}
                <rect x="245" y="720" width="10" height="60" fill="#fff" className={styles.startFinish} />
              </svg>

              {/* Interactive Hover Markers */}
              <div className={styles.cornerMarker} style={{ top: '75%', left: '71%' }}>
                <div className={styles.markerDot}></div>
                <div className={styles.tooltip}>Variante del Rettifilo</div>
              </div>
              <div className={styles.cornerMarker} style={{ top: '26%', left: '72%' }}>
                <div className={styles.markerDot}></div>
                <div className={styles.tooltip}>Curva Grande</div>
              </div>
              <div className={styles.cornerMarker} style={{ top: '37%', left: '35%' }}>
                <div className={styles.markerDot}></div>
                <div className={styles.tooltip}>Variante Ascari</div>
              </div>
              <div className={styles.cornerMarker} style={{ top: '72%', left: '14%' }}>
                <div className={styles.markerDot}></div>
                <div className={styles.tooltip}>Parabolica</div>
              </div>
            </div>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Date</span>
              <span className={styles.statValue}>01 - 03 Sep</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Track Length</span>
              <span className={styles.statValue}>5.793 km</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Lap Record</span>
              <span className={styles.statValue}>1:21.046</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Weather</span>
              <span className={styles.statValue}>Sunny 24°C</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Track Temp</span>
              <span className={styles.statValue}>31°C</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Air Temp</span>
              <span className={styles.statValue}>22°C</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.bookBtn}>Book Tickets</button>
        </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NextRace;
