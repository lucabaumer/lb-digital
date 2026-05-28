"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    slug:      "gastronomie",
    href:      "/projekte/steuerberatung",
    client:    "Gasthaus Schwarzwaldblick",
    industry:  "Gastronomie · Titisee-Neustadt",
    accent:    "#E8652A",
    accentDim: "rgba(232,101,42,0.18)",
    preview:   { bg: "#0D0704", accent: "#E8652A", style: "gastro" as const },
    label:     "Demo-Projekt",
  },
  {
    slug:      "handwerk",
    href:      "/projekte/steuerberatung",
    client:    "Baumeister Söhne GmbH",
    industry:  "Handwerksbetrieb · Freiburg",
    accent:    "#F97316",
    accentDim: "rgba(249,115,22,0.18)",
    preview:   { bg: "#090704", accent: "#F97316", style: "craft" as const },
    label:     "Demo-Projekt",
  },
  {
    slug:      "steuerberatung",
    href:      "/projekte/steuerberatung",
    client:    "Hoffmann Steuerberatung",
    industry:  "Steuerberatung · Freiburg",
    accent:    "#00EEFF",
    accentDim: "rgba(0,238,255,0.15)",
    preview:   { bg: "#040407", accent: "#00EEFF", style: "fintech" as const },
    label:     "Demo-Projekt",
  },
  {
    slug:      "physio",
    href:      "/projekte/steuerberatung",
    client:    "PhysioActive Freiburg",
    industry:  "Physiotherapie · Freiburg",
    accent:    "#0EA5E9",
    accentDim: "rgba(14,165,233,0.18)",
    preview:   { bg: "#030810", accent: "#0EA5E9", style: "physio" as const },
    label:     "Demo-Projekt",
  },
];

// ─── Hero Previews ────────────────────────────────────────────────

function GastronomiePreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg, ${accent}06 0px, ${accent}06 1px, transparent 1px, transparent 12px)` }} />
      <div style={{ position: "absolute", top: "32px", left: "28px", right: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{ width: "24px", height: "2px", background: accent }} />
          <span style={{ fontSize: "9px", color: accent, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700 }}>Seit 1994 · Titisee</span>
        </div>
        <div style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.03em" }}>Gut bürgerlich.</div>
        <div style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: accent, lineHeight: 1, letterSpacing: "-0.03em" }}>Besonders gut.</div>
        <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
          {["Speisekarte", "Mittagstisch", "Reservierung"].map((t, i) => (
            <div key={i} style={{ padding: "6px 12px", background: i === 0 ? accent : `${accent}18`, border: `1px solid ${accent}${i === 0 ? "FF" : "30"}`, fontSize: "9px", color: i === 0 ? "#0D0704" : `rgba(255,255,255,0.6)`, fontWeight: 700, borderRadius: "3px" }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: "28px", right: "28px", background: accent, padding: "8px 14px" }}>
        <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", color: "#0D0704" }}>RESERVIEREN</span>
      </div>
    </div>
  );
}

function PhysioPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "32px 28px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${accent}06 1px, transparent 1px), linear-gradient(90deg, ${accent}06 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: accent, boxShadow: `0 0 12px ${accent}88` }} />
          <span style={{ fontSize: "9px", color: accent, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>Physiotherapie · Freiburg</span>
        </div>
        <div style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.0, letterSpacing: "-0.03em" }}>Bewegung</div>
        <div style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 900, color: accent, lineHeight: 1.0, letterSpacing: "-0.03em", textShadow: `0 0 24px ${accent}66` }}>heilt.</div>
        <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
          <div style={{ background: accent, padding: "10px 20px", borderRadius: "3px" }}>
            <div style={{ width: "80px", height: "6px", background: "rgba(3,8,16,0.45)", borderRadius: "2px" }} />
          </div>
          <div style={{ border: `1px solid ${accent}44`, padding: "10px 16px", borderRadius: "3px" }}>
            <div style={{ width: "60px", height: "6px", background: "rgba(255,255,255,0.15)", borderRadius: "2px" }} />
          </div>
        </div>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {["Manuelle Therapie", "Sportphysio", "Hausbesuche"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "0", left: 0, right: 0, background: "#050C18", borderTop: `1px solid ${accent}18`, display: "flex" }}>
        {["95+", "48h", "4.9★"].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "10px 0", textAlign: "center", borderRight: i < 2 ? `1px solid ${accent}12` : "none" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: accent }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FintechPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "32px 28px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: accent, boxShadow: `0 0 12px ${accent}` }} />
          <div style={{ fontSize: "9px", color: accent, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>Steuerberatung · 2009</div>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.0, letterSpacing: "-0.04em" }}>Weniger</div>
        <div style={{ fontFamily: "monospace", fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 900, color: accent, lineHeight: 1.0, letterSpacing: "-0.04em", textShadow: `0 0 28px ${accent}` }}>Steuern.</div>
        <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
          <div style={{ background: accent, padding: "10px 20px" }}>
            <div style={{ width: "80px", height: "6px", background: "rgba(4,4,7,0.5)", borderRadius: "2px" }} />
          </div>
          <div style={{ border: `1px solid ${accent}44`, padding: "10px 16px" }}>
            <div style={{ width: "60px", height: "6px", background: "rgba(255,255,255,0.15)", borderRadius: "2px" }} />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#08080F", borderTop: `1px solid ${accent}15`, display: "flex" }}>
        {["€ 8.200", "340+", "15 J.", "24 h"].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "10px 0", textAlign: "center", borderRight: i < 3 ? `1px solid ${accent}10` : "none" }}>
            <div style={{ fontSize: "11px", fontFamily: "monospace", fontWeight: 700, color: accent }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CraftPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "32px 28px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg, ${accent}04 0px, ${accent}04 1px, transparent 1px, transparent 8px)` }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <div style={{ width: "28px", height: "2px", background: accent, borderRadius: "1px" }} />
          <div style={{ fontSize: "9px", color: accent, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>Seit 1978 · Freiburg</div>
        </div>
        <div style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.0, letterSpacing: "-0.03em" }}>Qualität,</div>
        <div style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 900, color: accent, lineHeight: 1.0, letterSpacing: "-0.03em" }}>die hält.</div>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {["Dachdeckerei", "Fassadenbau", "Sanierung"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "5px", height: "5px", background: accent, flexShrink: 0 }} />
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "24px", background: accent, display: "inline-flex", alignItems: "center", gap: "12px", padding: "10px 20px" }}>
          <div style={{ width: "70px", height: "6px", background: "rgba(0,0,0,0.35)", borderRadius: "2px" }} />
          <div style={{ width: "10px", height: "10px", borderRight: "2px solid rgba(0,0,0,0.5)", borderTop: "2px solid rgba(0,0,0,0.5)", transform: "rotate(45deg)" }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "20px", right: "24px", width: "60px", height: "60px", border: `1px solid ${accent}30`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "10px", fontWeight: 800, color: accent, textAlign: "center", lineHeight: 1.3 }}>4.9<br /><span style={{ fontSize: "8px", opacity: 0.6 }}>★★★★★</span></div>
      </div>
    </div>
  );
}

