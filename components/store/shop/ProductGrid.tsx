'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/types/product';
import ProductCard from '@/components/store/products/ProductCard';
import { fadeUp, staggerContainer, viewport } from '@/lib/motion';
import styles from './ProductGrid.module.css';

export type ProductSort = 'best-selling' | 'price-asc' | 'price-desc' | 'newest';

type ProductGridProps = {
  products: Product[];
  resultCount: number;
  totalCount: number;
  search: string;
  sort: ProductSort;
  page: number;
  totalPages: number;
  wishlist: string[];
  onBuyNow: (product: Product) => void;
  onPageChange: (page: number) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProductSort) => void;
  onToggleWishlist: (product: Product) => void;
};

export default function ProductGrid({
  products,
  resultCount,
  totalCount,
  search,
  sort,
  page,
  totalPages,
  wishlist,
  onBuyNow,
  onPageChange,
  onSearchChange,
  onSortChange,
  onToggleWishlist,
}: ProductGridProps) {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.topBar}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <div className={styles.searchWrap}>
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products"
            aria-label="Search products"
          />
        </div>
        <div className={styles.toolbar}>
          <span className={styles.resultCount}>
            {resultCount} of {totalCount} products
          </span>
          <div className={styles.sort}>
            <span className={styles.sortIcon}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
            </span>
            <span className={styles.sortLabel}>Sort by:</span>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={(event) => onSortChange(event.target.value as ProductSort)}
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </motion.div>

      {products.length > 0 ? (
        <motion.div
          className={styles.grid}
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard
                product={product}
                wished={wishlist.includes(product.slug)}
                onBuyNow={onBuyNow}
                onToggleWishlist={onToggleWishlist}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div className={styles.empty} variants={fadeUp} initial="hidden" animate="show">
          <h2>No products found</h2>
          <p>Try adjusting search, filters, or wishlist view.</p>
        </motion.div>
      )}

      <motion.div
        className={styles.pagination}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <button
          className={styles.pageArrow}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${styles.pageNum} ${pageNumber === page ? styles.active : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={styles.pageArrow}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </motion.div>
    </div>
  );
}
