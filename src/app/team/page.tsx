import { requireTeamAuth } from '@/lib/security';
import { getSafeTeamProfile } from '@/services/team.service';
import { getCompetitionState } from '@/services/round.service';
import styles from './page.module.css';

export default async function TeamOverview() {
  const { teamId } = await requireTeamAuth();
  const teamProfile = await getSafeTeamProfile(teamId);
  const competitionState = await getCompetitionState();

  if (!teamProfile) {
    return (
      <div className={styles.errorContainer}>
        <h2>Identity Not Found</h2>
        <p>Your team profile could not be located in the secure database.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{teamProfile.name}</h1>
        <div className={styles.clusterBadge}>Cluster {teamProfile.cluster.name}</div>
      </header>

      <div className={styles.grid}>
        {/* Core Metrics */}
        <section className={styles.metricsCard}>
          <h2 className={styles.cardTitle}>Authoritative Ledgers</h2>
          <div className={styles.metricsGroup}>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Strategy Points</div>
              <div className={styles.metricValue}>{teamProfile.points}</div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricLabel}>Financial Capital</div>
              <div className={styles.metricValue}>${teamProfile.finances.toLocaleString()}</div>
            </div>
          </div>
          <p className={styles.metricDisclaimer}>
            These values are derived from immutable server-side transaction ledgers.
          </p>
        </section>

        {/* Competition Status */}
        <section className={styles.statusCard}>
          <h2 className={styles.cardTitle}>Global Status</h2>
          <div className={styles.statusDisplay}>
            <div className={styles.statusIndicator} data-state={competitionState !== 'NOT_STARTED' ? 'active' : 'idle'}></div>
            <div className={styles.statusText}>{competitionState.replace(/_/g, ' ')}</div>
          </div>
          <p className={styles.statusDesc}>
            The competition engine dictates available actions. Awaiting administrator directives.
          </p>
        </section>

        {/* Team Members */}
        <section className={styles.membersCard}>
          <h2 className={styles.cardTitle}>Authorized Personnel</h2>
          <ul className={styles.memberList}>
            {teamProfile.members.map(member => (
              <li key={member.id} className={styles.memberItem}>
                <span className={styles.memberRole}>{member.role}</span>
                <span className={styles.memberEmail}>{member.email}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
