import styles from './page.module.css';

export default function HRConclavePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.metaLabel}>DAY 02</span>
          <span className={styles.metaLine}></span>
          <span className={styles.metaLabel}>LEADERSHIP SYMPOSIUM</span>
        </div>
        <h1 className={styles.title}>HR CONCLAVE</h1>
      </header>

      <div className={styles.contentGrid}>
        <div className={styles.editorialColumn}>
          <p className={styles.leadText}>
            Human capital optimization.
          </p>
          <p className={styles.bodyText}>
            Navigate shifting paradigms in organizational architecture. 
            This symposium examines the structural integrity of corporate leadership under sustained pressure.
          </p>
        </div>

        <div className={styles.dataColumn}>
          <div className={styles.dataNode}>
            <span className={styles.nodeIcon}>●</span>
            <div>
              <h3 className={styles.nodeTitle}>PANEL A: STRUCTURAL INTEGRITY</h3>
              <p className={styles.nodeDesc}>Maintaining corporate culture during rapid scaling.</p>
            </div>
          </div>
          <div className={styles.dataNode}>
            <span className={styles.nodeIcon}>●</span>
            <div>
              <h3 className={styles.nodeTitle}>KEYNOTE: THE TALENT MARKET</h3>
              <p className={styles.nodeDesc}>Acquisition strategies in highly competitive sectors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
