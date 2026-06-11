'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft } from '@/lib/motion';
import styles from './Sidebar.module.css';

const CATEGORIES = [
  { name: 'All Products', count: 32, active: true },
  { name: 'Peptides', count: 18 },
  { name: 'Research Chemicals', count: 8 },
  { name: 'Peptide Blends', count: 4 },
  { name: 'Amino Acids', count: 2 },
];

export default function Sidebar() {
  const [purityOpen, setPurityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [stockOpen, setStockOpen] = useState(true);
  const [brandsOpen, setBrandsOpen] = useState(true);

  return (
    <motion.div
      className={styles.sidebar}
      variants={slideLeft}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Categories */}
      <div className={styles.section}>
        <div className={styles.header}>
          <h3>Categories</h3>
          <span className={styles.chevron}>^</span>
        </div>
        <ul className={styles.list}>
          {CATEGORIES.map((cat) => (
            <li key={cat.name} className={`${styles.listItem} ${cat.active ? styles.active : ''}`}>
              <span>{cat.name}</span>
              <span className={styles.count}>({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.divider} />

      {/* Filters Header */}
      <div className={styles.filtersHeader}>
        <h3>Filters</h3>
        <button className={styles.clearBtn}>Clear All</button>
      </div>

      {/* Purity */}
      <div className={styles.section}>
        <div className={styles.header} onClick={() => setPurityOpen(!purityOpen)}>
          <h4 className={styles.subHeader}>Purity</h4>
          <span className={`${styles.chevron} ${!purityOpen ? styles.closed : ''}`}>^</span>
        </div>
        {purityOpen && (
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span className={styles.checkmark}></span>
              <span className={styles.checkText}>99%+ <span className={styles.count}>(28)</span></span>
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              <span className={styles.checkText}>98%+ <span className={styles.count}>(4)</span></span>
            </label>
          </div>
        )}
      </div>

      <div className={styles.divider} />

      {/* Price Range */}
      <div className={styles.section}>
        <div className={styles.header} onClick={() => setPriceOpen(!priceOpen)}>
          <h4 className={styles.subHeader}>Price Range</h4>
          <span className={`${styles.chevron} ${!priceOpen ? styles.closed : ''}`}>^</span>
        </div>
        {priceOpen && (
          <div className={styles.priceFilter}>
            {/* Simple visual slider representation */}
            <div className={styles.sliderTrack}>
              <div className={styles.sliderFill}></div>
              <div className={styles.sliderThumb} style={{ left: '0%' }}></div>
              <div className={styles.sliderThumb} style={{ left: '100%' }}></div>
            </div>
            <div className={styles.priceLabels}>
              <span>$20</span>
              <span>$500+</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.divider} />

      {/* In Stock */}
      <div className={styles.section}>
        <div className={styles.header} onClick={() => setStockOpen(!stockOpen)}>
          <h4 className={styles.subHeader}>In Stock</h4>
          <span className={`${styles.chevron} ${!stockOpen ? styles.closed : ''}`}>^</span>
        </div>
        {stockOpen && (
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              <span className={styles.checkText}>In Stock Only <span className={styles.count}>(28)</span></span>
            </label>
          </div>
        )}
      </div>

      <div className={styles.divider} />

      {/* Brands */}
      <div className={styles.section}>
        <div className={styles.header} onClick={() => setBrandsOpen(!brandsOpen)}>
          <h4 className={styles.subHeader}>Brands</h4>
          <span className={`${styles.chevron} ${!brandsOpen ? styles.closed : ''}`}>^</span>
        </div>
        {brandsOpen && (
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              <span className={styles.checkmark}></span>
              <span className={styles.checkText}>Zenith Biopeptides <span className={styles.count}>(32)</span></span>
            </label>
          </div>
        )}
      </div>

      {/* Shipping Promo */}
      <motion.div
        className={styles.shippingPromo}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className={styles.truckIcon}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <div className={styles.promoText}>
          <strong>Fast & Discreet Shipping</strong>
          <span>1-3 Day Delivery</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
