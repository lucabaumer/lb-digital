"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import page from "@/data/page.json";

const ease = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

const services = [
  "Website / Webdesign",
  "SEO & Sichtbarkeit",
  "Beides",
  "Sonstiges",
];

export default function CTASection() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    phone:   "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim())    e.name    = "Bitte Namen eingeben";
    if (!form.email.trim())   e.email   = "Bitte E-Mail eingeben";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = "Ungültige E-Mail-Adresse";
    if (!form.message.trim()) e.message = "Bitte kurz beschreiben, worum es geht";
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
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (
    id: keyof typeof form,
    label: string,
    type = "text",
    placeholder = ""
  ) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label htmlFor={id} style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
        {label}
        {id !== "phone" && id !== "service" && <span style={{ color: "#3B82F6", marginLeft: "3px" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
        style={{
          background: errors[id] ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${errors[id] ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "4px",
          padding: "12px 16px",
          fontSize: "14px",
          color: "#FFFFFF",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s",
          width: "100%",
        }}
        onFocus={e => { e.currentTarget.style.borderColor = "#3B82F6"; e.currentTarget.style.background = "rgba(59,130,246,0.06)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = errors[id] ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.background = errors[id] ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)"; }}
      />
      {errors[id] && <span style={{ fontSize: "11px", color: "#F87171" }}>{errors[id]}</span>}
    </div>
  );

  return (
    <section id="kontakt" ref={ref} style={{ background: "#0A1628", padding: "160px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? "48px" : "80px", alignItems: "start" }}>

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "24px", height: "1px", background: "#3B82F6" }} />
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3B82F6" }}>
                {page.cta.eyebrow}
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#FFFFFF", marginBottom: "20px" }}>
              {page.cta.headline}
            </h2>

            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "48px", maxWidth: "400px" }}>
              {page.cta.body}
            </p>

            {/* Trust signals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: "✓", text: "Antwort innerhalb von 24 Stunden" },
                { icon: "✓", text: "Kein Verkaufsdruck, keine Verpflichtung" },
                { icon: "✓", text: "Kostenloses Erstgespräch" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ width: "20px", height: "20px", background: "rgba(59,130,246,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#3B82F6", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Direct contact */}
            <div style={{ marginTop: "48px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Oder direkt:</p>
              <a href={`mailto:${page.footer.email}`} style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "6px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {page.footer.email}
              </a>
              <a href={`tel:${page.footer.phone}`} style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {page.footer.phone}
              </a>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "40px",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Top glow */}
              <div aria-hidden style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)" }} />

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
                      Nachricht erhalten!
                    </h3>
                    <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                      Ich melde mich innerhalb von 24 Stunden bei Ihnen. Bis gleich.
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
                    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                      {field("name",  "Name",   "text",  "Max Mustermann")}
                      {field("email", "E-Mail", "email", "max@firma.de")}
                    </div>

                    <div>
                      {field("phone", "Telefon (optional)", "tel", "+49 ...")}
                    </div>

                    {/* Message */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label htmlFor="message" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                        Nachricht <span style={{ color: "#3B82F6" }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={form.message}
                        placeholder="Was beschäftigt Sie? Was haben Sie sich vorgestellt?"
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        style={{
                          background: errors.message ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${errors.message ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                          borderRadius: "4px",
                          padding: "12px 16px",
                          fontSize: "14px",
                          color: "#FFFFFF",
                          outline: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          lineHeight: 1.6,
                          transition: "border-color 0.2s",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#3B82F6"; e.currentTarget.style.background = "rgba(59,130,246,0.06)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = errors.message ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.background = errors.message ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)"; }}
                      />
                      {errors.message && <span style={{ fontSize: "11px", color: "#F87171" }}>{errors.message}</span>}
                    </div>

                    {/* Error banner */}
                    {status === "error" && (
                      <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "4px", padding: "12px 16px", fontSize: "13px", color: "#F87171" }}>
                        Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt an {page.footer.email}.
                      </div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: "#1D4ED8",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "4px",
                        padding: "15px 32px",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: status === "loading" ? "not-allowed" : "pointer",
                        opacity: status === "loading" ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        transition: "background 0.2s",
                        width: "100%",
                      }}
                      onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background = "#1E40AF"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#1D4ED8"; }}
                    >
                      {status === "loading" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }}
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
