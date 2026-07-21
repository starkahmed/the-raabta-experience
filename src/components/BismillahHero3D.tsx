import { useEffect, useRef, type CSSProperties } from "react";

/**
 * 3D landing hero for the Bismillah chapter.
 * Layered CSS 3D scene: deep sky, radial gold bloom, orbiting particles,
 * and the Arabic calligraphy floating at the front. Tilts with the cursor.
 */
export function BismillahHero3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const calligRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      const rx = (-cy * 8).toFixed(2);
      const ry = (cx * 10).toFixed(2);
      stage.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (skyRef.current)
        skyRef.current.style.transform = `translate3d(${cx * -18}px, ${cy * -14}px, -220px) scale(1.2)`;
      if (bloomRef.current)
        bloomRef.current.style.transform = `translate3d(${cx * -8}px, ${cy * -6}px, -60px) scale(1.05)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${cx * 20}px, ${cy * 14}px, 40px)`;
      if (calligRef.current)
        calligRef.current.style.transform = `translate3d(${cx * 40}px, ${cy * 26}px, 140px)`;
      if (particlesRef.current)
        particlesRef.current.style.transform = `translate3d(${cx * 60}px, ${cy * 36}px, 200px)`;
      raf = requestAnimationFrame(tick);
    };

    if (!reduce) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(tick);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1400px]">
      <div
        ref={stageRef}
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform"
      >
        {/* Deep sky */}
        <div
          ref={skyRef}
          className="absolute inset-0 will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, oklch(0.28 0.09 260) 0%, oklch(0.12 0.05 260) 55%, oklch(0.06 0.03 260) 100%)",
          }}
        />

        {/* Gold bloom */}
        <div
          ref={bloomRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.82 0.17 70 / 0.55) 0%, oklch(0.6 0.15 50 / 0.25) 25%, transparent 55%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Rotating geometric ring — Islamic 8-point */}
        <div
          ref={ringRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <svg
            viewBox="0 0 400 400"
            className="w-[75vmin] h-[75vmin] opacity-40 animate-[b-spin_60s_linear_infinite]"
          >
            <defs>
              <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.85 0.18 70)" stopOpacity="0" />
                <stop offset="60%" stopColor="oklch(0.85 0.18 70)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="oklch(0.85 0.18 70)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g fill="none" stroke="url(#ringGlow)" strokeWidth="0.8">
              <circle cx="200" cy="200" r="180" />
              <circle cx="200" cy="200" r="150" />
              <polygon points="200,20 253,147 380,200 253,253 200,380 147,253 20,200 147,147" />
              <polygon
                points="200,20 253,147 380,200 253,253 200,380 147,253 20,200 147,147"
                transform="rotate(22.5 200 200)"
              />
            </g>
          </svg>
          <svg
            viewBox="0 0 400 400"
            className="absolute w-[55vmin] h-[55vmin] opacity-60 animate-[b-spin-rev_45s_linear_infinite]"
          >
            <g fill="none" stroke="oklch(0.85 0.18 70 / 0.6)" strokeWidth="0.6">
              <circle cx="200" cy="200" r="120" />
              <polygon points="200,80 261,139 320,200 261,261 200,320 139,261 80,200 139,139" />
            </g>
          </svg>
        </div>

        {/* Calligraphy */}
        <div
          ref={calligRef}
          className="absolute inset-0 flex items-center justify-center px-6 will-change-transform"
        >
          <div className="text-center max-w-3xl [transform-style:preserve-3d]">
            <p
              className="cine-fade text-cream/60 tracking-[0.5em] text-[10px] md:text-xs mb-8"
              style={{ "--fade-delay": "0.1s" } as CSSProperties}
            >
              CHAPTER 01 · IN HIS NAME
            </p>
            <p
              className="text-6xl md:text-8xl mb-10 text-cream animate-[b-breathe_6s_ease-in-out_infinite]"
              dir="rtl"
              lang="ar"
              data-cursor="magnetic"
              style={{
                fontFamily: "'Amiri', serif",
                textShadow:
                  "0 0 30px oklch(0.88 0.18 65 / 0.75), 0 0 70px oklch(0.78 0.17 60 / 0.55), 0 0 120px oklch(0.7 0.15 55 / 0.35)",
                transform: "translateZ(60px)",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْم
            </p>
            <p
              className="cine-fade text-cream/85 tracking-[0.45em] text-xs md:text-sm font-light"
              style={{ "--fade-delay": "1s" } as CSSProperties}
            >
              BISMILLAHIR RAHMANIR RAHIM
            </p>
            <p
              className="cine-fade mt-10 text-cream/55 italic leading-relaxed"
              style={{ "--fade-delay": "1.5s" } as CSSProperties}
            >
              In the Name of Allah,<br />The Most Compassionate, The Most Merciful.
            </p>
          </div>
        </div>

        {/* Front particles */}
        <div
          ref={particlesRef}
          className="pointer-events-none absolute inset-0 will-change-transform [transform-style:preserve-3d]"
        >
          {particles.map((_, i) => {
            const left = (i * 53) % 100;
            const top = (i * 71) % 100;
            const size = 2 + ((i * 7) % 6);
            const dur = 5 + ((i * 3) % 8);
            const delay = (i * 0.4) % 6;
            const z = ((i * 37) % 200) - 40;
            return (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: size,
                  height: size,
                  opacity: 0.55 + ((i % 4) / 4) * 0.4,
                  background:
                    "radial-gradient(circle, oklch(0.94 0.15 75 / 0.98) 0%, oklch(0.78 0.17 60 / 0.6) 45%, transparent 75%)",
                  boxShadow:
                    "0 0 12px oklch(0.85 0.18 65 / 0.8), 0 0 30px oklch(0.72 0.16 55 / 0.4)",
                  transform: `translateZ(${z}px)`,
                  animation: `b-drift ${dur}s ease-in-out ${delay}s infinite alternate`,
                }}
              />
            );
          })}
        </div>

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 45%, oklch(0 0 0 / 0.65) 100%)",
          }}
        />
      </div>

      <style>{`
        @keyframes b-spin { to { transform: rotate(360deg); } }
        @keyframes b-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes b-breathe {
          0%,100% { text-shadow: 0 0 30px oklch(0.88 0.18 65 / 0.75), 0 0 70px oklch(0.78 0.17 60 / 0.55), 0 0 120px oklch(0.7 0.15 55 / 0.35); }
          50%     { text-shadow: 0 0 45px oklch(0.92 0.19 70 / 0.95), 0 0 100px oklch(0.82 0.18 62 / 0.7), 0 0 160px oklch(0.72 0.16 55 / 0.5); }
        }
        @keyframes b-drift {
          0%   { transform: translate3d(0,0,var(--z,0)); }
          100% { transform: translate3d(10px,-24px,var(--z,0)); }
        }
      `}</style>
    </div>
  );
}
