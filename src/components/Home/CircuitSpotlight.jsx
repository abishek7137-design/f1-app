'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import styles from './CircuitSpotlight.module.css';

// Reusable animated counter
function Counter({ from, to, duration = 2, format = (v) => v }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => format(Math.round(latest)));

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut", delay: 0.5 });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
}

export default function CircuitSpotlight() {
  // Highly accurate abstract SVG Path for Monza
  const trackPath = "M250,750 L680,750 C710,750 710,725 725,725 C740,725 735,745 755,715 C775,675 770,485 755,415 C745,365 720,375 735,350 C750,325 755,295 725,265 C695,235 660,250 620,280 C580,310 525,370 480,390 C435,410 380,410 350,370 C320,330 290,340 280,370 C270,400 300,420 280,450 L180,550 C120,610 100,680 140,720 C170,750 210,750 250,750 Z";

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h3 className={styles.subtitle}>Locations</h3>
          <h2 className={styles.title}>Circuit Spotlight</h2>
        </div>
      </div>

      <div className={styles.circuitContainer}>
        
        <div className={styles.trackWrapper}>
          <div className={styles.carbonBackground} />
          
          <div className={styles.trackSvgContainer}>
            <svg viewBox="0 0 1000 1000" className={styles.svgTrack}>
              <defs>
                <filter id="red-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="blue-drs-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 3D Extrusion Layers (Dark) */}
              <path d={trackPath} className={styles.trackShadow} transform="translate(0, 15)" />
              <path d={trackPath} className={styles.trackShadow} transform="translate(0, 10)" />
              <path d={trackPath} className={styles.trackShadow} transform="translate(0, 5)" />

              {/* Base Track */}
              <path d={trackPath} className={styles.trackBase} />
              
              {/* Animated Main Track Path (F1 Red Glow) */}
              <motion.path 
                d={trackPath} 
                className={styles.trackHighlight}
                filter="url(#red-glow)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />

              {/* DRS Zones (Secondary Blue Paths overlaid precisely) */}
              <motion.path 
                d="M270,750 L650,750" 
                className={styles.drsZone}
                filter="url(#blue-drs-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 3 }}
              />
              <motion.path 
                d="M180,550 L280,450" 
                className={styles.drsZone}
                filter="url(#blue-drs-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 3.5 }}
              />

              {/* Continuous Racing Light using SVG animateMotion */}
              <circle r="8" fill="#fff" filter="url(#red-glow)" opacity="0">
                <animateMotion dur="6s" repeatCount="indefinite" path={trackPath} />
                <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="6s" begin="3s" fill="freeze" />
              </circle>
              
              {/* Start / Finish Line */}
              <g transform="translate(250, 750) rotate(-15)" className={styles.startFinish}>
                <rect x="-10" y="-20" width="20" height="40" fill="url(#checkeredPattern)" />
                <line x1="0" y1="-25" x2="0" y2="25" stroke="#fff" strokeWidth="4" />
                <circle cx="0" cy="-30" r="4" fill="var(--f1-red)" />
              </g>

              {/* Patterns */}
              <pattern id="checkeredPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="5" height="5" fill="#fff" />
                <rect x="5" y="0" width="5" height="5" fill="#000" />
                <rect x="0" y="5" width="5" height="5" fill="#000" />
                <rect x="5" y="5" width="5" height="5" fill="#fff" />
              </pattern>

            </svg>
            
            {/* Interactive Corner HTML Markers */}
            <div className={styles.cornerMarker} style={{ top: '75%', left: '71%' }}>
              <div className={styles.markerDot}></div>
              <div className={styles.tooltip}>Prima Variante</div>
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

            {/* S1, S2, S3 Markers */}
            <div className={styles.sectorMarker} style={{ top: '23%', left: '60%' }}>S1</div>
            <div className={styles.sectorMarker} style={{ top: '44%', left: '26%' }}>S2</div>
            <div className={styles.sectorMarker} style={{ top: '75%', left: '25%' }}>S3</div>

          </div>
        </div>

        <div className={styles.trackInfo}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className={styles.circuitName}>Autodromo Nazionale Monza</h3>
            <p className={styles.circuitLocation}>Monza, Italy</p>
          </motion.div>

          <div className={styles.statsGrid}>
            <motion.div 
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className={styles.statLabel}>First Grand Prix</span>
              <span className={styles.statValue}>
                <Counter from={1900} to={1950} duration={1.5} />
              </span>
            </motion.div>
            
            <motion.div 
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className={styles.statLabel}>Circuit Length (km)</span>
              <span className={styles.statValue}>
                5.<Counter from={0} to={793} duration={1.5} format={(v) => v.toString().padStart(3, '0')} />
              </span>
            </motion.div>

            <motion.div 
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className={styles.statLabel}>Laps</span>
              <span className={styles.statValue}>
                <Counter from={0} to={53} duration={1.5} />
              </span>
            </motion.div>

            <motion.div 
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className={styles.statLabel}>Lap Record</span>
              <span className={styles.statValue}>1:21.046</span>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
