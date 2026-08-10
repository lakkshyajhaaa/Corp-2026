import { requireTeamAuth } from '@/lib/security';
import { getSafeTeamProfile, getSafeClusterDetails } from '@/services/team.service';
import styles from './page.module.css';

export default async function ClusterPage() {
  const { teamId } = await requireTeamAuth();
  
  // We need the team's cluster ID to fetch the cluster details
  const teamProfile = await getSafeTeamProfile(teamId);
  if (!teamProfile) return <div>Identity Not Found</div>;

  const cluster = await getSafeClusterDetails(teamProfile.cluster.id, teamId);

  if (!cluster) {
    return (
      <div className={styles.errorContainer}>
        Cluster data unavailable.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cluster {cluster.name}</h1>
        <p className={styles.subtitle}>Your strategic territory. Monitor ecosystem dynamics and active alliances.</p>
      </header>

      <div className={styles.clusterGrid}>
        {cluster.teams.map((team) => (
          <div 
            key={team.id} 
            className={`${styles.teamCard} ${team.id === teamId ? styles.isSelf : ''}`}
          >
            <div className={styles.teamHeader}>
              <h3 className={styles.teamName}>{team.name}</h3>
              {team.id === teamId && <span className={styles.youBadge}>Your Team</span>}
            </div>
            
            <div className={styles.teamBody}>
              {team.id === teamId ? (
                <div className={styles.privateStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Pts</span>
                    <span className={styles.statValue}>{teamProfile.points}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Cap</span>
                    <span className={styles.statValue}>${teamProfile.finances}</span>
                  </div>
                </div>
              ) : (
                <div className={styles.redactedStats}>
                  <p>Financial and strategic data classified.</p>
                </div>
              )}
            </div>

            {team.id !== teamId && (
              <div className={styles.actions}>
                <button className={styles.actionBtn}>Propose Merger</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <section className={styles.activityFeed}>
        <h2>Strategic Activity</h2>
        {cluster.activeRelationships.length > 0 ? (
          <ul className={styles.feedList}>
            {cluster.activeRelationships.map(rel => (
              <li key={rel.id} className={styles.feedItem}>
                <span className={styles.relType}>{rel.type} PENDING:</span>
                <span className={styles.relDetails}>
                  {rel.sourceTeam.name} initiated {rel.type.toLowerCase()} towards {rel.targetTeam.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyFeed}>No pending strategic actions in this cluster.</p>
        )}
      </section>
    </div>
  );
}
