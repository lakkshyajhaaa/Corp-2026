'use client';

const CREAM = '#f5ebd9';
const CRIMSON = '#d92525';
const BLACK = '#0a0a0a';

const CodePillars = ({ flip = false }: { flip?: boolean }) => (
  <div style={{ width: '200px', height: '100%', display: 'flex', gap: '20px', padding: '0 20px', transform: flip ? 'scaleX(-1)' : 'none' }}>
    {[1, 2, 3].map(i => (
      <div key={i} style={{ flex: 1, height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Capital (Top) */}
        <div style={{ height: '40px', width: '140%', marginLeft: '-20%', backgroundColor: BLACK, border: `4px solid ${CREAM}`, borderRadius: '5px 5px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5px' }}>
           <div style={{ width: '15px', height: '15px', borderRadius: '50%', border: `2px solid ${CREAM}` }}/>
           <div style={{ width: '15px', height: '15px', borderRadius: '50%', border: `2px solid ${CREAM}` }}/>
        </div>
        {/* Shaft (Fluted) */}
        <div style={{ flex: 1, width: '100%', backgroundColor: BLACK, borderLeft: `4px solid ${CREAM}`, borderRight: `4px solid ${CREAM}`,
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, ${CREAM} 10px, ${CREAM} 12px)`
        }} />
        {/* Base (Bottom) */}
        <div style={{ height: '30px', width: '160%', marginLeft: '-30%', backgroundColor: BLACK, border: `4px solid ${CREAM}`, borderRadius: '10px 10px 0 0' }} />
      </div>
    ))}
  </div>
);

export default function OurTeamPage() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#000' }}>


      <section style={{ minHeight: '100vh', padding: '10% 10%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(10, 10, 10, 0.8)', position: 'relative', borderTop: `4px solid ${CRIMSON}` }}>
        <div style={{ position: 'absolute', top: 0, left: '2%', bottom: 0, pointerEvents: 'none' }}>
           <CodePillars />
        </div>
        <div style={{ position: 'absolute', top: 0, right: '2%', bottom: 0, pointerEvents: 'none' }}>
           <CodePillars flip />
        </div>

        <h2 style={{ fontSize: '6rem', color: CREAM, fontFamily: 'serif', marginBottom: '5rem', textTransform: 'uppercase', textShadow: `6px 6px 0 ${CRIMSON}`, position: 'relative', zIndex: 2 }}>
          MEET THE TEAM
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', width: '100%', maxWidth: '1400px', position: 'relative', zIndex: 2 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: BLACK, border: `2px solid ${CREAM}`, padding: '1.5rem', boxShadow: `6px 6px 0 ${CRIMSON}` }}>
              <div style={{ width: '100%', aspectRatio: '1', backgroundColor: 'rgba(245, 235, 217, 0.1)', marginBottom: '1.5rem' }} />
              <span style={{ color: CREAM, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.2rem' }}>Member {i}</span>
              <span style={{ color: CRIMSON, fontSize: '1rem', fontWeight: 700, marginTop: '0.5rem' }}>COORDINATOR</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
