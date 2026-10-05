import { Compass, Stars, Waves } from './Odyssey';
import styles from './eventpage.module.css';

export default function PageHero({ eyebrow, title, lead, compact = false }: { eyebrow: string; title: string; lead?: string; compact?: boolean }) {
  return (
    <section className={styles.hero} style={compact ? { paddingBottom: '9rem' } : undefined}>
      <Stars />
      <div className={styles.bigCompass}><Compass size={560} spin /></div>
      <div className={styles.heroInner}>
        <div className={styles.meta}><i /><span>{eyebrow}</span><i /></div>
        <h1 className={`${styles.title} o-gradient-text`} style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      <Waves height={150} />
    </section>
  );
}
