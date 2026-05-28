'use client';

import { type CSSProperties, type FormEvent, type ReactNode, useRef, useState, useEffect } from 'react';
import {
  motion, useScroll, useTransform, useInView, animate,
  AnimatePresence, MotionConfig, useMotionValue, useSpring, useMotionTemplate,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;
const O = '#F97316';

const PHOTOS = {
  hero:      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1800&q=85&auto=format&fit=crop',
  panel:     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop',
  team:      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop',
  solar:     'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&auto=format&fit=crop',
  smarthome: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80&auto=format&fit=crop',
  wiring:    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80&auto=format&fit=crop',
  work1:     'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=80&auto=format&fit=crop',
  work2:     'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=80&auto=format&fit=crop',
};

// ─── Scroll Progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div aria-hidden="true" style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 2,
      background: O, transformOrigin: 'left', scaleX: scrollYProgress, zIndex: 100,
      willChange: 'transform',
    }} />
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration: 2, ease: 'easeOut',
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; },
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Magnetic ─────────────────────────────────────────────────────────────────
function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={e => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['KERN ELEKTROTECHNIK', 'FREIBURG IM BREISGAU', 'SEIT 1987', 'MEISTERBETRIEB', '24/7 NOTDIENST', '1800+ PROJEKTE'];
  return (
    <>
      <style>{`@keyframes kern-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{ overflow: 'hidden', background: '#0A0A0A', padding: '13px 0' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'kern-marquee 28s linear infinite' }}>
          {[...items, ...items].map((item, i) => (
            <span key={i} style={{
              padding: '0 40px', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: i % 2 === 0 ? 'rgba(255,255,255,0.3)' : O,
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const NAV_LINKS = ['Leistungen', 'Projekte', 'Über uns', 'Kontakt'] as const;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
        transition: 'background 0.35s, backdrop-filter 0.35s, box-shadow 0.35s',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <a href="/" aria-label="KERN Elektrotechnik – Startseite" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, background: O, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 16, color: scrolled ? '#0A0A0A' : '#fff', letterSpacing: '-0.02em', transition: 'color 0.3s' }}>
              KERN <span style={{ fontWeight: 400, color: scrolled ? '#aaa' : 'rgba(255,255,255,0.5)' }}>Elektrotechnik</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Hauptnavigation" style={{ display: 'flex', gap: 36, alignItems: 'center' }}
            className="kern-desktop-nav">
            {NAV_LINKS.map(l => (
              <a key={l}
                href={`#${l.toLowerCase().replace(' ', '-').replace('ü', 'u')}`}
                style={{ fontSize: 14, color: scrolled ? '#555' : 'rgba(255,255,255,0.75)', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s', position: 'relative', paddingBottom: 3 }}
                onMouseEnter={e => { e.currentTarget.style.color = scrolled ? '#000' : '#fff'; setHoveredNav(l); }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? '#555' : 'rgba(255,255,255,0.75)'; setHoveredNav(null); }}
              >
                {l}
                <AnimatePresence>
                  {hoveredNav === l && (
                    <motion.span layoutId="nav-underline" aria-hidden="true"
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1.5, background: O, display: 'block' }}
                      exit={{ opacity: 0 }} />
                  )}
                </AnimatePresence>
              </a>
            ))}
            <Magnetic>
              <motion.a href="tel:+4976112345678"
                whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}
                style={{ fontSize: 13, fontWeight: 700, color: '#fff', background: O, padding: '10px 20px', textDecoration: 'none', letterSpacing: '0.01em', display: 'inline-block' }}>
                Notdienst 24/7
              </motion.a>
            </Magnetic>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
            style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 6, zIndex: 60 }}
            className="kern-hamburger">
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
              style={{ display: 'block', width: 22, height: 2, background: scrolled || mobileOpen ? '#0A0A0A' : '#fff', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }}
              style={{ display: 'block', width: 22, height: 2, background: scrolled || mobileOpen ? '#0A0A0A' : '#fff' }} />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              style={{ display: 'block', width: 22, height: 2, background: scrolled || mobileOpen ? '#0A0A0A' : '#fff', transformOrigin: 'center' }} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              position: 'fixed', inset: 0, zIndex: 45,
              background: '#FAFAFA', display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '0 2rem',
            }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_LINKS.map((l, i) => (
                <motion.a key={l}
                  href={`#${l.toLowerCase().replace(' ', '-').replace('ü', 'u')}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: EASE }}
                  style={{
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800,
                    color: '#0A0A0A', textDecoration: 'none', letterSpacing: '-0.025em',
                    paddingBlock: '0.4rem', borderBottom: '1px solid #F0F0F0',
                    display: 'block',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = O)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#0A0A0A')}>
                  {l}
                </motion.a>
              ))}
            </nav>
            <motion.a href="tel:+4976112345678"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
              style={{
                marginTop: '2.5rem', fontFamily: 'monospace', fontSize: 20,
                fontWeight: 700, color: O, textDecoration: 'none', letterSpacing: '0.04em',
              }}>
              0761 123 45 678
            </motion.a>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
              style={{ fontSize: 12, color: '#aaa', marginTop: 6 }}>
              Notdienst 24/7 verfügbar
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .kern-desktop-nav { display: none !important; }
          .kern-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
      <motion.div style={{ position: 'absolute', inset: '-25% 0', y: imgY, willChange: 'transform' }}>
        <img src={PHOTOS.hero} alt="Elektriker verlegt Kabel in Neubau Freiburg"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,10,0.92) 0%, rgba(5,5,10,0.55) 50%, rgba(5,5,10,0.2) 100%)' }} />
      </motion.div>

      <motion.div style={{ position: 'relative', zIndex: 10, width: '100%', y: contentY, opacity: contentOpacity }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 5rem' }}>
          <motion.div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <div style={{ width: 32, height: 1, background: O }} aria-hidden="true" />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: O }}>
              Meisterbetrieb · Freiburg seit 1987
            </span>
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: 24 }}>
            <motion.h1
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 0.97, letterSpacing: '-0.035em', color: '#fff', margin: 0 }}
              initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
              Ihr Elektriker<br /><span style={{ color: O }}>in Freiburg.</span>
            </motion.h1>
          </div>

          <motion.p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 520, margin: '0 0 36px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}>
            Elektroinstallation, Smart Home und Photovoltaik für Privat- und Gewerbekunden in Freiburg und Umgebung.
          </motion.p>

          <motion.div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.48, ease: EASE }}>
            <Magnetic>
              <motion.a href="#kontakt"
                whileHover={{ opacity: 0.87 }} whileTap={{ scale: 0.97 }}
                style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: O, padding: '15px 36px', textDecoration: 'none', letterSpacing: '0.02em', display: 'inline-block' }}>
                Kostenloses Erstgespräch →
              </motion.a>
            </Magnetic>
            <motion.a href="#leistungen" whileTap={{ scale: 0.97 }}
              style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.2)', padding: '15px 36px', textDecoration: 'none', display: 'inline-block', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>
              Leistungen
            </motion.a>
          </motion.div>

          <motion.div style={{ display: 'flex', gap: 40, marginTop: 60, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
            {[{ n: '37+', l: 'Jahre' }, { n: '1800+', l: 'Projekte' }, { n: '24/7', l: 'Notdienst' }, { n: '4.9★', l: 'Google' }].map((t, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{t.n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{t.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  { n: '01', title: 'Elektroinstallation', desc: 'Neubau, Umbau, Sanierung — normgerecht und sauber für Wohn- und Gewerbeobjekte in der Region Freiburg.', photo: PHOTOS.wiring },
  { n: '02', title: 'Smart Home', desc: 'KNX, Loxone, Digitalstrom — Licht, Heizung, Jalousien und Sicherheit vollständig vernetzt und per App steuerbar.', photo: PHOTOS.smarthome },
  { n: '03', title: 'Photovoltaik', desc: 'PV-Anlage mit Speicher, Wallbox und Einspeisemanagement — komplett aus einer Hand, von Planung bis Inbetriebnahme.', photo: PHOTOS.solar },
  { n: '04', title: 'Gewerbe & Industrie', desc: 'Schaltschrankbau, Maschinenverkabelung, MSR-Technik — zuverlässig für Betriebe und Industrieanlagen.', photo: PHOTOS.panel },
  { n: '05', title: 'Notdienst 24/7', desc: 'Stromausfall oder Kurzschluss — wir sind rund um die Uhr erreichbar und in 60 Minuten vor Ort.', photo: PHOTOS.work1 },
  { n: '06', title: 'Prüfung & Wartung', desc: 'DGUV V3, E-Check, VDE-Prüfung — für Rechtssicherheit, Versicherungsschutz und den Schutz Ihrer Mitarbeiter.', photo: PHOTOS.work2 },
];

function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const idx = Math.min(Math.floor(v * SERVICES.length), SERVICES.length - 1);
      setActive(idx);
    });
  }, [scrollYProgress]);

  if (isMobile) {
    return (
      <section id="leistungen" style={{ background: '#fff', padding: '4rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{ width: 24, height: 2, background: O }} aria-hidden="true" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: O }}>Leistungen</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {SERVICES.map((s, i) => (
              <motion.article key={s.n}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}>
                <div style={{ display: 'flex', gap: 0, background: '#fff', borderLeft: `3px solid ${O}` }}>
                  <div style={{ width: 110, flexShrink: 0, overflow: 'hidden' }}>
                    <img src={s.photo} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '1rem 1.1rem', flex: 1, borderBottom: '1px solid #F5F5F5' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: O, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{s.n}</div>
                    <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 17, fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', margin: '0 0 6px', lineHeight: 1.2 }}>{s.title}</h2>
                    <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} id="leistungen" style={{ height: `${SERVICES.length * 100}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#fff', display: 'flex' }}>
        <div style={{ width: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '2.8rem', left: '5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 2, background: O }} aria-hidden="true" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: O }}>Leistungen</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={`bg-${active}`}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: EASE }} aria-hidden="true"
              style={{ position: 'absolute', fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(10rem, 22vw, 18rem)', fontWeight: 800, color: `${O}09`, lineHeight: 1, left: '3.5rem', top: '50%', transform: 'translateY(-56%)', userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>
              {SERVICES[active].n}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.48, ease: EASE }} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: O, textTransform: 'uppercase', marginBottom: 18 }}>
                {SERVICES[active].n} — {String(SERVICES.length).padStart(2, '0')}
              </div>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(2.6rem, 4.5vw, 4rem)', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 22px' }}>
                {SERVICES[active].title}
              </h2>
              <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, maxWidth: 380, margin: '0 0 36px' }}>{SERVICES[active].desc}</p>
              <motion.a href="#kontakt" whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', fontSize: 13, fontWeight: 700, color: '#fff', background: O, padding: '13px 28px', textDecoration: 'none', letterSpacing: '0.02em' }}>
                Jetzt anfragen →
              </motion.a>
            </motion.div>
          </AnimatePresence>
          <div style={{ position: 'absolute', bottom: '2.8rem', left: '5rem', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {SERVICES.map((_, i) => (
                <motion.div key={i} animate={{ width: i === active ? 28 : 6, background: i === active ? O : '#E0E0E0' }}
                  transition={{ duration: 0.35, ease: EASE }} style={{ height: 4 }} />
              ))}
            </div>
            <AnimatePresence>
              {active === 0 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontSize: 11, color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Scroll für mehr
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '3rem 0' }}>
          <AnimatePresence mode="wait">
            <motion.img key={active} src={SERVICES[active].photo} alt={SERVICES[active].title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.55, ease: EASE }} />
          </AnimatePresence>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.12) 0%, transparent 25%)' }} />
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: O }} />
          <AnimatePresence mode="wait">
            <motion.div key={`tag-${active}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              style={{ position: 'absolute', bottom: '2.8rem', left: '2rem', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, background: O, borderRadius: '50%' }} aria-hidden="true" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: '0.05em' }}>{SERVICES[active].title}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { n: 37, suf: '', label: 'Jahre', sub: 'Erfahrung' },
    { n: 1800, suf: '+', label: 'Projekte', sub: 'realisiert' },
    { n: 100, suf: '%', label: '24/7', sub: 'Notdienst' },
    { n: 98, suf: '%', label: 'Weiter-', sub: 'empfehlung' },
  ];
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.15) !important; }
          .stats-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.15) !important; }
          .stats-item:nth-last-child(-n+2) { border-bottom: none !important; }
        }
      `}</style>
      <section aria-labelledby="stats-heading" style={{ background: O, overflow: 'hidden' }}>
        <h2 id="stats-heading" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Kennzahlen</h2>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((s, i) => (
              <motion.div key={i} className="stats-item"
                style={{
                  padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  textAlign: 'left',
                }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                  fontWeight: 800, color: '#fff', lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}>
                  {s.n === 100 ? '24/7' : <Counter to={s.n} suffix={s.suf} />}
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                    {s.sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  { title: 'Neubau Wohnanlage Wiehre', loc: 'Freiburg-Wiehre · 2024', tag: 'Elektroinstallation', photo: PHOTOS.wiring, tall: true },
  { title: 'Smart Home Villa', loc: 'Kirchzarten · 2024', tag: 'KNX / Loxone', photo: PHOTOS.smarthome, tall: false },
  { title: 'PV-Anlage 48 kWp', loc: 'Breisach · 2023', tag: 'Photovoltaik', photo: PHOTOS.solar, tall: false },
  { title: 'Schaltschrankbau Industrie', loc: 'Freiburg-Nord · 2023', tag: 'Gewerbe', photo: PHOTOS.panel, tall: true },
];

function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <article ref={ref}>
      <motion.div whileHover="hover" style={{ width: '100%' }}>
        <div style={{ position: 'relative', height: p.tall ? 480 : 300, overflow: 'hidden', cursor: 'pointer' }}>
          <motion.div style={{ position: 'absolute', inset: 0 }}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: inView ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}>
            <motion.img src={p.photo} alt={p.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: 'transform' }}
              variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.7, ease: EASE }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
          </motion.div>
          <motion.div aria-hidden="true"
            style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: O, scaleY: 0, transformOrigin: 'bottom', zIndex: 10 }}
            variants={{ hover: { scaleY: 1 } }} transition={{ duration: 0.4, ease: EASE }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, zIndex: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: O, display: 'block', marginBottom: 8 }}>{p.tag}</span>
            <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: p.tall ? 20 : 16, fontWeight: 700, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{p.title}</h3>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{p.loc}</p>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

