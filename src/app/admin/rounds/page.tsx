import { requireAdminAuth } from '@/lib/security';
import { prisma } from '@/lib/db';
import { toggleRoundStatus } from '../actions';
import styles from './page.module.css';

export default async function AdminRoundsPage() {
  await requireAdminAuth();

  const rounds = await prisma.round.findMany({
    orderBy: { number: 'asc' },
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Round Control Center</h1>
        <p className={styles.subtitle}>Manage global accessibility for all competition stages.</p>
      </header>

      <div className={styles.roundsGrid}>
        {rounds.map((round) => (
          <div key={round.id} className={styles.roundCard}>
            <div className={styles.roundHeader}>
              <h2 className={styles.roundName}>0{round.number} • {round.name}</h2>
              <div className={styles.statusBadge} data-status={round.status}>
                {round.status}
              </div>
            </div>

            <p className={styles.roundId}>Internal ID: {round.id}</p>

            <div className={styles.actionGrid}>
              <form action={async () => {
                'use server';
                await toggleRoundStatus(round.id, 'OPEN');
              }}>
                <button 
                  type="submit" 
                  className={styles.actionBtn} 
                  data-intent="open"
                  disabled={round.status === 'OPEN'}
                >
                  Unlock Stage
                </button>
              </form>

              <form action={async () => {
                'use server';
                await toggleRoundStatus(round.id, 'LOCKED');
              }}>
                <button 
                  type="submit" 
                  className={styles.actionBtn} 
                  data-intent="lock"
                  disabled={round.status === 'LOCKED'}
                >
                  Secure Stage
                </button>
              </form>

              <form action={async () => {
                'use server';
                await toggleRoundStatus(round.id, 'CLOSED');
              }}>
                <button 
                  type="submit" 
                  className={styles.actionBtn} 
                  data-intent="close"
                  disabled={round.status === 'CLOSED'}
                >
                  Terminate Stage
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
