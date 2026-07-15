import { useEffect, useRef } from "react";

/**
 * Active Theory-style cursor: a warm gold light follows the pointer with
 * lerp smoothing. On hover over [data-cursor="magnetic"] elements the glow
 * grows and the element gets a soft chromatic distortion via CSS vars.
 * Disabled on touch / reduced-motion.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("[data-cursor='magnetic']")) targetScale = 3.2;
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("[data-cursor='magnetic']")) targetScale = 1;
    };

    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      scale += (targetScale - scale) * 0.15;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };

    document.documentElement.classList.add("has-glow");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-glow");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-40 w-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.16 65 / 0.55) 0%, oklch(0.7 0.14 50 / 0.15) 40%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(6px)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream"
        style={{ boxShadow: "0 0 12px oklch(0.85 0.16 65 / 0.9)" }}
      />
    </>
  );
}
