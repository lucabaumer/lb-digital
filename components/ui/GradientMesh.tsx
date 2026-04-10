export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(79,70,229,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Accent wash — top right */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.6) 0%, transparent 65%)",
        }}
      />
      {/* Secondary wash — bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(30,27,75,0.8) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
