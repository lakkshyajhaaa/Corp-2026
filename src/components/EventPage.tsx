import Link from 'next/link';
import { Compass, Reveal, Stars, Waves } from './Odyssey';
import { Icon } from './icons';
import styles from './eventpage.module.css';

export type EventPageProps = {
  day: string;
  tone: string;
  title: string;
  lead: string;
  body: string[];
  points: { title: string; text: string }[];
  cta?: { href: string; label: string };
  extra?: React.ReactNode;
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
};

export default function EventPage({ day, tone, title, lead, body, points, cta, extra, prev, next }: EventPageProps) {
  return (
    <>
      <section className={styles.hero}>
        <Stars />
        <div className={styles.bigCompass}><Compass size={620} spin /></div>
        <div className={styles.heroInner}>
          <div className={styles.meta}><span>{day}</span><i /><span>{tone}</span></div>
          <h1 className={`${styles.title} o-gradient-text`}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.ctas}>
            {cta && <Link href={cta.href} className="o-btn o-btn--light">{cta.label} <Icon.Arrow /></Link>}
            <Link href="/register" className="o-btn o-btn--outline-light">Student registration</Link>
          </div>
        </div>
        <Waves height={170} />
      </section>

      <section className="o-section">
        <div className="o-container">
          <div className={styles.grid}>
            <Reveal className={styles.body}>
              <span className="o-eyebrow">The Voyage</span>
              <h2 className="o-title">What awaits <em>aboard.</em></h2>
              {body.map((p, i) => (<p key={i}>{p}</p>))}
            </Reveal>
            <div className={styles.points}>
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className={`${styles.point} o-card`}>
                    <div className={styles.pIcon}>{i + 1}</div>
                    <div><h3>{p.title}</h3><p>{p.text}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {extra}

      {(prev || next) && (
        <section className="o-section o-section--mist" style={{ paddingBlock: '4rem' }}>
          <div className="o-container">
            <div className={styles.nav}>
              {prev ? <Link href={prev.href} className={`${styles.navLink} o-card`}><small>← Previous voyage</small><strong>{prev.label}</strong></Link> : <span />}
              {next ? <Link href={next.href} className={`${styles.navLink} ${styles.next} o-card`}><small>Next voyage →</small><strong>{next.label}</strong></Link> : <span />}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export { styles as eventStyles };
