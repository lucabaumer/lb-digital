"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lb_cookie_consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
    if (consent === "accepted") enableGA();
  }, []);

  function enableGA() {
    if (typeof window === "undefined") return;
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    if (w.gtag) w.gtag("consent", "update", { analytics_storage: "granted" });
  }

  function accept() {
    localStorage.setItem("lb_cookie_consent", "accepted");
    enableGA();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("lb_cookie_consent", "declined");
    setVisible(false);
  }

  const card = (
    <div
      style={{
        background: "rgba(8, 14, 28, 0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "28px 24px 24px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(79,70,229,0.15)",
        width: "100%",
        maxWidth: "360px",
      }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-5">
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(79,70,229,0.12)",
            border: "1px solid rgba(79,70,229,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#818CF8" strokeWidth="1.5" />
            <circle cx="8.5" cy="9.5" r="1.5" fill="#818CF8" />
            <circle cx="14" cy="8" r="1.1" fill="#818CF8" />
            <circle cx="15" cy="14" r="1.5" fill="#818CF8" />
            <circle cx="9" cy="15.5" r="1" fill="#818CF8" />
            <circle cx="12" cy="12" r="0.9" fill="#818CF8" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <p
        className="font-display font-bold text-center mb-2"
        style={{ fontSize: "17px", color: "#F9FAFB" }}
      >
        Diese Website nutzt Cookies
      </p>
      <p
        className="text-center mb-6"
        style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)", lineHeight: "1.65" }}
      >
        Wir nutzen Google Analytics um zu verstehen, wie Besucher die Seite verwenden.{" "}
        <Link
          href="/datenschutz"
          style={{ color: "#818CF8", textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          Mehr erfahren
        </Link>
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={accept}
          style={{
            width: "100%",
            padding: "13px 0",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(79,70,229,0.4)",
            transition: "all 0.15s ease",
          }}
        >
          Akzeptieren
        </button>
        <button
          onClick={decline}
          style={{
            width: "100%",
            padding: "13px 0",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.45)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          Ablehnen
        </button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Mobile: fullscreen blocking modal ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] lg:hidden flex items-center justify-center px-5"
            style={{ background: "rgba(4, 8, 18, 0.93)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie-Einstellungen"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%" }}
            >
              {card}
            </motion.div>
          </motion.div>

          {/* ── Desktop: small bottom banner ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 left-1/2 z-[9999] hidden lg:block"
            style={{ transform: "translateX(-50%)", width: "420px" }}
            role="dialog"
            aria-label="Cookie-Einstellungen"
          >
            {card}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
