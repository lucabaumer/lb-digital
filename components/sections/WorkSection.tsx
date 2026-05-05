"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    slug:      "immo-template",
    href:      "https://immo-template.vercel.app",
    client:    "Immo Template",
    industry:  "Immobilien Website · Next.js + Sanity CMS",
    tags:      ["Next.js", "Sanity CMS", "Webdesign", "SEO"],
    accent:    "#D4AF6A",
    accentDim: "rgba(212,175,106,0.13)",
    preview:   { bg: "#0D0B08", accent: "#D4AF6A", style: "immo" as const },
    label:     "Live Projekt",
  },
  {
    slug:      "kanzlei",
    href:      "#kontakt",
    client:    "Wagner & Partner",
    industry:  "Rechtsanwaltskanzlei · Freiburg",
    tags:      ["Branding", "Webdesign", "Lead Gen"],
    accent:    "#C41E1E",
    accentDim: "rgba(196,30,30,0.12)",
    preview:   { bg: "#0A0907", accent: "#C41E1E", style: "legal" as const },
    label:     "Referenz",
  },
  {
    slug:      "steuerberatung",
    href:      "#kontakt",
    client:    "Hoffmann Steuerberatung",
    industry:  "Steuerberatung · Freiburg",
    tags:      ["Webdesign", "Conversion", "SEO"],
    accent:    "#00EEFF",
    accentDim: "rgba(0,238,255,0.10)",
    preview:   { bg: "#040407", accent: "#00EEFF", style: "fintech" as const },
    label:     "Referenz",
  },
  {
    slug:      "handwerk",
    href:      "#kontakt",
    client:    "Baumeister Söhne GmbH",
    industry:  "Handwerksbetrieb · Freiburg",
    tags:      ["Webdesign", "SEO", "Google Maps"],
    accent:    "#F97316",
    accentDim: "rgba(249,115,22,0.12)",
    preview:   { bg: "#090704", accent: "#F97316", style: "craft" as const },
    label:     "Referenz",
  },
];

// ─── Previews ─────────────────────────────────────────────────────

function ImmoPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, top: "28px" }}>
      {/* Hero image placeholder */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "110px", background: `linear-gradient(135deg, #1a150a 0%, #2c2010 100%)`, overflow: "hidden" }}>
        {/* Subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
        {/* Property silhouette */}
        <div style={{ position: "absolute", bottom: 0, left: "20px", width: "80px", height: "60px", background: `${accent}15`, border: `1px solid ${accent}25` }} />
        <div style={{ position: "absolute", bottom: 0, left: "50px", width: "50px", height: "80px", background: `${accent}10`, border: `1px solid ${accent}20` }} />
        <div style={{ position: "absolute", bottom: 0, right: "20px", width: "70px", height: "50px", background: `${accent}12`, border: `1px solid ${accent}20` }} />
        {/* Overlay gradient */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, #0D0B08 0%, transparent 60%)` }} />
        {/* Badge */}
        <div style={{ position: "absolute", top: "10px", right: "12px", background: accent, padding: "3px 8px" }}>
          <span style={{ fontSize: "7px", fontWeight: 700, letterSpacing: "0.1em", color: "#0D0B08" }}>VERFÜGBAR</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", top: "118px", left: 0, right: 0, padding: "0 18px" }}>
        <div style={{ marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "14px", height: "1px", background: accent }} />
          <span style={{ fontSize: "6px", color: accent, letterSpacing: "0.18em", textTransform: "uppercase" }}>Freiburg · Altstadt</span>
        </div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 400, color: "#F5EDD8", lineHeight: 1.1, marginBottom: "8px" }}>Exklusive<br /><em style={{ color: accent }}>Stadtvilla</em></div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          {["4 Zi.", "180 m²", "€ 1,2 M"].map((s, i) => (
            <div key={i} style={{ padding: "3px 8px", background: `${accent}12`, border: `1px solid ${accent}22`, fontSize: "7px", color: "rgba(245,237,216,0.7)", fontWeight: 600 }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Property cards row */}
      <div style={{ position: "absolute", bottom: "4px", left: "10px", right: "10px", display: "flex", gap: "6px" }}>
        {[0, 1].map(i => (
          <div key={i} style={{ flex: 1, background: "#181208", border: `1px solid ${accent}15`, padding: "7px 8px" }}>
            <div style={{ width: "100%", height: "22px", background: `${accent}08`, marginBottom: "5px" }} />
            <div style={{ width: "70%", height: "4px", background: accent, opacity: 0.45, borderRadius: "1px", marginBottom: "3px" }} />
            <div style={{ width: "50%", height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "1px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, top: "28px", padding: "20px 18px" }}>
      <div style={{ position: "absolute", left: "18px", top: "40px", bottom: "28px", width: "2px", background: accent, boxShadow: `0 0 10px ${accent}88` }} />
      <div style={{ paddingLeft: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "16px", height: "1px", background: accent }} />
          <div style={{ fontSize: "6px", color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>Rechtsanwälte · 1989</div>
        </div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 300, color: "#FAFAF8", lineHeight: 1.05 }}>Ihr Problem.</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontWeight: 300, fontStyle: "italic", color: accent, lineHeight: 1.05 }}>Unsere Stärke.</div>
        <div style={{ marginTop: "12px", width: "80px", height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "1px", marginBottom: "4px" }} />
        <div style={{ width: "60px", height: "5px", background: "rgba(255,255,255,0.07)", borderRadius: "1px" }} />
        <div style={{ marginTop: "14px", display: "inline-block", background: accent, padding: "5px 12px" }}>
          <div style={{ width: "70px", height: "5px", background: "rgba(255,255,255,0.5)", borderRadius: "1px" }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18px", background: accent, display: "flex", alignItems: "center", paddingLeft: "10px", gap: "10px", overflow: "hidden" }}>
        {["Immobilienrecht", "Erbrecht", "Familienrecht", "Gesellschaftsrecht"].map((t, i) => (
          <span key={i} style={{ fontSize: "6px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>{t} ·</span>
        ))}
      </div>
    </div>
  );
}

function FintechPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, top: "28px", padding: "20px 18px" }}>
      {[15, 30, 72, 85, 50].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: `${x}%`, top: "28px", display: "flex", flexDirection: "column", gap: "8px", opacity: 0.18 }}>
          {["€", "%", "4", "§", "8"].map((ch, j) => (
            <span key={j} style={{ fontSize: "7px", fontFamily: "monospace", color: accent, lineHeight: 1 }}>{ch}</span>
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <div style={{ fontSize: "6px", color: accent, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>Steuerberatung · 2009</div>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "26px", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.0, letterSpacing: "-0.04em" }}>Weniger</div>
        <div style={{ fontFamily: "monospace", fontSize: "26px", fontWeight: 900, color: accent, lineHeight: 1.0, letterSpacing: "-0.04em", textShadow: `0 0 20px ${accent}` }}>Steuern.</div>
        <div style={{ marginTop: "14px", display: "flex", gap: "6px" }}>
          <div style={{ background: accent, padding: "5px 12px" }}>
            <div style={{ width: "60px", height: "5px", background: "rgba(4,4,7,0.5)", borderRadius: "1px" }} />
          </div>
          <div style={{ border: `1px solid ${accent}44`, padding: "5px 10px" }}>
            <div style={{ width: "40px", height: "5px", background: "rgba(255,255,255,0.15)", borderRadius: "1px" }} />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#08080F", borderTop: `1px solid ${accent}15`, display: "flex" }}>
        {["€ 8.200", "340+", "15 J.", "24 h"].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "5px 0", textAlign: "center", borderRight: i < 3 ? `1px solid ${accent}10` : "none" }}>
            <div style={{ fontSize: "8px", fontFamily: "monospace", fontWeight: 700, color: accent }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CraftPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, top: "28px", padding: "20px 18px" }}>
      {/* Texture grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg, ${accent}04 0px, ${accent}04 1px, transparent 1px, transparent 8px)` }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
          <div style={{ width: "20px", height: "2px", background: accent, borderRadius: "1px" }} />
          <div style={{ fontSize: "6px", color: accent, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>Seit 1978 · Freiburg</div>
        </div>
        <div style={{ fontSize: "26px", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.0, letterSpacing: "-0.03em" }}>Qualität,</div>
        <div style={{ fontSize: "26px", fontWeight: 900, color: accent, lineHeight: 1.0, letterSpacing: "-0.03em" }}>die hält.</div>
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {["Dachdeckerei", "Fassadenbau", "Sanierung"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "4px", height: "4px", background: accent, flexShrink: 0 }} />
              <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "14px", background: accent, display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px" }}>
          <div style={{ width: "50px", height: "5px", background: "rgba(0,0,0,0.35)", borderRadius: "1px" }} />
          <div style={{ width: "8px", height: "8px", borderRight: "2px solid rgba(0,0,0,0.5)", borderTop: "2px solid rgba(0,0,0,0.5)", transform: "rotate(45deg)" }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "12px", right: "14px", width: "48px", height: "48px", border: `1px solid ${accent}30`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "8px", fontWeight: 800, color: accent, textAlign: "center", lineHeight: 1.2 }}>4.9<br /><span style={{ fontSize: "6px", opacity: 0.6 }}>★★★★★</span></div>
      </div>
    </div>
  );
}

// ─── Browser Mockup ───────────────────────────────────────────────

function BrowserMockup({ p, hovered }: { p: typeof projects[0]; hovered: boolean }) {
  const { preview: pv, accent } = p;
  return (
    <div style={{
      borderRadius: "12px",
      overflow: "hidden",
      border: `1px solid ${hovered ? accent + "44" : "rgba(255,255,255,0.08)"}`,
      boxShadow: hovered
        ? `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px ${accent}22`
        : "0 12px 48px rgba(0,0,0,0.5)",
      transition: "border-color 0.4s, box-shadow 0.4s",
    }}>
      {/* Chrome bar */}
      <div style={{
        background: "#181818", padding: "10px 14px",
        display: "flex", alignItems: "center", gap: "10px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: "5px" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: hovered ? c : "#333", transition: "background 0.3s" }} />
          ))}
        </div>
        <div style={{ flex: 1, height: "22px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", paddingLeft: "10px" }}>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>
            {p.client.toLowerCase().replace(/ & /g, "").replace(/ /g, "-")}.de
          </span>
        </div>
      </div>

      {/* Preview */}
      <div style={{ background: pv.bg, height: "240px", position: "relative", overflow: "hidden" }}>
        {/* Mini nav */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "28px",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", padding: "0 14px",
          justifyContent: "space-between",
          borderBottom: `1px solid ${accent}20`,
          zIndex: 5,
        }}>
          <div style={{ width: "44px", height: "6px", borderRadius: "2px", background: accent, opacity: 0.85 }} />
          <div style={{ display: "flex", gap: "8px" }}>
            {[0, 0, 1].map((o, i) => (
              <div key={i} style={{ width: i === 2 ? "28px" : "20px", height: "5px", borderRadius: "2px", background: i === 2 ? accent : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>
        </div>

        {pv.style === "immo"   && <ImmoPreview   accent={pv.accent} />}
        {pv.style === "legal"  && <LegalPreview  accent={pv.accent} />}
        {pv.style === "fintech" && <FintechPreview accent={pv.accent} />}
        {pv.style === "craft"  && <CraftPreview  accent={pv.accent} />}

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${p.accentDim} 0%, transparent 75%)`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Progress Dot (hook must be inside its own component) ─────────

function ProgressDot({ accent, progress, index, total }: {
  accent: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const opacity = useTransform(progress, [index / total - 0.05, index / total + 0.2], [0.2, 1]);
  return (
    <motion.div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, opacity }} />
  );
}

// ─── Section ──────────────────────────────────────────────────────

export default function WorkSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const inView        = useInView(headerRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [trackOffset, setTrackOffset] = useState(0);

  useEffect(() => {
    function measure() {
      if (!trackRef.current || !stickyRef.current) return;
      const trackW   = trackRef.current.scrollWidth;
      const viewW    = stickyRef.current.clientWidth;
      setTrackOffset(Math.max(0, trackW - viewW + 80));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xRaw    = useTransform(scrollYProgress, [0, 1], [0, -trackOffset]);
  const x       = useSpring(xRaw, { stiffness: 80, damping: 22, restDelta: 0.5 });


  return (
    <div
      ref={containerRef}
      id="projekte"
      style={{ position: "relative", height: "320vh" }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#070C17",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Header */}
        <div ref={headerRef} style={{ padding: "0 max(5vw, 32px)", marginBottom: "40px", flexShrink: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <div style={{ width: "28px", height: "1px", background: "#3B82F6" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3B82F6" }}>
                Referenzprojekte
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{
                fontSize: "clamp(24px, 4vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                color: "#FFFFFF",
                margin: 0,
              }}>
                Unsere Arbeit —<br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>für sich selbst sprechend.</span>
              </h2>
              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.06em", flexShrink: 0 }}
              >
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                  →
                </motion.span>
                Scrollen zum Erkunden
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{
            x,
            display: "flex",
            gap: "28px",
            paddingLeft: "max(5vw, 32px)",
            paddingRight: "max(5vw, 32px)",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.1, ease }}
              onMouseEnter={() => setHovered(p.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{ flexShrink: 0, width: "clamp(300px, 30vw, 420px)" }}
            >
              <Link href={p.href} style={{ textDecoration: "none", display: "block" }}>
                <motion.div
                  animate={{
                    y:     hovered === p.slug ? -10 : 0,
                    scale: hovered === p.slug ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                >
                  <BrowserMockup p={p} hovered={hovered === p.slug} />

                  {/* Info */}
                  <div style={{ padding: "20px 2px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <h3 style={{
                            fontSize: "16px", fontWeight: 800, letterSpacing: "-0.02em",
                            color: hovered === p.slug ? p.accent : "#FFFFFF",
                            margin: 0,
                            transition: "color 0.3s",
                          }}>
                            {p.client}
                          </h3>
                          <span style={{
                            fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                            padding: "2px 7px",
                            background: `${p.accent}18`,
                            color: p.accent,
                            border: `1px solid ${p.accent}30`,
                            borderRadius: "2px",
                          }}>
                            {p.label}
                          </span>
                        </div>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", margin: 0, letterSpacing: "0.03em" }}>
                          {p.industry}
                        </p>
                      </div>
                      <motion.span
                        animate={{ opacity: hovered === p.slug ? 1 : 0, x: hovered === p.slug ? 0 : 6 }}
                        transition={{ duration: 0.2 }}
                        style={{ fontSize: "20px", color: p.accent, lineHeight: 1, flexShrink: 0 }}
                      >
                        →
                      </motion.span>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {p.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: "9px", fontWeight: 600, letterSpacing: "0.08em",
                          padding: "3px 9px",
                          background: hovered === p.slug ? p.accentDim : "rgba(255,255,255,0.05)",
                          color: hovered === p.slug ? p.accent : "rgba(255,255,255,0.28)",
                          border: `1px solid ${hovered === p.slug ? p.accent + "33" : "rgba(255,255,255,0.07)"}`,
                          borderRadius: "2px",
                          transition: "all 0.3s",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div style={{ position: "absolute", bottom: "32px", left: "max(5vw, 32px)", right: "max(5vw, 32px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", borderRadius: "1px" }}>
              <motion.div
                style={{
                  position: "absolute", top: 0, left: 0, bottom: 0,
                  background: "linear-gradient(to right, #3B82F6, #6366F1)",
                  scaleX: scrollYProgress,
                  transformOrigin: "left",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {projects.map((p, i) => (
                <ProgressDot key={p.slug} accent={p.accent} progress={scrollYProgress} index={i} total={projects.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
