import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import archImg from "@/assets/mughal-arch.jpg";
import heroAsset from "@/assets/hero-mosque-lanterns.jpg.asset.json";
import nikahAsset from "@/assets/nikah-stage-new.png.asset.json";
import walimaAsset from "@/assets/walima-stage.jpg.asset.json";
import { NightSky } from "@/components/NightSky";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import { Chapter } from "@/components/Chapter";
import { KineticText } from "@/components/KineticText";
import { HeroParallax3D } from "@/components/HeroParallax3D";

export const Route = createFileRoute("/")({
  component: Invitation,
});

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { d: 0, h: 0, m: 0, s: 0, ready: false };
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, ready: true };
}

const pad = (n: number) => n.toString().padStart(2, "0");

function Invitation() {
  const { d, h, m, s, ready } = useCountdown(new Date("2026-10-26T19:30:00+05:30"));

  return (
    <>
      <SmoothScroll />
      <NightSky />
      <CursorGlow />
      <main className="text-cream">
        {/* CHAPTER 01 — Bismillah */}
        <Chapter id="bismillah">
          <div className="text-center max-w-3xl">
            <p className="cine-fade text-cream/60 tracking-[0.5em] text-[10px] md:text-xs mb-10" style={{ "--fade-delay": "0s" } as CSSProperties}>
              CHAPTER 01 · IN HIS NAME
            </p>
            <p
              className="text-5xl md:text-7xl mb-10 text-cream"
              dir="rtl"
              lang="ar"
              data-cursor="magnetic"
              style={{
                fontFamily: "'Amiri', serif",
                textShadow: "0 0 40px oklch(0.85 0.15 65 / 0.5), 0 0 80px oklch(0.85 0.15 65 / 0.3)",
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْم
            </p>
            <KineticText
              text="BISMILLAHIR RAHMANIR RAHIM"
              as="p"
              className="text-cream/80 tracking-[0.4em] text-xs md:text-sm font-light"
              step={0.025}
            />
            <p className="cine-fade mt-10 text-cream/50 italic leading-relaxed" style={{ "--fade-delay": "1s" } as CSSProperties}>
              In the Name of Allah,<br />The Most Compassionate, The Most Merciful.
            </p>
          </div>
        </Chapter>

        {/* CHAPTER 02 — Verse */}
        <Chapter id="verse">
          <div className="text-center max-w-3xl">
            <p className="cine-fade text-gold/70 tracking-[0.5em] text-[10px] md:text-xs mb-12">
              CHAPTER 02 · A SIGN FROM HIM
            </p>
            <KineticText
              text="And He placed between you"
              as="p"
              className="text-display italic text-cream text-3xl md:text-5xl leading-tight"
              step={0.035}
            />
            <KineticText
              text="affection and mercy."
              as="p"
              className="text-display italic text-ember text-4xl md:text-6xl leading-tight mt-2"
              step={0.04}
              baseDelay={0.4}
              data-cursor="magnetic"
            />
            <p className="cine-fade mt-10 text-cream/50 text-xs tracking-[0.4em]" style={{ "--fade-delay": "1.4s" } as CSSProperties}>
              SURAH AR-RUM · 30:21
            </p>
          </div>
        </Chapter>

        {/* CHAPTER 03 — Invitation */}
        <Chapter id="invitation">
          <div className="text-center max-w-3xl">
            <p className="cine-fade text-cream/60 tracking-[0.5em] text-[10px] md:text-xs mb-12">
              CHAPTER 03 · TOGETHER WITH OUR FAMILIES
            </p>
            <KineticText
              text="Mr. & Mrs. Firoz-Uddin Shaikh"
              as="p"
              className="text-display text-cream text-xl md:text-2xl"
              step={0.02}
            />
            <p className="cine-fade text-gold text-xl my-4" style={{ "--fade-delay": "0.9s" } as CSSProperties}>◆</p>
            <KineticText
              text="Mr. & Mrs. Salim Saifi"
              as="p"
              className="text-display text-cream text-xl md:text-2xl"
              step={0.02}
              baseDelay={1}
            />
            <p
              className="cine-fade text-script text-ember text-5xl md:text-7xl mt-14"
              style={{ "--fade-delay": "1.6s", fontFamily: "'Pinyon Script', cursive" } as CSSProperties}
              data-cursor="magnetic"
            >
              cordially invite you
            </p>
            <p className="cine-fade text-cream/70 mt-4 italic" style={{ "--fade-delay": "2s" } as CSSProperties}>
              to grace the sacred Nikah ceremony of
            </p>
          </div>
        </Chapter>

        {/* CHAPTER 04 — Bride & Groom */}
        <Chapter id="couple">
          <div className="text-center">
            <p className="cine-fade text-cream/60 tracking-[0.5em] text-[10px] md:text-xs mb-14">
              CHAPTER 04 · THE COUPLE
            </p>
            <KineticText
              text="AHMED RAZA"
              as="h1"
              className="text-display text-cream text-6xl sm:text-7xl md:text-9xl leading-none tracking-tight"
              step={0.05}
              baseDelay={0.1}
            />
            <p
              className="cine-fade text-script text-gold text-5xl md:text-7xl my-6"
              style={{ "--fade-delay": "0.9s", fontFamily: "'Pinyon Script', cursive" } as CSSProperties}
              data-cursor="magnetic"
            >
              &amp;
            </p>
            <KineticText
              text="NAZZIYA"
              as="h1"
              className="text-display text-cream text-6xl sm:text-7xl md:text-9xl leading-none tracking-tight"
              step={0.05}
              baseDelay={1.2}
            />
            <p className="cine-fade text-cream/60 text-script text-2xl md:text-3xl mt-10" style={{ "--fade-delay": "2s" } as CSSProperties}>
              26 October 2026 · Pune

            </p>
          </div>
        </Chapter>

        {/* CHAPTER 05 — Nikah */}
        <Chapter id="nikah">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 items-center">
            <div className="relative order-2 md:order-1 text-center md:text-left">
              <p className="cine-fade text-gold/70 tracking-[0.5em] text-[10px] md:text-xs mb-6">
                CHAPTER 05 · THE CEREMONY
              </p>
              <KineticText
                text="Nikah"
                as="h2"
                className="text-display text-cream text-7xl md:text-8xl leading-none"
                step={0.06}
                baseDelay={0.1}
                data-cursor="magnetic"
              />
              <div className="cine-fade mt-8 space-y-2 text-cream/85" style={{ "--fade-delay": "0.7s" } as CSSProperties}>
                <p className="text-lg">Monday, 26 October 2026</p>
                <p className="text-cream/60 italic">After Namaz-e-Isha</p>
                <div className="w-16 h-px bg-gold my-5 mx-auto md:mx-0" />
                <p className="text-display text-2xl">Raaga Imperio</p>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Survey No. 169, Aundh – Ravet BRTS Rd<br />
                  near Tulja Bhavani Vajan Kata<br />
                  Tathawade, Pune, Maharashtra 411033
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Raaga+Imperio+Tathawade+Pune+411033"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="magnetic"
                  className="inline-block mt-6 text-xs tracking-[0.4em] text-gold border-b border-gold/50 pb-1 hover:text-cream hover:border-cream transition"
                >
                  SEE THE ROUTE
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="cine-image relative overflow-hidden rounded-xl">
                <img
                  src={nikahAsset.url}
                  alt="Nikah floral arch stage with white and blush roses"
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </Chapter>

        {/* CHAPTER 06 — Walima */}
        <Chapter id="walima">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="cine-image relative overflow-hidden rounded-xl">
                <img
                  src={walimaAsset.url}
                  alt="Walima reception stage with illuminated white arches and florals"
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="cine-fade text-gold/70 tracking-[0.5em] text-[10px] md:text-xs mb-6">
                CHAPTER 06 · THE RECEPTION
              </p>
              <KineticText
                text="Walima"
                as="h2"
                className="text-display text-cream text-7xl md:text-8xl leading-none"
                step={0.06}
                baseDelay={0.1}
                data-cursor="magnetic"
              />
              <div className="cine-fade mt-8 space-y-2 text-cream/85" style={{ "--fade-delay": "0.7s" } as CSSProperties}>
                <p className="text-lg">Monday, 19 October 2026</p>
                <p className="text-cream/60 italic">Evening</p>
                <div className="w-16 h-px bg-gold my-5 mx-auto md:mx-0" />
                <p className="text-display text-2xl">Raga Imperio</p>
                <p className="text-cream/60 text-sm leading-relaxed">
                  Thathwade<br />
                  Pune, Maharashtra
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Raga+Imperio+Thathwade+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="magnetic"
                  className="inline-block mt-6 text-xs tracking-[0.4em] text-gold border-b border-gold/50 pb-1 hover:text-cream hover:border-cream transition"
                >
                  SEE THE ROUTE
                </a>
              </div>
            </div>
          </div>
        </Chapter>

        {/* CHAPTER 07 — Cinematic mosque reveal (hero) */}
        <Chapter id="mosque" className="overflow-hidden">
          <div className="absolute inset-0">
            <div className="cine-image absolute inset-0">
              <img
                src={heroAsset.url}
                alt="Sky lanterns floating above a Mughal palace at dusk"
                width={1536}
                height={1920}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
            </div>
          </div>
          <div className="relative z-10 text-center px-6">
            <p className="cine-fade text-cream/70 tracking-[0.5em] text-[10px] md:text-xs mb-6">
              CHAPTER 07 · SAVE THE DATE
            </p>
            <KineticText
              text="Under sacred skies"
              as="p"
              className="text-script text-gold text-4xl md:text-6xl mb-4"
              step={0.04}
              baseDelay={0.2}
            />
            <KineticText
              text="we begin forever."
              as="p"
              className="text-display italic text-cream text-3xl md:text-5xl"
              step={0.04}
              baseDelay={0.9}
              data-cursor="magnetic"
            />
            <p className="cine-fade mt-10 text-cream/80 tracking-[0.4em] text-xs" style={{ "--fade-delay": "1.8s" } as CSSProperties}>
              26.10.2026 · PUNE
            </p>
          </div>
        </Chapter>

        {/* Everything below sits on cream */}
        <div className="relative bg-cream text-ink">
          {/* RSVP */}
          <section className="relative overflow-hidden">
            <img
              src={archImg}
              alt="Mughal arch at dusk"
              width={1024}
              height={1400}
              loading="lazy"
              className="w-full h-[70vh] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-center text-cream px-6">
                <p className="text-script text-5xl md:text-6xl mb-2">Please</p>
                <h2 className="text-display text-7xl md:text-8xl tracking-widest" data-cursor="magnetic">RSVP</h2>
                <p className="mt-6 max-w-md mx-auto text-cream/90 italic">
                  Kindly bless us with your presence and confirm your attendance.
                </p>
                <button data-cursor="magnetic" className="mt-8 px-8 py-3 rounded-full bg-cream text-ink text-sm tracking-widest-plus hover:bg-gold transition">
                  CONFIRM ATTENDANCE
                </button>
              </div>
            </div>
          </section>

          {/* THINGS TO KNOW */}
          <section className="py-24 md:py-32 px-6 bg-cream">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-script text-4xl text-ember mb-2">A few</p>
              <h2 className="text-display text-5xl md:text-6xl mb-16">blessings &amp; notes</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {[
                  { icon: "☾", title: "Attire", body: "Guests are requested to wear traditional attire befitting the occasion." },
                  { icon: "◈", title: "Ceremony", body: "The Nikah will be solemnized right after Namaz-e-Isha. Kindly be seated in advance." },
                  { icon: "✦", title: "Duas", body: "Your heartfelt prayers are the most treasured gift for the couple." },
                ].map((t) => (
                  <div key={t.title} data-cursor="magnetic" className="p-8 rounded-2xl bg-card border border-border/60 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-4xl text-gold mb-4">{t.icon}</div>
                    <h3 className="text-display text-2xl mb-3">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COUNTDOWN */}
          <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.38 0.08 250) 0%, oklch(0.55 0.12 40) 100%)" }}>
            <div className="max-w-4xl mx-auto text-center text-cream">
              <p className="text-script text-4xl mb-2">The countdown</p>
              <h2 className="text-display text-5xl md:text-6xl mb-12 tracking-wide">to our Nikah</h2>
              <div className="grid grid-cols-4 gap-3 md:gap-8 max-w-2xl mx-auto">
                {[
                  { v: d, l: "Days" },
                  { v: h, l: "Hours" },
                  { v: m, l: "Minutes" },
                  { v: s, l: "Seconds" },
                ].map((u) => (
                  <div key={u.l} className="rounded-2xl bg-cream/10 backdrop-blur border border-cream/20 p-4 md:p-6">
                    <div className="text-display text-4xl md:text-6xl" suppressHydrationWarning>
                      {ready ? pad(u.v) : "--"}
                    </div>
                    <div className="text-xs md:text-sm tracking-widest-plus mt-2 opacity-80">{u.l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-20 px-6 text-center bg-cream">
            <p className="text-script text-4xl text-ember mb-3">We look forward to</p>
            <h3 className="text-display text-3xl md:text-4xl mb-6">celebrating with you</h3>
            <div className="w-16 h-px bg-gold my-6 mx-auto" />
            <p className="max-w-xl mx-auto text-muted-foreground italic leading-relaxed">
              May Allah (SWT) bless this union with endless love, mercy, happiness and barakah. Ameen.
            </p>
            <p className="text-script text-2xl text-ember mt-10">Ahmed Raza &amp; Nazziya</p>
            <p className="mt-1 text-sm text-muted-foreground">26 October 2026 · Pune</p>
          </footer>
        </div>
      </main>
    </>
  );
}
