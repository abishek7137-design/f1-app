'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { circuitsData } from '../../data/mockData';
import { 
  MapPin, X, CloudRain, Wind, Thermometer, Activity, 
  Clock, Map, Play, ArrowRight, Camera, Navigation, ShoppingBag, Map as MapIcon, Image as ImageIcon
} from 'lucide-react';
import styles from './CircuitsMap.module.css';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function CircuitsMap() {
  const globeRef = useRef();
  const [activeCircuit, setActiveCircuit] = useState(null);
  const [hoveredCircuit, setHoveredCircuit] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [globeReady, setGlobeReady] = useState(false);
  const [galleryImages] = useState([1,2,3,4,5,6,7,8,9,10]); // Gallery placeholders

  const weatherData = useMemo(() => {
    if (!activeCircuit) return null;
    const baseTemp = activeCircuit.continent === 'Europe' ? 22 : 32;
    return { 
      currentTemp: Math.round(baseTemp + (Math.random() * 10 - 5)),
      trackTemp: Math.round(baseTemp + (Math.random() * 15 + 5)),
      humidity: Math.round(Math.random() * 60 + 20),
      rainProb: Math.round(Math.random() * 30),
      windSpeed: Math.round(Math.random() * 20 + 5)
    };
  }, [activeCircuit]);

  useEffect(() => {
    if (globeRef.current && globeReady) {
      globeRef.current.controls().autoRotate = !activeCircuit;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [activeCircuit, globeReady]);

  const filteredCircuits = useMemo(() => {
    if (filterType === 'All') return circuitsData;
    return circuitsData.filter(c => c.type === filterType || c.continent === filterType);
  }, [filterType]);

  const handleCircuitClick = (circuit) => {
    setActiveCircuit(circuit);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: circuit.coordinates[0], lng: circuit.coordinates[1], altitude: 0.8 }, 1500);
    }
  };

  const closeShowcase = () => {
    setActiveCircuit(null);
    if (globeRef.current) {
      globeRef.current.pointOfView({ altitude: 2 }, 1500);
    }
  };

  const renderCharacteristic = (label, value) => (
    <div className={styles.charRow}>
      <span className={styles.charLabel}>{label}</span>
      <div className={styles.charBarTrack}>
        <motion.div 
          className={styles.charBarFill} 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.mapContainer}>
      
      {/* 3D GLOBE (Background) */}
      <div className={styles.globeWrapper}>
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={filteredCircuits}
          pointLat={d => d.coordinates[0]}
          pointLng={d => d.coordinates[1]}
          pointColor={d => d === activeCircuit || d === hoveredCircuit ? '#FF1801' : 'rgba(255, 24, 1, 0.5)'}
          pointAltitude={d => d === activeCircuit ? 0.1 : 0.05}
          pointRadius={d => d === activeCircuit ? 1.5 : 1}
          onPointClick={handleCircuitClick}
          onPointHover={setHoveredCircuit}
          onGlobeReady={() => setGlobeReady(true)}
          atmosphereColor="#0090FF"
          atmosphereAltitude={0.15}
        />
      </div>

      {/* FLOATING HEADER (Only visible when no circuit is active) */}
      <AnimatePresence>
        {!activeCircuit && (
          <motion.div 
            className={styles.floatingHeader}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h1 className={styles.title}>Explore the World</h1>
            <p className={styles.subtitle}>24 legendary circuits across five continents</p>
            <div className={styles.filterBar}>
              {['All', 'Street', 'Permanent', 'Europe', 'Asia', 'North America'].map(f => (
                <button 
                  key={f}
                  className={`${styles.filterBtn} ${filterType === f ? styles.activeFilter : ''}`}
                  onClick={() => setFilterType(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN CIRCUIT SHOWCASE OVERLAY */}
      <AnimatePresence>
        {activeCircuit && (
          <motion.div 
            className={styles.showcaseOverlay}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className={styles.closeBtn} onClick={closeShowcase}><X size={32} /></button>

            <div className={styles.showcaseScrollWrapper}>
              
              {/* HERO SECTION */}
              <div className={styles.heroSection}>
                <img 
                  src={`/images/circuits/${activeCircuit.id}/hero.webp`} 
                  alt={activeCircuit.name} 
                  className={styles.heroImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector(`.${styles.heroFallback}`).style.display = 'flex';
                  }}
                />
                <div className={styles.heroFallback}>
                  <div className={styles.carbonTexture} />
                  <span>HERO ASSET PENDING</span>
                </div>
                <div className={styles.heroGradient} />
                <div className={styles.heroContent}>
                  <motion.span 
                    className={styles.countryLabel}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  >
                    {activeCircuit.country}
                  </motion.span>
                  <motion.h2 
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  >
                    {activeCircuit.grandPrix}
                  </motion.h2>
                  <motion.div 
                    className={styles.heroMeta}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  >
                    <span>{activeCircuit.city}</span>
                    <span className={styles.dot}>•</span>
                    <span>{activeCircuit.length}</span>
                    <span className={styles.dot}>•</span>
                    <span>{activeCircuit.corners} Corners</span>
                  </motion.div>
                </div>
              </div>

              {/* MAIN CONTENT GRID */}
              <div className={styles.contentContainer}>
                
                {/* LEFT COLUMN: Data & Characteristics */}
                <div className={styles.leftColumn}>
                  
                  {/* Weather Telemetry */}
                  {weatherData && (
                    <div className={styles.glassPanel}>
                      <h3 className={styles.panelTitle}><Activity size={18} color="var(--f1-red)" /> Live Telemetry</h3>
                      <div className={styles.weatherGrid}>
                        <div className={styles.wItem}><Thermometer size={18} color="#FF1801" /> Air: {weatherData.currentTemp}°C</div>
                        <div className={styles.wItem}><Activity size={18} color="#00D27A" /> Track: {weatherData.trackTemp}°C</div>
                        <div className={styles.wItem}><CloudRain size={18} color="#0090FF" /> Rain: {weatherData.rainProb}%</div>
                        <div className={styles.wItem}><Wind size={18} color="#fff" /> Wind: {weatherData.windSpeed}km/h</div>
                      </div>
                    </div>
                  )}

                  {/* Circuit Characteristics */}
                  <div className={styles.glassPanel}>
                    <h3 className={styles.panelTitle}><Activity size={18} /> Circuit Characteristics</h3>
                    <div className={styles.charList}>
                      {renderCharacteristic('High Speed', activeCircuit.details.characteristics.speed)}
                      {renderCharacteristic('Downforce', activeCircuit.details.characteristics.downforce)}
                      {renderCharacteristic('Braking', activeCircuit.details.characteristics.braking)}
                      {renderCharacteristic('Overtaking', activeCircuit.details.characteristics.overtaking)}
                      {renderCharacteristic('Tyre Wear', activeCircuit.details.characteristics.tyreWear)}
                      {renderCharacteristic('Driver Difficulty', activeCircuit.details.characteristics.driverDiff)}
                    </div>
                  </div>

                  {/* Previous Winners */}
                  <div className={styles.glassPanel}>
                    <h3 className={styles.panelTitle}><Flag size={18} /> Previous Winners</h3>
                    <div className={styles.winnersList}>
                      {activeCircuit.details.winners.map((winner, idx) => (
                        <div key={idx} className={styles.winnerRow}>
                          <span className={styles.winYear}>{winner.year}</span>
                          <span className={styles.winDriver}>{winner.driver}</span>
                          <span className={styles.winTeam}>{winner.team}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: Map, Gallery, Fan Info */}
                <div className={styles.rightColumn}>
                  
                  {/* Animated Track Map Fallback */}
                  <div className={styles.glassPanel} style={{ padding: 0, overflow: 'hidden', height: '350px' }}>
                    <div className={styles.mapFallbackZone}>
                      <div className={styles.radarScanner} />
                      <div className={styles.radarCenter}><MapPin size={40} color="#FF1801" /></div>
                      <div className={styles.fallbackOverlay}>
                        <span>SYNCING SVG TRACK MAP & TELEMETRY...</span>
                        <div className={styles.progressBar}><div className={styles.progressFill} /></div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Horizontal Gallery */}
                  <div className={styles.glassPanel}>
                    <h3 className={styles.panelTitle}><Camera size={18} /> Interactive Gallery</h3>
                    <div className={styles.galleryScroll}>
                      {galleryImages.map(num => (
                        <div key={num} className={styles.galleryItem}>
                          <img 
                            src={`/images/circuits/${activeCircuit.id}/gallery-${num}.webp`} 
                            alt={`Gallery ${num}`}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.querySelector(`.${styles.galleryImageFallback}`).style.display = 'flex';
                            }}
                          />
                          <div className={styles.galleryImageFallback}>
                            <ImageIcon size={24} color="rgba(255,255,255,0.2)" />
                            <span>IMAGE PENDING</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Local Info & Fan Experience */}
                  <div className={styles.infoGrid}>
                    <div className={styles.glassPanel}>
                      <h3 className={styles.panelTitle}><Navigation size={18} /> Local Info</h3>
                      <div className={styles.infoList}>
                        <div className={styles.infoRow}><span>Time Zone</span><span>{activeCircuit.details.localInfo.timezone}</span></div>
                        <div className={styles.infoRow}><span>Currency</span><span>{activeCircuit.details.localInfo.currency}</span></div>
                        <div className={styles.infoRow}><span>Airport</span><span>{activeCircuit.details.localInfo.airport}</span></div>
                      </div>
                    </div>
                    <div className={styles.glassPanel}>
                      <h3 className={styles.panelTitle}><MapIcon size={18} /> Fan Experience</h3>
                      <div className={styles.infoList}>
                        <div className={styles.infoRow}><span>Grandstands</span><span>{activeCircuit.details.fanExperience.grandstands}</span></div>
                        <div className={styles.infoRow}><span>Transport</span><span>{activeCircuit.details.fanExperience.transport}</span></div>
                        <div className={styles.infoRow}><span>Access</span><span>{activeCircuit.details.fanExperience.accessibility}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Book Experience Actions */}
                  <div className={styles.actionGrid}>
                    <button className={styles.actionBtnPrimary}>Buy Tickets <ArrowRight size={16} /></button>
                    <button className={styles.actionBtnSecondary}><ShoppingBag size={16} /> Merchandise</button>
                    <button className={styles.actionBtnSecondary}><Play size={16} /> Virtual Tour</button>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
