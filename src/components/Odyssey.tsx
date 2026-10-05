'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ---------------------------------------------------------
   Shared Odyssey building blocks: waves, stars, compass,
   ship, reveal-on-scroll and animated counters.
   --------------------------------------------------------- */

const WAVE_PATH =
  'M0,100 C240,40 480,40 720,100 C960,160 1200,160 1440,100 C1680,40 1920,40 2160,100 C2400,160 2640,160 2880,100 V200 H0 Z';

export function Waves({
  colors = ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.6)', '#FFFFFF'],
  height = 200,
}: {
  colors?: string[];
  height?: number;
}) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden>
      {colors.map((fill, i) => (
        <svg
          key={i}
          viewBox="0 0 2880 200"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '200%',
            height: `${100 - i * 14}%`,
            animation: `o-wave-slide ${22 - i * 5}s linear infinite${i % 2 ? ' reverse' : ''}`,
          }}
        >
          <path d={WAVE_PATH} fill={fill} />
        </svg>
      ))}
    </div>
  );
}

// Deterministic star field (no Math.random → no hydration mismatch)
const STARS = Array.from({ length: 70 }, (_, i) => {
  const a = (i * 9301 + 49297) % 233280;
  const b = (i * 7919 + 12345) % 233280;
  const c = (i * 104729) % 100;
  return { x: (a / 233280) * 100, y: (b / 233280) * 78, s: 1 + (c % 3), d: (c % 50) / 10, t: 2.5 + (c % 40) / 10 };
});

export function Stars() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
      {STARS.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 6px rgba(191,219,254,0.9)',
            animation: `o-twinkle ${s.t}s ease-in-out ${s.d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Compass({ size = 40, spin = false, color = 'currentColor' }: { size?: number; spin?: boolean; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="2"
      style={spin ? { animation: 'o-spin-slow 40s linear infinite' } : undefined}
      aria-hidden
    >
      <circle cx="32" cy="32" r="29" />
      <circle cx="32" cy="32" r="22" strokeDasharray="2 5" opacity=".6" />
      <path d="M32 4v8M32 52v8M4 32h8M52 32h8" strokeLinecap="round" />
      <path d="M32 14l6 18-6 18-6-18z" fill={color} fillOpacity=".18" />
      <path d="M14 32l18-6 18 6-18 6z" fill={color} fillOpacity=".1" />
      <circle cx="32" cy="32" r="2.5" fill={color} />
    </svg>
  );
}

export function Ship({ width = 340 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 340 300" fill="none" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="sail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#0A2A6B" />
        </linearGradient>
      </defs>
      {/* mast */}
      <rect x="166" y="24" width="6" height="190" rx="3" fill="#DBEAFE" />
      <path d="M169 24l40-8-40-8z" fill="#60A5FA" />
      {/* main sail */}
      <path d="M176 40c70 22 108 78 112 142-40 8-84 8-112 0z" fill="url(#sail)" opacity=".96" />
      <path d="M176 70c40 14 66 48 74 88" stroke="#93C5FD" strokeWidth="1.5" opacity=".7" />
      <path d="M176 100c28 12 46 36 54 62" stroke="#93C5FD" strokeWidth="1.5" opacity=".7" />
      {/* fore sail */}
      <path d="M160 58C112 82 84 128 82 182c28 6 56 4 78-2z" fill="url(#sail)" opacity=".88" />
      {/* crest */}
      <circle cx="226" cy="132" r="14" fill="none" stroke="#2563EB" strokeWidth="2.5" />
      <path d="M226 121v22M215 132h22" stroke="#2563EB" strokeWidth="2" />
      {/* hull */}
      <path d="M40 206h262c-14 42-52 68-96 68h-70c-44 0-82-26-96-68z" fill="url(#hull)" />
      <path d="M52 218h238" stroke="#BFDBFE" strokeWidth="2" opacity=".7" />
      <path d="M302 206c12-6 22-18 26-34-14 2-26 10-34 22z" fill="#1D4ED8" />
      {[88, 128, 168, 208, 248].map(x => (
        <circle key={x} cx={x} cy="236" r="6" fill="#DBEAFE" opacity=".85" />
      ))}
    </svg>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = '', duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}
