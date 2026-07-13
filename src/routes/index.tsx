import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import archImg from "@/assets/mughal-arch.jpg";
import heroAsset from "@/assets/hero-mosque-lanterns.jpg.asset.json";
import nikahAsset from "@/assets/nikah-stage.jpg.asset.json";
import walimaAsset from "@/assets/walima-stage.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Invitation,
});

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

const pad = (n: number) => n.toString().padStart(2, "0");

function Invitation() {
  const { d, h, m, s } = useCountdown(new Date("2026-10-17T19:30:00+05:30"));

  return (
    <main className="bg-cream text-ink">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Sky lanterns floating above a Mughal palace at dusk"
          width={1536}
          height={1920}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-cream/50" />

        {/* Floating lanterns */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]" aria-hidden="true">
          {[
            { left: "8%",  size: 34, delay: 0,   dur: 18, sway: 5 },
            { left: "22%", size: 22, delay: 4,   dur: 22, sway: 6 },
            { left: "38%", size: 42, delay: 8,   dur: 20, sway: 4.5 },
            { left: "54%", size: 26, delay: 2,   dur: 24, sway: 7 },
            { left: "68%", size: 38, delay: 11,  dur: 19, sway: 5.5 },
            { left: "82%", size: 24, delay: 6,   dur: 23, sway: 6.5 },
            { left: "92%", size: 30, delay: 14,  dur: 21, sway: 5 },
          ].map((l, i) => (
            <div
              key={i}
              className="absolute bottom-0"
              style={{
                left: l.left,
                width: l.size,
                animation: `lantern-rise ${l.dur}s linear ${l.delay}s infinite`,
              }}
            >
              <div style={{ animation: `lantern-sway ${l.sway}s ease-in-out infinite` }}>
                {/* Glow halo */}
                <div
                  className="absolute -inset-4 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.85 0.16 65 / 0.55) 0%, transparent 70%)",
                    animation: `lantern-flicker ${2 + (i % 3)}s ease-in-out infinite`,
                  }}
                />
                {/* Lantern body */}
                <svg viewBox="0 0 40 56" width={l.size} height={l.size * 1.4} className="relative">
                  {/* top cap */}
                  <rect x="14" y="2" width="12" height="3" rx="1" fill="oklch(0.4 0.05 60)" />
                  {/* body */}
                  <path
                    d="M8 10 Q20 4 32 10 L34 34 Q20 46 6 34 Z"
                    fill="oklch(0.88 0.15 65)"
                    stroke="oklch(0.55 0.12 45)"
                    strokeWidth="0.8"
                    opacity="0.95"
                  />
                  {/* vertical ribs */}
                  <path d="M20 6 L20 42" stroke="oklch(0.55 0.12 45 / 0.5)" strokeWidth="0.5" />
                  <path d="M13 8 Q13 26 11 40" stroke="oklch(0.55 0.12 45 / 0.4)" strokeWidth="0.4" fill="none" />
                  <path d="M27 8 Q27 26 29 40" stroke="oklch(0.55 0.12 45 / 0.4)" strokeWidth="0.4" fill="none" />
                  {/* bottom fringe */}
                  <path d="M10 38 L12 46 M15 40 L15 48 M20 41 L20 50 M25 40 L25 48 M30 38 L28 46"
                    stroke="oklch(0.72 0.11 70)" strokeWidth="0.7" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 animate-fade-up">
          <p className="text-cream/90 tracking-widest-plus text-xs md:text-sm mb-6">THE WEDDING OF</p>
          <h1 className="text-display text-cream text-6xl sm:text-7xl md:text-8xl leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            AHMED RAZA
          </h1>
          <p className="text-cream/90 tracking-widest-plus text-sm md:text-base my-4">W E D S</p>
          <h1 className="text-display text-cream text-6xl sm:text-7xl md:text-8xl leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            NAZZIYA
          </h1>
          <p className="mt-8 text-cream/80 text-script text-3xl md:text-4xl">17 October 2026 · Patna</p>
        </div>
      </section>

      {/* BISMILLAH + VERSE */}
      <section className="py-24 md:py-32 px-6 text-center max-w-3xl mx-auto">
        <p className="text-4xl md:text-5xl text-ink mb-4" dir="rtl" lang="ar" style={{ fontFamily: "'Amiri', serif" }}>
          بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيْم
        </p>
        <p className="text-script text-2xl md:text-3xl text-ember mb-4">Bismillahir Rahmanir Raheem</p>
        <p className="text-sm italic text-muted-foreground">
          In the Name of Allah, The Most Compassionate, The Most Merciful
        </p>

        <div className="my-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gold" />
          <span className="text-gold text-xl">✦</span>
          <div className="h-px w-16 bg-gold" />
        </div>

        <blockquote className="text-display text-2xl md:text-3xl leading-relaxed text-ink italic">
          &ldquo;And among His signs is that He created for you spouses from among yourselves
          that you may find tranquility in them; and He placed between you affection and mercy.&rdquo;
        </blockquote>
        <p className="mt-6 text-sm tracking-widest-plus text-muted-foreground">— SURAH AR-RUM (30:21)</p>
      </section>

      {/* INVITATION */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <p className="text-sm tracking-widest-plus text-muted-foreground mb-8">TOGETHER WITH OUR FAMILIES</p>

        <p className="text-display text-2xl md:text-3xl">Mr. &amp; Mrs. Firoz-Uddin Shaikh</p>
        <div className="text-gold my-4">◆</div>
        <p className="text-display text-2xl md:text-3xl">Mr. &amp; Mrs. Salim Saifi</p>

        <p className="text-script text-4xl md:text-5xl text-ember mt-14 mb-6">cordially invite you</p>
        <p className="text-lg text-muted-foreground">to grace the sacred Nikah ceremony of</p>

        <div className="my-10">
          <p className="text-display text-5xl md:text-6xl">Ahmed Raza Shaikh</p>
          <p className="text-script text-3xl text-gold my-3">&amp;</p>
          <p className="text-display text-5xl md:text-6xl">Nazziya</p>
        </div>

        <p className="max-w-xl mx-auto text-muted-foreground italic leading-relaxed">
          With the blessings of Almighty Allah, your prayers and presence will make our
          celebration even more memorable.
        </p>
      </section>

      {/* NIKAH EVENT */}
      <section className="relative py-24 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, oklch(0.92 0.04 70) 100%)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gold/10 rounded-2xl -rotate-1" />
            <img
              src={nikahAsset.url}
              alt="Nikah floral arch stage with white and blush roses"
              width={900}
              height={1100}
              loading="lazy"
              className="relative w-full aspect-[4/5] object-cover rounded-xl shadow-2xl"
            />
          </div>
          <div className="text-center md:text-left">
            <div className="text-gold text-2xl mb-3">✦</div>
            <p className="text-script text-3xl text-ember">the</p>
            <h3 className="text-display text-6xl md:text-7xl text-ink mb-3">Nikah</h3>
            <p className="text-sm tracking-widest-plus text-muted-foreground mb-6">CEREMONY</p>
            <div className="w-16 h-px bg-gold my-5 mx-auto md:mx-0" />
            <p className="text-xl mb-1">Saturday, 17 October 2026</p>
            <p className="text-muted-foreground italic mb-6">After Namaz-e-Isha</p>

            <p className="text-display text-2xl text-ink">Meetan Darbar</p>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Bank of Ganga River<br />
              Khanqah, Munemia, Mitan Ghat<br />
              Patna City — 800008
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Meetan+Darbar+Mitan+Ghat+Patna+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-sm tracking-widest-plus text-ember border-b border-ember pb-1 hover:text-ink hover:border-ink transition"
            >
              SEE THE ROUTE
            </a>
          </div>
        </div>
      </section>

      {/* WALIMA EVENT */}
      <section className="relative py-24 px-6" style={{ background: "linear-gradient(180deg, oklch(0.92 0.04 70) 0%, var(--cream) 100%)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center md:[&>div:first-child]:order-2">
          <div className="relative">
            <div className="absolute -inset-4 bg-gold/10 rounded-2xl rotate-1" />
            <img
              src={walimaAsset.url}
              alt="Walima reception stage with illuminated white arches and florals"
              width={900}
              height={1100}
              loading="lazy"
              className="relative w-full aspect-[4/5] object-cover rounded-xl shadow-2xl"
            />
          </div>
          <div className="text-center md:text-left">
            <div className="text-gold text-2xl mb-3">✦</div>
            <p className="text-script text-3xl text-ember">the</p>
            <h3 className="text-display text-6xl md:text-7xl text-ink mb-3">Walima</h3>
            <p className="text-sm tracking-widest-plus text-muted-foreground mb-6">RECEPTION</p>
            <div className="w-16 h-px bg-gold my-5 mx-auto md:mx-0" />
            <p className="text-xl mb-1">Monday, 19 October 2026</p>
            <p className="text-muted-foreground italic mb-6">Evening</p>

            <p className="text-display text-2xl text-ink">Raga Imperio</p>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Thathwade<br />
              Pune, Maharashtra
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Raga+Imperio+Thathwade+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-sm tracking-widest-plus text-ember border-b border-ember pb-1 hover:text-ink hover:border-ink transition"
            >
              SEE THE ROUTE
            </a>
          </div>
        </div>
      </section>

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
            <h2 className="text-display text-7xl md:text-8xl tracking-widest">RSVP</h2>
            <p className="mt-6 max-w-md mx-auto text-cream/90 italic">
              Kindly bless us with your presence and confirm your attendance.
            </p>
            <button className="mt-8 px-8 py-3 rounded-full bg-cream text-ink text-sm tracking-widest-plus hover:bg-gold transition">
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
              <div key={t.title} className="p-8 rounded-2xl bg-card border border-border/60 shadow-sm">
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
                <div className="text-display text-4xl md:text-6xl">{pad(u.v)}</div>
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
        <p className="mt-1 text-sm text-muted-foreground">17 October 2026 · Patna City</p>
      </footer>
    </main>
  );
}
