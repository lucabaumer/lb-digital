'use client';

import React, { type CSSProperties, type ReactNode, useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;
const Y  = '#EAB308';
const BG = '#07080F';

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'Elektroinstallation',
    desc: 'Neubau, Umbau, Sanierung. Normgerechte Installation für Wohn- und Geschäftsgebäude.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
  {
    title: 'Smart Home',
    desc: 'KNX, Loxone, Digitalstrom. Intelligente Haussteuerung — Licht, Heizung, Sicherheit.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    title: 'Photovoltaik',
    desc: 'Planung, Installation und Wartung von PV-Anlagen inkl. Speicher und Wallbox.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  },
  {
    title: 'Gewerbe & Industrie',
    desc: 'Schaltschrankbau, Maschinenverkabelung, Mess- und Steuerungstechnik für Betriebe.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
  {
    title: 'Notdienst 24/7',
    desc: 'Stromausfall, Kurzschluss, defekte Sicherung. Wir sind innerhalb von 60 Minuten bei Ihnen.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>,
    accent: true,
  },
  {
    title: 'Wartung & Prüfung',
    desc: 'DGUV V3, VDE-Prüfung, E-Check. Regelmäßige Prüfung für Sicherheit und Versicherungsschutz.',
    icon: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  },
];

const STATS = [
  { value: 37,   suffix: '',   label: 'Jahre Erfahrung',   sub: 'gegründet 1987' },
  { value: 1800, suffix: '+',  label: 'Projekte',          sub: 'in der Region Freiburg' },
  { value: 24,   suffix: '/7', label: 'Notdienst',         sub: 'immer erreichbar' },
  { value: 98,   suffix: '%',  label: 'Weiterempfehlung',  sub: 'laut Kundenumfrage' },
];

const PROJECTS = [
  { title: 'Neubau Wohnanlage',       location: 'Freiburg-Wiehre',       tag: 'Elektroinstallation', img: 'linear-gradient(135deg,#0F1520 0%,#162030 100%)' },
  { title: 'Smart Home Villenausbau', location: 'Kirchzarten',           tag: 'KNX / Loxone',        img: 'linear-gradient(135deg,#0F1820 0%,#0F2820 100%)' },
  { title: 'PV-Anlage 48 kWp',        location: 'Breisach',              tag: 'Photovoltaik',        img: 'linear-gradient(135deg,#201508 0%,#1A2010 100%)' },
  { title: 'Schaltschrankbau',        location: 'Industriegebiet Nord',  tag: 'Gewerbe',             img: 'linear-gradient(135deg,#151015 0%,#0F1020 100%)' },
  { title: 'Dachgeschossausbau',      location: 'Freiburg-Betzenhausen', tag: 'Sanierung',           img: 'linear-gradient(135deg,#0A1020 0%,#141820 100%)' },
  { title: 'Wallbox-Montage ×12',     location: 'Tiefgarage Mitte',      tag: 'E-Mobilität',        img: 'linear-gradient(135deg,#101020 0%,#080F18 100%)' },
];

const TESTIMONIALS = [
  { name: 'Michael Brenner', role: 'Bauherr, Freiburg-Herdern',       stars: 5, text: 'KERN hat unseren Neubau komplett verkabelt. Sauber, pünktlich, kein einziger Nachbesserungsbedarf. Klare Weiterempfehlung.' },
  { name: 'Sandra Kühle',    role: 'Betreiberin, Café Zentrum',       stars: 5, text: 'Kurzschluss am Samstagabend — ein Anruf, und in 45 Minuten war alles behoben. Der Notdienst hat uns gerettet.' },
  { name: 'Thomas Weiß',     role: 'Gewerbeimmobilie Güterbahnhof',  stars: 5, text: 'Schaltschrankbau für unsere Werkshalle: technisch einwandfrei, termingerecht und absolut transparent in der Kommunikation.' },
];

// ─── Effect 1: Text Scramble ──────────────────────────────────────────────────

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

function useTextScramble(finalText: string, trigger: boolean, duration = 1800) {
  const [display, setDisplay] = useState('');
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const len = finalText.length;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const resolved = Math.floor(progress * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        if (finalText[i] === ' ') { out += ' '; continue; }
        if (i < resolved) { out += finalText[i]; continue; }
        const slow = 1 - (i - resolved) / (len - resolved + 1);
        out += Math.random() < slow * 0.4
          ? finalText[i]
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setDisplay(out);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [trigger, finalText, duration]);

  return display || finalText;
}

// ─── Effect 3: Directional Fill Button ────────────────────────────────────────

type Dir = 'top' | 'bottom' | 'left' | 'right';
const FILL_INIT: Record<Dir, string> = {
  top:    'translateY(-102%)',
  bottom: 'translateY(102%)',
  left:   'translateX(-102%)',
  right:  'translateX(102%)',
};

function getDir(e: React.MouseEvent<HTMLElement>): Dir {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  * 2 - 1;
  const y = (e.clientY - r.top)  / r.height * 2 - 1;
  return Math.abs(x) > Math.abs(y) ? (x < 0 ? 'left' : 'right') : (y < 0 ? 'top' : 'bottom');
}

function DFButton({ children, href, variant = 'primary', className, style, onClick }: {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const [fill, setFill] = useState<{ dir: Dir; active: boolean }>({ dir: 'bottom', active: false });

  const fillBg = variant === 'primary' ? 'rgba(0,0,0,0.18)' : Y;
  const textColor = variant === 'ghost' && fill.active ? '#07080F' : undefined;

  const shared = {
    className,
    style: { position: 'relative' as const, overflow: 'hidden', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', ...style, color: textColor ?? (style?.color) },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => setFill({ dir: getDir(e), active: true }),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => setFill({ dir: getDir(e), active: false }),
    whileTap: { scale: 0.97 as number },
    animate: { color: textColor ?? (style?.color as string ?? 'inherit') },
    transition: { duration: 0.2 },
    onClick,
  };

  const inner = (
    <>
      <motion.span aria-hidden="true"
        style={{ position:'absolute', inset:0, background:fillBg, zIndex:0,
          transform: FILL_INIT[fill.dir] }}
        animate={{ transform: fill.active ? 'translate(0%,0%)' : FILL_INIT[fill.dir] }}
        transition={{ duration: 0.38, ease: EASE }} />
      <span style={{ position:'relative', zIndex:1, display:'inherit', alignItems:'inherit', gap:'inherit', pointerEvents:'none' }}>{children}</span>
    </>
  );

  if (href) return <motion.a href={href} {...shared}>{inner}</motion.a>;
  return <motion.button {...shared}>{inner}</motion.button>;
}

// ─── Effect 4: Odometer Counter ───────────────────────────────────────────────

function OdometerDigit({ digit, delay, inView }: { digit: string; delay: number; inView: boolean }) {
  const isNum = /\d/.test(digit);

  if (!isNum) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay }}
        style={{ display: 'inline-block' }}
      >
        {digit}
      </motion.span>
    );
  }

  const target = parseInt(digit, 10);
  return (
    <span style={{ display:'inline-block', overflow:'hidden', height:'1em', verticalAlign:'bottom' }}>
      <motion.span
        style={{ display:'flex', flexDirection:'column' }}
        initial={{ y: 0 }}
        animate={inView ? { y: `-${target}em` } : {}}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ display:'block', height:'1em', lineHeight:1 }}>{i}</span>
        ))}
      </motion.span>
    </span>
  );
}

