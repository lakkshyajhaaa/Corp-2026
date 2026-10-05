'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Counter, Reveal, Ship, Stars, Waves } from './Odyssey';
import { Icon } from './icons';
import styles from './home.module.css';

export const VOYAGES = [
  {
    day: 'Day I', n: 'I', title: 'Innoventia', path: '/innoventia', tone: 'Startup Fair',
    desc: 'A marketplace of ideas and uncharted territories. Pitch your startup, win seed funding and find mentors who have sailed these waters before.',
    icon: <Icon.Bulb />, grad: 'linear-gradient(135deg, #60A5FA, #1D4ED8)',
  },
  {
    day: 'Day II', n: 'II', title: 'HR Conclave', path: '/hr-conclave', tone: 'Leadership Symposium',
    desc: 'Human capital at the helm. Case studies, panels and HR strategy simulations with leaders who steer organisations through shifting tides.',
    icon: <Icon.People />, grad: 'linear-gradient(135deg, #3B82F6, #0A2A6B)',
  },
  {
    day: 'Day III', n: 'III', title: 'CorpEureka', path: '/corpeureka', tone: 'Overnight Simulation',
    desc: 'The climax. A twelve-hour strategic simulation where every wager moves the market. Navigate crisis and emerge as the ultimate strategist.',
    icon: <Icon.Bolt />, grad: 'linear-gradient(135deg, #1D4ED8, #051433)',
  },
];

const FEATURES = [
  { icon: <Icon.Trophy />, title: 'Compete', text: 'Case battles, pitches and simulations with real stakes and real bragging rights.' },
  { icon: <Icon.Workshop />, title: 'Learn', text: 'Hands-on workshops that turn textbook frameworks into working skills.' },
  { icon: <Icon.Mentor />, title: 'Be mentored', text: 'Direct access to founders, HR leaders and industry veterans.' },
  { icon: <Icon.Network />, title: 'Connect', text: 'Meet students and professionals from across the country in one crew.' },
];

const FAQ = [
  { q: 'Who can take part?', a: 'Prizmora brings together students and professionals from across the country. Register as a student for the events, or apply as a founder for Innoventia.' },
  { q: 'Can I join more than one event?', a: 'Yes. The registration form lets you pick any combination of Innoventia, HR Conclave and CorpEureka.' },
  { q: 'How big are CorpEureka teams?', a: 'Prizmora is a team event with a maximum of four members. If you register with fewer, you will be matched with teammates on the spot.' },
  { q: 'How do startups apply?', a: 'Use the Startup Registration form for Innoventia — share your idea, funding stage and an optional pitch deck link.' },
];

