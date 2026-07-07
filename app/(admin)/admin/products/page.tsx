import type { Metadata } from 'next';
import { SHOP_PRODUCTS } from '@/lib/shop-data';
import { formatPrice } from '@/lib/utils';
import styles from '../Admin.module.css';

export const metadata: Metadata = { title: 'Products | Zenith Admin' };

export default function AdminProductsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Catalog</p>
          <h1>Products</h1>
          <p>Review product pricing, stock status, categories, and storefront metadata.</p>
        </div>
        <a href="/shop" className={styles.primaryAction}>View Storefront</a>
      </header>

      <section className={styles.tablePanel}>
        <h2>Product Catalog</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Badge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SHOP_PRODUCTS.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productCell}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={styles.productThumb} src={product.image} alt="" />
                      <div>
                        <b>{product.name}</b>
                        <p className={styles.muted}>{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.weight}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.badge ?? '-'}</td>
                  <td>
                    <span className={`${styles.status} ${product.inStock ? styles.statusGood : ''}`}>
                      {product.inStock ? 'In Stock' : 'Hidden'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
