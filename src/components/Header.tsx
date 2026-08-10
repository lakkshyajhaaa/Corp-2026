import Link from 'next/link';

const CREAM = '#f5ebd9';
const CRIMSON = '#d92525';
const BLACK = '#0a0a0a';

export default function Header() {
  return (
    <nav style={{ position: 'fixed', top: 0, width: '100vw', zIndex: 1000, backgroundColor: CREAM, padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${CRIMSON}`, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 900, color: CRIMSON, letterSpacing: '0.1em', textShadow: `2px 2px 0 ${BLACK}`, lineHeight: 1 }}>PRIZMORA</div>
      </Link>
      <div style={{ display: 'flex', gap: '3rem', fontWeight: 800, color: BLACK, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {['About', 'Events', 'Gallery', 'Sponsors', 'Team'].map(link => {
          const href = link === 'Team' ? '/our-team' : link === 'Gallery' ? '/gallery' : `/#${link.toLowerCase()}`;
          return (
            <Link key={link} href={href} style={{ color: BLACK, textDecoration: 'none', transition: 'color 0.2s' }}>{link}</Link>
          );
        })}
      </div>
    </nav>
  );
}