function Projects() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-grid > div { grid-column: span 1 !important; }
        }
      `}</style>
      <section id="projekte" style={{ background: '#F4F4F4', padding: 'clamp(4rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 2, background: O }} aria-hidden="true" />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: O }}>Referenzen</span>
              </div>
              <h2 id="projects-heading" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.025em', margin: 0 }}>Unsere Projekte.</h2>
            </div>
            <a href="#kontakt" style={{ fontSize: 13, fontWeight: 600, color: O, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Alle ansehen →
            </a>
          </div>
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
            <div style={{ gridColumn: 'span 2' }}><ProjectCard p={PROJECTS[0]} i={0} /></div>
            <div><ProjectCard p={PROJECTS[1]} i={1} /></div>
            <div><ProjectCard p={PROJECTS[2]} i={2} /></div>
            <div style={{ gridColumn: 'span 2' }}><ProjectCard p={PROJECTS[3]} i={3} /></div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start 85%', 'end 15%'] });
  const clipPath = useTransform(scrollYProgress, [0, 0.4], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.0]);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-img-wrap { aspect-ratio: 3/2 !important; }
          .about-badge { bottom: -12px !important; right: 0 !important; }
          .about-facts { flex-direction: column !important; gap: 0.5rem !important; font-size: 11px !important; }
          .about-creds { flex-wrap: wrap !important; }
        }
      `}</style>
      <section id="uber-uns" aria-labelledby="about-heading" style={{ background: '#fff', padding: 'clamp(4rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>

          {/* Act 1: Pull-quote + Photo */}
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 28, height: 2, background: O }} aria-hidden="true" />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: O }}>Über uns</span>
              </div>
              <motion.blockquote
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700,
                  color: '#0A0A0A', lineHeight: 1.25, letterSpacing: '-0.025em',
                  margin: 0, borderLeft: `4px solid ${O}`, paddingLeft: '1.5rem',
                }}>
                „Saubere Arbeit,<br />klare Kommunikation —<br />seit 1987."
              </motion.blockquote>
              <motion.h2 id="about-heading"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '2.5rem 0 0' }}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
                Handwerk mit<br />Haltung.
              </motion.h2>
            </div>

            <div ref={imgRef} style={{ position: 'relative' }}>
              <div className="about-img-wrap" style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }}>
                <motion.div style={{ height: '100%', clipPath }}>
                  <motion.img src={PHOTOS.team} alt="Das KERN-Team beim Einsatz in Freiburg"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', scale: imgScale }} />
                </motion.div>
              </div>
              <motion.div className="about-badge" aria-hidden="true"
                style={{ position: 'absolute', bottom: -20, right: -20, background: O, padding: '20px 24px', zIndex: 10 }}
                animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1 }}>18</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 3, fontWeight: 600 }}>Fachkräfte</div>
              </motion.div>
            </div>
          </div>

          {/* Act 2: Facts bar */}
          <motion.div className="about-facts"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{
              display: 'flex', alignItems: 'center', gap: 0,
              borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0',
              padding: '1.25rem 0', marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
              fontFamily: 'monospace', fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              color: '#888', letterSpacing: '0.08em', flexWrap: 'wrap',
            }}>
            {['Seit 1987', '18 Fachkräfte', 'Freiburg im Breisgau', 'Innungsbetrieb', 'ZVEH-Mitglied'].map((f, i, arr) => (
              <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <span style={{ padding: '0 clamp(0.75rem, 2vw, 1.5rem)', whiteSpace: 'nowrap' }}>{f}</span>
                {i < arr.length - 1 && <span style={{ color: O, fontSize: '1.1em' }}>·</span>}
              </span>
            ))}
          </motion.div>

          {/* Act 3: Text + Credentials */}
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <div>
              <motion.p style={{ fontSize: 15, color: '#666', lineHeight: 1.85, margin: '0 0 18px' }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                Was 1987 als Einmann-Betrieb begann, ist heute ein Team aus 18 Elektrofachkräften. Unser Versprechen ist dasselbe geblieben: saubere Arbeit, klare Kommunikation, keine Überraschungen.
              </motion.p>
              <motion.p style={{ fontSize: 15, color: '#aaa', lineHeight: 1.85, margin: '0 0 36px' }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                Wir arbeiten ausschließlich in der Region Freiburg — kurze Wege, schnelle Reaktion, echte Beziehungen.
              </motion.p>
              <Magnetic>
                <motion.a href="#kontakt" whileHover={{ opacity: 0.87 }} whileTap={{ scale: 0.97 }}
                  style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: O, padding: '13px 28px', textDecoration: 'none', display: 'inline-block' }}>
                  Kontakt aufnehmen →
                </motion.a>
              </Magnetic>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#bbb', marginBottom: 16 }}>Zertifizierungen & Mitgliedschaften</div>
              <motion.div className="about-creds"
                style={{ display: 'flex', gap: 8, flexWrap: 'nowrap' }}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}>
                {['Meisterbetrieb', 'ZVEH', 'Innungsbetrieb', 'DGUV V3'].map(t => (
                  <span key={t} style={{
                    fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                    color: O, border: `1px solid ${O}`, padding: '6px 12px',
                    whiteSpace: 'nowrap', letterSpacing: '0.05em',
                  }}>
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Michael Brenner', role: 'Bauherr, Freiburg-Herdern', text: 'KERN hat unseren Neubau komplett verkabelt. Sauber, pünktlich, kein einziger Nachbesserungsbedarf. Klare Weiterempfehlung.' },
  { name: 'Sandra Kühle', role: 'Café-Betreiberin, Freiburg-Mitte', text: 'Kurzschluss am Samstagabend — ein Anruf, 45 Minuten später alles behoben. Der Notdienst hat meinen Betrieb gerettet.' },
  { name: 'Thomas Weiß', role: 'Gewerbeimmobilie Güterbahnhof', text: 'Schaltschrankbau für unsere Werkshalle: technisch einwandfrei, termingerecht, transparent in der Kommunikation.' },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % REVIEWS.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .testimonials-quote { padding-left: 1.25rem !important; border-left-width: 2px !important; }
          .testimonials-blockquote { font-size: 1rem !important; }
        }
      `}</style>
      <section aria-label="Kundenstimmen" style={{ background: '#0A0D18', padding: 'clamp(4rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 28, height: 2, background: O }} aria-hidden="true" />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: O }}>Kunden</span>
              </div>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', margin: '0 0 32px' }}>
                Was Kunden sagen.
              </h2>
              <div role="tablist" aria-label="Bewertungen" style={{ display: 'flex', gap: 8 }}>
                {REVIEWS.map((r, i) => (
                  <motion.button key={i} type="button" role="tab"
                    aria-label={`Bewertung von ${r.name}`} aria-selected={i === active}
                    onClick={() => setActive(i)}
                    animate={{ width: i === active ? 24 : 6, background: i === active ? O : '#333' }}
                    transition={{ duration: 0.35 }}
                    style={{ height: 6, border: 'none', cursor: 'pointer', padding: 0 }} />
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} role="tabpanel" className="testimonials-quote"
                style={{ paddingLeft: 40, borderLeft: `3px solid ${O}` }}
                initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: EASE }}>
                <div aria-label="5 von 5 Sternen" style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={O} aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="testimonials-blockquote" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 600, color: '#ccc', lineHeight: 1.6, margin: '0 0 28px', letterSpacing: '-0.01em' }}>
                  &ldquo;{REVIEWS[active].text}&rdquo;
                </blockquote>
                <cite style={{ fontStyle: 'normal' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{REVIEWS[active].name}</div>
                  <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{REVIEWS[active].role}</div>
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
type FormState = 'idle' | 'submitting' | 'success';

function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${spotX}px ${spotY}px, rgba(249,115,22,0.07) 0%, transparent 80%)`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1800);
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .contact-grid > *:first-child { order: 2; }
          .contact-grid > *:last-child { order: 1; }
          .contact-headline { font-size: clamp(2.2rem, 10vw, 3rem) !important; }
        }
      `}</style>
      <section id="kontakt" aria-labelledby="contact-heading" style={{ background: '#fff', padding: 'clamp(4rem,8vw,7rem) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

            {/* Statement side */}
            <div>
              <motion.h2 id="contact-heading" className="contact-headline"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, color: '#0A0A0A', letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 1.5rem' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
                Jetzt Projekt<br />besprechen.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                style={{ fontSize: 14, color: '#aaa', lineHeight: 1.65, margin: '0 0 2rem', fontStyle: 'italic' }}>
                „Antwort innerhalb von 24 Stunden — garantiert."
              </motion.p>

              <div style={{ width: '100%', height: 1, background: '#F0F0F0', marginBottom: '2rem' }} aria-hidden="true" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  {
                    icon: <svg width="16" height="16" fill="none" stroke={O} strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.19-1.19a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/></svg>,
                    main: '0761 123 45 678',
                    sub: 'Mo–Fr 7–18 Uhr · Notdienst 24/7',
                    mono: true,
                  },
                  {
                    icon: <svg width="16" height="16" fill="none" stroke={O} strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                    main: 'info@kern-elektro.de',
                    sub: 'Antwort innerhalb 24 Stunden',
                    mono: false,
                  },
                  {
                    icon: <svg width="16" height="16" fill="none" stroke={O} strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                    main: 'Gewerbepark Nord 12',
                    sub: '79108 Freiburg im Breisgau',
                    mono: false,
                  },
                ].map((item, i) => (
                  <motion.div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08, ease: EASE }}>
                    <div style={{ marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A', fontFamily: item.mono ? 'monospace' : 'inherit', letterSpacing: item.mono ? '0.03em' : 'normal' }}>
                        {item.main}
                      </div>
                      <div style={{ fontSize: 12, color: '#aaa', marginTop: 3 }}>{item.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form side */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
              <motion.div
                style={{ background: '#F9F9F9', borderTop: `3px solid ${O}`, position: 'relative' }}
                onMouseMove={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  spotX.set(e.clientX - rect.left); spotY.set(e.clientY - rect.top);
                }}>
                <motion.div aria-hidden="true"
                  style={{ position: 'absolute', inset: 0, background: spotlight, pointerEvents: 'none', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, padding: '2.5rem' }}>
                  <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <div style={{ width: 52, height: 52, background: `${O}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                          <svg width="22" height="22" fill="none" stroke={O} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                        </div>
                        <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 22, fontWeight: 700, color: '#0A0A0A', margin: '0 0 8px' }}>Anfrage gesendet!</h3>
                        <p style={{ fontSize: 14, color: '#888', margin: 0, lineHeight: 1.6 }}>Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.</p>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} noValidate>
                        <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: 20, fontWeight: 700, color: '#0A0A0A', margin: '0 0 28px' }}>Schnellanfrage</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                          {([
                            { id: 'name', l: 'Ihr Name', p: 'Max Mustermann', t: 'text' },
                            { id: 'phone', l: 'Telefon', p: '0761 …', t: 'tel' },
                            { id: 'email', l: 'E-Mail', p: 'name@firma.de', t: 'email' },
                          ] as const).map(f => (
                            <div key={f.id}>
                              <label htmlFor={f.id} style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>{f.l}</label>
                              <input id={f.id} type={f.t} placeholder={f.p} required
                                style={{ width: '100%', padding: '11px 14px', background: '#fff', border: '1px solid #E8E8E8', fontSize: 14, color: '#0A0A0A', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', boxSizing: 'border-box' } as CSSProperties}
                                onFocus={e => (e.currentTarget.style.borderColor = O)}
                                onBlur={e => (e.currentTarget.style.borderColor = '#E8E8E8')} />
                            </div>
                          ))}
                          <div>
                            <label htmlFor="message" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 8 }}>Nachricht</label>
                            <textarea id="message" rows={3} placeholder="Kurze Projektbeschreibung…"
                              style={{ width: '100%', padding: '11px 14px', background: '#fff', border: '1px solid #E8E8E8', fontSize: 14, color: '#0A0A0A', outline: 'none', resize: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', boxSizing: 'border-box' } as CSSProperties}
                              onFocus={e => (e.currentTarget.style.borderColor = O)}
                              onBlur={e => (e.currentTarget.style.borderColor = '#E8E8E8')} />
                          </div>
                          <motion.button type="submit" disabled={formState === 'submitting'}
                            whileHover={{ opacity: 0.87 }} whileTap={{ scale: 0.97 }}
                            style={{ background: O, color: '#fff', border: 'none', padding: '15px', fontSize: 14, fontWeight: 700, cursor: formState === 'submitting' ? 'wait' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%' }}>
                            {formState === 'submitting' ? (
                              <>
                                <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                                  style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%' }} />
                                Wird gesendet…
                              </>
                            ) : 'Anfrage absenden →'}
                          </motion.button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; text-align: center; }
          .footer-bottom { flex-direction: column !important; gap: 1rem !important; text-align: center; }
          .footer-nav-list { align-items: center !important; }
        }
      `}</style>
      <footer style={{ background: '#0A0D18', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) 2rem 0' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '4rem', paddingBottom: 'clamp(2.5rem,5vw,4rem)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Col 1: Brand */}
            <div>
              <a href="/" aria-label="KERN Elektrotechnik Startseite" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, background: O, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 15, color: '#fff', letterSpacing: '-0.02em' }}>
                  KERN <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>Elektrotechnik</span>
                </span>
              </a>
              <p style={{ fontSize: 13, color: '#4a4f5a', lineHeight: 1.7, maxWidth: 240 }}>
                Meisterbetrieb seit 1987 in Freiburg. Elektroinstallation, Smart Home, Photovoltaik.
              </p>
            </div>

            {/* Col 2: Services */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#333', marginBottom: 18 }}>Leistungen</div>
              <nav aria-label="Footer Leistungen">
                <ul className="footer-nav-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Elektroinstallation', 'Smart Home', 'Photovoltaik', 'Notdienst 24/7', 'Gewerbe & Industrie', 'Prüfung & Wartung'].map(l => (
                    <li key={l}>
                      <a href="#leistungen" style={{ fontSize: 13, color: '#4a4f5a', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#4a4f5a')}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Col 3: Contact */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#333', marginBottom: 18 }}>Kontakt</div>
              <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="tel:+4976112345678" style={{ fontSize: 13, color: '#4a4f5a', textDecoration: 'none', fontFamily: 'monospace', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = O)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4a4f5a')}>
                  0761 123 45 678
                </a>
                <a href="mailto:info@kern-elektro.de" style={{ fontSize: 13, color: '#4a4f5a', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = O)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4a4f5a')}>
                  info@kern-elektro.de
                </a>
                <span style={{ fontSize: 13, color: '#4a4f5a', lineHeight: 1.5 }}>
                  Gewerbepark Nord 12<br />79108 Freiburg im Breisgau
                </span>
              </address>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 0', gap: 16 }}>
            <span style={{ fontSize: 12, color: '#2a2f38' }}>© 2026 KERN Elektrotechnik GmbH · Freiburg i. Br.</span>
            <nav aria-label="Rechtliches" style={{ display: 'flex', gap: 24 }}>
              {['Impressum', 'Datenschutz', 'AGB'].map(l => (
                <a key={l} href="#"
                  style={{ fontSize: 12, color: '#2a2f38', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#666')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#2a2f38')}>{l}</a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Services />
        <StatsBanner />
        <Marquee />
        <Projects />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
