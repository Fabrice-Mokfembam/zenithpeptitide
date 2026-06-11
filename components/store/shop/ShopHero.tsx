'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft } from '@/lib/motion';
import styles from '@/app/(store)/shop/ShopPage.module.css';

export default function ShopHero() {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroInner}>
        <motion.div
          className={styles.breadcrumbs}
          variants={slideLeft}
          initial="hidden"
          animate="show"
        >
          <Link href="/">Home</Link>
          <span className={styles.separator}>›</span>
          <span>Shop</span>
        </motion.div>
        <motion.h1
          className={styles.heroTitle}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
        >
          Shop All Products
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
        >
          Premium research peptides with verified purity and quality.
        </motion.p>
      </div>
      <motion.div
        className={styles.bgImageWrap}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/molecule.png"
          alt="Molecular background"
          fill
          className={styles.bgImage}
        />
      </motion.div>
    </div>
  );
}
