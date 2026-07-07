'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft } from '@/lib/motion';
import styles from './Sidebar.module.css';

export type ProductCategory = 'All Products' | 'Peptides' | 'Research Chemicals' | 'Peptide Blends' | 'Amino Acids';

const CATEGORIES: ProductCategory[] = [
  'All Products',
  'Peptides',
  'Research Chemicals',
  'Peptide Blends',
  'Amino Acids',
];

type SidebarProps = {
  category: ProductCategory;
  categoryCounts: Record<string, number>;
  inStockOnly: boolean;
  maxPrice: number;
  purity: string;
  showWishlistOnly: boolean;
  wishlistCount: number;
  onCategoryChange: (category: ProductCategory) => void;
  onClear: () => void;
  onInStockOnlyChange: (value: boolean) => void;
  onMaxPriceChange: (value: number) => void;
  onPurityChange: (value: string) => void;
  onShowWishlistOnlyChange: (value: boolean) => void;
};

export default function Sidebar({
  category,
  categoryCounts,
  inStockOnly,
  maxPrice,
  purity,
  showWishlistOnly,
  wishlistCount,
  onCategoryChange,
  onClear,
  onInStockOnlyChange,
  onMaxPriceChange,
  onPurityChange,
  onShowWishlistOnlyChange,
}: SidebarProps) {
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
      <div className={styles.section}>
        <div className={styles.header}>
          <h3>Categories</h3>
          <span className={styles.chevron}>^</span>
        </div>
        <ul className={styles.list}>
          {CATEGORIES.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={`${styles.listItem} ${category === item ? styles.active : ''}`}
                onClick={() => onCategoryChange(item)}
              >
                <span>{item}</span>
                <span className={styles.count}>({categoryCounts[item] ?? 0})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.filtersHeader}>
        <h3>Filters</h3>
        <button className={styles.clearBtn} type="button" onClick={onClear}>Clear All</button>
      </div>

      <div className={styles.section}>
        <button className={styles.header} type="button" onClick={() => setPurityOpen(!purityOpen)}>
          <h4 className={styles.subHeader}>Purity</h4>
          <span className={`${styles.chevron} ${!purityOpen ? styles.closed : ''}`}>^</span>
        </button>
        {purityOpen && (
          <div className={styles.checkboxGroup}>
            {[
              ['all', 'Any purity'],
              ['99', '99%+'],
              ['98', '98%+'],
            ].map(([value, label]) => (
              <label className={styles.radioLabel} key={value}>
                <input
                  type="radio"
                  name="purity"
                  checked={purity === value}
                  onChange={() => onPurityChange(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <button className={styles.header} type="button" onClick={() => setPriceOpen(!priceOpen)}>
          <h4 className={styles.subHeader}>Max Price</h4>
          <span className={`${styles.chevron} ${!priceOpen ? styles.closed : ''}`}>^</span>
        </button>
        {priceOpen && (
          <div className={styles.priceFilter}>
            <input
              className={styles.range}
              type="range"
              min="30"
              max="500"
              step="5"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            />
            <div className={styles.priceLabels}>
              <span>$30</span>
              <strong>${maxPrice}</strong>
              <span>$500</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <button className={styles.header} type="button" onClick={() => setStockOpen(!stockOpen)}>
          <h4 className={styles.subHeader}>Availability</h4>
          <span className={`${styles.chevron} ${!stockOpen ? styles.closed : ''}`}>^</span>
        </button>
        {stockOpen && (
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => onInStockOnlyChange(event.target.checked)}
              />
              <span className={styles.checkmark}></span>
              <span className={styles.checkText}>In Stock Only</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showWishlistOnly}
                onChange={(event) => onShowWishlistOnlyChange(event.target.checked)}
              />
              <span className={styles.checkmark}></span>
              <span className={styles.checkText}>Wishlist <span className={styles.count}>({wishlistCount})</span></span>
            </label>
          </div>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <button className={styles.header} type="button" onClick={() => setBrandsOpen(!brandsOpen)}>
          <h4 className={styles.subHeader}>Brands</h4>
          <span className={`${styles.chevron} ${!brandsOpen ? styles.closed : ''}`}>^</span>
        </button>
        {brandsOpen && (
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked readOnly />
              <span className={styles.checkmark}></span>
              <span className={styles.checkText}>Zenith Biopeptides <span className={styles.count}>({categoryCounts['All Products'] ?? 0})</span></span>
            </label>
          </div>
        )}
      </div>

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
