import { requireAdminAuth } from '@/lib/security';
import styles from './layout.module.css';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminAuth();

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brand}>CORPEUREKA</div>
          <div className={styles.userRole}>SYSTEM OVERSEER</div>
        </div>

        <nav className={styles.navigation}>
          <Link href="/admin" className={styles.navLink}>
            <span className={styles.icon}>◈</span>
            System Monitor
          </Link>
          <Link href="/admin/rounds" className={styles.navLink}>
            <span className={styles.icon}>◬</span>
            Round Controls
          </Link>
          <Link href="/admin/teams" className={styles.navLink}>
            <span className={styles.icon}>⊚</span>
            Entity Ledgers (Teams)
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.identity}>
            <div className={styles.identityRole}>{user.role}</div>
            <div className={styles.identityEmail}>{user.email}</div>
          </div>
          <Link href="/api/auth/signout" className={styles.logoutBtn}>
            Terminate Session
          </Link>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
