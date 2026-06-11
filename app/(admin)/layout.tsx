import styles from './layout.module.css';

const ADMIN_LINKS = ['Dashboard', 'Products', 'Orders', 'Customers', 'Settings'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>ZENITH ADMIN</div>
        <nav className={styles.nav}>
          {ADMIN_LINKS.map((item) => (
            <a key={item} href={`/admin/${item.toLowerCase()}`} className={styles.navLink}>
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
