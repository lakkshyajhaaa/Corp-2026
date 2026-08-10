import Link from 'next/link';

const CREAM = '#f5ebd9';
const CRIMSON = '#d92525';
const BLACK = '#0a0a0a';

// SVG Icons for Footer
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

export default function Footer() {
  return (
    <>
      {/* PRE-FOOTER BANNER */}
      <div style={{ position: 'relative', zIndex: 20, width: '100%', padding: '6rem 0', backgroundColor: CRIMSON, borderTop: `4px solid ${CREAM}`, borderBottom: `4px solid ${CREAM}`, textAlign: 'center', overflow: 'hidden' }}>
        <h2 style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', color: BLACK, fontFamily: 'serif', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
          SAIL. CONQUER. REPEAT.
        </h2>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: CREAM, padding: '5rem 5%', color: BLACK, position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1600px', margin: '0 auto', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, minWidth: '300px' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontWeight: 800, letterSpacing: '0.05em', fontSize: '1.2rem' }}>
              {['About', 'Events', 'Gallery', 'Sponsors', 'Team'].map(link => {
                const href = link === 'Team' ? '/our-team' : link === 'Gallery' ? '/gallery' : `/#${link.toLowerCase()}`;
                return (
                  <Link key={link} href={href} style={{ color: BLACK, textDecoration: 'none', cursor: 'pointer' }}>{link}</Link>
                );
              })}
            </nav>
            <div style={{ fontSize: '1.1rem', color: BLACK, fontWeight: 600, marginTop: '2rem' }}>
              Made with <span style={{ color: CRIMSON }}>❤️</span> by Team Prizmora
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '4.5rem', margin: 0, fontFamily: 'serif', letterSpacing: '0.1em', fontWeight: 900, color: CRIMSON }}>PRIZMORA</h2>
            <span style={{ fontSize: '1.1rem', color: BLACK, fontWeight: 600 }}>PRIZMORA 2026. All Rights Reserved.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2rem', flex: 1, minWidth: '300px', textAlign: 'right' }}>
            <div style={{ fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Contact Us</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: BLACK, fontSize: '1.1rem' }}>
              <span>+91 98765 43210</span><PhoneIcon />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600, color: BLACK, fontSize: '1.1rem' }}>
              <span>contact@prizmora.edu</span><MailIcon />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
