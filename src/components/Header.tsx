'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Compass } from './Odyssey';
import styles from './chrome.module.css';

const LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Voyage', href: '/#voyage' },
  { label: 'Events', href: '/#events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Sponsors', href: '/#sponsors' },
  { label: 'Team', href: '/our-team' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Pages that open on a dark hero get a transparent, light-text header
  const overHero = pathname === '/' || ['/innoventia', '/hr-conclave', '/corpeureka', '/gallery', '/our-team', '/login', '/register', '/innoventia/startup-registration'].includes(pathname);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${overHero ? styles.overHero : ''}`} style={{ marginBottom: overHero ? 'calc(var(--header-h) * -1)' : 0 }}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Prizmora home">
          <span className={styles.brandMark}><Compass size={34} spin /></span>
          PRIZMORA
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {LINKS.map(l => (
            <Link key={l.label} href={l.href} className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}>{l.label}</Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Link href="/register" className="o-btn o-btn--primary">Student Reg</Link>
          <Link href="/innoventia/startup-registration" className={`o-btn ${scrolled || !overHero ? 'o-btn--ghost' : 'o-btn--outline-light'}`}>Startup Reg</Link>
        </div>

        <button className={`${styles.burger} ${open ? styles.open : ''}`} onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
          <span />
        </button>
      </div>

      <div className={`${styles.drawer} ${open ? styles.open : ''}`}>
        {LINKS.map(l => (<Link key={l.label} href={l.href} className="dlink">{l.label}</Link>))}
        <div className={styles.drawerCta}>
          <Link href="/register" className="o-btn o-btn--primary">Student Reg</Link>
          <Link href="/innoventia/startup-registration" className="o-btn o-btn--ghost">Startup Reg</Link>
        </div>
      </div>

      <motion.div className={styles.progress} style={{ scaleX: progress, width: '100%' }} />
    </header>
  );
}
