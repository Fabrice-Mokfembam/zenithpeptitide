import type { Metadata } from 'next';
import styles from '../Admin.module.css';

export const metadata: Metadata = { title: 'Settings | Zenith Admin' };

export default function AdminSettingsPage() {
  const bitcoinConfigured = Boolean(process.env.NEXT_PUBLIC_BITCOIN_PAYMENT_STRING);
  const serviceRoleConfigured = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Configuration</p>
          <h1>Settings</h1>
          <p>Operational readiness for checkout, Bitcoin payment review, and Supabase order writes.</p>
        </div>
      </header>

      <section className={styles.grid}>
        <div className={styles.panel}>
          <h2>Checkout Settings</h2>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Payment Method</label>
              <input value="Bitcoin manual review" readOnly />
            </div>
            <div className={styles.field}>
              <label>Free Shipping</label>
              <input value="$300+ orders" readOnly />
            </div>
            <div className={styles.field}>
              <label>Promo Code</label>
              <input value="FULFILLMENT / 15%" readOnly />
            </div>
            <div className={styles.field}>
              <label>Order Status</label>
              <input value="awaiting_payment" readOnly />
            </div>
          </div>
        </div>

        <aside className={styles.panel}>
          <h2>Environment Health</h2>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <div>
                <b>Bitcoin string</b>
                <span className={styles.muted}>NEXT_PUBLIC_BITCOIN_PAYMENT_STRING</span>
              </div>
              <span className={`${styles.status} ${bitcoinConfigured ? styles.statusGood : ''}`}>
                {bitcoinConfigured ? 'Ready' : 'Missing'}
              </span>
            </div>
            <div className={styles.listItem}>
              <div>
                <b>Supabase service role</b>
                <span className={styles.muted}>SUPABASE_SERVICE_ROLE_KEY</span>
              </div>
              <span className={`${styles.status} ${serviceRoleConfigured ? styles.statusGood : ''}`}>
                {serviceRoleConfigured ? 'Ready' : 'Missing'}
              </span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
