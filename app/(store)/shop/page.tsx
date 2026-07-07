import { Suspense } from 'react';
import ShopExperience from '@/components/store/shop/ShopExperience';
import ShopHero from '@/components/store/shop/ShopHero';
import styles from './ShopPage.module.css';

export const metadata = {
  title: 'Shop All Products | Zenith Biopeptides',
  description: 'Browse our complete catalog of premium research peptides with verified purity.',
};

export default function ShopPage() {
  return (
    <main className={styles.main}>
      <ShopHero />

      <div className={styles.layout}>
        <Suspense fallback={<div className={styles.loading}>Loading products...</div>}>
          <ShopExperience />
        </Suspense>
      </div>
    </main>
  );
}
