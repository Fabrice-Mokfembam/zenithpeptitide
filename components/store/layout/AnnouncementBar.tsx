import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar} role="banner">
      <span className={styles.item}>Free Shipping on orders $300+</span>
      <span className={styles.dot} aria-hidden />
      <span className={styles.item}>
        15% OFF with code <strong>FULFILLMENT</strong>
      </span>
      <span className={styles.dot} aria-hidden />
      <span className={styles.item}>Ends Sunday Midnight</span>
    </div>
  );
}
