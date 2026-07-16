import nightSky from "@/assets/night-sky.png.asset.json";

/**
 * Sacred backdrop: a painterly dusk sky — deep midnight blue fading to
 * warm sunset ember at the base. Minimal by design; a single soft gold
 * bloom sits behind the calligraphy so it feels lit from within.
 */
export function NightSky() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#05091a]">
      <img
        src={nightSky.url}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Warm gold bloom behind calligraphy */}
      <div
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "80vmin",
          height: "80vmin",
          background:
            "radial-gradient(circle, oklch(0.82 0.15 70 / 0.22) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      {/* Subtle vignette for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}
