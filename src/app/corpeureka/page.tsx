import EventPage, { eventStyles as s } from '@/components/EventPage';
import { Reveal, Stars } from '@/components/Odyssey';

const STAGES = [
  { n: '01', t: 'Case', d: 'Initial strategic analysis and formation.' },
  { n: '02', t: 'Finance', d: 'Capital allocation and market positioning.' },
  { n: '03', t: 'Crisis', d: 'Black Swan injection. Wager required for survival.' },
  { n: '04', t: 'Pitch', d: 'Final presentation to the board.' },
];

export default function CorpEurekaPage() {
  return (
    <EventPage
      day="Day 03"
      tone="Overnight"
      title="CORPEUREKA"
      lead="A twelve-hour strategic simulation."
      body={[
        'The system operates on an immutable ledger. Every strategic decision, wager and submission alters the financial state of the cluster instantly. Information is asymmetric.',
        'It is a team event: gather a crew of up to four, enter the simulation and emerge as the ultimate corporate strategist.',
      ]}
      points={[
        { title: 'Live ledger', text: 'Every move reshapes the market in real time.' },
        { title: 'Clustered play', text: 'Alliances and acquisitions operate strictly within cluster boundaries.' },
        { title: 'Team portal', text: 'Registered teams command their voyage from a secure dashboard.' },
      ]}
      cta={{ href: '/login', label: 'Team portal' }}
      prev={{ href: '/hr-conclave', label: 'HR Conclave' }}
      extra={
        <>
          <section className="o-section o-section--deep" style={{ overflow: 'hidden' }}>
            <Stars />
            <div className="o-container" style={{ position: 'relative', textAlign: 'center' }}>
              <Reveal>
                <span className="o-eyebrow">Network topology</span>
                <h2 className="o-title">Isolated <em>clusters.</em></h2>
                <div className={s.statRow}>
                  <div className={`${s.stat} o-glass`}><div className={s.statValue}>48</div><div className={s.statName}>Teams</div></div>
                  <span className={s.arrow}>→</span>
                  <div className={`${s.stat} o-glass`}><div className={s.statValue}>12</div><div className={s.statName}>Clusters</div></div>
                </div>
                <p className={s.statDesc}>Teams are grouped into isolated clusters. Alliances and acquisitions operate strictly within cluster boundaries.</p>
              </Reveal>
            </div>
          </section>

          <section className="o-section">
            <div className="o-container">
              <Reveal style={{ textAlign: 'center' }}>
                <span className="o-eyebrow">Progression protocol</span>
                <h2 className="o-title">Four stages to <em>glory.</em></h2>
              </Reveal>
              <div className={s.stages}>
                {STAGES.map((st, i) => (
                  <Reveal key={st.n} delay={i * 0.1}>
                    <div className={`${s.stage} o-card`}>
                      <div className={s.stageN}>{st.n}</div>
                      <h3>{st.t}</h3>
                      <p>{st.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
