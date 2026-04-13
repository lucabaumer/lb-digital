"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import page from "@/data/page.json";

type Status = "idle" | "loading" | "success" | "error";
const ease = [0.22, 1, 0.36, 1] as const;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset on re-open
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrors({});
    }
  }, [isOpen]);

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inp = (
    id: keyof typeof form,
    label: string,
    type = "text",
    placeholder = "",
    required = true
  ) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={`modal-${id}`}
        style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}
      >
        {label}
        {required && <span style={{ color: "#3B82F6", marginLeft: "3px" }}>*</span>}
      </label>
      <input
        id={`modal-${id}`}
        type={type}
        value={form[id]}
        placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
        style={{
          background: errors[id] ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${errors[id] ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "8px",
          padding: "11px 14px",
          fontSize: "14px",
          color: "#fff",
          outline: "none",
          width: "100%",
          transition: "border-color 0.15s, background 0.15s",
        }}
        onFocus={e => { e.currentTarget.style.borderColor = "#3B82F6"; e.currentTarget.style.background = "rgba(59,130,246,0.07)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = errors[id] ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.background = errors[id] ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.05)"; }}
      />
      {errors[id] && <span style={{ fontSize: "11px", color: "#F87171" }}>{errors[id]}</span>}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998]"
            style={{ background: "rgba(4,8,18,0.88)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
            aria-hidden="true"
          />

          {/* Modal card */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-5 py-8 pointer-events-none">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.38, ease }}
              role="dialog"
              aria-modal="true"
              aria-label="Kontakt aufnehmen"
              className="pointer-events-auto w-full overflow-y-auto"
              style={{
                maxWidth: "520px",
                maxHeight: "90vh",
                background: "rgba(8,14,28,0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(79,70,229,0.12)",
                padding: "36px 32px 32px",
                scrollbarWidth: "none",
              }}
            >
              {/* Top accent line */}
              <div aria-hidden style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)", borderRadius: "1px" }} />

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3B82F6", marginBottom: "6px" }}>
                    Kostenloses Erstgespräch
                  </p>
                  <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                    Projekt anfragen
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Schließen"
                  style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Form / Success */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: "center", padding: "32px 0" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      style={{ width: "60px", height: "60px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "24px", color: "#4ADE80" }}
                    >
                      ✓
                    </motion.div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>Nachricht erhalten!</h3>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                      Ich melde mich innerhalb von 24 Stunden. Bis gleich.
                    </p>
                    <button
                      onClick={onClose}
                      style={{ marginTop: "28px", padding: "12px 28px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "13px", cursor: "pointer" }}
                    >
                      Schließen
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {inp("name",  "Name",   "text",  "Max Mustermann")}
                      {inp("email", "E-Mail", "email", "max@firma.de")}
                    </div>
                    {inp("phone", "Telefon (optional)", "tel", "+49 ...", false)}

                    {/* Message */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor="modal-message" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                        Nachricht <span style={{ color: "#3B82F6" }}>*</span>
                      </label>
                      <textarea
                        id="modal-message"
                        rows={4}
                        value={form.message}
                        placeholder="Was beschäftigt Sie? Was haben Sie sich vorgestellt?"
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        style={{
                          background: errors.message ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${errors.message ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                          borderRadius: "8px",
                          padding: "11px 14px",
                          fontSize: "14px",
                          color: "#fff",
                          outline: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          lineHeight: 1.6,
                          width: "100%",
                          transition: "border-color 0.15s",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#3B82F6"; e.currentTarget.style.background = "rgba(59,130,246,0.07)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = errors.message ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.background = errors.message ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.05)"; }}
                      />
                      {errors.message && <span style={{ fontSize: "11px", color: "#F87171" }}>{errors.message}</span>}
                    </div>

                    {status === "error" && (
                      <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "12px 16px", fontSize: "13px", color: "#F87171" }}>
                        Etwas ist schiefgelaufen. Schreib direkt an {page.footer.email}.
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "999px",
                        padding: "14px 32px",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        cursor: status === "loading" ? "not-allowed" : "pointer",
                        opacity: status === "loading" ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        width: "100%",
                        boxShadow: "0 4px 20px rgba(79,70,229,0.4)",
                        marginTop: "4px",
                      }}
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

                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
                      Ihre Daten werden vertraulich behandelt und nicht weitergegeben.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
