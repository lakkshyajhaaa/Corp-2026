import styles from './page.module.css';
import Link from 'next/link';

export default function CorpEurekaPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.metaLabel}>DAY 03</span>
          <span className={styles.metaLine}></span>
          <span className={styles.metaLabel}>OVERNIGHT</span>
        </div>
        <h1 className={styles.title}>CORPEUREKA</h1>
      </header>

      <div className={styles.systemGrid}>
        <div className={styles.editorialColumn}>
          <p className={styles.leadText}>
            A continuous 12-hour strategic simulation.
          </p>
          <p className={styles.bodyText}>
            The system operates on an immutable ledger. Every strategic decision, wager, and 
            submission alters the financial state of the cluster instantly. Information is asymmetric.
          </p>
          
          <div className={styles.actionContainer}>
            <Link href="/login" className="btn-primary">
              TEAM PORTAL
            </Link>
          </div>
        </div>

        <div className={styles.mechanicsColumn}>
          <div className={styles.dataBlock}>
            <h3 className={styles.dataLabel}>NETWORK TOPOLOGY</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statNode}>
                <span className={styles.statValue}>48</span>
                <span className={styles.statName}>TEAMS</span>
              </div>
              <span className={styles.statArrow}>→</span>
              <div className={styles.statNode}>
                <span className={styles.statValue}>12</span>
                <span className={styles.statName}>CLUSTERS</span>
              </div>
            </div>
            <p className={styles.dataDesc}>
              Teams are grouped into isolated clusters. Alliances and acquisitions operate strictly within cluster boundaries.
            </p>
          </div>

          <div className={styles.dataBlock}>
            <h3 className={styles.dataLabel}>PROGRESSION PROTOCOL</h3>
            <ul className={styles.timelineList}>
              <li>
                <span className={styles.timelineStage}>01 CASE</span>
                <span className={styles.timelineDesc}>Initial strategic analysis and formation.</span>
              </li>
              <li>
                <span className={styles.timelineStage}>02 FINANCE</span>
                <span className={styles.timelineDesc}>Capital allocation and market positioning.</span>
              </li>
              <li>
                <span className={styles.timelineStage}>03 CRISIS</span>
                <span className={styles.timelineDesc}>Black Swan injection. Wager required for survival.</span>
              </li>
              <li>
                <span className={styles.timelineStage}>04 PITCH</span>
                <span className={styles.timelineDesc}>Final presentation to the board.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
