import { useEffect, useMemo } from "react";

/**
 * Fixed full-screen night sky rendered behind the cinematic intro and hero.
 * Pure black at top → dark navy → deep royal blue → soft warm blue at bottom.
 * Includes twinkling stars, drifting particles, and an occasional shooting star.
 */
export function NightSky() {
  // Deterministic star field so SSR and client match
  const stars = useMemo(() => {
    const arr: { x: number; y: number; r: number; d: number; o: number }[] = [];
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 140; i++) {
      arr.push({
        x: rand() * 100,
        y: rand() * 100,
        r: rand() * 1.4 + 0.3,
        d: rand() * 4 + 2,
        o: rand() * 0.6 + 0.3,
      });
    }
    return arr;
  }, []);

  const particles = useMemo(() => {
    const arr: { x: number; y: number; d: number; delay: number }[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 25; i++) {
      arr.push({
        x: rand() * 100,
        y: rand() * 100,
        d: rand() * 18 + 12,
        delay: rand() * 10,
      });
    }
    return arr;
  }, []);

  // Trigger a shooting star every ~8-12s
  useEffect(() => {
    const el = document.getElementById("shooting-star");
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const shoot = () => {
      el.style.animation = "none";
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;
      const top = 5 + Math.random() * 40;
      const left = 10 + Math.random() * 60;
      el.style.top = `${top}%`;
      el.style.left = `${left}%`;
      el.style.animation = "shoot 1.4s ease-out forwards";
      t = setTimeout(shoot, 7000 + Math.random() * 6000);
    };
    t = setTimeout(shoot, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #030616 22%, #050c2a 48%, #0a1746 72%, #172a5c 100%)",
      }}
    >
      {/* Stars */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="white"
            opacity={s.o}
            style={{
              animation: `twinkle ${s.d}s ease-in-out ${(i % 7) * 0.4}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 2,
            height: 2,
            background: "oklch(0.85 0.12 65 / 0.5)",
            filter: "blur(1px)",
            animation: `particle-drift ${p.d}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Shooting star */}
      <div
        id="shooting-star"
        className="absolute h-[2px] w-24 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
          boxShadow: "0 0 8px rgba(255,255,255,0.8)",
          transform: "rotate(-20deg)",
          opacity: 0,
        }}
      />
    </div>
  );
}
