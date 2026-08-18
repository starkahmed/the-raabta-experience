import type { CSSProperties } from "react";
import { useScrollProgress } from "@/hooks/use-parallax";
import { ScrollCue } from "@/components/ScrollCue";


/**
 * Opening scene: soft depth-of-field layers (blurred gold bloom, drifting
 * haze, fine grain) drifting at different scroll speeds behind the
 * calligraphy. Pure CSS transforms — no 3D geometry.
 */
export function BismillahScene() {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* far wash */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: "translate3d(0, calc(var(--p, 0) * 40px), 0)",
          background:
            "radial-gradient(ellipse 90% 60% at 50% 42%, oklch(0.32 0.06 255) 0%, oklch(0.14 0.04 260) 62%, oklch(0.08 0.02 262) 100%)",
        }}
      />

      {/* mid bloom — heavy blur, slow drift */}
      <div
        className="dof-soft absolute inset-0 blur-3xl opacity-70 will-change-transform"
        style={{
          transform: "translate3d(0, calc(var(--p, 0) * -80px), 0) scale(1.15)",
          background:
            "radial-gradient(circle 38% at 50% 55%, oklch(0.80 0.14 68 / 0.45) 0%, oklch(0.62 0.12 50 / 0.18) 45%, transparent 72%)",
          animation: "bs-breathe 14s ease-in-out infinite",
        }}
      />

      {/* near haze */}
      <div
        className="dof-heavy absolute inset-0 blur-2xl opacity-50 will-change-transform"
        style={{
          transform: "translate3d(0, calc(var(--p, 0) * -160px), 0)",
          background:
            "radial-gradient(ellipse 70% 30% at 30% 78%, oklch(0.70 0.12 55 / 0.35), transparent 70%), radial-gradient(ellipse 60% 26% at 78% 22%, oklch(0.55 0.09 250 / 0.35), transparent 70%)",
          animation: "bs-drift 22s ease-in-out infinite alternate",
        }}
      />

      {/* content */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6 will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--p, 0) * -40px), 0)" }}
      >
        <div className="text-center max-w-3xl">
          <p
            className="text-4xl sm:text-5xl md:text-7xl mb-8 md:mb-10 text-cream leading-[1.6]"
            dir="rtl"
            lang="ar"
            data-cursor="magnetic"
            style={{
              fontFamily: "'Amiri', serif",
              textShadow: "0 0 40px oklch(0.85 0.16 65 / 0.45)",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْم
          </p>
          <p
            className="cine-fade text-cream/85 tracking-[0.3em] text-xs md:text-sm"
            style={{ "--fade-delay": "0.6s" } as CSSProperties}
          >
            BISMILLAHIR RAHMANIR RAHIM
          </p>
          <p
            className="cine-fade mt-8 text-cream/70 italic leading-relaxed"
            style={{ "--fade-delay": "1s" } as CSSProperties}
          >
            In the Name of Allah,
            <br />
            The Most Compassionate, The Most Merciful.
          </p>
        </div>
      </div>

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 55%, transparent 48%, oklch(0 0 0 / 0.55) 100%)" }}
      />

      <style>{`
        @keyframes bs-breathe { 0%,100% { opacity:.55 } 50% { opacity:.85 } }
        @keyframes bs-drift { 0% { background-position: 0% 0%, 100% 100% } 100% { background-position: 6% 4%, 94% 96% } }
      `}</style>
    </div>
  );
}
