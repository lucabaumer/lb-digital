"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowBtn } from "@/components/ui/ArrowBtn";

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Project data ──────────────────────────────────────────────────
const projects = [
  {
    slug:      "immobilien",
    href:      "/projekte/immobilien",
    client:    "Müller Immobilien",
    industry:  "Immobilienmakler · Freiburg",
    tags:      ["Branding", "Webdesign", "SEO"],
    accent:    "#C9A870",
    accentDim: "rgba(201,168,112,0.12)",
    preview:   { bg: "#0C0A07", accent: "#C9A870", style: "luxury" as const },
  },
  {
    slug:      "kanzlei",
    href:      "/projekte/kanzlei",
    client:    "Wagner & Partner",
    industry:  "Rechtsanwaltskanzlei · Freiburg",
    tags:      ["Branding", "Webdesign", "Lead Gen"],
    accent:    "#C41E1E",
    accentDim: "rgba(196,30,30,0.12)",
    preview:   { bg: "#0A0907", accent: "#C41E1E", style: "legal" as const },
  },
  {
    slug:      "steuerberatung",
    href:      "/projekte/steuerberatung",
    client:    "Hoffmann Steuerberatung",
    industry:  "Steuerberatung · Freiburg",
    tags:      ["Webdesign", "Conversion", "SEO"],
    accent:    "#00EEFF",
    accentDim: "rgba(0,238,255,0.10)",
    preview:   { bg: "#040407", accent: "#00EEFF", style: "fintech" as const },
  },
];

// ─── Style-specific mini previews ─────────────────────────────────
function LuxuryPreview({ accent }: { accent: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, top: "28px", padding: "20px 18px" }}>
      {[{ x: 65, y: 25, s: 3 }, { x: 80, y: 55, s: 2 }, { x: 20, y: 60, s: 2.5 }].map((p, i) => (
        <div key={i} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: `${p.s}px`, height: `${p.s}px`, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}`, opacity: 0.7 }} />
      ))}
      <div style={{ width: "28px", height: "1px", background: accent, marginBottom: "12px" }} />
      <div style={{ fontSize: "7px", color: "rgba(245,240,232,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Est. 1998 · Freiburg</div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.0, letterSpacing: "-0.02em" }}>Außergewöhnliche</div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontWeight: 300, fontStyle: "italic", color: accent, lineHeight: 1.0 }}>Immobilien</div>
      <div style={{ marginTop: "14px", display: "flex", gap: "8px" }}>
        <div style={{ background: accent, padding: "5px 12px" }}>
          <div style={{ width: "60px", height: "5px", borderRadius: "1px", background: "rgba(0,0,0,0.3)" }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "12px", left: "18px", right: "18px", display: "flex", gap: "6px" }}>
        {[0, 1].map(i => (
          <div key={i} style={{ flex: 1, background: `${accent}10`, border: `1px solid ${accent}20`, padding: "6px 8px" }}>
            <div style={{ width: "100%", height: "28px", background: "rgba(255,255,255,0.06)", marginBottom: "5px" }} />
            <div style={{ width: "70%", height: "4px", background: accent, opacity: 0.5, borderRadius: "1px" }} />
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
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${accent}08 1px, transparent 1px), linear-gradient(90deg, ${accent}08 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }} />
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

// ─── Browser mockup wrapper ───────────────────────────────────────
function BrowserMockup({ p, hovered }: { p: typeof projects[0]; hovered: boolean }) {
  const { preview: pv, accent } = p;
  return (
    <div style={{
      borderRadius: "10px",
      overflow: "hidden",
      border: `1px solid ${hovered ? accent + "44" : "rgba(255,255,255,0.08)"}`,
      boxShadow: hovered
        ? `0 24px 70px rgba(0,0,0,0.7), 0 0 0 1px ${accent}22`
        : "0 10px 40px rgba(0,0,0,0.4)",
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

      {/* Preview area */}
      <div style={{ background: pv.bg, height: "230px", position: "relative", overflow: "hidden" }}>
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

        {pv.style === "luxury"  && <LuxuryPreview  accent={pv.accent} />}
        {pv.style === "legal"   && <LegalPreview   accent={pv.accent} />}
        {pv.style === "fintech" && <FintechPreview  accent={pv.accent} />}

        {/* Hover radial glow */}
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

// ─── Section ──────────────────────────────────────────────────────
export default function WorkSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="projekte"
      aria-label="Referenzprojekte"
      style={{
        background: "#070C17",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Background shifts with hovered card */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        transition: "background 0.6s ease",
        background:
          hovered === "immobilien"    ? "radial-gradient(ellipse 55% 60% at 17% 50%, rgba(201,168,112,0.05) 0%, transparent 70%)"
          : hovered === "kanzlei"     ? "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(196,30,30,0.05) 0%, transparent 70%)"
          : hovered === "steuerberatung" ? "radial-gradient(ellipse 55% 60% at 83% 50%, rgba(0,238,255,0.05) 0%, transparent 70%)"
          : "none",
      }} />

      <div className="container-xl">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-6"
          style={{  }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: "#3B82F6" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3B82F6" }}>
                Referenzprojekte
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#FFFFFF",
              margin: 0,
            }}>
              Unsere Arbeit —<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>für sich selbst sprechend.</span>
            </h2>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-7">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 64 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.16, ease }}
              onMouseEnter={() => setHovered(p.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={p.href} style={{ textDecoration: "none", display: "block" }}>
                <motion.div
                  animate={{
                    y:     hovered === p.slug ? -10 : 0,
                    scale: hovered === p.slug ? 1.025 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                >
                  <BrowserMockup p={p} hovered={hovered === p.slug} />

                  {/* Info row */}
                  <div style={{ padding: "22px 2px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div>
                        <h3 style={{
                          fontSize: "17px", fontWeight: 800, letterSpacing: "-0.02em",
                          color: hovered === p.slug ? p.accent : "#FFFFFF",
                          margin: "0 0 4px",
                          transition: "color 0.3s",
                        }}>
                          {p.client}
                        </h3>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: 0, letterSpacing: "0.03em" }}>
                          {p.industry}
                        </p>
                      </div>
                      <motion.span
                        animate={{ opacity: hovered === p.slug ? 1 : 0, x: hovered === p.slug ? 0 : 6 }}
                        transition={{ duration: 0.22 }}
                        style={{ fontSize: "22px", color: p.accent, lineHeight: 1 }}
                      >
                        →
                      </motion.span>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {p.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em",
                          padding: "4px 10px",
                          background: hovered === p.slug ? p.accentDim : "rgba(255,255,255,0.05)",
                          color: hovered === p.slug ? p.accent : "rgba(255,255,255,0.3)",
                          border: `1px solid ${hovered === p.slug ? p.accent + "33" : "rgba(255,255,255,0.08)"}`,
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
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ marginTop: "80px", textAlign: "center" }}
        >
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.22)", marginBottom: "24px" }}>
            Ihre Branche ist auch dabei — wir bauen für jeden Markt.
          </p>
          <ArrowBtn href="#kontakt" variant="primary">
            Projekt anfragen
          </ArrowBtn>
        </motion.div>

      </div>
    </section>
  );
}
