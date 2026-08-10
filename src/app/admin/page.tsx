import { requireAdminAuth } from '@/lib/security';
import { prisma } from '@/lib/db';
import styles from './page.module.css';

export default async function AdminDashboard() {
  await requireAdminAuth();

  const totalTeams = await prisma.team.count();
  const totalSubmissions = await prisma.submission.count();
  const totalWagers = await prisma.wager.count();
  
  const state = await prisma.competitionState.findFirst();
  const currentState = state?.currentState || 'NOT_STARTED';

  const recentAuditLogs = await prisma.auditLog.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { email: true } } }
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>System Monitor</h1>
        <div className={styles.statusBadge} data-state={currentState !== 'NOT_STARTED' ? 'active' : 'idle'}>
          {currentState.replace(/_/g, ' ')}
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Registered Teams</div>
          <div className={styles.statValue}>{totalTeams}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Submissions</div>
          <div className={styles.statValue}>{totalSubmissions}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending Wagers</div>
          <div className={styles.statValue}>{totalWagers}</div>
        </div>
      </div>

      <section className={styles.auditSection}>
        <h2 className={styles.sectionTitle}>Recent Audit Logs</h2>
        <table className={styles.auditTable}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Resource</th>
            </tr>
          </thead>
          <tbody>
            {recentAuditLogs.map(log => (
              <tr key={log.id}>
                <td>{log.createdAt.toLocaleString()}</td>
                <td>{log.user.email}</td>
                <td>{log.action}</td>
                <td>{log.resource}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {recentAuditLogs.length === 0 && (
          <p className={styles.emptyState}>No recent activity logged.</p>
        )}
      </section>
    </div>
  );
}
