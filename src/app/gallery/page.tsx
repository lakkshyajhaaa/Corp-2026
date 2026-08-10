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

export default function GalleryPage() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#000' }}>


      <section style={{ minHeight: '100vh', padding: '15% 10%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(10, 10, 10, 0.8)', position: 'relative', borderTop: `4px solid ${CRIMSON}` }}>
        <div style={{ position: 'absolute', top: 0, left: '2%', bottom: 0, pointerEvents: 'none', opacity: 0.5 }}>
           <CodePillars />
        </div>
        <div style={{ position: 'absolute', top: 0, right: '2%', bottom: 0, pointerEvents: 'none', opacity: 0.5 }}>
           <CodePillars flip />
        </div>

        <h2 style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', color: CREAM, fontFamily: 'serif', marginBottom: '1rem', textTransform: 'uppercase', textShadow: `6px 6px 0 ${CRIMSON}`, position: 'relative', zIndex: 2, textAlign: 'center' }}>
          THE ARCHIVES
        </h2>
        <p style={{ color: CREAM, fontSize: '1.2rem', letterSpacing: '0.1em', marginBottom: '4rem', opacity: 0.8, textAlign: 'center', maxWidth: '600px', zIndex: 2 }}>
          A visual chronicle of past conquests, innovations, and legendary moments at Prizmora.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1400px', position: 'relative', zIndex: 2 }}>
          {/* PLACEHOLDER GALLERY ITEMS */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
            <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                backgroundColor: BLACK, 
                border: `3px solid ${CREAM}`, 
                boxShadow: `8px 8px 0 ${CRIMSON}`,
                overflow: 'hidden',
                aspectRatio: i % 3 === 0 ? '16/9' : '1/1' // Mix of square and landscape
              }}>
              <div style={{ 
                  flex: 1, 
                  backgroundColor: 'rgba(245, 235, 217, 0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundImage: `radial-gradient(circle at center, rgba(245, 235, 217, 0.1) 0%, transparent 70%)`
                }}>
                <span style={{ color: CREAM, opacity: 0.3, fontFamily: 'serif', fontSize: '2rem', fontStyle: 'italic' }}>
                  Image {i}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
