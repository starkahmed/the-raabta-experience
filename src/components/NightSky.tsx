/**
 * Sacred backdrop: a fine gold Islamic geometric lattice (interlocking
 * 8-pointed star motif) rendered at very low opacity over a deep
 * charcoal-to-black gradient. The pattern breathes — a barely perceptible
 * scale pulse and slow rotation — so it feels alive without ever
 * competing with the foreground calligraphy.
 */
export function NightSky() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #14100c 0%, #0a0806 55%, #030202 100%)",
      }}
    >
      {/* Warm gold glow behind the calligraphy, illuminating the lattice */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "70vmin",
          height: "70vmin",
          background:
            "radial-gradient(circle, oklch(0.78 0.15 70 / 0.28) 0%, oklch(0.65 0.13 55 / 0.14) 35%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Geometric lattice — SVG pattern of interlocking 8-pointed stars */}
      <div
        className="absolute inset-0"
        style={{
          animation: "lattice-breathe 14s ease-in-out infinite",
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.1 }}
        >
          <defs>
            <pattern
              id="islamic-star"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(0)"
            >
              {/* Interlocking 8-pointed star (rub el hizb) built from two rotated squares */}
              <g
                fill="none"
                stroke="oklch(0.82 0.14 75)"
                strokeWidth="0.7"
                strokeLinejoin="round"
              >
                <rect x="30" y="30" width="60" height="60" />
                <rect
                  x="30"
                  y="30"
                  width="60"
                  height="60"
                  transform="rotate(45 60 60)"
                />
                {/* Inner octagon accent */}
                <polygon
                  points="60,42 78,50 86,68 78,86 60,94 42,86 34,68 42,50"
                  strokeWidth="0.5"
                />
                {/* Connecting lines to tile edges */}
                <line x1="0" y1="60" x2="30" y2="60" />
                <line x1="90" y1="60" x2="120" y2="60" />
                <line x1="60" y1="0" x2="60" y2="30" />
                <line x1="60" y1="90" x2="60" y2="120" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-star)" />
        </svg>
      </div>

      {/* Vignette to deepen the edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
