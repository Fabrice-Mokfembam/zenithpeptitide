import Sidebar from '@/components/store/shop/Sidebar';
import ProductGrid from '@/components/store/shop/ProductGrid';
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

      {/* Main Content Layout */}
      <div className={styles.layout}>
        <aside className={styles.sidebarCol}>
          <Sidebar />
        </aside>
        <section className={styles.gridCol}>
          <ProductGrid />
        </section>
      </div>
    </main>
  );
}
