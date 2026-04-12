"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lb_cookie_consent");
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
    if (consent === "accepted") enableGA();
  }, []);

  function enableGA() {
    if (typeof window === "undefined") return;
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    if (w.gtag) {
      w.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-[9999]"
          style={{ transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: "480px" }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie-Einstellungen"
        >
          <div
            style={{
              background: "rgba(10, 18, 35, 0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "20px 22px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(79,70,229,0.12)",
            }}
          >
            {/* Top row */}
            <div className="flex items-start gap-3 mb-4">
              {/* Cookie icon */}
              <div
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.2)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7.5" stroke="#818CF8" strokeWidth="1.2" />
                  <circle cx="6.5" cy="7" r="1.2" fill="#818CF8" />
                  <circle cx="10.5" cy="6" r="0.9" fill="#818CF8" />
                  <circle cx="11" cy="10.5" r="1.2" fill="#818CF8" />
                  <circle cx="7" cy="11.5" r="0.8" fill="#818CF8" />
                  <circle cx="9" cy="9" r="0.7" fill="#818CF8" />
                </svg>
              </div>

              <div>
                <p
                  className="font-semibold mb-1"
                  style={{ fontSize: "14px", color: "#F9FAFB" }}
                >
                  Diese Website nutzt Cookies
                </p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6" }}>
                  Wir verwenden Google Analytics, um zu verstehen wie Besucher die Seite nutzen.{" "}
                  <Link
                    href="/datenschutz"
                    style={{ color: "#818CF8", textDecoration: "underline", textUnderlineOffset: "2px" }}
                  >
                    Datenschutz
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={decline}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                }}
              >
                Ablehnen
              </button>
              <button
                onClick={accept}
                style={{
                  flex: 2,
                  padding: "9px 0",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(79,70,229,0.35)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(79,70,229,0.5)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px rgba(79,70,229,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
