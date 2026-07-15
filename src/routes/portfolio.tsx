import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Michael Smith — Portfolio '26" },
      { name: "description", content: "Creative, fullstack, founder, scholar. Designing seamless digital interactions from Chicago." },
      { property: "og:title", content: "Michael Smith — Portfolio '26" },
      { property: "og:description", content: "Designing seamless digital interactions by focusing on the unique nuances which bring systems to life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="font-body bg-pbg text-ptext min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Navbar />
      <Hero />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <ContactFooter />
    </div>
  );
}

/* ------------------ Loading ------------------ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);
  const words = ["Design", "Create", "Inspire"];

  useEffect(() => {
    const start = performance.now();
    const dur = 2700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    const wi = setInterval(() => setWord((w) => (w + 1) % words.length), 900);
    return () => { cancelAnimationFrame(raf); clearInterval(wi); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-pbg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.p
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="absolute top-6 left-6 text-xs text-pmuted uppercase tracking-[0.3em]"
      >Portfolio</motion.p>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={word}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl italic text-ptext/80"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >{words[word]}</motion.h2>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 right-6 text-6xl md:text-8xl lg:text-9xl text-ptext tabular-nums" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-pstroke/50">
        <div
          className="h-full accent-gradient origin-left"
          style={{ transform: `scaleX(${count / 100})`, boxShadow: "0 0 8px rgba(137,170,204,0.35)" }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------ Navbar ------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Home", "Work", "Resume"];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-psurface/80 px-2 py-2 transition-shadow ${scrolled ? "shadow-md shadow-black/40" : ""}`}>
        <a href="#top" className="group relative w-9 h-9 rounded-full p-[1.5px] accent-gradient transition-transform hover:scale-110">
          <span className="flex items-center justify-center w-full h-full rounded-full bg-pbg italic text-[13px]" style={{ fontFamily: "'Instrument Serif', serif" }}>JA</span>
        </a>
        <span className="w-px h-5 bg-pstroke mx-1 hidden sm:block" />
        {links.map((l) => (
          <button
            key={l}
            onClick={() => setActive(l)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${active === l ? "text-ptext bg-pstroke/50" : "text-pmuted hover:text-ptext hover:bg-pstroke/50"}`}
          >{l}</button>
        ))}
        <span className="w-px h-5 bg-pstroke mx-1 hidden sm:block" />
        <a href="#contact" className="group relative text-xs sm:text-sm rounded-full">
          <span className="absolute -inset-[2px] rounded-full accent-gradient-anim opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-psurface backdrop-blur-md text-ptext">
            Say hi <span aria-hidden>↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}

/* ------------------ Hero ------------------ */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const blurRefs = useRef<HTMLElement[]>([]);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2000);
    return () => clearInterval(id);
  }, [roles.length]);

  // HLS video
  useEffect(() => {
    let hls: { destroy: () => void } | null = null;
    const v = videoRef.current;
    if (!v) return;
    (async () => {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        const inst = new Hls();
        inst.loadSource(HLS_SRC);
        inst.attachMedia(v);
        hls = inst;
      } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
        v.src = HLS_SRC;
      }
    })();
    return () => { hls?.destroy(); };
  }, []);

  // GSAP entrance
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (nameRef.current) tl.from(nameRef.current, { opacity: 0, y: 50, duration: 1.2, delay: 0.1 });
      const blurEls = document.querySelectorAll(".hero-blur-in");
      if (blurEls.length) tl.from(blurEls, { opacity: 0, y: 20, filter: "blur(10px)", duration: 1, stagger: 0.1 }, "-=0.8");
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-pbg to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p ref={(el) => { if (el) blurRefs.current[0] = el; }} className="hero-blur-in text-xs text-pmuted uppercase tracking-[0.3em] mb-8">COLLECTION '26</p>
        <h1
          ref={nameRef}
          className="text-6xl md:text-8xl lg:text-9xl italic leading-[0.9] tracking-tight text-ptext mb-6"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >Michael Smith</h1>
        <p className="hero-blur-in text-lg md:text-xl text-ptext/90 mb-4">
          A{" "}
          <span
            key={roleIndex}
            className="italic text-ptext animate-role-fade-in inline-block"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >{roles[roleIndex]}</span>{" "}
          lives in Chicago.
        </p>
        <p className="hero-blur-in text-sm md:text-base text-pmuted max-w-md mx-auto mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>
        <div className="hero-blur-in inline-flex gap-4 flex-wrap justify-center">
          <a href="#work" className="group relative rounded-full text-sm px-7 py-3.5 bg-ptext text-pbg transition-all hover:scale-105 hover:bg-pbg hover:text-ptext">
            <span className="absolute inset-0 rounded-full accent-gradient-anim opacity-0 group-hover:opacity-100 -z-10" style={{ padding: 2 }} />
            See Works
          </a>
          <a href="#contact" className="group relative rounded-full text-sm px-7 py-3.5 border-2 border-pstroke bg-pbg text-ptext transition-all hover:scale-105 hover:border-transparent">
            <span className="absolute -inset-[2px] rounded-full accent-gradient-anim opacity-0 group-hover:opacity-100 -z-10" />
            Reach out...
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-xs text-pmuted uppercase tracking-[0.2em]">SCROLL</span>
        <span className="relative block w-px h-10 bg-pstroke overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 accent-gradient animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}

