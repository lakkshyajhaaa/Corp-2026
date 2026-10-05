'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHero from '@/components/PageHero';
import { Compass, Reveal } from '@/components/Odyssey';
import styles from './gallery.module.css';

const FILTERS = ['All', 'Innoventia', 'HR Conclave', 'CorpEureka'] as const;
const GRADS = [
  'linear-gradient(135deg,#60A5FA,#1D4ED8)',
  'linear-gradient(135deg,#3B82F6,#0A2A6B)',
  'linear-gradient(135deg,#93C5FD,#2563EB)',
  'linear-gradient(135deg,#1D4ED8,#051433)',
];
const ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  event: FILTERS[(i % 3) + 1],
  title: `Moment ${i + 1}`,
  height: [260, 340, 300, 380][i % 4],
  grad: GRADS[i % 4],
}));

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const [active, setActive] = useState<(typeof ITEMS)[number] | null>(null);
  const shown = ITEMS.filter(i => filter === 'All' || i.event === filter);

  return (
    <>
      <PageHero eyebrow="The Archives" title="GALLERY" lead="A visual chronicle of past conquests, innovations and legendary moments." />
      <section className="o-section">
        <div className="o-container">
          <div className={styles.filters}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`o-chip ${filter === f ? 'o-chip--active' : ''}`}>{f}</button>
            ))}
          </div>

          <div className={styles.grid}>
            {shown.map((it, i) => (
              <Reveal key={it.id} delay={(i % 3) * 0.08}>
                <button className={styles.item} onClick={() => setActive(it)} aria-label={`Open ${it.title}`}>
                  <div className={styles.art} style={{ height: it.height, background: it.grad }}><Compass size={90} color="#fff" /></div>
                  <div className={styles.cap}><small>{it.event}</small><strong>{it.title}</strong></div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div className={styles.lightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div className={styles.lbInner} initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()}>
              <button className={styles.close} onClick={() => setActive(null)} aria-label="Close">×</button>
              <div className={styles.lbArt} style={{ background: active.grad }}><Compass size={160} color="#fff" spin /></div>
              <div className={styles.lbBar}><strong>{active.title}</strong><span className="o-chip">{active.event}</span></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
