import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard' };

export default function AdminDashboard() {
  return (
    <div style={{ padding: '40px', color: '#061126' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Admin Dashboard</h1>
      <p style={{ marginTop: '12px', color: '#6b8aaa' }}>
        Welcome to the Zenith Biopeptides admin panel. Pages coming soon.
      </p>
    </div>
  );
}
