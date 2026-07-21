import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Sky-drift 3D hero (inspired by skyclinics.al):
 * - slow drifting watercolor cloud layers at different depths
 * - dense dot particle field with parallax
 * - subtle cursor-driven 3D tilt
 * - centered minimal calligraphy
 */
export function SkyDriftHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cloud1 = useRef<HTMLDivElement>(null);
  const cloud2 = useRef<HTMLDivElement>(null);
  const cloud3 = useRef<HTMLDivElement>(null);
  const dotsA = useRef<HTMLDivElement>(null);
  const dotsB = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      stage.style.transform = `perspective(1600px) rotateX(${(-cy * 4).toFixed(2)}deg) rotateY(${(cx * 5).toFixed(2)}deg)`;
      if (cloud1.current) cloud1.current.style.transform = `translate3d(${cx * -8}px, ${cy * -6}px, -260px) scale(1.25)`;
      if (cloud2.current) cloud2.current.style.transform = `translate3d(${cx * -20}px, ${cy * -14}px, -80px) scale(1.12)`;
      if (cloud3.current) cloud3.current.style.transform = `translate3d(${cx * 30}px, ${cy * 20}px, 80px) scale(1.06)`;
      if (dotsA.current) dotsA.current.style.transform = `translate3d(${cx * 18}px, ${cy * 12}px, 40px)`;
      if (dotsB.current) dotsB.current.style.transform = `translate3d(${cx * 55}px, ${cy * 36}px, 160px)`;
      if (centerRef.current) centerRef.current.style.transform = `translate3d(${cx * 24}px, ${cy * 16}px, 120px)`;
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

  const near = Array.from({ length: 80 });
  const far = Array.from({ length: 140 });

  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1600px]">
      <div
        ref={stageRef}
        className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-500 ease-out will-change-transform"
      >
        {/* base wash */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 45%, oklch(0.22 0.08 260) 0%, oklch(0.10 0.04 260) 60%, oklch(0.05 0.02 260) 100%)",
        }} />

        {/* Drifting watercolor clouds — three depths */}
        <div ref={cloud1} className="absolute inset-0 will-change-transform" style={{
          background: `
            radial-gradient(ellipse 55% 40% at 20% 30%, oklch(0.55 0.10 250 / 0.35), transparent 60%),
            radial-gradient(ellipse 45% 35% at 80% 70%, oklch(0.60 0.09 240 / 0.30), transparent 65%)`,
          animation: "sd-drift-a 40s ease-in-out infinite alternate",
        }} />
        <div ref={cloud2} className="absolute inset-0 will-change-transform" style={{
          background: `
            radial-gradient(ellipse 40% 30% at 70% 25%, oklch(0.78 0.14 65 / 0.28), transparent 60%),
            radial-gradient(ellipse 50% 35% at 25% 75%, oklch(0.70 0.13 55 / 0.22), transparent 65%)`,
          mixBlendMode: "screen",
          animation: "sd-drift-b 32s ease-in-out infinite alternate",
        }} />
        <div ref={cloud3} className="absolute inset-0 will-change-transform" style={{
          background: `
            radial-gradient(circle at 50% 55%, oklch(0.85 0.17 70 / 0.35) 0%, oklch(0.65 0.14 55 / 0.15) 25%, transparent 55%)`,
          mixBlendMode: "screen",
          animation: "sd-drift-c 26s ease-in-out infinite alternate",
        }} />

        {/* Far dot field */}
        <div ref={dotsA} className="pointer-events-none absolute inset-0 will-change-transform">
          {far.map((_, i) => {
            const left = (i * 37) % 100;
            const top = (i * 61) % 100;
            const size = 1 + ((i * 3) % 3);
            const dur = 6 + ((i * 5) % 10);
            const delay = (i * 0.3) % 8;
            return (
              <span key={`f${i}`} className="absolute rounded-full"
                style={{
                  left: `${left}%`, top: `${top}%`, width: size, height: size,
                  background: "oklch(0.92 0.14 70 / 0.55)",
                  boxShadow: "0 0 4px oklch(0.85 0.16 65 / 0.6)",
                  animation: `sd-twinkle ${dur}s ease-in-out ${delay}s infinite`,
                }} />
            );
          })}
        </div>

        {/* Near dot field */}
        <div ref={dotsB} className="pointer-events-none absolute inset-0 will-change-transform [transform-style:preserve-3d]">
          {near.map((_, i) => {
            const left = (i * 71) % 100;
            const top = (i * 43) % 100;
            const size = 2 + ((i * 5) % 5);
            const dur = 5 + ((i * 4) % 9);
            const delay = (i * 0.4) % 6;
            const z = ((i * 29) % 180) - 20;
            return (
              <span key={`n${i}`} className="absolute rounded-full"
                style={{
                  left: `${left}%`, top: `${top}%`, width: size, height: size,
                  opacity: 0.7 + ((i % 3) / 3) * 0.3,
                  background: "radial-gradient(circle, oklch(0.95 0.15 75 / 0.98) 0%, oklch(0.78 0.17 60 / 0.5) 50%, transparent 80%)",
                  boxShadow: "0 0 10px oklch(0.85 0.18 65 / 0.8), 0 0 22px oklch(0.72 0.16 55 / 0.4)",
                  transform: `translateZ(${z}px)`,
                  animation: `sd-drift-dot ${dur}s ease-in-out ${delay}s infinite alternate`,
                }} />
            );
          })}
        </div>

        {/* Center calligraphy */}
        <div ref={centerRef} className="absolute inset-0 flex items-center justify-center px-6 will-change-transform">
          <div className="text-center max-w-3xl [transform-style:preserve-3d]">
            <p className="cine-fade text-cream/60 tracking-[0.5em] text-[10px] md:text-xs mb-8"
               style={{ "--fade-delay": "0.1s" } as CSSProperties}>
              CHAPTER 01 · IN HIS NAME
            </p>
            <p
              className="text-6xl md:text-8xl mb-10 text-cream"
              dir="rtl"
              lang="ar"
              data-cursor="magnetic"
              style={{
                fontFamily: "'Amiri', serif",
                textShadow: "0 0 30px oklch(0.88 0.18 65 / 0.7), 0 0 70px oklch(0.78 0.17 60 / 0.5), 0 0 120px oklch(0.7 0.15 55 / 0.35)",
                transform: "translateZ(50px)",
                animation: "sd-breathe 7s ease-in-out infinite",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْم
            </p>
            <p className="cine-fade text-cream/85 tracking-[0.45em] text-xs md:text-sm font-light"
               style={{ "--fade-delay": "1s" } as CSSProperties}>
              BISMILLAHIR RAHMANIR RAHIM
            </p>
            <p className="cine-fade mt-10 text-cream/55 italic leading-relaxed"
               style={{ "--fade-delay": "1.5s" } as CSSProperties}>
              In the Name of Allah,<br />The Most Compassionate, The Most Merciful.
            </p>
          </div>
        </div>

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 55%, transparent 45%, oklch(0 0 0 / 0.65) 100%)",
        }} />
      </div>

      <style>{`
        @keyframes sd-drift-a {
          0%   { background-position: 0% 0%, 100% 100%; }
          100% { background-position: 8% 5%, 92% 95%; }
        }
        @keyframes sd-drift-b {
          0%   { background-position: 0% 0%, 100% 100%; }
          100% { background-position: -6% -4%, 106% 104%; }
        }
        @keyframes sd-drift-c {
          0%,100% { opacity: .8; }
          50%     { opacity: 1; }
        }
        @keyframes sd-twinkle {
          0%,100% { opacity: .25; }
          50%     { opacity: .85; }
        }
        @keyframes sd-drift-dot {
          0%   { transform: translate3d(0,0,var(--z,0)); }
          100% { transform: translate3d(8px,-18px,var(--z,0)); }
        }
        @keyframes sd-breathe {
          0%,100% { text-shadow: 0 0 30px oklch(0.88 0.18 65 / 0.7), 0 0 70px oklch(0.78 0.17 60 / 0.5), 0 0 120px oklch(0.7 0.15 55 / 0.35); }
          50%     { text-shadow: 0 0 45px oklch(0.92 0.19 70 / 0.95), 0 0 100px oklch(0.82 0.18 62 / 0.7), 0 0 160px oklch(0.72 0.16 55 / 0.5); }
        }
      `}</style>
    </div>
  );
}
