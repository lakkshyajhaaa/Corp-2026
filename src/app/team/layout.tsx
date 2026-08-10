import { requireTeamAuth } from '@/lib/security';
import styles from './layout.module.css';
import Link from 'next/link';

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is wrapped by middleware, but we double-verify and fetch the user.
  const { user } = await requireTeamAuth();

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>CORPEUREKA</div>
          <div className={styles.userRole}>Command Center</div>
        </div>

        <nav className={styles.navigation}>
          <Link href="/team" className={styles.navLink}>
            <span className={styles.icon}>⊚</span>
            Overview
          </Link>
          <Link href="/team/journey" className={styles.navLink}>
            <span className={styles.icon}>◈</span>
            The Journey
          </Link>
          <Link href="/team/cluster" className={styles.navLink}>
            <span className={styles.icon}>◬</span>
            Cluster Territory
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.identity}>
            <div className={styles.identityEmail}>{user.email}</div>
            <div className={styles.identityStatus}>Secure Connection</div>
          </div>
          <Link href="/api/auth/signout" className={styles.logoutBtn}>
            Disconnect
          </Link>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
