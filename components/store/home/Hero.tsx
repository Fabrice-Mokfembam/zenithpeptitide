'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.dna} aria-hidden />
      <div className={styles.moleculeOne} aria-hidden />
      <div className={styles.moleculeTwo} aria-hidden />

      <div className={styles.inner}>
        <motion.div 
          className={styles.copy}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className={styles.eyebrow}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Advanced Research Compounds
          </motion.span>

          <h1 className={styles.headline}>
            Scientifically Crafted
            <br />
            Compounds for
            <br />
            <em>Advanced Research.</em>
          </h1>

          <p className={styles.sub}>
            Premium purity peptides. Batch-tested.
            <br />
            Trusted by researchers across the United States.
          </p>

          <motion.div 
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href="/shop" className={styles.btnPrimary}>Shop Now <span aria-hidden>&rarr;</span></Link>
            <Link href="/about" className={styles.btnGhost}>View COA Reports</Link>
          </motion.div>

          <motion.div 
            className={styles.trustLine}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className={styles.stars} aria-label="5 star rating">
              <span aria-hidden>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </span>
            <span>Trustpilot</span>
            <span className={styles.divider} />
            <span>347 Reviews</span>
            <span className={styles.divider} />
            <span>99%+ Purity</span>
            <span className={styles.divider} />
            <span className={styles.shipping}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden>
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Free Shipping $300+
            </span>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.imageWrap}
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/hero-vials.png"
            alt="Zenith Biopeptides TB-500, BPC-157, and CJC-1295 peptide vials"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 54vw"
            className={styles.vialsImg}
          />
        </motion.div>
      </div>
    </section>
  );
}
