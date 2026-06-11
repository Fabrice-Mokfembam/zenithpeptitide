'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FEATURED_PRODUCTS } from '@/lib/constants';
import ProductCard from '@/components/store/products/ProductCard';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  return (
    <motion.section 
      className={styles.section} 
      id="products"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className="section-label">Featured Products</span>
            <h2 className={styles.title}>Reliable Purity, Batch After Batch</h2>
          </div>
          <Link href="/shop" className={styles.viewAll}>
            View All Products <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className={styles.carouselWrap}>
          <button
            className={`${styles.arrow} ${styles.arrowLeft} ${!canLeft ? styles.arrowHidden : ''}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <span aria-hidden>&lsaquo;</span>
          </button>

          <div className={styles.grid} ref={scrollRef} onScroll={onScroll}>
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className={styles.item}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            className={`${styles.arrow} ${styles.arrowRight} ${!canRight ? styles.arrowHidden : ''}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <span aria-hidden>&rsaquo;</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
