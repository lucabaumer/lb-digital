"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import page from "@/data/page.json";

const ease = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function CTASection() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.phone.trim()) e.phone = "Bitte Telefonnummer eingeben";
    if (!form.name.trim())  e.name  = "Bitte Namen eingeben";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = (hasError: boolean) => ({
    background: hasError ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${hasError ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "6px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    width: "100%",
  });

  const labelStyle = {
    fontSize: "11px",
    fontWeight: 600 as const,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.45)",
  };

  return (
    <section id="kontakt" ref={ref} style={{ background: "#07101F", padding: "140px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--color-accent)" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                {page.cta.eyebrow}
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "20px" }}>
              {page.cta.headline}
            </h2>

            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "40px", maxWidth: "400px" }}>
              {page.cta.body}
            </p>

            {/* Trust signals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
              {[
                "Rückruf innerhalb von 2 Stunden",
                "Kostenloses Erstgespräch — kein Verkaufsdruck",
                "Konkretes Angebot in 24 Stunden",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ width: "18px", height: "18px", background: "rgba(18,100,241,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "var(--color-accent)", flexShrink: 0 }}>
                    ✓
                  </span>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>{text}</span>
                </motion.div>
              ))}
            </div>

            {/* Direct phone CTA */}
            <a
              href={`tel:+49${page.footer.phone.replace(/^0/, "")}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "14px 24px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "999px",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.15 3.38 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
              </svg>
              +49 178 5881195
            </a>
          </motion.div>

          {/* ── Right: simplified form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "40px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div aria-hidden style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(to right, transparent, rgba(18,100,241,0.5), transparent)" }} />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "40px 0" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                      style={{ width: "64px", height: "64px", background: "rgba(34,197,94,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px" }}
                    >
                      ✓
                    </motion.div>
                    <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", marginBottom: "12px" }}>
                      Wir melden uns!
                    </h3>
                    <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                      Ich rufe Sie innerhalb von 2 Stunden zurück.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      style={{ marginTop: "28px", fontSize: "12px", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Neue Nachricht senden
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                  >
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>
                      Hinterlassen Sie Ihre Nummer — ich rufe zurück.
                    </p>

                    {/* Phone — first and prominent */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label htmlFor="phone" style={labelStyle}>
                        Telefonnummer <span style={{ color: "var(--color-accent)", marginLeft: "3px" }}>*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        placeholder="+49 ..."
                        autoComplete="tel"
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        style={{ ...inputStyle(!!errors.phone), fontSize: "16px", padding: "16px" }}
                        onFocus={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.background = "rgba(18,100,241,0.06)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = errors.phone ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.background = errors.phone ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)"; }}
                      />
                      {errors.phone && <span style={{ fontSize: "11px", color: "#F87171" }}>{errors.phone}</span>}
                    </div>

                    {/* Name */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label htmlFor="name" style={labelStyle}>
                        Name <span style={{ color: "var(--color-accent)", marginLeft: "3px" }}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        placeholder="Max Mustermann"
                        autoComplete="name"
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={inputStyle(!!errors.name)}
                        onFocus={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.background = "rgba(18,100,241,0.06)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = errors.name ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.background = errors.name ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)"; }}
                      />
                      {errors.name && <span style={{ fontSize: "11px", color: "#F87171" }}>{errors.name}</span>}
                    </div>

                    {/* Message optional */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label htmlFor="message" style={labelStyle}>
                        Kurze Nachricht <span style={{ color: "rgba(255,255,255,0.2)", marginLeft: "3px", textTransform: "none", fontWeight: 400 }}>optional</span>
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={form.message}
                        placeholder="Womit kann ich helfen?"
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        style={{
                          ...inputStyle(false),
                          resize: "none",
                          fontFamily: "inherit",
                          lineHeight: 1.6,
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.background = "rgba(18,100,241,0.06)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                      />
                    </div>

                    {status === "error" && (
                      <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px", padding: "12px 16px", fontSize: "13px", color: "#F87171" }}>
                        Etwas ist schiefgelaufen. Rufen Sie uns direkt an: {page.footer.phone}
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: status === "loading" ? 1 : 1.02, boxShadow: "0 10px 48px rgba(255,255,255,0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: "#FFFFFF",
                        color: "#07101F",
                        border: "none",
                        borderRadius: "999px",
                        padding: "16px 32px",
                        fontSize: "14px",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        cursor: status === "loading" ? "not-allowed" : "pointer",
                        opacity: status === "loading" ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        width: "100%",
                        boxShadow: "0 4px 24px rgba(255,255,255,0.18)",
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            style={{ width: "14px", height: "14px", border: "2px solid rgba(7,16,31,0.2)", borderTopColor: "#07101F", borderRadius: "50%", display: "inline-block" }}
                          />
                          Wird gesendet…
                        </>
                      ) : (
                        `› ${page.cta.button}`
                      )}
                    </motion.button>

                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", textAlign: "center", lineHeight: 1.6 }}>
                      Ihre Daten werden vertraulich behandelt und nicht weitergegeben.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
