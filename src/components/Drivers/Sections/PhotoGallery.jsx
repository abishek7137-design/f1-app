'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import styles from './PhotoGallery.module.css';

// We'll use F1 CDN images for high-quality race shots
const galleryImages = [
  "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244985/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Monaco.jpg",
  "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Belgium.jpg",
  "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244987/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Singapore.jpg",
  "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Abu%20Dhabi.jpg",
  "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244985/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Italy.jpg",
  "https://media.formula1.com/image/upload/f_auto/q_auto/v1677244985/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Great%20Britain.jpg"
];

export default function PhotoGallery({ driver }) {
  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <Camera size={32} color={driver.teamColor} />
          <h2 className={styles.title}>Trackside Gallery</h2>
          <p className={styles.subtitle}>Cinematic Moments</p>
        </div>

        <div className={styles.masonryGrid}>
          {galleryImages.map((src, idx) => (
            <motion.div 
              key={idx}
              className={styles.photoWrapper}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src={src} alt="F1 Racing" className={styles.photo} />
              <div className={styles.overlay} style={{ backgroundColor: `${driver.teamColor}40` }} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
