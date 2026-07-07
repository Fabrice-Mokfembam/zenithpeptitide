import type { Metadata } from 'next';
import Link from 'next/link';
import { SHOP_PRODUCTS } from '@/lib/shop-data';
import { formatPrice } from '@/lib/utils';
import styles from './Admin.module.css';

export const metadata: Metadata = { title: 'Admin Dashboard | Zenith' };

const featuredProducts = SHOP_PRODUCTS.slice(0, 5);
const catalogValue = SHOP_PRODUCTS.reduce((sum, product) => sum + product.price, 0);
const categories = new Set(SHOP_PRODUCTS.map((product) => product.category)).size;

export default function AdminDashboard() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Operations</p>
          <h1>Admin Dashboard</h1>
          <p>Monitor catalog health, Bitcoin payment review, and customer follow-up from one workspace.</p>
        </div>
        <Link href="/admin/orders" className={styles.primaryAction}>Review Orders</Link>
      </header>

      <section className={styles.metrics}>
        <div className={styles.metric}>
          <span>Catalog Products</span>
          <strong>{SHOP_PRODUCTS.length}</strong>
          <small>All marked in stock</small>
        </div>
        <div className={styles.metric}>
          <span>Categories</span>
          <strong>{categories}</strong>
          <small>Shop filters active</small>
        </div>
        <div className={styles.metric}>
          <span>Average Price</span>
          <strong>{formatPrice(catalogValue / SHOP_PRODUCTS.length)}</strong>
          <small>Static catalog source</small>
        </div>
        <div className={styles.metric}>
          <span>Payment Mode</span>
          <strong>BTC</strong>
          <small>Manual review</small>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.tablePanel}>
          <h2>Featured Inventory</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {featuredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={styles.productThumb} src={product.image} alt="" />
                        <div>
                          <b>{product.name}</b>
                          <p className={styles.muted}>{product.weight} / {product.purity}</p>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td><span className={`${styles.status} ${styles.statusGood}`}>In Stock</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className={styles.panel}>
          <h2>Today&apos;s Focus</h2>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <div>
                <b>Bitcoin matching</b>
                <span className={styles.muted}>Verify incoming payments before processing.</span>
              </div>
              <span className={styles.status}>Manual</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <b>Order queue</b>
                <span className={styles.muted}>Move paid orders to processing.</span>
              </div>
              <span className={`${styles.status} ${styles.statusInfo}`}>Active</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <b>Catalog review</b>
                <span className={styles.muted}>Keep pricing and weights current.</span>
              </div>
              <span className={`${styles.status} ${styles.statusGood}`}>Ready</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
