import heroAsset from "@/assets/hero-mosque-lanterns.jpg.asset.json";
import { useScrollProgress } from "@/hooks/use-parallax";

/**
 * Save-the-date scene: the mosque photograph sits behind two soft
 * depth-of-field layers that drift at different scroll speeds.
 */
export function MosqueScene() {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* base photograph, slowest layer */}
      <img
        src={heroAsset.url}
        alt="Mosque and minarets under a night sky filled with glowing lanterns"
        width={1600}
        height={1000}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--p, 0) * -60px), 0) scale(1.12)" }}
      />

      {/* blurred duplicate for depth-of-field foreground */}
      <img
        src={heroAsset.url}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-40 will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--p, 0) * -150px), 0) scale(1.3)" }}
      />

      {/* warm bloom */}
      <div
        className="absolute inset-0 blur-3xl opacity-60 will-change-transform"
        style={{
          transform: "translate3d(0, calc(var(--p, 0) * 70px), 0)",
          background: "radial-gradient(ellipse 70% 45% at 50% 78%, oklch(0.78 0.14 62 / 0.5), transparent 70%)",
        }}
      />

      {/* legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.08 0.02 262 / 0.65) 0%, oklch(0.08 0.02 262 / 0.35) 45%, oklch(0.08 0.02 262 / 0.75) 100%)" }}
      />
    </div>
  );
}
