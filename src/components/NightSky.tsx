/**
 * Sacred backdrop: layered warm-black gradient with a fine gold Islamic
 * geometric lattice (interlocking 8-pointed star motif). Two lattice
 * layers at different scales drift in opposite directions to create depth
 * without noise. A soft warm bloom sits behind the calligraphy so it feels
 * illuminated from within.
 */
export function NightSky() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 35%, #1c150e 0%, #0d0906 45%, #050302 100%)",
      }}
    >
      {/* Warm gold bloom */}
      <div
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "85vmin",
          height: "85vmin",
          background:
            "radial-gradient(circle, oklch(0.82 0.16 72 / 0.32) 0%, oklch(0.65 0.14 55 / 0.14) 38%, transparent 72%)",
          filter: "blur(24px)",
        }}
      />

      {/* Secondary ember glow, offset */}
      <div
        className="absolute left-[15%] top-[70%]"
        style={{
          width: "55vmin",
          height: "55vmin",
          background:
            "radial-gradient(circle, oklch(0.55 0.18 40 / 0.22) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      {/* Lattice layer — large, slow breathe */}
      <div
        className="absolute inset-0"
        style={{
          animation: "lattice-breathe 22s ease-in-out infinite",
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        <LatticeSvg tile={160} opacity={0.14} stroke={0.6} />
      </div>

      {/* Lattice layer — smaller, counter-drift */}
      <div
        className="absolute inset-0"
        style={{
          animation: "lattice-breathe 34s ease-in-out infinite reverse",
          transformOrigin: "center",
          willChange: "transform",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      >
        <LatticeSvg tile={80} opacity={0.09} stroke={0.4} />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.8  0 0 0 0 0.65  0 0 0 0 0.35  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}

function LatticeSvg({
  tile,
  opacity,
  stroke,
}: {
  tile: number;
  opacity: number;
  stroke: number;
}) {
  const id = `star-${tile}`;
  const c = tile / 2;
  const inset = tile * 0.25;
  const size = tile - inset * 2;
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="oklch(0.84 0.14 78)"
            strokeWidth={stroke}
            strokeLinejoin="round"
          >
            <rect x={inset} y={inset} width={size} height={size} />
            <rect
              x={inset}
              y={inset}
              width={size}
              height={size}
              transform={`rotate(45 ${c} ${c})`}
            />
            <circle cx={c} cy={c} r={size * 0.28} strokeWidth={stroke * 0.7} />
            <line x1="0" y1={c} x2={inset} y2={c} />
            <line x1={tile - inset} y1={c} x2={tile} y2={c} />
            <line x1={c} y1="0" x2={c} y2={inset} />
            <line x1={c} y1={tile - inset} x2={c} y2={tile} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