function OdometerCounter({ value, suffix = '' }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const digits = [...String(value).split(''), ...suffix.split('')];
  return (
    <div ref={ref} style={{ display:'inline-flex', alignItems:'baseline' }}>
      {digits.map((ch, i) => (
        <OdometerDigit key={i} digit={ch} delay={inView ? i * 0.07 + 0.1 : 999} inView={inView} />
      ))}
    </div>
  );
}

// ─── Effect 5: Curtain Reveal ─────────────────────────────────────────────────

function CurtainReveal({ children, delay = 0, className, style }: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

// ─── Effect 6: Spotlight Border Card ─────────────────────────────────────────

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const [angle, setAngle] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return;
    const clientX = e.clientX; const clientY = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        const dx = clientX - (r.left + r.width  / 2);
        const dy = clientY - (r.top  + r.height / 2);
        setAngle(((Math.atan2(dy, dx) * 180 / Math.PI) + 90 + 360) % 360);
      }
      rafRef.current = null;
    });
  };

  const borderGrad = angle !== null
    ? `conic-gradient(from ${angle - 35}deg at 50% 50%, transparent 0deg, ${Y}70 35deg, ${Y} 70deg, ${Y}70 105deg, transparent 110deg, transparent 360deg)`
    : 'none';

  return (
    <motion.div
      ref={cardRef}
      className="group relative p-7 rounded-2xl cursor-default"
      style={{
        background: s.accent ? `${Y}08` : 'rgba(255,255,255,0.02)',
      }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setAngle(null); }}
    >
      {/* Spotlight border via conic-gradient + inner mask */}
      <motion.div aria-hidden="true"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ position:'absolute', inset:0, borderRadius:'inherit', background:borderGrad, zIndex:0, pointerEvents:'none' }} />
      {/* Static fallback border */}
      <div aria-hidden="true"
        style={{ position:'absolute', inset:0, borderRadius:'inherit',
          boxShadow: s.accent ? `inset 0 0 0 1px ${Y}30` : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
          zIndex:0, pointerEvents:'none' }} />
      {/* Inner mask — 1px gap shows only the gradient border */}
      <div aria-hidden="true"
        style={{ position:'absolute', inset:1, borderRadius:'calc(1rem - 1px)',
          background: s.accent ? '#0D0E18' : BG, zIndex:1, pointerEvents:'none' }} />

      {/* Content */}
      <div style={{ position:'relative', zIndex:2 }}>
        {s.accent && (
          <div className="absolute top-0 right-0 -translate-y-1">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: Y }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: Y }} />
            </span>
          </div>
        )}
        <div className="mb-5 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`${Y}15`, color:Y }}>
          {s.icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily:'var(--font-bricolage)' }}>
          {s.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color:'#525252' }}>{s.desc}</p>
        <div className="mt-5 text-xs font-semibold flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300" style={{ color:Y }}>
          Mehr erfahren
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={Y} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
        </svg>
      ))}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(7,8,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'background 0.5s, backdrop-filter 0.5s, border-color 0.5s',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}>
      <div className="container-xl flex items-center justify-between h-16 px-4">

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: Y }}>
            <svg width="14" height="14" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <span className="font-extrabold text-white text-sm tracking-tight" style={{ fontFamily:'var(--font-bricolage)' }}>
            KERN <span className="font-normal text-neutral-500">Elektrotechnik</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-7 text-xs font-medium text-neutral-400">
          {['Leistungen', 'Referenzen', 'Über uns', 'Kontakt'].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace('ü','u').replace(' ','-')}`}
              style={{ position:'relative', paddingBottom:3 }}
              className="hover:text-white transition-colors duration-200"
              onMouseEnter={() => setHoveredNav(l)}
              onMouseLeave={() => setHoveredNav(null)}>
              {l}
              <AnimatePresence>
                {hoveredNav === l && (
                  <motion.span layoutId="nav-ul" aria-hidden="true"
                    style={{ position:'absolute', bottom:0, left:0, right:0, height:1.5, background:Y, display:'block' }}
                    exit={{ opacity: 0 }} />
                )}
              </AnimatePresence>
            </a>
          ))}
        </div>

        <DFButton href="tel:+4976112345678" variant="primary"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-black"
          style={{ background: Y, boxShadow:`0 0 20px ${Y}44` }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-black" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black" />
          </span>
          Notdienst: 0761 123 45 678
        </DFButton>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opa = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Text scramble
  const [started, setStarted]     = useState(false);
  const [line2go,  setLine2go]    = useState(false);
  useEffect(() => {
    setStarted(true);
    const t = setTimeout(() => setLine2go(true), 220);
    return () => clearTimeout(t);
  }, []);
  const line1 = useTextScramble('Ihr Elektriker', started, 1500);
  const line2 = useTextScramble('in Freiburg.', line2go, 1300);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: BG }}>

      {/* Yellow core glow */}
      <motion.div className="absolute pointer-events-none"
        style={{ width:800, height:800, right:'10%', top:'50%', y:'-50%', borderRadius:'50%',
          background:`radial-gradient(circle,${Y}18 0%,${Y}07 40%,transparent 70%)` }}
        animate={{ scale:[1,1.08,1], opacity:[0.7,1,0.7] }}
        transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }} />

      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background:`linear-gradient(to bottom,transparent,${Y}40,transparent)` }} />

      <motion.div style={{ y, opacity:opa }} className="container-xl relative z-10 px-4 pt-24 pb-16">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded mb-8 border text-xs font-medium"
            style={{ borderColor:`${Y}30`, background:`${Y}0A`, color:Y }}
            initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, ease:EASE }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:Y }} />
            Meisterbetrieb · Freiburg im Breisgau · seit 1987
          </motion.div>

          {/* Headline — Text Scramble */}
          <h1 className="font-extrabold text-white leading-[1.04] tracking-[-0.025em] mb-6"
            style={{ fontFamily:'var(--font-bricolage)', fontSize:'clamp(3rem,8vw,5.5rem)' }}>
            {line1}<br />
            <span style={{ color:Y }}>{line2}</span>
          </h1>

          {/* Sub */}
          <motion.p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color:'#737373' }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.5, ease:EASE }}>
            KERN Elektrotechnik steht für saubere Handwerksarbeit, zuverlässige Termine
            und 37 Jahre Erfahrung — von der Steckdose bis zur PV-Anlage.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap gap-3"
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.65, ease:EASE }}>
            <DFButton href="#kontakt" variant="primary"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-black"
              style={{ background:Y, boxShadow:`0 0 40px ${Y}33` }}>
              Angebot anfragen
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </DFButton>
            <DFButton href="#leistungen" variant="ghost"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-medium border"
              style={{ borderColor:'rgba(255,255,255,0.1)', color:'#737373' }}>
              Leistungen ansehen
            </DFButton>
          </motion.div>

          {/* Trust row */}
          <motion.div className="mt-14 flex items-center gap-6 flex-wrap"
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:0.6, delay:0.85 }}>
            {['Innungsbetrieb','ZVEH-Mitglied','Meisterbetrieb'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color:'#525252' }}>
                <span className="font-bold" style={{ color:Y }}>✓</span>{t}
              </div>
            ))}
            <div className="h-4 w-px mx-2" style={{ background:'rgba(255,255,255,0.08)' }} />
            <div className="flex items-center gap-1.5 text-xs" style={{ color:'#525252' }}>
              <Stars n={5} />
              <span><strong className="text-white">4.9</strong> · 112 Google-Bewertungen</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y:[0,8,0] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}>
        <div className="w-px h-10 rounded-full" style={{ background:`linear-gradient(to bottom,${Y}60,transparent)` }} />
        <span className="text-[9px] tracking-[0.25em] uppercase font-medium" style={{ color:`${Y}80` }}>Scroll</span>
      </motion.div>
    </section>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────

function StatsBanner() {
  return (
    <section style={{ background:'#0B0C14', borderTop:'1px solid rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
      <div className="container-xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={i} className="py-10 text-center"
              style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.5, delay:i*0.08, ease:EASE }}>
              <div className="text-5xl font-extrabold mb-1 leading-none"
                style={{ fontFamily:'var(--font-bricolage)', color:Y }}>
                <OdometerCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-semibold text-white mb-0.5">{s.label}</div>
              <div className="text-xs" style={{ color:'#404040' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="leistungen" className="section-py" style={{ background:BG }}>
      <div className="container-xl px-4">
        <div className="mb-14">
          <CurtainReveal delay={0.05}>
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ color:Y }}>
              Was wir tun
            </span>
          </CurtainReveal>
          <CurtainReveal delay={0.15}>
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white max-w-lg leading-tight"
              style={{ fontFamily:'var(--font-bricolage)' }}>
              Alles aus einer Hand.
            </h2>
          </CurtainReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="referenzen" className="section-py" style={{ background:'#0B0C14' }}>
      <div className="container-xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ color:Y }}
              initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.55, delay:0.05, ease:EASE }}>
              Referenzen
            </motion.span>
            <motion.h2 className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold text-white leading-tight"
              style={{ fontFamily:'var(--font-bricolage)' }}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:0.12, ease:EASE }}>
              Unsere Projekte.
            </motion.h2>
          </div>
          <motion.a href="#kontakt" className="text-xs font-semibold flex items-center gap-1.5 shrink-0"
            style={{ color:Y }}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ delay:0.3 }} whileHover={{ x:2 }}>
            Alle Projekte
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div key={i} className="group relative overflow-hidden rounded-2xl cursor-pointer"
              initial={{ opacity:0, y:32 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ duration:0.55, delay:i*0.07, ease:EASE }}
              whileHover={{ y:-4 }}>
              <div className="h-56 relative overflow-hidden" style={{ background:p.img }}>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage:`linear-gradient(${Y}20 1px,transparent 1px),linear-gradient(90deg,${Y}20 1px,transparent 1px)`,
                  backgroundSize:'40px 40px',
                }} />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"
                    style={{ background:`${Y}20`, color:Y, backdropFilter:'blur(8px)', border:`1px solid ${Y}30` }}>
                    {p.tag}
                  </span>
                </div>
              </div>
              <div className="p-5 border border-t-0 rounded-b-2xl"
                style={{ borderColor:'rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)' }}>
                <h3 className="font-bold text-white text-base mb-1" style={{ fontFamily:'var(--font-bricolage)' }}>
                  {p.title}
                </h3>
                <p className="text-xs" style={{ color:'#525252' }}>
                  <svg className="inline mr-1 -mt-0.5" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {p.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start 80%','end 20%'] });
  const lineScale = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="uber-uns" ref={ref} className="section-py" style={{ background:BG }}>
      <div className="container-xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <motion.span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ color:Y }}
              initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.55, delay:0.05, ease:EASE }}>
              Über KERN
            </motion.span>
            <motion.h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily:'var(--font-bricolage)' }}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:0.12, ease:EASE }}>
              Handwerk mit Haltung<br />seit 1987.
            </motion.h2>

            <div className="h-px overflow-hidden mb-6" style={{ background:'rgba(255,255,255,0.05)' }}>
              <motion.div className="h-full origin-left"
                style={{ scaleX:lineScale, background:`linear-gradient(to right,${Y},transparent)` }} />
            </div>

            <motion.p className="leading-relaxed mb-5" style={{ color:'#737373' }}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:0.1, ease:EASE }}>
              Was 1987 als Einmann-Betrieb begann, ist heute ein Team aus 18 Fachkräften — allesamt ausgebildete Elektroinstallateure und Meister. Unser Versprechen ist dasselbe geblieben: saubere Arbeit, klare Kommunikation, keine bösen Überraschungen.
            </motion.p>
            <motion.p className="leading-relaxed" style={{ color:'#525252' }}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:0.18, ease:EASE }}>
              Wir arbeiten ausschließlich in der Region Freiburg — das ist kein Nachteil, das ist unser Vorteil. Kurze Wege, schnelle Reaktion, langjährige Beziehungen zu unseren Kunden.
            </motion.p>

            <DFButton href="#kontakt" variant="ghost"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border"
              style={{ color:Y, borderColor:`${Y}35`, background:'transparent' }}>
              Team kennenlernen
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </DFButton>
          </div>

          <motion.div className="relative"
            initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.8, ease:EASE }}>
            <div className="aspect-[4/3] rounded-2xl relative overflow-hidden"
              style={{ background:'linear-gradient(135deg,#0F1525 0%,#0A1020 60%,#141830 100%)' }}>
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage:`linear-gradient(${Y}15 1px,transparent 1px),linear-gradient(90deg,${Y}15 1px,transparent 1px)`,
                backgroundSize:'60px 60px',
              }} />
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-3">
                {Array.from({ length:5 }).map((_,i) => (
                  <div key={i} className="flex-1 rounded-xl"
                    style={{ height:`${80+i*15}px`, background:`rgba(234,179,8,${0.04+i*0.02})`, border:`1px solid ${Y}15` }} />
                ))}
              </div>
            </div>
            <motion.div className="absolute -top-4 -right-4 px-4 py-3 rounded-xl border"
              style={{ background:'#0B0C14', borderColor:`${Y}25` }}
              animate={{ y:[0,-5,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}>
              <div className="text-2xl font-extrabold leading-none" style={{ fontFamily:'var(--font-bricolage)', color:Y }}>18</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Fachkräfte</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ background:'#0B0C14', borderTop:'1px solid rgba(255,255,255,0.04)' }} className="section-py">
      <div className="container-xl px-4">
        <div className="text-center mb-12">
          <motion.span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ color:Y }}
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.55, delay:0.05, ease:EASE }}>
            Kundenstimmen
          </motion.span>
          <motion.h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-white"
            style={{ fontFamily:'var(--font-bricolage)' }}
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.12, ease:EASE }}>
            Was Kunden sagen.
          </motion.h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={active} className="p-8 rounded-2xl border text-center"
              style={{ borderColor:'rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)' }}
              initial={{ opacity:0, y:20, filter:'blur(4px)' }}
              animate={{ opacity:1, y:0, filter:'blur(0px)' }}
              exit={{ opacity:0, y:-12, filter:'blur(4px)' }}
              transition={{ duration:0.4, ease:EASE }}>
              <div className="flex justify-center mb-5"><Stars n={TESTIMONIALS[active].stars} /></div>
              <p className="text-lg leading-relaxed text-white mb-6" style={{ fontFamily:'var(--font-bricolage)' }}>
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>
              <div className="font-bold text-sm text-white">{TESTIMONIALS[active].name}</div>
              <div className="text-xs mt-0.5" style={{ color:'#525252' }}>{TESTIMONIALS[active].role}</div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="rounded-full transition-all duration-300"
                style={{ width: i === active ? 20 : 6, height:6, background: i === active ? Y : '#2A2A2A' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const springX = useSpring(spotX, { stiffness: 120, damping: 20 });
  const springY = useSpring(spotY, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${springX}px ${springY}px, ${Y}22 0%, transparent 80%)`;
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [fields, setFields] = useState({ phone: '', name: '', message: '' });

  const validate = () => fields.phone.trim().length > 0 && fields.name.trim().length > 0;

  const handleSubmit = () => {
    if (formState !== 'idle' || !validate()) return;
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1600);
  };

  return (
    <section id="kontakt" className="relative section-py overflow-hidden" style={{ background:BG }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background:`linear-gradient(to right,transparent,${Y}40,transparent)` }} />

      <div className="container-xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          <div>
            <motion.span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ color:Y }}
              initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.55, delay:0.05, ease:EASE }}>
              Kontakt
            </motion.span>
            <motion.h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily:'var(--font-bricolage)' }}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:0.12, ease:EASE }}>
              Jetzt Projekt<br />besprechen.
            </motion.h2>
            <motion.p className="leading-relaxed mb-8" style={{ color:'#525252' }}
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ delay:0.2 }}>
              Kostenloses Erstgespräch, unverbindliche Besichtigung und transparentes Angebot. Wir melden uns innerhalb von 24 Stunden.
            </motion.p>

            <div className="space-y-5">
              {[
                { label:'Telefon', value:'0761 123 45 678',               sub:'Mo–Fr 7–18 Uhr, Notdienst 24/7' },
                { label:'E-Mail',  value:'info@kern-elektro.de',           sub:'Antwort innerhalb 24h' },
                { label:'Adresse', value:'Gewerbepark Nord 12, 79108 Freiburg', sub:'Büro & Lager' },
              ].map((item, ii) => (
                <motion.div key={item.label} className="flex items-start gap-4"
                  initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5, delay:ii*0.06, ease:EASE }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background:`${Y}15`, color:Y }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      {ii === 0 && <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>}
                      {ii === 1 && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>}
                      {ii === 2 && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>}
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color:'#525252' }}>{item.label}</div>
                    <div className="font-semibold text-white text-sm">{item.value}</div>
                    <div className="text-xs mt-0.5" style={{ color:'#404040' }}>{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form with ambient spotlight */}
          <motion.div className="rounded-2xl border relative overflow-hidden"
            style={{ borderColor:'rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, delay:0.1, ease:EASE }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              spotX.set(e.clientX - r.left);
              spotY.set(e.clientY - r.top);
            }}>
            {/* Spotlight layer — spring-smoothed */}
            <motion.div aria-hidden="true"
              style={{
                position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
                background: spotlight as unknown as string,
              }} />

            <div style={{ position:'relative', zIndex:1, padding:'2rem' }}>
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div key="success" className="flex flex-col items-center justify-center text-center py-10 gap-5"
                    initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                    transition={{ duration:0.45, ease:EASE }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background:`${Y}18`, border:`1px solid ${Y}40` }}>
                      <svg width="24" height="24" fill="none" stroke={Y} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white mb-2" style={{ fontFamily:'var(--font-bricolage)' }}>
                        Anfrage erhalten!
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color:'#525252' }}>
                        Wir melden uns innerhalb von 24 Stunden bei Ihnen. <br />Danke für Ihr Vertrauen.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}>
                    <h3 className="text-lg font-bold text-white mb-6" style={{ fontFamily:'var(--font-bricolage)' }}>
                      Schnellanfrage
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium block mb-1.5" style={{ color:'#737373' }}>Telefon *</label>
                        <input type="tel" placeholder="0761 …" value={fields.phone}
                          onChange={(e) => setFields((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-700 outline-none transition-all duration-200"
                          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor=`${Y}50`; e.currentTarget.style.background=`${Y}06`; }}
                          onBlur={(e)  => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }} />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-1.5" style={{ color:'#737373' }}>Ihr Name *</label>
                        <input type="text" placeholder="Max Mustermann" value={fields.name}
                          onChange={(e) => setFields((p) => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-700 outline-none transition-all duration-200"
                          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor=`${Y}50`; e.currentTarget.style.background=`${Y}06`; }}
                          onBlur={(e)  => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }} />
                      </div>
                      <div>
                        <label className="text-xs font-medium block mb-1.5" style={{ color:'#737373' }}>Was können wir für Sie tun?</label>
                        <textarea rows={3} placeholder="Kurze Beschreibung Ihres Projekts…" value={fields.message}
                          onChange={(e) => setFields((p) => ({ ...p, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-700 outline-none resize-none transition-all duration-200"
                          style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor=`${Y}50`; e.currentTarget.style.background=`${Y}06`; }}
                          onBlur={(e)  => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }} />
                      </div>
                      <DFButton variant="primary" onClick={handleSubmit}
                        className="w-full py-3.5 rounded-xl text-sm font-bold text-black flex justify-center items-center gap-2"
                        style={{ background:Y, boxShadow:`0 0 30px ${Y}30`, pointerEvents: formState === 'loading' ? 'none' : 'auto' }}>
                        {formState === 'loading' ? (
                          <>
                            <svg className="animate-spin" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                            </svg>
                            Wird gesendet…
                          </>
                        ) : 'Kostenlos anfragen'}
                      </DFButton>
                      <p className="text-xs text-center" style={{ color:'#333' }}>
                        Keine Weitergabe an Dritte · Antwort innerhalb 24h
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background:'#0B0C14', borderTop:'1px solid rgba(255,255,255,0.04)' }} className="py-8">
      <div className="container-xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color:'#333' }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background:Y }}>
            <svg width="10" height="10" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <span className="font-bold text-neutral-600">KERN Elektrotechnik GmbH</span>
        </div>
        <div className="flex gap-5">
          {['Impressum','Datenschutz','AGB'].map((l) => (
            <a key={l} href="#" className="hover:text-neutral-400 transition-colors">{l}</a>
          ))}
        </div>
        <span>© 2025 KERN Elektrotechnik GmbH · Freiburg i. Br.</span>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HandwerkerPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div style={{ background:BG, color:'#fff' }}>
        <Nav />
        <HeroSection />
        <StatsBanner />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </MotionConfig>
  );
}
