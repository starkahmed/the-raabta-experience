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
    const mm = gsap.matchMedia();

    mm.add(
      {
        // one config for every breakpoint — pin distance scales with viewport
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { reduce } = ctx.conditions as { reduce: boolean };
        const stage = stageRef.current;
        const container = containerRef.current;
        if (!stage || !container) return;

        const scenes = gsap.utils.toArray<HTMLElement>(".cine-scene", container);
        const contents = scenes.map((s) => s.querySelector<HTMLElement>(".cine-content")!);
        const fog = container.querySelector<HTMLElement>(".cine-gold-fog");

        // Initial state — only first scene visible
        gsap.set(scenes, { autoAlpha: 0, yPercent: 6, scale: 0.98, filter: "blur(14px)" });
        gsap.set(scenes[0], { autoAlpha: 1, yPercent: 0, scale: 1, filter: "blur(0px)" });
        gsap.set(fog, { autoAlpha: 0, yPercent: 30 });

        if (reduce) {
          gsap.set(scenes, { autoAlpha: 1, yPercent: 0, scale: 1, filter: "none" });
          return;
        }

        // Master timeline drives every transition off one scrubbed scrollTrigger,
        // so camera velocity stays constant between scenes on every breakpoint.
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: container,
            start: "top top",
            // 100vh per scene transition + a tail for the hero handoff
            end: "+=" + (window.innerHeight * 3.2),
            scrub: 0.8,
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Scene 1 → Scene 2
        tl.to(contents[0], { yPercent: -8, autoAlpha: 0, filter: "blur(12px)", scale: 1.02 }, 0)
          .fromTo(
            scenes[1],
            { autoAlpha: 0, yPercent: 6, scale: 0.98, filter: "blur(14px)" },
            { autoAlpha: 1, yPercent: 0, scale: 1, filter: "blur(0px)" },
            0.1
          )

          // Scene 2 → Scene 3
          .to(contents[1], { yPercent: -8, autoAlpha: 0, filter: "blur(12px)", scale: 1.02 }, 1)
          .fromTo(
            scenes[2],
            { autoAlpha: 0, yPercent: 6, scale: 0.98, filter: "blur(14px)" },
            { autoAlpha: 1, yPercent: 0, scale: 1, filter: "blur(0px)" },
            1.1
          )

          // Scene 3 → hero handoff (golden fog rises, scene drifts up & fades)
          .to(fog, { autoAlpha: 1, yPercent: 0, ease: "power1.out" }, 2)
          .to(
            contents[2],
            { yPercent: -12, autoAlpha: 0, filter: "blur(10px)", scale: 1.04 },
            2.2
          );

        // Refresh once fonts/images settle so pin math matches painted layout
        const refresh = () => ScrollTrigger.refresh();
        const t = window.setTimeout(refresh, 300);
        window.addEventListener("load", refresh);
        return () => {
          window.clearTimeout(t);
          window.removeEventListener("load", refresh);
        };
      }
    );

    return () => mm.revert();
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

        {/* Scene 3 — Nazziya & Ahmed */}
        <section className="cine-scene cine-scene-3 absolute inset-0 flex items-center justify-center px-6 will-change-[opacity,transform,filter]">
          <div className="cine-content text-center">
            <h2
              className="text-cream text-6xl md:text-8xl leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.06em",
                textShadow: "0 0 30px oklch(0.85 0.15 65 / 0.4)",
              }}
            >
              NAZZIYA
            </h2>
            <p
              className="text-ember my-6 text-4xl md:text-5xl"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              and
            </p>
            <h2
              className="text-cream text-6xl md:text-8xl leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.06em",
                textShadow: "0 0 30px oklch(0.85 0.15 65 / 0.4)",
              }}
            >
              AHMED
            </h2>
            <div className="mt-10 flex items-center justify-center gap-4 text-gold/80">
              <div className="h-px w-16 bg-gold/60" />
              <span>✦</span>
              <div className="h-px w-16 bg-gold/60" />
            </div>
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
