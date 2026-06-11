import styles from './TrustBar.module.css';

const TRUST_FEATURES = [
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    title: 'Third-Party Tested',
    sub: 'Every Batch Verified'
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 3h6v8l4 9H5l4-9V3z"/><line x1="9" y1="3" x2="9" y2="11"/></svg>,
    title: 'Research Use Only',
    sub: 'Not for human consumption'
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: 'Secure Payments',
    sub: '100% Secure Checkout'
  },
  {
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: 'COA Included',
    sub: 'With Every Order'
  }
];

export default function TrustBar() {
  return (
    <div className={styles.trustBar}>
      <div className={styles.inner}>
        {TRUST_FEATURES.map((feature, idx) => (
          <div key={idx} className={styles.feature}>
            <div className={styles.iconWrap}>{feature.icon}</div>
            <div className={styles.textWrap}>
              <strong>{feature.title}</strong>
              <span>{feature.sub}</span>
            </div>
            {idx < TRUST_FEATURES.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  );
}
