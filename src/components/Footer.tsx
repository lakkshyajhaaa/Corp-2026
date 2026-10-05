import Link from 'next/link';
import { Compass, Waves } from './Odyssey';
import { Icon } from './icons';
import styles from './chrome.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.wavesTop}><Waves colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.35)', '#FFFFFF']} height={90} /></div>

        <div className={styles.grid}>
          <div>
            <div className={styles.fBrand}><Compass size={42} spin color="#60A5FA" /> PRIZMORA</div>
            <p className={styles.tag}>Three days of strategy, innovation and teamwork. Chart your course, conquer the voyage.</p>
          </div>

          <div>
            <h4 className={styles.colTitle}>Explore</h4>
            <div className={styles.colLinks}>
              <Link href="/#about">About</Link>
              <Link href="/#voyage">The Voyage</Link>
              <Link href="/#events">Events</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/our-team">Team</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Voyages</h4>
            <div className={styles.colLinks}>
              <Link href="/innoventia">Innoventia</Link>
              <Link href="/hr-conclave">HR Conclave</Link>
              <Link href="/corpeureka">CorpEureka</Link>
              <Link href="/register">Register</Link>
              <Link href="/login">Team Portal</Link>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactRow}><span className="ic"><Icon.Phone /></span>+91 98765 43210</div>
            <div className={styles.contactRow}><span className="ic"><Icon.Mail /></span>contact@prizmora.edu</div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© PRIZMORA 2026. All rights reserved.</span>
          <span>Made with care by Team Prizmora</span>
        </div>
        <div className={styles.bigWord} aria-hidden>ODYSSEY</div>
      </div>
    </footer>
  );
}