/* ------------------ Sections ------------------ */
function SectionHeader({ eyebrow, title, italicWord, subtext, showAll = true }: { eyebrow: string; title: string; italicWord: string; subtext: string; showAll?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-pstroke" />
          <span className="text-xs text-pmuted uppercase tracking-[0.3em]">{eyebrow}</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-ptext" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {title}{" "}
          <span className="italic">{italicWord}</span>
        </h2>
        <p className="mt-4 text-pmuted max-w-md text-sm md:text-base">{subtext}</p>
      </div>
      {showAll && (
        <a href="#" className="group relative hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-ptext border border-pstroke hover:border-transparent">
          <span className="absolute -inset-[2px] rounded-full accent-gradient-anim opacity-0 group-hover:opacity-100 -z-10" />
          View all <span aria-hidden>→</span>
        </a>
      )}
    </motion.div>
  );
}

function SelectedWorks() {
  const projects = [
    { title: "Automotive Motion", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200", span: "md:col-span-7" },
    { title: "Urban Architecture", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200", span: "md:col-span-5" },
    { title: "Human Perspective", img: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=1200", span: "md:col-span-5" },
    { title: "Brand Identity", img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200", span: "md:col-span-7" },
  ];
  return (
    <section id="work" className="bg-pbg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader eyebrow="Selected Work" title="Featured" italicWord="projects" subtext="A selection of projects I've worked on, from concept to launch." />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className={`group relative overflow-hidden rounded-3xl bg-psurface border border-pstroke aspect-[4/3] ${p.span}`}
            >
              <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{ background: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
              />
              <div className="absolute inset-0 bg-pbg/70 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-lg flex items-center justify-center">
                <div className="relative rounded-full p-[2px] accent-gradient-anim">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white text-pbg px-5 py-2 text-sm">
                    View — <span className="italic" style={{ fontFamily: "'Instrument Serif', serif" }}>{p.title}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  const entries = [
    { title: "The quiet craft of interface rhythm", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400", read: "4 min", date: "Mar 12, 2026" },
    { title: "On systems that feel alive", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400", read: "6 min", date: "Feb 28, 2026" },
    { title: "Designing for the in-between", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400", read: "3 min", date: "Feb 09, 2026" },
    { title: "Motion as narrative", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400", read: "5 min", date: "Jan 21, 2026" },
  ];
  return (
    <section className="bg-pbg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <SectionHeader eyebrow="Journal" title="Recent" italicWord="thoughts" subtext="Notes on design, engineering, and the space between." />
        <div className="space-y-4">
          {entries.map((e, i) => (
            <motion.a
              key={e.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex items-center gap-4 md:gap-6 p-4 bg-psurface/30 hover:bg-psurface border border-pstroke rounded-[40px] sm:rounded-full transition-colors"
            >
              <img src={e.img} alt="" className="w-16 h-16 rounded-full object-cover flex-none" />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl text-ptext truncate" style={{ fontFamily: "'Instrument Serif', serif" }}>{e.title}</h3>
                <p className="text-xs text-pmuted mt-1">{e.read} read</p>
              </div>
              <span className="text-xs text-pmuted whitespace-nowrap hidden sm:block">{e.date}</span>
              <span className="text-pmuted" aria-hidden>→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const items = [
    "https://images.unsplash.com/photo-1557683316-973673baf926?w=800",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800",
    "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800",
    "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=800",
  ];
  const left = items.slice(0, 3);
  const right = items.slice(3);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (contentRef.current && sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: contentRef.current,
            pinSpacing: false,
          });
        }
        if (leftRef.current) {
          gsap.to(leftRef.current, {
            y: -200,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }
        if (rightRef.current) {
          gsap.to(rightRef.current, {
            y: 200,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-pbg min-h-[300vh] py-16 md:py-24 overflow-hidden">
      <div ref={contentRef} className="relative z-10 h-screen flex items-center">
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 text-center">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="w-8 h-px bg-pstroke" />
            <span className="text-xs text-pmuted uppercase tracking-[0.3em]">Explorations</span>
            <span className="w-8 h-px bg-pstroke" />
          </div>
          <h2 className="text-5xl md:text-7xl text-ptext mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Visual <span className="italic">playground</span>
          </h2>
          <p className="text-pmuted max-w-md mx-auto mb-8 text-sm md:text-base">
            A living archive of shots, sketches, and side quests.
          </p>
          <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-ptext border border-pstroke hover:border-transparent">
            <span className="absolute -inset-[2px] rounded-full accent-gradient-anim opacity-0 group-hover:opacity-100 -z-10" />
            Dribbble <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-2 gap-12 md:gap-40 pt-[15vh]">
          <div ref={leftRef} className="flex flex-col gap-16 justify-self-end pointer-events-auto">
            {left.map((src, i) => (
              <button key={i} onClick={() => setLightbox(src)} className="block aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-pstroke" style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div ref={rightRef} className="flex flex-col gap-16 pt-32 pointer-events-auto">
            {right.map((src, i) => (
              <button key={i} onClick={() => setLightbox(src)} className="block aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-pstroke" style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "20+", l: "Years Experience" },
    { n: "95+", l: "Projects Done" },
    { n: "200%", l: "Satisfied Clients" },
  ];
  return (
    <section className="bg-pbg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="border-t border-pstroke pt-8"
          >
            <div className="text-6xl md:text-7xl text-ptext" style={{ fontFamily: "'Instrument Serif', serif" }}>{s.n}</div>
            <div className="mt-3 text-sm text-pmuted uppercase tracking-[0.2em]">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hls: { destroy: () => void } | null = null;
    const v = videoRef.current;
    if (!v) return;
    (async () => {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        const inst = new Hls();
        inst.loadSource(HLS_SRC);
        inst.attachMedia(v);
        hls = inst;
      } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
        v.src = HLS_SRC;
      }
    })();
    return () => { hls?.destroy(); };
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        if (marqueeRef.current) {
          gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        }
      });
    })();
    return () => { ctx?.revert(); };
  }, []);

  const marqueeWord = "BUILDING THE FUTURE • ";
  const social = [
    { l: "Twitter", h: "https://twitter.com" },
    { l: "LinkedIn", h: "https://linkedin.com" },
    { l: "Dribbble", h: "https://dribbble.com" },
    { l: "GitHub", h: "https://github.com" },
  ];

  return (
    <footer id="contact" className="relative bg-pbg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleY(-1)" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform text-5xl md:text-7xl italic text-ptext/80 py-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="pr-8">{marqueeWord}</span>
          ))}
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center py-16">
          <p className="text-sm text-pmuted uppercase tracking-[0.3em] mb-4">Let's talk</p>
          <a href="mailto:hello@michaelsmith.com" className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 bg-ptext text-pbg text-lg hover:scale-105 transition-transform">
            <span className="absolute -inset-[2px] rounded-full accent-gradient-anim opacity-0 group-hover:opacity-100 -z-10" />
            hello@michaelsmith.com <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-pstroke/50">
          <div className="flex gap-6">
            {social.map((s) => (
              <a key={s.l} href={s.h} target="_blank" rel="noreferrer" className="text-sm text-pmuted hover:text-ptext transition-colors">{s.l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-pmuted">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
}
