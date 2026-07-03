'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { circuitsData } from '../../data/mockData';
import { 
  MapPin, X, Thermometer, Search, Play, ArrowRight, Map as MapIcon, History, Trophy, Flag, Timer
} from 'lucide-react';
import styles from './Circuits2DMap.module.css';

const geoUrl = "/world-110m.json";

export default function Circuits2DMap() {
  const [activeCircuit, setActiveCircuit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  const transformWrapperRef = useRef(null);

  const weatherData = useMemo(() => {
    if (!activeCircuit) return null;
    const baseTemp = activeCircuit.continent === 'Europe' ? 22 : 32;
    return { 
      currentTemp: Math.round(baseTemp + (Math.random() * 10 - 5)),
      trackTemp: Math.round(baseTemp + (Math.random() * 15 + 5)),
    };
  }, [activeCircuit]);

  const filteredCircuits = useMemo(() => {
    return circuitsData.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.grandPrix.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'All' || c.type === filterType || c.continent === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterType]);

  const handleMarkerClick = (circuit) => {
    setActiveCircuit(circuit);
    
    if (transformWrapperRef.current) {
      const { zoomToElement } = transformWrapperRef.current;
      // Smoothly zoom the camera directly to this specific marker node
      zoomToElement(`marker-${circuit.id}`, 3, 800, "easeOut");
    }
  };

  const handleClosePanel = () => {
    setActiveCircuit(null);
    if (transformWrapperRef.current) {
      const { resetTransform } = transformWrapperRef.current;
      resetTransform(800, "easeOut");
    }
  };

  return (
    <div className={styles.mapContainer}>
      
      {/* REACT-ZOOM-PAN-PINCH WRAPPER */}
      <div className={styles.worldMapArea}>
        <TransformWrapper 
          ref={transformWrapperRef}
          initialScale={1}
          minScale={0.5}
          maxScale={8}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
            
            {/* RAW COMPOSABLE MAP OVERLAY (NO D3 ZOOM) */}
            <ComposableMap 
              projection="geoMercator" 
              projectionConfig={{ scale: 130 }}
              width={1000}
              height={600}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#2a2a2a"
                      stroke="#555555"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#333", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* STATIC MARKERS */}
              {filteredCircuits.map((circuit) => {
                const isActive = activeCircuit?.id === circuit.id;
                
                return (
                  <Marker key={circuit.id} coordinates={[circuit.coordinates[1], circuit.coordinates[0]]}>
                    <g
                      id={`marker-${circuit.id}`}
                      className={`${styles.markerGroup} ${isActive ? styles.markerActive : ''}`}
                      onClick={() => handleMarkerClick(circuit)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Animated Connection Line */}
                      {isActive && (
                        <motion.line 
                          x1={0} y1={0} 
                          x2={500} y2={0}
                          stroke="rgba(255,24,1,0.6)"
                          strokeWidth={1}
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                      )}

                      {/* Glowing Pin */}
                      <circle cx={0} cy={0} r={3} fill="#FF1801" className={styles.markerDot} />
                      <circle cx={0} cy={0} r={8} fill="rgba(255,24,1,0.3)" className={styles.markerPulse} />
                      
                      {/* Tooltip Content */}
                      <foreignObject x={-60} y={-45} width={120} height={40} className={styles.markerForeign}>
                        <div className={styles.svgTooltip}>
                          <span className={styles.ttCircuit}>{circuit.name}</span>
                          <span className={styles.ttMeta}>{circuit.country} • {circuit.length}</span>
                        </div>
                      </foreignObject>
                    </g>
                  </Marker>
                );
              })}
            </ComposableMap>

          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* HEADER OVERLAY */}
      <AnimatePresence>
        {!activeCircuit && (
          <motion.div 
            className={styles.headerOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h1 className={styles.title}>Formula 1 World Circuits</h1>
            <p className={styles.subtitle}>Explore every legendary Grand Prix across the globe.</p>

            <div className={styles.controlsBar}>
              <div className={styles.searchBox}>
                <Search size={20} color="rgba(255,255,255,0.5)" />
                <input 
                  type="text" 
                  placeholder="Search circuit, country, or city..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className={styles.filterGroup}>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MASSIVE INFORMATION PANEL */}
      <AnimatePresence>
        {activeCircuit && (
          <motion.div 
            className={styles.sidePanel}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <button className={styles.closeBtn} onClick={handleClosePanel}>
              <X size={24} />
            </button>

            <div className={styles.panelScroll}>
              
              {/* HERO */}
              <div className={styles.heroSection}>
                <img 
                  src={`/images/circuits/${activeCircuit.id}/hero.webp`} 
                  alt={activeCircuit.name} 
                  className={styles.heroImage}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className={styles.heroFallback}>
                  <div className={styles.carbonFallback} />
                  <span>HERO ASSET PENDING</span>
                </div>
                <div className={styles.heroGradient} />
                <div className={styles.heroContent}>
                  <div className={styles.heroBadge}>
                    <Flag size={14} /> {activeCircuit.country}
                  </div>
                  <h2 className={styles.heroTitle}>{activeCircuit.grandPrix}</h2>
                  <div className={styles.heroMeta}>
                    <span>{activeCircuit.name}</span>
                  </div>
                </div>
              </div>

              <div className={styles.panelBody}>
                
                {/* REQUIRED STATS */}
                <div className={styles.statsGrid}>
                  <div className={styles.statBox}><span>Track Length</span><strong>{activeCircuit.length}</strong></div>
                  <div className={styles.statBox}><span>Corners</span><strong>{activeCircuit.corners}</strong></div>
                  <div className={styles.statBox}><span>Race Distance</span><strong>305.5 km</strong></div>
                  <div className={styles.statBox}><span>Fastest Lap</span><strong>{activeCircuit.lapRecord}</strong></div>
                  <div className={styles.statBox}><span>FIA Grade</span><strong>{activeCircuit.fiaGrade}</strong></div>
                  <div className={styles.statBox}><span>Track Type</span><strong>{activeCircuit.type}</strong></div>
                </div>

                {/* TRACK MAP */}
                <div className={styles.glassModule}>
                  <h3 className={styles.moduleTitle}><MapIcon size={18} /> Official Track Map</h3>
                  <div className={styles.mapFallbackZone}>
                    <div className={styles.radarScanner} />
                    <div className={styles.radarCenter}><MapPin size={32} color="#FF1801" /></div>
                    <div className={styles.fallbackOverlay}>
                      <span>SYNCING TRACK MAP...</span>
                      <div className={styles.progressBar}><div className={styles.progressFill} /></div>
                    </div>
                  </div>
                </div>

                {/* WEATHER */}
                {weatherData && (
                  <div className={styles.glassModule}>
                    <h3 className={styles.moduleTitle}><Thermometer size={18} /> Live Weather Conditions</h3>
                    <div className={styles.weatherGrid}>
                      <div className={styles.wItem}><span>Air Temp</span><strong>{weatherData.currentTemp}°C</strong></div>
                      <div className={styles.wItem}><span>Track Temp</span><strong style={{ color: '#00D27A' }}>{weatherData.trackTemp}°C</strong></div>
                    </div>
                  </div>
                )}

                {/* ACTIONS */}
                <div className={styles.actionGrid}>
                  <button className={styles.actionBtnPrimary}>Book Tickets <ArrowRight size={16} /></button>
                  <button className={styles.actionBtnSecondary}><MapPin size={16} /> Explore Circuit</button>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
