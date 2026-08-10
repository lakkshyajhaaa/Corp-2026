import { requireTeamAuth } from '@/lib/security';
import { getSafeAllRounds } from '@/services/round.service';
import styles from './page.module.css';
import Link from 'next/link';

export default async function JourneyPage() {
  const { teamId } = await requireTeamAuth();
  const rounds = await getSafeAllRounds(teamId);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Journey</h1>
        <p className={styles.subtitle}>Stages of the expedition. Access is governed by the server.</p>
      </header>

      <div className={styles.timeline}>
        {rounds.map((round, index) => (
          <div 
            key={round.id} 
            className={`${styles.stageCard} ${round.status === 'LOCKED' ? styles.locked : ''}`}
          >
            <div className={styles.stageVisual}>
              <div className={styles.stageNumber}>0{round.number}</div>
              {index < rounds.length - 1 && <div className={styles.connector}></div>}
            </div>
            
            <div className={styles.stageContent}>
              <div className={styles.stageHeader}>
                <h2>{round.name}</h2>
                <div className={styles.statusBadge} data-status={round.status}>
                  {round.status}
                </div>
              </div>
              
              <div className={styles.stageBody}>
                {round.status === 'LOCKED' ? (
                  <p className={styles.lockedText}>
                    This stage is currently secured. Awaiting administrator activation.
                  </p>
                ) : (
                  <div className={styles.unlockedContent}>
                    <p>Stage is active. Proceed to the detailed interface.</p>
                    <Link href={`/team/rounds/${round.number}`} className={styles.enterBtn}>
                      Enter Stage
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {rounds.length === 0 && (
          <div className={styles.emptyState}>
            The expedition path is currently being initialized by administrators.
          </div>
        )}
      </div>
    </div>
  );
}