// ─── Progress Dot ─────────────────────────────────────────────────

function ProgressDot({ accent, progress, index, total }: {
  accent: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const start = Math.max(0, index / total - 0.05);
  const end = Math.min(1, Math.max(start + 0.01, index / total + 0.2));
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, opacity }} />
  );
}

// ─── Section ──────────────────────────────────────────────────────

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const inView       = useInView(headerRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [trackOffset, setTrackOffset] = useState(0);

  useEffect(() => {
    function measure() {
      if (!trackRef.current || !stickyRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      const viewW  = stickyRef.current.clientWidth;
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

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -trackOffset]);
  const x    = useSpring(xRaw, { stiffness: 80, damping: 22, restDelta: 0.5 });

  return (
    <div ref={containerRef} id="projekte" style={{ position: "relative", height: "320vh" }}>
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
              <h2 style={{ fontSize: "clamp(24px, 4vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#FFFFFF", margin: 0 }}>
                Unsere Arbeit —<br />
                <span style={{ color: "rgba(255,255,255,0.28)" }}>für sich selbst sprechend.</span>
              </h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.06em", flexShrink: 0 }}
              >
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>→</motion.span>
                Scrollen zum Erkunden
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Photo strip */}
        <motion.div
          ref={trackRef}
          style={{
            x,
            display: "flex",
            gap: "16px",
            paddingLeft: "max(5vw, 32px)",
            paddingRight: "max(5vw, 32px)",
            alignItems: "stretch",
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
              style={{ flexShrink: 0, width: "clamp(260px, 26vw, 380px)" }}
            >
              <Link href={p.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <motion.div
                  animate={{ y: hovered === p.slug ? -6 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "clamp(300px, 45vh, 480px)",
                    background: p.preview.bg,
                    border: `1px solid ${hovered === p.slug ? p.accent + "55" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: hovered === p.slug
                      ? `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${p.accent}22`
                      : "0 8px 32px rgba(0,0,0,0.4)",
                    transition: "border-color 0.35s, box-shadow 0.35s",
                  }}
                >
                  {/* Preview content */}
                  {p.preview.style === "gastro"  && <GastronomiePreview accent={p.preview.accent} />}
                  {p.preview.style === "craft"   && <CraftPreview        accent={p.preview.accent} />}
                  {p.preview.style === "fintech" && <FintechPreview       accent={p.preview.accent} />}
                  {p.preview.style === "physio"  && <PhysioPreview        accent={p.preview.accent} />}

                  {/* Hover overlay */}
                  <motion.div
                    animate={{ opacity: hovered === p.slug ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${p.accentDim} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Bottom info overlay */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "32px 20px 18px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 800, color: "#FFFFFF", margin: "0 0 2px", letterSpacing: "-0.01em" }}>{p.client}</p>
                        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.03em" }}>{p.industry}</p>
                      </div>
                      <motion.div
                        animate={{ opacity: hovered === p.slug ? 1 : 0, x: hovered === p.slug ? 0 : 8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          width: "32px", height: "32px", borderRadius: "50%",
                          background: p.accent,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Label badge */}
                  <div style={{
                    position: "absolute", top: "14px", left: "14px",
                    fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em",
                    padding: "3px 8px",
                    background: `${p.accent}22`,
                    color: p.accent,
                    border: `1px solid ${p.accent}33`,
                    borderRadius: "3px",
                  }}>
                    {p.label}
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
              <motion.div style={{ position: "absolute", top: 0, left: 0, bottom: 0, background: "linear-gradient(to right, #3B82F6, #6366F1)", scaleX: scrollYProgress, transformOrigin: "left" }} />
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