const WORDS = ['Strategy', 'Innovation', 'Teamwork', 'Leadership', 'Courage', 'Discovery'];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const shipX = useTransform(scrollYProgress, [0, 1], ['0vw', '38vw']);
  const shipOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className={styles.hero} ref={heroRef}>
        <Stars />
        <motion.div className={styles.moon} style={{ y: moonY }} />
        <svg className={styles.constellation} viewBox="0 0 320 180" fill="none" aria-hidden>
          <g stroke="#93C5FD" strokeWidth="1" opacity=".6">
            <path d="M20 140L80 90L150 110L210 50L290 70" />
            <path d="M150 110L170 160" />
          </g>
          {[[20, 140], [80, 90], [150, 110], [210, 50], [290, 70], [170, 160]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" style={{ animation: `o-twinkle ${3 + i * 0.6}s ease-in-out infinite` }} />
          ))}
        </svg>

        <motion.div className={styles.heroInner} style={{ y: titleY }}>
          <motion.div className={`${styles.kicker} o-glass`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span className={styles.pulse} /> The Annual Odyssey
          </motion.div>
          <motion.h1 className={`${styles.title} o-gradient-text`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            PRIZMORA
          </motion.h1>
          <motion.p className={styles.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.5 }}>
            Three days. Three voyages. One destination.
          </motion.p>
          <motion.div className={styles.meta} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}>
            <span className={`${styles.metaPill} o-glass`}>1 – 3 September 2026</span>
            <span className={`${styles.metaPill} o-glass`}>Strategy · Innovation · Teamwork</span>
          </motion.div>
          <motion.div className={styles.heroCta} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}>
            <Link href="/register" className="o-btn o-btn--light">Begin your voyage <Icon.Arrow /></Link>
            <Link href="/#voyage" className="o-btn o-btn--outline-light">Chart the course</Link>
          </motion.div>
        </motion.div>

        <motion.div className={styles.ship} style={{ x: shipX, opacity: shipOpacity }}>
          <div className={styles.shipBob}><Ship width={230} /></div>
        </motion.div>

        <Waves height={230} colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0.55)', '#FFFFFF']} />
        <div className={styles.scrollCue}><span className={styles.mouse} /> Scroll</div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className={styles.marquee} aria-hidden>
        <div className={styles.marqueeTrack}>
          {[0, 1].map(k => (
            <div className={styles.marqueeItem} key={k}>
              {WORDS.map(w => (<span key={w} style={{ display: 'inline-flex', alignItems: 'center', gap: '2.5rem' }}>{w} <i>✦</i></span>))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <section id="about" className="o-section">
        <div className="o-container">
          <div className={styles.aboutGrid}>
            <Reveal className={styles.aboutText}>
              <span className="o-eyebrow">About Prizmora</span>
              <h2 className="o-title">A celebration of <em>strategy, innovation</em> and teamwork.</h2>
              <p>
                Prizmora is a three-day celebration bringing together students and professionals from across the country.
                It is a premier platform for competition, networking and growth.
              </p>
              <p>
                This year, we reach new heights with interactive events, engaging workshops and incredible opportunities —
                every day a new voyage, every voyage a step closer to the destination.
              </p>
              <div className="o-meander" style={{ marginTop: '2rem', maxWidth: 360, marginInline: 0 }} />
            </Reveal>

            <div className={styles.statsGrid}>
              {[
                { n: 3, s: '', l: 'Days at sea' },
                { n: 3, s: '', l: 'Flagship events' },
                { n: 12, s: 'h', l: 'Overnight simulation' },
                { n: 48, s: '', l: 'Teams in CorpEureka' },
              ].map((s, i) => (
                <Reveal key={s.l} delay={i * 0.1}>
                  <div className={`${styles.stat} o-card`}>
                    <div className={styles.statNum}><Counter to={s.n} suffix={s.s} /></div>
                    <div className={styles.statLabel}>{s.l}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VOYAGE ================= */}
      <section id="voyage" className="o-section o-section--deep" style={{ overflow: 'hidden' }}>
        <Stars />
        <div className="o-container" style={{ position: 'relative' }}>
          <Reveal style={{ textAlign: 'center' }}>
            <span className="o-eyebrow">The Voyage</span>
            <h2 className="o-title">Three days. <em>Three voyages.</em></h2>
            <p className="o-lead" style={{ margin: '0 auto' }}>Follow the stars from the first pitch to the final crisis. Each stop on the journey builds on the last.</p>
          </Reveal>

          <div className={styles.timeline}>
            <div className={styles.rail} />
            {VOYAGES.map((v, i) => (
              <Reveal key={v.title} x={i % 2 ? 40 : -40} y={0}>
                <div className={`${styles.stop} ${i % 2 ? styles.right : styles.left}`}>
                  <div className={styles.node}>{v.n}</div>
                  <Link href={v.path} className={`${styles.stopCard} o-glass`}>
                    <span className={styles.tag}>{v.day} · {v.tone}</span>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                    <span className="go">Explore voyage <Icon.Arrow /></span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENTS ================= */}
      <section id="events" className="o-section o-section--mist">
        <div className="o-container">
          <Reveal>
            <span className="o-eyebrow">Events</span>
            <h2 className="o-title">Choose your <em>heading.</em></h2>
            <p className="o-lead">Take on one voyage or all three. Every event is its own adventure, with its own crew, challenges and glory.</p>
          </Reveal>

          <div className={styles.cards}>
            {VOYAGES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.12} style={{ height: '100%' }}>
                <Link href={v.path} className={`${styles.eventCard} o-card`}>
                  <div className={styles.eventTop} style={{ background: v.grad }}>
                    <span className={styles.dayBadge}>{v.day}</span>
                    <Compass size={260} color="#fff" />
                    <div className={styles.eventIcon}>{v.icon}</div>
                  </div>
                  <div className={styles.eventBody}>
                    <span className="o-chip" style={{ width: 'fit-content' }}>{v.tone}</span>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                    <span className={styles.more}>Discover <Icon.Arrow /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="o-section">
        <div className="o-container">
          <Reveal style={{ textAlign: 'center' }}>
            <span className="o-eyebrow">Aboard the fleet</span>
            <h2 className="o-title">Everything a <em>crew</em> needs.</h2>
          </Reveal>
          <div className={styles.features}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className={`${styles.feature} o-card`}>
                  <div className={styles.fIcon}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SPONSORS ================= */}
      <section id="sponsors" className="o-section o-section--deep">
        <div className="o-container" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="o-eyebrow">Our Allies</span>
            <h2 className="o-title">Winds in our <em>sails.</em></h2>
            <p className="o-lead" style={{ margin: '0 auto' }}>The partners who make the voyage possible.</p>
          </Reveal>
          <div className={styles.sponsorGrid}>
            {[1, 2, 3, 4].map(i => (<div key={i} className={styles.sponsor}>Sponsor logo</div>))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="o-section">
        <div className="o-container">
          <Reveal style={{ textAlign: 'center' }}>
            <span className="o-eyebrow">Before you sail</span>
            <h2 className="o-title">Questions, <em>answered.</em></h2>
          </Reveal>
          <div className={styles.faq}>
            {FAQ.map((f, i) => (
              <div key={f.q} className={`${styles.q} ${open === i ? styles.open : ''}`}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  {f.q}
                  <span className={styles.plus}><Icon.Plus /></span>
                </button>
                <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} style={{ overflow: 'hidden' }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <p className={styles.a}>{f.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={styles.cta}>
        <div className={styles.ctaCompass}><Compass size={480} color="#fff" spin /></div>
        <Reveal>
          <span className="o-eyebrow" style={{ color: '#BFDBFE' }}>The tide is turning</span>
          <h2>Set sail with us.</h2>
          <p>Seats on the ship are limited. Pick your events, gather your crew and begin the Odyssey.</p>
          <div className={styles.ctaBtns}>
            <Link href="/register" className="o-btn o-btn--light">Register now <Icon.Arrow /></Link>
            <Link href="/innoventia/startup-registration" className="o-btn o-btn--outline-light">Register a startup</Link>
          </div>
        </Reveal>
        <Waves height={140} colors={['rgba(5,20,51,0.25)', 'rgba(5,20,51,0.5)', '#0A2A6B']} />
      </section>
    </>
  );
}
