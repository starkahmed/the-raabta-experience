import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cinematic intro: three scenes cross-fade inside a single pinned stage.
 * The stage is pinned for ~3 viewport heights and the camera moves
 * continuously between Bismillah → Cordially Invited → Nazziya & Ahmed,
 * then releases into the hero with a golden-fog handoff.
 */
export function CinematicIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stage = stageRef.current;
    const container = containerRef.current;
    if (!stage || !container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".cine-scene", container);
      const contents = scenes.map((s) => s.querySelector<HTMLElement>(".cine-content")!);
      const fog = container.querySelector<HTMLElement>(".cine-gold-fog");

      gsap.set(scenes, { autoAlpha: 0, yPercent: 6, scale: 0.98, filter: "blur(14px)" });
      gsap.set(scenes[0], { autoAlpha: 1, yPercent: 0, scale: 1, filter: "blur(0px)" });
      gsap.set(fog, { autoAlpha: 0, yPercent: 30 });

      if (reduce) {
        gsap.set(scenes, { autoAlpha: 1, yPercent: 0, scale: 1, filter: "none" });
        return;
      }

      // One scrubbed timeline pins the stage and drives every transition, so
      // camera velocity stays constant across breakpoints (pin distance is
      // expressed in viewport units, not pixels).
      gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=220%",
          scrub: 0.8,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(contents[0], { yPercent: -8, autoAlpha: 0, filter: "blur(12px)", scale: 1.02 }, 0)
        .fromTo(
          scenes[1],
          { autoAlpha: 0, yPercent: 6, scale: 0.98, filter: "blur(14px)" },
          { autoAlpha: 1, yPercent: 0, scale: 1, filter: "blur(0px)" },
          0.1
        )
        .to(fog, { autoAlpha: 1, yPercent: 0, ease: "power1.out" }, 1)
        .to(
          contents[1],
          { yPercent: -12, autoAlpha: 0, filter: "blur(10px)", scale: 1.04 },
          1.2
        );
    }, container);

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Pinned stage — one viewport tall, scenes stack absolutely inside */}
      <div
        ref={stageRef}
        className="cine-stage relative h-screen w-full overflow-hidden"
      >
        {/* Scene 1 — Bismillah */}
        <section className="cine-scene absolute inset-0 flex items-center justify-center px-6 will-change-[opacity,transform,filter]">
          <div className="cine-content text-center max-w-3xl">
            <p
              className="text-5xl md:text-7xl mb-8 text-cream"
              dir="rtl"
              lang="ar"
              style={{
                fontFamily: "'Amiri', serif",
                textShadow:
                  "0 0 40px oklch(0.85 0.15 65 / 0.5), 0 0 80px oklch(0.85 0.15 65 / 0.3)",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْم
            </p>
            <p className="text-cream/80 tracking-[0.35em] text-sm md:text-base font-light mb-8">
              BISMILLAHIR RAHMANIR RAHIM
            </p>
            <p className="text-cream/60 italic text-base md:text-lg leading-relaxed font-light">
              In the Name of Allah,
              <br />
              The Most Compassionate,
              <br />
              The Most Merciful.
            </p>
          </div>
        </section>

        {/* Scene 2 — You're Cordially Invited */}
        <section className="cine-scene absolute inset-0 flex items-center justify-center px-6 will-change-[opacity,transform,filter]">
          <div className="cine-content text-center">
            <p className="text-cream tracking-[0.5em] text-2xl md:text-4xl font-light mb-8">
              YOU&rsquo;RE
            </p>
            <p
              className="text-ember text-6xl md:text-8xl mb-8"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              Cordially
            </p>
            <p className="text-cream tracking-[0.5em] text-3xl md:text-5xl font-light">
              INVITED
            </p>
          </div>
        </section>


        {/* Golden fog rising into the hero */}
        <div
          className="cine-gold-fog pointer-events-none absolute inset-x-0 bottom-0 h-72"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, oklch(0.75 0.15 65 / 0.6) 0%, oklch(0.55 0.12 45 / 0.28) 40%, transparent 72%)",
          }}
        />
      </div>
    </div>
  );
}
