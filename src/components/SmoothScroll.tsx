import { useEffect, useState } from "react";

/**
 * Lenis smooth scroll — Apple-website feel.
 * Also drives GSAP ScrollTrigger updates.
 */
export function SmoothScroll() {
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; on: (e: string, cb: () => void) => void } | null = null;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.1,
      }) as unknown as typeof lenis;

      lenis!.on("scroll", () => ScrollTrigger.update());
      const loop = (t: number) => {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [ready]);

  return null;
}
