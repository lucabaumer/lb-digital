"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────
// Design System · Elyse Residence Style
// Tiefes Charcoal × Champagner-Gold × Warmes Creme
// ─────────────────────────────────────────────────────────────────────
const C = {
  bg:    "#0C0A07",
  bgAlt: "#121008",
  card:  "#161210",
  gold:  "#C9A870",
  goldD: "#A8895A",
  line:  "rgba(201,168,112,0.18)",
  cream: "#F5F0E8",
  stone: "#7A7570",
  muted: "rgba(245,240,232,0.42)",
};

const SERIF = "'Georgia', 'Times New Roman', serif";
const ease  = [0.22, 1, 0.36, 1] as const;

// ─── Responsive hook ──────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

// ─── Data ─────────────────────────────────────────────────────────────
const listings = [
  {
    id: 1,
    ref: "FR-2601",
    title: "Penthouse Wiehre",
    area: "148 m²",
    rooms: "4 Zimmer",
    floor: "5. Obergeschoss",
    price: "1.250.000",
    status: "Exklusiv",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=960&q=85",
  },
  {
    id: 2,
    ref: "FR-2558",
    title: "Villa Günterstal",
    area: "320 m²",
    rooms: "7 Zimmer",
    floor: "Freistehend",
    price: "2.890.000",
    status: "Verfügbar",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=960&q=85",
  },
  {
    id: 3,
    ref: "FR-2612",
    title: "Stadtloft Altstadt",
    area: "95 m²",
    rooms: "3 Zimmer",
    floor: "2. Obergeschoss",
    price: "680.000",
    status: "Neu",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=960&q=85",
  },
  {
    id: 4,
    ref: "FR-2589",
    title: "Maisonette Herdern",
    area: "175 m²",
    rooms: "5 Zimmer",
    floor: "3. / 4. OG",
    price: "920.000",
    status: "Reserviert",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=960&q=85",
  },
];

const services = [
  {
    n: "01",
    t: "Immobilienverkauf",
    d: "Professionelle Vermarktung mit maximaler Reichweite — vom Bewertungsgutachten bis zum Notartermin.",
  },
  {
    n: "02",
    t: "Vermietung & Verwaltung",
    d: "Sorgfältige Mieterauswahl, rechtssichere Verträge und transparente Nebenkostenabrechnungen.",
  },
  {
    n: "03",
    t: "Marktwertermittlung",
    d: "Präzise Bewertung auf Basis aktueller Freiburger Marktdaten — kostenlos und unverbindlich.",
  },
  {
    n: "04",
    t: "Diskrete Beratung",
    d: "Neutral, ohne Verkaufsdruck. Wir zeigen Optionen, keine Illusionen.",
  },
];

// ─── Particle data (stable — no random on every render) ───────────────
const PARTICLES = [
  { x: 18, y: 22, size: 1.5, dur: 9,  delay: 0    },
  { x: 72, y: 14, size: 1,   dur: 12, delay: 1.4  },
  { x: 45, y: 65, size: 2,   dur: 8,  delay: 0.7  },
  { x: 85, y: 42, size: 1,   dur: 14, delay: 2.1  },
  { x: 30, y: 78, size: 1.5, dur: 10, delay: 3.0  },
  { x: 60, y: 30, size: 1,   dur: 11, delay: 0.3  },
  { x: 10, y: 55, size: 2,   dur: 7,  delay: 1.8  },
  { x: 90, y: 70, size: 1,   dur: 13, delay: 4.2  },
  { x: 52, y: 88, size: 1,   dur: 9,  delay: 2.6  },
  { x: 78, y: 58, size: 1.5, dur: 15, delay: 0.9  },
  { x: 25, y: 40, size: 1,   dur: 10, delay: 3.5  },
  { x: 64, y: 10, size: 2,   dur: 8,  delay: 1.1  },
];

