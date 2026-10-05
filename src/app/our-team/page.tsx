import PageHero from '@/components/PageHero';
import { Reveal } from '@/components/Odyssey';
import styles from './team.module.css';

const GRADS = [
  'linear-gradient(135deg,#60A5FA,#1D4ED8)',
  'linear-gradient(135deg,#3B82F6,#0A2A6B)',
  'linear-gradient(135deg,#93C5FD,#2563EB)',
  'linear-gradient(135deg,#2563EB,#051433)',
];

const GROUPS = [
  { title: 'The Captains', role: 'Core Coordinator', count: 4 },
  { title: 'The Navigators', role: 'Event Head', count: 4 },
  { title: 'The Crew', role: 'Coordinator', count: 8 },
];

export default function OurTeamPage() {
  return (
    <>
      <PageHero eyebrow="The Crew" title="MEET THE TEAM" lead="The people steering the ship." compact />
      <section className="o-section">
        <div className="o-container">
          {GROUPS.map(g => (
            <div key={g.title} className={styles.block}>
              <Reveal>
                <div className={styles.blockHead}><h2>{g.title}</h2><span className="line" style={{ flex: 1, height: 1, background: 'var(--color-border)' }} /></div>
              </Reveal>
              <div className={styles.grid}>
                {Array.from({ length: g.count }, (_, i) => (
                  <Reveal key={i} delay={(i % 4) * 0.08}>
                    <div className={`${styles.member} o-card`}>
                      <div className={styles.photo} style={{ background: GRADS[i % 4] }}><span className={styles.initial}>{i + 1}</span></div>
                      <div className={styles.name}>Member {i + 1}</div>
                      <div className={styles.role}>{g.role}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
