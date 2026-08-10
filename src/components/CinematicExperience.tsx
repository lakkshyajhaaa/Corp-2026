'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// MYTHIC PRINT PALETTE
const CREAM = '#f5ebd9';
const CRIMSON = '#d92525';
const BLACK = '#0a0a0a';
// --- UTILITY COMPONENTS ---

const MarqueeBanner = ({ text, bg, color, rotate = 0 }: { text: string, bg: string, color: string, rotate?: number }) => {
  return (
    <div style={{ transform: `rotate(${rotate}deg)`, overflow: 'hidden', width: '110vw', marginLeft: '-5vw', backgroundColor: bg, borderTop: `4px solid ${color}`, borderBottom: `4px solid ${color}`, padding: '1.5rem 0', display: 'flex', whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
      <motion.div
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
        style={{ display: 'flex' }}
      >
        {[...Array(15)].map((_, i) => (
          <span key={i} style={{ color, fontSize: '3.5rem', fontFamily: 'serif', fontWeight: 900, textTransform: 'uppercase', paddingRight: '2rem', letterSpacing: '0.05em' }}>
            {text} <span style={{ paddingLeft: '2rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// --- NATIVE CODE MODELS (KEPT FOR ARCHITECTURE) ---
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

// SVG Icons for Footer
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

// --- THE ORIGINAL EVENT ROSTER ---
const originalEvents = [
  { title: 'Innoventia', desc: 'A bustling marketplace of ideas, startups, and uncharted territories. Present your innovative concepts and compete for seed funding and mentorship.' },
  { title: 'HR Conclave', desc: 'Elite human capital management guiding the way. Participate in intricate case studies, panel discussions, and advanced HR strategy simulations.' },
  { title: 'CorpEureka', desc: 'The climax. An intense overnight strategic simulation. Navigate complex business scenarios under pressure and emerge as the ultimate corporate strategist.' }
];

// --- MAIN COMPONENT ---
export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // EASTER EGG STATE
  const [soldiersOut, setSoldiersOut] = useState(false);
  useMotionValueEvent(smoothScroll, "change", (latest) => {
    // The horse reaches the castle very quickly now (~0.08 scroll progress)
    if (latest > 0.075 && !soldiersOut) setSoldiersOut(true);
    else if (latest <= 0.075 && soldiersOut) setSoldiersOut(false);
  });

  // --- BACKGROUND (Constant Ocean & Ship) ---
  const l1Scale = useTransform(smoothScroll, [0, 1], [1, 1.15]);
  const l1Y = useTransform(smoothScroll, [0, 1], ['5%', '-5%']);
  
  const l2Scale = useTransform(smoothScroll, [0, 1], [1, 0.7]);
  const l2Y = useTransform(smoothScroll, [0, 1], ['0vh', '15vh']);
  const l2Opacity = useTransform(smoothScroll, [0.8, 1], [0.25, 0]);

  // PARALLAX FOR NATIVE CODE MODELS
  const horseX = useTransform(smoothScroll, [0, 0.08, 1], ['0vw', '60vw', '60vw']);
  const krakenRotateLeft = useTransform(smoothScroll, [0.35, 0.55], [-45, 10]);
  const krakenRotateRight = useTransform(smoothScroll, [0.35, 0.55], [45, -10]);
  const krakenY = useTransform(smoothScroll, [0.35, 0.55], ['300px', '-50px']);
  const cyclopsY = useTransform(smoothScroll, [0.5, 0.8], ['100px', '-50px']);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', backgroundColor: BLACK }}>
      


      {/* 1. FIXED BACKGROUND PARALLAX */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <motion.div style={{ position: 'absolute', inset: -50, scale: l1Scale, y: l1Y, zIndex: 1, mixBlendMode: 'screen', opacity: 0.1 }}>
          <Image src="/linocut_1.jpg" alt="Waves" fill style={{ objectFit: 'cover', objectPosition: 'bottom' }} priority quality={100} />
        </motion.div>

        <motion.div style={{ position: 'absolute', inset: -50, zIndex: 2, scale: l2Scale, y: l2Y, opacity: l2Opacity, mixBlendMode: 'screen' }}>
          <motion.div animate={{ y: ['-2%', '2%', '-2%'], rotate: [-1, 1, -1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '100%', height: '100%' }}>
            <Image src="/linocut_2.jpg" alt="Ship" fill style={{ objectFit: 'cover' }} priority quality={100} />
          </motion.div>
        </motion.div>
        
        {/* Heavy vignette to ensure text readability */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, background: 'radial-gradient(circle at center, rgba(10, 10, 10, 0.6) 0%, rgba(10, 10, 10, 0.95) 100%)' }} />
      </div>

      {/* 2. SCROLLING CONTENT SECTIONS */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* HERO SECTION */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '100px' }}>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', letterSpacing: '0.2em', marginTop: '1rem', fontWeight: 700, color: CRIMSON, textTransform: 'uppercase', backgroundColor: BLACK, padding: '0.5rem 1rem' }}>
            The Annual Event
          </p>
          <h1 style={{ fontSize: 'clamp(6rem, 18vw, 16rem)', letterSpacing: '-0.05em', margin: 0, fontFamily: 'serif', color: CREAM, textTransform: 'uppercase', textShadow: `8px 8px 0 ${CRIMSON}` }}>
            PRIZMORA
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${CREAM}`, borderRadius: '50px', padding: '1rem 3rem', marginTop: '2rem', backgroundColor: BLACK }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: CREAM, letterSpacing: '0.15em', lineHeight: 1, paddingTop: '0.2rem' }}>1-3 SEPTEMBER 2026</span>
          </div>
          
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4rem', padding: '1.5rem 5rem', backgroundColor: CREAM, color: BLACK, border: 'none', cursor: 'pointer', pointerEvents: 'auto', letterSpacing: '0.2em', fontWeight: 900, textTransform: 'uppercase', fontSize: '1.5rem', lineHeight: 1, boxShadow: `6px 6px 0 ${CRIMSON}`, transition: 'transform 0.1s' }}>
            <span style={{ paddingTop: '0.2rem' }}>REGISTER</span>
          </button>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" style={{ minHeight: '130vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '10% 0' }}>
          <div style={{ position: 'absolute', top: '15%', left: 0, width: '100%', zIndex: 0, transform: 'rotate(-3deg)' }}>
            
            <div style={{ position: 'absolute', top: '-75px', left: '0', width: '100%', height: '80px', zIndex: 20 }}>
              
              {/* HORSE */}
              <motion.div style={{ x: horseX, width: '80px', height: '80px', position: 'absolute', bottom: 0, left: '10vw' }}>
                <Image src="/icon_horse_transparent.png" alt="Horse" fill style={{ objectFit: 'contain' }} />
                
                {/* EASTER EGG SOLDIERS */}
                <AnimatePresence>
                  {soldiersOut && (
                    <div style={{ position: 'absolute', bottom: '0px', left: '20px', fontSize: '1.5rem', color: CRIMSON, textShadow: `1px 1px 0 ${CREAM}` }}>
                      {[...Array(14)].map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 0, y: -40, scale: 0.5 }}
                          animate={{ opacity: 1, x: 20 + i * 20, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ type: 'spring', bounce: 0.3, delay: i * 0.15 }}
                          style={{ position: 'absolute', bottom: 0 }}
                        >
                          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.4 + (i%2)*0.1, delay: i * 0.15 }}>
                            ♟
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* CASTLE */}
              <div style={{ width: '120px', height: '120px', position: 'absolute', bottom: 0, left: '72vw' }}>
                <Image src="/icon_castle_transparent.png" alt="Castle" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>

            <MarqueeBanner text="ABOUT US" bg={BLACK} color={CRIMSON} rotate={0} />
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '10% 10%', maxWidth: '1600px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
            <div style={{ flex: 1, minWidth: '400px', paddingRight: '4rem', backgroundColor: 'rgba(10, 10, 10, 0.85)', padding: '4rem', backdropFilter: 'blur(10px)', border: `2px solid ${CRIMSON}`, boxShadow: `8px 8px 0 ${CRIMSON}` }}>
              <h2 style={{ fontSize: '4rem', color: CREAM, fontFamily: 'serif', marginBottom: '2rem', textTransform: 'uppercase', borderBottom: `4px solid ${CRIMSON}`, paddingBottom: '1rem' }}>About Us</h2>
              <p style={{ fontSize: '1.5rem', color: CREAM, lineHeight: 1.8, fontWeight: 400, textAlign: 'justify' }}>
                Prizmora is a three-day celebration of strategy, innovation, and teamwork. Bringing together students and professionals from across the country, it is a premier platform for competition, networking, and growth. This year, we reach new heights with interactive events, engaging workshops, and incredible opportunities to showcase your talent.
              </p>
            </div>
            <div style={{ flex: 1, minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '4rem' }}>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ width: '60%', height: '350px', backgroundColor: 'rgba(245, 235, 217, 0.15)', border: `4px solid ${CREAM}`, transform: 'rotate(2deg)' }} />
                <div style={{ width: '40%', height: '350px', backgroundColor: 'rgba(217, 37, 37, 0.15)', border: `4px solid ${CRIMSON}`, transform: 'rotate(-2deg)' }} />
              </div>
              <div style={{ width: '100%', height: '250px', backgroundColor: 'rgba(245, 235, 217, 0.15)', border: `4px solid ${CREAM}`, transform: 'rotate(1deg)' }} />
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" style={{ minHeight: '130vh', padding: '10% 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          
          <div style={{ position: 'relative', width: '100%', zIndex: 0 }}>
            <MarqueeBanner text="EVENTS" bg={CREAM} color={CRIMSON} rotate={0} />
          </div>
          
          <div style={{ position: 'relative', marginTop: '6rem', width: '100%' }}>
            
            {/* TENTACLE BEHIND CARDS */}
            <motion.div style={{ position: 'absolute', left: '-5%', bottom: '-15%', width: '700px', height: '700px', zIndex: 5, pointerEvents: 'none', rotate: krakenRotateLeft, y: krakenY }}>
               <Image src="/single_tentacle_transparent.png" alt="Tentacle" fill style={{ objectFit: 'contain', transform: 'scaleX(-1)' }} />
            </motion.div>
            
            {/* TENTACLE IN FRONT OF CARDS */}
            <motion.div style={{ position: 'absolute', right: '-5%', top: '-25%', width: '800px', height: '800px', zIndex: 15, pointerEvents: 'none', rotate: krakenRotateRight, y: krakenY,
              filter: 'drop-shadow(-20px 20px 30px rgba(0,0,0,0.9))'
            }}>
               <Image src="/single_tentacle_transparent.png" alt="Tentacle" fill style={{ objectFit: 'contain' }} />
            </motion.div>

            <div style={{ display: 'flex', overflowX: 'auto', padding: '4rem 10%', gap: '4rem', cursor: 'grab', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', position: 'relative', zIndex: 10 }}>
              {originalEvents.map((event, i) => (
                <div key={i} style={{ minWidth: '450px', backgroundColor: CREAM, padding: '2rem', border: `4px solid ${CRIMSON}`, boxShadow: `12px 12px 0 ${CRIMSON}` }}>
                  <div style={{ width: '100%', height: '300px', backgroundColor: BLACK, marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <span style={{ fontSize: '4rem', opacity: 0.5 }}>{['💡', '🤝', '⚡'][i]}</span>
                  </div>
                  <h4 style={{ color: BLACK, fontSize: '2.5rem', fontFamily: 'serif', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 900 }}>{event.title}</h4>
                  <p style={{ color: BLACK, fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 600 }}>{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPONSORS SECTION */}
        <section id="sponsors" style={{ minHeight: '100vh', padding: '10% 5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '25%', left: '0', width: '100%', zIndex: 0, transform: 'rotate(-5deg)' }}>
            <div style={{ position: 'absolute', top: '-75px', left: '50%', x: '-50%', height: '80px', display: 'flex', alignItems: 'flex-end', zIndex: 20 }}>
              <motion.div style={{ y: cyclopsY, width: '100px', height: '100px', position: 'relative' }}>
                <Image src="/icon_cyclops_transparent.png" alt="Cyclops" fill style={{ objectFit: 'contain' }} />
              </motion.div>
            </div>
            <MarqueeBanner text="OUR SPONSORS" bg={BLACK} color={CREAM} rotate={0} />
          </div>
          
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', marginTop: '15rem', zIndex: 1 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ width: '300px', height: '150px', border: `4px dashed ${CREAM}`, backgroundColor: 'rgba(10, 10, 10, 0.6)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: CREAM, opacity: 0.9, fontSize: '1.8rem', fontWeight: 800 }}>
                SPONSOR LOGO
              </div>
            ))}
          </div>
        </section>



      </div>
    </div>
  );
}
