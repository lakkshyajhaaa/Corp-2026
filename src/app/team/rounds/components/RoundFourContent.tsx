import styles from './rounds.module.css';

export default function RoundFourContent({ roundId }: { roundId: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <p>The CorpEureka climax.</p>
        <p>AWAITING FINAL SYSTEM DIAGNOSTICS AND ADMINISTRATOR AUTHORIZATION.</p>
      </div>
      <div className={styles.placeholder}>
        [SYSTEM DIAGNOSTIC UI PENDING]
      </div>
    </div>
  );
}
