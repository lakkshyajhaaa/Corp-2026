import { requireAdminAuth } from '@/lib/security';
import { prisma } from '@/lib/db';
import styles from './page.module.css';
import RegistrationsTable from './RegistrationsTable';

export default async function AdminDashboard() {
  await requireAdminAuth();

  let totalTeams = 0;
  let totalSubmissions = 0;
  let totalWagers = 0;
  let totalRegistrations = 0;
  let hrConclaveCount = 0;
  let corpEurekaCount = 0;
  let currentState = 'NOT_STARTED';
  let recentAuditLogs: Array<{ id: string; timestamp: Date; action: string; resource: string; user: { email: string } }> = [];
  let registrations: any[] = [];

  try {
    totalTeams = await prisma.team.count();
    totalSubmissions = await prisma.submission.count();
    totalWagers = await prisma.wager.count();
    totalRegistrations = await prisma.eventRegistration.count();
    
    const state = await prisma.competitionState.findFirst();
    currentState = state?.currentState || 'NOT_STARTED';

    recentAuditLogs = await prisma.auditLog.findMany({
      take: 5,
      orderBy: { timestamp: 'desc' },
      include: { user: { select: { email: true } } }
    });

    registrations = await prisma.eventRegistration.findMany({
      orderBy: { createdAt: 'desc' }
    });

    hrConclaveCount = registrations.filter(r => {
      try {
        const events = JSON.parse(r.events || '[]');
        return events.includes('hr_conclave');
      } catch {
        return false;
      }
    }).length;

    registrations.forEach(r => {
      try {
        const events = JSON.parse(r.events || '[]');
        if (events.includes('corpeureka')) {
          corpEurekaCount += 1; // leader
          if (r.teamDetails) {
            const teamData = JSON.parse(r.teamDetails);
            if (teamData.mates && Array.isArray(teamData.mates)) {
              corpEurekaCount += teamData.mates.length;
            }
          }
        }
      } catch {}
    });

  } catch (error) {
    console.warn('Database connection error in AdminDashboard:', error);
  }

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
          <div className={styles.statLabel}>CorpEureka Seats Available</div>
          <div className={styles.statValue}>{Math.max(0, 220 - corpEurekaCount)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>HR-Conclave Seats Available</div>
          <div className={styles.statValue}>{Math.max(0, 850 - hrConclaveCount)}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Registrations</div>
          <div className={styles.statValue}>{totalRegistrations}</div>
        </div>
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

      <RegistrationsTable registrations={registrations} />

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
                <td suppressHydrationWarning>{log.timestamp.toLocaleString()}</td>
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