// ─────────────────────────────────────────────────────────────────────
export default function ImmobilienPage() {
  const mobile    = useIsMobile();
  const heroRef   = useRef<HTMLElement>(null);
  const propsRef  = useRef<HTMLElement>(null);
  const agentRef  = useRef<HTMLElement>(null);

  const propsInView = useInView(propsRef, { once: true, margin: "-80px" });
  const agentInView = useInView(agentRef, { once: true, margin: "-80px" });

  const { scrollY }  = useScroll();
  const heroImgY     = useTransform(scrollY, [0, 700], [0, 60]);
  const heroTextY    = useTransform(scrollY, [0, 500], [0, 60]);

  const P = mobile ? "24px" : "56px"; // horizontal padding

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Müller Immobilien Freiburg",
            description:
              "Ihr Immobilienmakler in Freiburg im Breisgau — diskret, professionell, seit 1998.",
            url: "https://www.mueller-immobilien-freiburg.de",
            telephone: "+4976112345678",
            email: "info@mueller-immobilien.de",
            foundingDate: "1998",
            areaServed: "Freiburg im Breisgau",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Musterstraße 1",
              addressLocality: "Freiburg im Breisgau",
              postalCode: "79100",
              addressCountry: "DE",
            },
          }),
        }}
      />

      <div
        style={{
          background: C.bg,
          color: C.cream,
          fontFamily: "var(--font-inter, system-ui, sans-serif)",
          overflowX: "hidden",
        }}
      >
        {/* ── NAV ─────────────────────────────────────────────────── */}
        <header>
          <nav
            role="navigation"
            aria-label="Hauptnavigation"
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0,
              zIndex: 50,
              padding: mobile ? "18px 24px" : "28px 56px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              style={{ pointerEvents: "auto" }}
            >
              <div style={{ lineHeight: 1 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.cream,
                  }}
                >
                  MÜLLER
                </div>
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 400,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: C.gold,
                    marginTop: "3px",
                  }}
                >
                  IMMOBILIEN · FREIBURG
                </div>
              </div>
            </motion.div>

            {/* Nav links */}
            {!mobile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
                style={{
                  display: "flex",
                  gap: "40px",
                  alignItems: "center",
                  pointerEvents: "auto",
                }}
              >
                {(
                  [
                    ["#objekte", "Objekte"],
                    ["#makler", "Über uns"],
                    ["#leistungen", "Leistungen"],
                  ] as [string, string][]
                ).map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.45)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = C.cream)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(245,240,232,0.45)")
                    }
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#kontakt"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: C.gold,
                    textDecoration: "none",
                    border: `1px solid ${C.gold}`,
                    padding: "9px 22px",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = C.gold;
                    e.currentTarget.style.color = C.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = C.gold;
                  }}
                >
                  Bewertung anfragen
                </a>
              </motion.div>
            )}
          </nav>
        </header>

        {/* ══ HERO ══════════════════════════════════════════════════ */}
        <main>
          <section
            ref={heroRef}
            aria-label="Willkommensbereich"
            style={{ height: "100svh", position: "relative", overflow: "hidden" }}
          >
            {/* Background video with parallax — watermark hidden via clip */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                y: heroImgY,
                /* clip bottom-right corner to hide watermark */
                clipPath: "inset(0 0 60px 0)",
              }}
            >
              <video
                autoPlay
                muted
                playsInline
                aria-hidden="true"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  display: "block",
                }}
              >
                <source src="/assets/immobilien-hero.mp4" type="video/mp4" />
              </video>
            </motion.div>

            {/* Overlays */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(12,10,7,0.45) 0%, rgba(12,10,7,0.15) 40%, rgba(12,10,7,0.92) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(12,10,7,0.22)",
              }}
            />

            {/* Pulsing gold light orb */}
            <motion.div
              aria-hidden="true"
              animate={{
                scale:   [1, 1.18, 1],
                opacity: [0.13, 0.22, 0.13],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "30%",
                left: "55%",
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 3,
                filter: "blur(40px)",
              }}
            />

            {/* Floating gold particles */}
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                aria-hidden="true"
                animate={{
                  y:       [0, -22, 0],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: p.dur,
                  delay:    p.delay,
                  repeat:   Infinity,
                  ease:     "easeInOut",
                }}
                style={{
                  position:     "absolute",
                  left:         `${p.x}%`,
                  top:          `${p.y}%`,
                  width:        `${p.size * 2}px`,
                  height:       `${p.size * 2}px`,
                  borderRadius: "50%",
                  background:   C.gold,
                  boxShadow:    `0 0 ${p.size * 6}px ${C.gold}`,
                  pointerEvents:"none",
                  zIndex:       4,
                }}
              />
            ))}

            {/* Top-left eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              style={{
                position: "absolute",
                top: mobile ? "80px" : "104px",
                left: mobile ? "24px" : "56px",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: C.gold,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.gold,
                }}
              >
                Est. 1998 · Freiburg im Breisgau
              </span>
            </motion.div>

            {/* Hero headline */}
            <motion.div
              style={{
                position: "absolute",
                bottom: mobile ? "44px" : "72px",
                left: mobile ? "24px" : "56px",
                right: mobile ? "24px" : "56px",
                zIndex: 10,
                y: heroTextY,
              }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.gold,
                  margin: "0 0 20px",
                  fontWeight: 600,
                }}
              >
                Kostenlose Immobilienbewertung · Ergebnis in 48 h
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.2, ease }}
                style={{
                  fontSize: mobile
                    ? "clamp(36px, 10vw, 52px)"
                    : "clamp(52px, 7vw, 96px)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: mobile ? "-0.02em" : "-0.03em",
                  color: C.cream,
                  margin: "0 0 16px",
                  fontFamily: SERIF,
                  maxWidth: mobile ? "100%" : "720px",
                }}
              >
                Was ist Ihre Immobilie
                <br />
                <em style={{ fontStyle: "italic", color: C.gold }}>
                  wirklich wert?
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease }}
                style={{
                  fontSize: mobile ? "14px" : "16px",
                  color: C.muted,
                  margin: "0 0 36px",
                  maxWidth: "480px",
                  lineHeight: 1.65,
                }}
              >
                Thomas Müller bewertet Ihr Objekt persönlich — präzise,
                diskret und ohne Verkaufsdruck. Seit 1998 der Makler
                für Freiburg und den Breisgau.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease }}
                style={{
                  display: "flex",
                  gap: mobile ? "14px" : "16px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#kontakt"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: C.gold,
                    color: C.bg,
                    padding: mobile ? "14px 28px" : "16px 40px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.84")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Jetzt kostenlos bewerten lassen
                </a>
                <a
                  href="tel:+4976112345678"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: C.cream,
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                >
                  <span style={{ color: C.gold, fontSize: "16px" }}>↗</span>
                  +49 761 123 456–0
                </a>
              </motion.div>
            </motion.div>

            {/* Scroll line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
              style={{
                position: "absolute",
                bottom: mobile ? "44px" : "72px",
                right: mobile ? "24px" : "56px",
                zIndex: 10,
              }}
            >
              <motion.div
                animate={{ scaleY: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                style={{
                  width: "1px",
                  height: "52px",
                  background: `linear-gradient(to bottom, ${C.gold}, transparent)`,
                  transformOrigin: "top",
                }}
              />
            </motion.div>
          </section>

          {/* ── STATS STRIP ─────────────────────────────────────────── */}
          <section
            aria-label="Kennzahlen"
            style={{
              background: C.bgAlt,
              borderTop: `1px solid ${C.line}`,
              borderBottom: `1px solid ${C.line}`,
              padding: mobile ? "36px 24px" : "48px 56px",
              display: "grid",
              gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: mobile ? "36px 0" : "0",
            }}
          >
            {(
              [
                ["25+", "Jahre Erfahrung"],
                ["342", "Vermittlungen"],
                ["4.9 ★", "Google Bewertung"],
                ["Ø 18", "Tage bis Abschluss"],
              ] as [string, string][]
            ).map(([val, lab], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                style={{
                  textAlign: "center",
                  borderRight:
                    !mobile && i < 3 ? `1px solid ${C.line}` : "none",
                  padding: "8px 0",
                }}
              >
                <div
                  style={{
                    fontSize: mobile ? "30px" : "38px",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: C.gold,
                    fontFamily: SERIF,
                    lineHeight: 1,
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.stone,
                    marginTop: "10px",
                  }}
                >
                  {lab}
                </div>
              </motion.div>
            ))}
          </section>

          {/* ══ PROPERTIES ══════════════════════════════════════════ */}
          <section
            id="objekte"
            ref={propsRef}
            aria-label="Aktuelle Objekte"
            style={{
              background: C.bg,
              padding: mobile ? "80px 0 64px" : "120px 0 96px",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: mobile ? `0 24px 48px` : `0 ${P} 64px`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "1px",
                      background: C.gold,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: C.gold,
                    }}
                  >
                    Aktuelle Objekte
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: mobile
                      ? "34px"
                      : "clamp(40px, 5vw, 68px)",
                    fontWeight: 300,
                    letterSpacing: "-0.03em",
                    color: C.cream,
                    margin: 0,
                    lineHeight: 1.1,
                    fontFamily: SERIF,
                  }}
                >
                  Ausgewählte{" "}
                  <em style={{ fontStyle: "italic", color: C.gold }}>
                    Objekte
                  </em>
                </h2>
              </div>
              {!mobile && (
                <span
                  style={{
                    fontSize: "11px",
                    color: C.stone,
                    letterSpacing: "0.06em",
                  }}
                >
                  {listings.length} Objekte verfügbar
                </span>
              )}
            </div>

            {/* Grid */}
            <div
              style={{
                padding: mobile ? "0 24px" : `0 ${P}`,
                display: "grid",
                gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
                gap: "2px",
              }}
            >
              {listings.map((l, i) => (
                <motion.article
                  key={l.id}
                  aria-label={`${l.title}, ${l.area}, ${l.price} EUR`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={propsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12, ease }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: C.card,
                  }}
                  whileHover="hover"
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      height: mobile
                        ? "260px"
                        : "clamp(280px, 38vh, 460px)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      variants={{ hover: { scale: 1.06 } }}
                      transition={{ duration: 0.9, ease }}
                      style={{ position: "absolute", inset: 0 }}
                    >
                      <Image
                        src={l.img}
                        alt={`${l.title} – Immobilie von Müller Immobilien Freiburg: ${l.area}, ${l.rooms}`}
                        fill
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </motion.div>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, rgba(12,10,7,0.08) 0%, rgba(12,10,7,0.65) 100%)",
                      }}
                    />
                    {/* Status badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "18px",
                        right: "18px",
                        fontSize: "8px",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color:
                          l.status === "Reserviert" ? C.stone : C.gold,
                        border: `1px solid ${
                          l.status === "Reserviert" ? C.stone : C.gold
                        }`,
                        padding: "5px 10px",
                        background: "rgba(12,10,7,0.65)",
                      }}
                    >
                      {l.status}
                    </div>
                    {/* Ref */}
                    <div
                      style={{
                        position: "absolute",
                        top: "18px",
                        left: "18px",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        color: "rgba(245,240,232,0.32)",
                      }}
                    >
                      {l.ref}
                    </div>
                  </div>

                  {/* Info */}
                  <div
                    style={{
                      padding: mobile ? "20px 20px 22px" : "24px 28px 26px",
                      borderBottom: `1px solid ${C.line}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      gap: "16px",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <h3
                        style={{
                          fontSize: mobile ? "16px" : "18px",
                          fontWeight: 400,
                          letterSpacing: "-0.01em",
                          color: C.cream,
                          margin: "0 0 10px",
                          fontFamily: SERIF,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {l.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          gap: "14px",
                          flexWrap: "wrap",
                        }}
                      >
                        {[l.area, l.rooms, l.floor].map((d, j) => (
                          <span
                            key={j}
                            style={{
                              fontSize: "11px",
                              color: C.stone,
                              letterSpacing: "0.03em",
                            }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{ textAlign: "right", flexShrink: 0 }}
                    >
                      <div
                        style={{
                          fontSize: "9px",
                          color: C.stone,
                          letterSpacing: "0.14em",
                          marginBottom: "4px",
                        }}
                      >
                        EUR
                      </div>
                      <div
                        style={{
                          fontSize: mobile ? "18px" : "22px",
                          fontWeight: 600,
                          color: C.gold,
                          letterSpacing: "-0.02em",
                          fontFamily: SERIF,
                        }}
                      >
                        {l.price}
                      </div>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <motion.div
                    variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }}
                    initial="initial"
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: C.gold,
                      color: C.bg,
                      padding: "11px",
                      textAlign: "center",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      opacity: 0,
                    }}
                  >
                    Details anfragen →
                  </motion.div>
                </motion.article>
              ))}
            </div>

            {/* CTA row */}
            <div
              style={{
                padding: mobile ? "48px 24px 0" : `56px ${P} 0`,
                textAlign: "center",
              }}
            >
              <a
                href="#kontakt"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: C.gold,
                  textDecoration: "none",
                  borderBottom: `1px solid ${C.line}`,
                  paddingBottom: "4px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = C.gold)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = C.line)
                }
              >
                Alle Objekte anfragen{" "}
                <span style={{ fontSize: "14px" }}>→</span>
              </a>
            </div>
          </section>

          {/* ══ QUOTE ════════════════════════════════════════════════ */}
          <section
            aria-label="Kundenstimme"
            style={{
              background: C.bgAlt,
              padding: mobile ? "80px 24px" : "112px 56px",
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <motion.blockquote
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease }}
              style={{ margin: 0, maxWidth: "860px" }}
            >
              <p
                style={{
                  fontSize: mobile
                    ? "clamp(22px, 6vw, 30px)"
                    : "clamp(30px, 4vw, 56px)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.3,
                  color: C.cream,
                  fontStyle: "italic",
                  fontFamily: SERIF,
                  marginBottom: "36px",
                }}
              >
                „In 11 Tagen verkauft — über dem Angebotspreis. Ich hätte es
                nicht für möglich gehalten."
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    background: C.gold,
                    flexShrink: 0,
                  }}
                />
                <footer
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: C.stone,
                  }}
                >
                  Sabine & Klaus Berger · Freiburg-Wiehre, 2025
                </footer>
              </div>
            </motion.blockquote>
          </section>

          {/* ══ AGENT ════════════════════════════════════════════════ */}
          <section
            id="makler"
            ref={agentRef}
            aria-label="Ihr Makler"
            style={{
              background: C.bg,
              display: mobile ? "block" : "grid",
              gridTemplateColumns: "1fr 1fr",
              minHeight: mobile ? "auto" : "80vh",
              borderTop: `1px solid ${C.line}`,
            }}
          >
            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={agentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease }}
              style={{
                padding: mobile ? "80px 24px" : "96px 64px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    background: C.gold,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: C.gold,
                  }}
                >
                  Ihr Makler
                </span>
              </div>

              <h2
                style={{
                  fontSize: mobile
                    ? "44px"
                    : "clamp(52px, 5.5vw, 88px)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  color: C.cream,
                  lineHeight: 0.95,
                  fontFamily: SERIF,
                  marginBottom: "36px",
                }}
              >
                Thomas
                <br />
                <em style={{ fontStyle: "italic", color: C.gold }}>
                  Müller.
                </em>
              </h2>

              <div
                style={{
                  width: "48px",
                  height: "1px",
                  background: C.line,
                  marginBottom: "32px",
                }}
              />

              <p
                style={{
                  fontSize: "15px",
                  color: C.stone,
                  lineHeight: 1.9,
                  maxWidth: "420px",
                  marginBottom: "48px",
                }}
              >
                Seit 1998 in Freiburg. Kein Büro-Makler, kein Franchise.
                Ich kenne jede Straße, jeden Stadtteil — und die Menschen,
                die hier kaufen und verkaufen.
              </p>

              <address style={{ fontStyle: "normal" }}>
                {(
                  [
                    ["Telefon", "tel:+4976112345678", "+49 761 123 456–0"],
                    [
                      "E-Mail",
                      "mailto:info@mueller-immobilien.de",
                      "info@mueller-immobilien.de",
                    ],
                  ] as [string, string, string][]
                ).map(([label, href, value]) => (
                  <a
                    key={href}
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      textDecoration: "none",
                      marginBottom: "20px",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "1")
                    }
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: C.stone,
                        width: "56px",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        color: C.cream,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {value}
                    </span>
                  </a>
                ))}
              </address>
            </motion.div>

            {/* Photo column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={agentInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.2, ease }}
              style={{
                position: "relative",
                minHeight: mobile ? "380px" : "auto",
                overflow: "hidden",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=960&q=85"
                alt="Thomas Müller – Geschäftsführer Müller Immobilien Freiburg"
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center 18%" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: mobile
                    ? "linear-gradient(to bottom, transparent 55%, rgba(12,10,7,0.5) 100%)"
                    : "linear-gradient(to right, rgba(12,10,7,0.35) 0%, transparent 35%)",
                }}
              />
            </motion.div>
          </section>

          {/* ══ SERVICES ════════════════════════════════════════════ */}
          <section
            id="leistungen"
            aria-label="Leistungen"
            style={{
              background: C.bgAlt,
              padding: mobile ? "80px 24px" : "120px 56px",
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <div style={{ maxWidth: "840px", margin: "0 auto" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "64px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    background: C.gold,
                    flexShrink: 0,
                  }}
                />
                <h2
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: C.gold,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  Leistungen
                </h2>
              </div>

              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease }}
                  style={{
                    borderTop: `1px solid ${C.line}`,
                    padding: mobile ? "28px 0" : "36px 0",
                    display: "grid",
                    gridTemplateColumns: mobile ? "1fr" : "64px 1fr",
                    gap: mobile ? "10px" : "40px",
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: C.gold,
                      letterSpacing: "0.1em",
                      paddingTop: mobile ? "0" : "4px",
                    }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: mobile ? "18px" : "22px",
                        fontWeight: 400,
                        color: C.cream,
                        letterSpacing: "-0.02em",
                        margin: "0 0 10px",
                        fontFamily: SERIF,
                      }}
                    >
                      {s.t}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: C.stone,
                        lineHeight: 1.8,
                        margin: 0,
                        maxWidth: "520px",
                      }}
                    >
                      {s.d}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div style={{ borderTop: `1px solid ${C.line}` }} />
            </div>
          </section>

          {/* ══ CONTACT ════════════════════════════════════════════ */}
          <section
            id="kontakt"
            aria-label="Kontakt und Bewertungsanfrage"
            style={{
              background: C.bg,
              padding: mobile ? "80px 24px 72px" : "120px 56px 96px",
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <div style={{ maxWidth: "920px", margin: "0 auto" }}>
              {/* Label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "48px",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "1px",
                    background: C.gold,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: C.gold,
                  }}
                >
                  Kontakt
                </span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                style={{
                  fontSize: mobile
                    ? "clamp(32px, 9vw, 44px)"
                    : "clamp(44px, 5.5vw, 72px)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: C.cream,
                  fontFamily: SERIF,
                  marginBottom: "72px",
                }}
              >
                Ihr Objekt bewertet
                <br />
                <em style={{ fontStyle: "italic", color: C.gold }}>
                  in 48 Stunden.
                </em>
              </motion.h2>

              <div
                style={{
                  display: mobile ? "block" : "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "64px",
                }}
              >
                {/* Contact info */}
                <div style={{ marginBottom: mobile ? "48px" : 0 }}>
                  <p
                    style={{
                      fontSize: "15px",
                      color: C.stone,
                      lineHeight: 1.85,
                      marginBottom: "48px",
                    }}
                  >
                    Kostenlose Marktwertermittlung. Kein Verkaufsdruck,
                    keine versteckten Kosten. Eine ehrliche Einschätzung
                    vom Freiburger Marktexperten.
                  </p>

                  <address
                    style={{
                      fontStyle: "normal",
                      display: "flex",
                      flexDirection: "column",
                      gap: "28px",
                    }}
                  >
                    {(
                      [
                        [
                          "Telefon",
                          "tel:+4976112345678",
                          "+49 761 123 456–0",
                          "20px",
                        ],
                        [
                          "E-Mail",
                          "mailto:info@mueller-immobilien.de",
                          "info@mueller-immobilien.de",
                          "16px",
                        ],
                      ] as [string, string, string, string][]
                    ).map(([label, href, value, fontSize]) => (
                      <a
                        key={href}
                        href={href}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                          textDecoration: "none",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "0.7")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                      >
                        <span
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: C.gold,
                          }}
                        >
                          {label}
                        </span>
                        <span
                          style={{
                            fontSize,
                            fontWeight: 400,
                            color: C.cream,
                            letterSpacing: "0.01em",
                          }}
                        >
                          {value}
                        </span>
                      </a>
                    ))}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: C.gold,
                        }}
                      >
                        Adresse
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          color: C.stone,
                          lineHeight: 1.7,
                        }}
                      >
                        Musterstraße 1
                        <br />
                        79100 Freiburg im Breisgau
                      </span>
                    </div>
                  </address>
                </div>

                {/* CTA card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease }}
                  style={{
                    border: `1px solid ${C.line}`,
                    padding: mobile ? "32px 24px" : "48px 44px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      color: C.stone,
                      lineHeight: 1.8,
                      marginBottom: "36px",
                    }}
                  >
                    Rufen Sie uns an oder schreiben Sie eine kurze
                    Nachricht — wir antworten innerhalb von 24 Stunden.
                  </p>

                  <a
                    href="tel:+4976112345678"
                    style={{
                      display: "block",
                      textAlign: "center",
                      background: C.gold,
                      color: C.bg,
                      padding: "16px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      marginBottom: "10px",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.84")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "1")
                    }
                  >
                    Jetzt anrufen
                  </a>

                  <a
                    href="mailto:info@mueller-immobilien.de"
                    style={{
                      display: "block",
                      textAlign: "center",
                      border: `1px solid ${C.line}`,
                      color: C.stone,
                      padding: "14px",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.gold;
                      e.currentTarget.style.color = C.gold;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.line;
                      e.currentTarget.style.color = C.stone;
                    }}
                  >
                    E-Mail schreiben
                  </a>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer
          style={{
            background: C.bgAlt,
            borderTop: `1px solid ${C.line}`,
            padding: mobile ? "20px 24px" : "20px 56px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              color: C.stone,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            © 2026 Müller Immobilien · Freiburg im Breisgau
          </span>
          <div
            style={{ display: "flex", gap: "24px", alignItems: "center" }}
          >
            {(
              [
                ["#", "Impressum"],
                ["#", "Datenschutz"],
              ] as [string, string][]
            ).map(([href, label]) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "10px",
                  color: C.stone,
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = C.cream)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = C.stone)
                }
              >
                {label}
              </a>
            ))}
            <Link
              href="/"
              style={{
                fontSize: "10px",
                color: C.stone,
                textDecoration: "none",
                letterSpacing: "0.06em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = C.gold)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = C.stone)
              }
            >
              Demo · LB Digital
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
