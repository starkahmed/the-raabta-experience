import { useEffect, useRef } from "react";
import heroAsset from "@/assets/hero-mosque-lanterns.jpg.asset.json";

/**
 * 3D parallax hero: the mosque image is split into pseudo-depth layers
 * (far sky glow, mid mosque, near lanterns/bokeh) that tilt with the
 * cursor and drift on scroll. Uses CSS perspective + transform only —
 * no WebGL, keeps mobile smooth.
 */
export function HeroParallax3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1..1
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const rx = (-cy * 6).toFixed(2);
      const ry = (cx * 8).toFixed(2);
      if (skyRef.current)
        skyRef.current.style.transform = `translate3d(${cx * -14}px, ${cy * -10}px, -120px) scale(1.12)`;
      if (midRef.current)
        midRef.current.style.transform = `translate3d(${cx * -30}px, ${cy * -18}px, 0px) scale(1.05)`;
      if (nearRef.current)
        nearRef.current.style.transform = `translate3d(${cx * 55}px, ${cy * 35}px, 120px)`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${cx * 40}px, ${cy * 25}px, 60px)`;
      stage.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
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

  const lanterns = Array.from({ length: 14 });

  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1200px]">
      <div
        ref={stageRef}
        className="absolute inset-0 will-change-transform [transform-style:preserve-3d] transition-transform duration-300 ease-out"
      >
        {/* Far layer — sky wash */}
        <div
          ref={skyRef}
          className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, oklch(0.35 0.10 260) 0%, oklch(0.15 0.05 260) 55%, oklch(0.08 0.03 260) 100%)",
          }}
        />

        {/* Mid layer — mosque photograph */}
        <div
          ref={midRef}
          className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
        >
          <img
            src={heroAsset.url}
            alt="Sky lanterns floating above a Mughal palace at dusk"
            width={1536}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />
        </div>

        {/* Warm bloom */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse at 50% 78%, oklch(0.78 0.16 65 / 0.55) 0%, oklch(0.55 0.14 45 / 0.25) 30%, transparent 65%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Near layer — floating lantern bokeh */}
        <div
          ref={nearRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
        >
          {lanterns.map((_, i) => {
            const left = (i * 83) % 100;
            const top = (i * 47) % 90;
            const size = 6 + ((i * 13) % 22);
            const dur = 6 + ((i * 7) % 9);
            const delay = (i * 0.6) % 5;
            const depth = 0.4 + ((i % 5) / 5) * 0.9;
            return (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: size,
                  height: size,
                  opacity: 0.55 + (i % 3) * 0.15,
                  background:
                    "radial-gradient(circle, oklch(0.92 0.16 70 / 0.95) 0%, oklch(0.75 0.18 55 / 0.55) 40%, transparent 75%)",
                  boxShadow:
                    "0 0 18px oklch(0.82 0.18 60 / 0.7), 0 0 40px oklch(0.72 0.16 50 / 0.4)",
                  transform: `translateZ(${depth * 80}px)`,
                  animation: `lantern-float ${dur}s ease-in-out ${delay}s infinite alternate`,
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
              "radial-gradient(ellipse at 50% 50%, transparent 50%, oklch(0 0 0 / 0.55) 100%)",
          }}
        />
      </div>

      <style>{`
        @keyframes lantern-float {
          0%   { transform: translate3d(0,0,var(--z,0)) scale(1); }
          50%  { transform: translate3d(6px,-14px,var(--z,0)) scale(1.1); }
          100% { transform: translate3d(-4px,-28px,var(--z,0)) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
