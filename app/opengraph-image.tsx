import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LB Digital – Webdesign & SEO Agentur Freiburg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A1628",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse at 30% 40%, rgba(29,78,216,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Eyebrow */}
        <div
          style={{
            color: "#3B82F6",
            fontSize: 16,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 28,
            display: "flex",
          }}
        >
          WEBAGENTUR · FREIBURG IM BREISGAU
        </div>
        {/* Headline */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            display: "flex",
          }}
        >
          LB Digital
        </div>
        {/* Subline */}
        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 26,
            marginTop: 24,
            display: "flex",
          }}
        >
          Webdesign & SEO — Next.js, schnell, individuell.
        </div>
        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            right: "80px",
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "80px",
            color: "rgba(255,255,255,0.2)",
            fontSize: 13,
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          www.lb-digital.agency
        </div>
      </div>
    ),
    { ...size }
  );
}
