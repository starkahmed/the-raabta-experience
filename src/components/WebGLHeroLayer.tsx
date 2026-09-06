import { useEffect, useState, type ComponentType } from "react";

type HeroComponent = ComponentType;

function canUseWebGL() {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (!context) return false;

  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return !(memory !== undefined && memory <= 2);
}

/**
 * Hydration-safe boundary for the WebGL opening. Keeping the R3F import behind
 * this effect means the server never evaluates Canvas or browser-only WebGL.
 */
export function WebGLHeroLayer() {
  const [Hero, setHero] = useState<HeroComponent | null>(null);

  useEffect(() => {
    if (!canUseWebGL()) return;

    let cancelled = false;
    import("./WebGLHero")
      .then(({ WebGLHero }) => {
        if (!cancelled) setHero(() => WebGLHero);
      })
      .catch(() => {
        // The CSS Bismillah scene remains visible if WebGL cannot initialize.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!Hero) return null;
  return <Hero />;
}
