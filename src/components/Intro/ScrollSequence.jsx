'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './ScrollSequence.module.css';

const FRAME_COUNT = 1390;

export default function ScrollSequence() {
  const spacerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"]
  });

  // Map 0 -> 1 scroll progress to 1 -> 1390 frames
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  // Cinematic One-Word Overlays Opacities (Never overlap)
  const opSpeed       = useTransform(scrollYProgress, [0.05, 0.10, 0.15, 0.20], [0, 1, 1, 0]);
  const opPrecision   = useTransform(scrollYProgress, [0.18, 0.23, 0.28, 0.33], [0, 1, 1, 0]);
  const opPower       = useTransform(scrollYProgress, [0.31, 0.36, 0.41, 0.46], [0, 1, 1, 0]);
  const opInnovation  = useTransform(scrollYProgress, [0.44, 0.49, 0.54, 0.59], [0, 1, 1, 0]);
  const opPerformance = useTransform(scrollYProgress, [0.57, 0.62, 0.67, 0.72], [0, 1, 1, 0]);
  const opEngineering = useTransform(scrollYProgress, [0.70, 0.75, 0.80, 0.85], [0, 1, 1, 0]);
  const opLegacy      = useTransform(scrollYProgress, [0.83, 0.88, 0.93, 0.98], [0, 1, 1, 0]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameStr = i.toString().padStart(5, '0');
        img.src = `/f1-sequence/${frameStr}.jpg`;
        loadedImages[i] = img;
      }
      setImages(loadedImages);
      setLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });

    const render = () => {
      const currentFrame = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.floor(frameIndex.get()))
      );

      const img = images[currentFrame];
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        // On desktop, cover the screen (max). On mobile/tablet, contain to prevent cropping (min)
        const isMobileOrTablet = window.innerWidth < 1200;
        const ratio = isMobileOrTablet ? Math.min(hRatio, vRatio) : Math.max(hRatio, vRatio);
        
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
        );
      }
    };

    render();

    const unsubscribe = frameIndex.on("change", () => {
      requestAnimationFrame(render);
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [loaded, images, frameIndex]);

  return (
    <>
      <div ref={spacerRef} className={styles.container} />
      
      <div className={styles.fixedWrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.overlay} />

        {/* Cinematic One-Word Overlays */}
        <motion.div className={styles.textOverlay} style={{ opacity: opSpeed }}>
          <h2 className={styles.cinematicWord}>Speed</h2>
        </motion.div>

        <motion.div className={styles.textOverlay} style={{ opacity: opPrecision }}>
          <h2 className={styles.cinematicWord}>Precision</h2>
        </motion.div>

        <motion.div className={styles.textOverlay} style={{ opacity: opPower }}>
          <h2 className={styles.cinematicWord}>Power</h2>
        </motion.div>

        <motion.div className={styles.textOverlay} style={{ opacity: opInnovation }}>
          <h2 className={styles.cinematicWord}>Innovation</h2>
        </motion.div>

        <motion.div className={styles.textOverlay} style={{ opacity: opPerformance }}>
          <h2 className={styles.cinematicWord}>Performance</h2>
        </motion.div>

        <motion.div className={styles.textOverlay} style={{ opacity: opEngineering }}>
          <h2 className={styles.cinematicWord}>Engineering</h2>
        </motion.div>

        <motion.div className={styles.textOverlay} style={{ opacity: opLegacy }}>
          <h2 className={styles.cinematicWord}>Legacy</h2>
        </motion.div>
      </div>
    </>
  );
}
