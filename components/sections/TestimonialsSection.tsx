"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useContactModal } from "@/components/ui/ContactModalProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#1264F1";

// Replace with your Google Business Profile URL once available
const GOOGLE_PROFILE_URL = "https://maps.google.com/?cid=YOUR_CID";

const metrics = [
  {
    value: "95+",
    label: "Lighthouse Score",
    sub: "Performance · Accessibility · SEO · Best Practices",
  },
  {
    value: "<1s",
    label: "Ladezeit",
    sub: "Statisches Rendering, Vercel Edge Network",
  },
  {
    value: "2–3W",
    label: "Lieferzeit",
    sub: "Von der Anfrage bis zur fertigen Website",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { openModal } = useContactModal();

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-heading"
      className="section-py"
      style={{ background: "#07101F", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="container-xl">

        {/* Header */}
        <div className="mb-14 lg:mb-16">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Qualität & Bewertungen
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            className="font-display font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)", maxWidth: "640px" }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.07, ease: EASE }}
          >
            Messbare Qualität.{" "}
            <span style={{ color: "rgba(255,255,255,0.22)" }}>Keine Versprechen.</span>
          </motion.h2>
          <motion.p
            className="mt-5"
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px, 1.5vw, 16px)", maxWidth: "520px", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            Wir sind frisch am Markt. Statt Fake-Bewertungen zeigen wir, was wir technisch liefern — messbar, transparent, nachprüfbar.
          </motion.p>
        </div>

        {/* ── Editorial stat strip — no cards, just large numbers ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex flex-col lg:flex-row mb-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.18 + i * 0.1, ease: EASE }}
              className={[
                "flex-1 py-11",
                i < metrics.length - 1 ? "border-b lg:border-b-0" : "",
                i > 0 ? "lg:border-l lg:pl-12" : "",
                i < metrics.length - 1 ? "lg:pr-12" : "",
              ].join(" ")}
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <p
                className="font-display font-extrabold leading-none mb-3"
                style={{
                  fontSize: "clamp(52px, 6.5vw, 80px)",
                  color: ACCENT,
                  letterSpacing: "-0.03em",
                }}
              >
                {m.value}
              </p>
              <p className="font-bold text-white mb-1.5" style={{ fontSize: "15px" }}>
                {m.label}
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.32)", lineHeight: 1.5 }}>
                {m.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Google Reviews card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px",
            padding: "32px 36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Google G */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-white" style={{ fontSize: "15px", marginBottom: "4px" }}>
                Google Bewertungen — LB Digital
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ display: "flex", gap: "2px" }} aria-label="Noch keine Bewertungen">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
                  Erste Bewertungen folgen nach dem Launch
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                padding: "9px 18px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "color 0.2s, border-color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              Auf Google ansehen
            </a>
            <button
              onClick={openModal}
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#07101F",
                background: "#FFFFFF",
                border: "none",
                padding: "9px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Referenzkunde werden
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
