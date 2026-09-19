import type { Metadata } from 'next';
import { FunnelDashboard } from './FunnelDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin panel for "Nature of the Divine": conversion funnel analytics and order management.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <FunnelDashboard />;
}
