'use client';

import { motion } from 'framer-motion';
import { SHOP_PRODUCTS } from '@/lib/shop-data';
import ProductCard from '@/components/store/products/ProductCard';
import { fadeUp, staggerContainer, viewport } from '@/lib/motion';
import styles from './ProductGrid.module.css';

export default function ProductGrid() {
  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <motion.div
        className={styles.topBar}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <span className={styles.resultCount}>32 Products Found</span>
        <div className={styles.sort}>
          <span className={styles.sortIcon}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
          </span>
          <span className={styles.sortLabel}>Sort by:</span>
          <select className={styles.sortSelect}>
            <option>Best Selling</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        className={styles.grid}
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {SHOP_PRODUCTS.map((product) => (
          <motion.div key={product.id} variants={fadeUp}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div
        className={styles.pagination}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <button className={styles.pageArrow} disabled>&lt;</button>
        <button className={`${styles.pageNum} ${styles.active}`}>1</button>
        <button className={styles.pageNum}>2</button>
        <button className={styles.pageNum}>3</button>
        <button className={styles.pageArrow}>Next &gt;</button>
      </motion.div>
    </div>
  );
}
