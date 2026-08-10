'use client';

import styles from './rounds.module.css';

export default function RoundTwoContent({ roundId }: { roundId: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <p>The HR Conclave negotiations have commenced.</p>
        <p>You must form alliances with one other team in your cluster. Only mutual agreements will be validated by the system.</p>
      </div>
      <div className={styles.placeholder}>
        [ALLIANCE NEGOTIATION INTERFACE PENDING]
      </div>
    </div>
  );
}
