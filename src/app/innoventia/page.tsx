import styles from './page.module.css';

export default function InnoventiaPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.metaLabel}>DAY 01</span>
          <span className={styles.metaLine}></span>
          <span className={styles.metaLabel}>STARTUP FAIR</span>
        </div>
        <h1 className={styles.title}>INNOVENTIA</h1>
      </header>

      <div className={styles.contentGrid}>
        <div className={styles.editorialColumn}>
          <p className={styles.leadText}>
            The intersection of capital and unproven technology.
          </p>
          <p className={styles.bodyText}>
            Participants operate in a high-stakes environment where traditional metrics fail. 
            The objective is not merely evaluation, but the identification of asymmetrical upside.
          </p>
        </div>

        <div className={styles.dataColumn}>
          <div className={styles.dataNode}>
            <span className={styles.nodeIcon}>●</span>
            <div>
              <h3 className={styles.nodeTitle}>EXPOSITION</h3>
              <p className={styles.nodeDesc}>Primary analysis of disruptive architectures.</p>
            </div>
          </div>
          <div className={styles.dataNode}>
            <span className={styles.nodeIcon}>●</span>
            <div>
              <h3 className={styles.nodeTitle}>NEGOTIATION</h3>
              <p className={styles.nodeDesc}>Formation of early-stage strategic alliances.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
