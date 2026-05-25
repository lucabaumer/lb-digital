"use client";

import { useContactModal } from "@/components/ui/ContactModalProvider";

const PHONE_RAW = "01785881195";
const PHONE_HREF = `tel:+49${PHONE_RAW.replace(/^0/, "")}`;
const PHONE_DISPLAY = "+49 178 588 1195";

export default function MobileStickyBar() {
  const { openModal } = useContactModal();

  return (
    <div
      className="lg:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "64px",
        display: "flex",
        background: "rgba(7,16,31,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Phone button — amber exclusive CTA */}
      <a
        href={PHONE_HREF}
        aria-label={`Jetzt anrufen: ${PHONE_DISPLAY}`}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: "#F59E0B",
          color: "#07101F",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          borderRight: "1px solid rgba(7,16,31,0.15)",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.15 3.38 2 2 0 0 1 3.12 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
        </svg>
        Anrufen
      </a>

      {/* Contact modal button — secondary action */}
      <button
        onClick={openModal}
        aria-label="Kontaktformular öffnen"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.8)",
          border: "none",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          cursor: "pointer",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Anfrage senden
      </button>
    </div>
  );
}
