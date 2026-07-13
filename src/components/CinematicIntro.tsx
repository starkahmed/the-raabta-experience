import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cinematic intro: three pinned scenes rendered before the hero.
 * Scene 1 — Bismillah under the stars
 * Scene 2 — You're Cordially Invited
 * Scene 3 — Nazziya & Ahmed
 * Then the page continues into the existing hero (Scene 4).
 */
export function CinematicIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>(".cine-scene");

      scenes.forEach((scene) => {
        const content = scene.querySelector<HTMLElement>(".cine-content");
        if (!content) return;
        gsap.fromTo(
          content,
          { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scene,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
        gsap.to(content, {
          opacity: 0,
          y: -60,
          filter: "blur(10px)",
          ease: "power2.in",
          scrollTrigger: {
            trigger: scene,
            start: "bottom 70%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      });

      // Golden fog rises approaching the hero
      gsap.fromTo(
        ".cine-gold-fog",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".cine-scene-3",
            start: "center center",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Scene 1 — Bismillah */}
      <section className="cine-scene relative h-[110vh] flex items-center justify-center px-6">
        <div className="cine-content text-center max-w-3xl">
          <p
            className="text-5xl md:text-7xl mb-8 text-cream"
            dir="rtl"
            lang="ar"
            style={{
              fontFamily: "'Amiri', serif",
              textShadow: "0 0 40px oklch(0.85 0.15 65 / 0.5), 0 0 80px oklch(0.85 0.15 65 / 0.3)",
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
      <section className="cine-scene relative h-[110vh] flex items-center justify-center px-6">
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
      <section className="cine-scene cine-scene-3 relative h-[110vh] flex items-center justify-center px-6">
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

        {/* Golden fog rising into the hero */}
        <div
          className="cine-gold-fog pointer-events-none absolute inset-x-0 bottom-0 h-64"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, oklch(0.75 0.15 65 / 0.55) 0%, oklch(0.55 0.12 45 / 0.25) 40%, transparent 70%)",
          }}
        />
      </section>
    </div>
  );
}
