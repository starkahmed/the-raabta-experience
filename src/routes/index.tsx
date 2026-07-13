import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-lanterns.jpg";
import archImg from "@/assets/mughal-arch.jpg";
import coupleImg from "@/assets/couple.jpg";
import mehendiImg from "@/assets/event-mehendi.jpg";
import nikahImg from "@/assets/event-nikah.jpg";

export const Route = createFileRoute("/")({
  component: Invitation,
});

const events = [
  { name: "Mehendi", date: "Monday, March 9th 2026", venue: "Atlantis The Royal, Dubai", time: "6pm Onwards", img: mehendiImg },
  { name: "Manjha", date: "Tuesday, March 10th 2026", venue: "Atlantis The Royal, Dubai", time: "6pm Onwards", img: nikahImg },
  { name: "Sangeet", date: "Wednesday, March 11th 2026", venue: "Atlantis The Royal, Dubai", time: "8pm Onwards", img: mehendiImg },
  { name: "Nikah", date: "Friday, March 13th 2026", venue: "Atlantis The Royal, Dubai", time: "5pm Onwards", img: nikahImg },
  { name: "Walima", date: "Sunday, March 15th 2026", venue: "Jumeirah Burj Al Arab, Dubai", time: "7pm Onwards", img: nikahImg },
];

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
  const { d, h, m, s } = useCountdown(new Date("2026-03-13T17:00:00+04:00"));

  return (
    <main className="bg-cream text-ink">
      <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full bg-cream/95 pl-4 pr-1 py-1 shadow-lg backdrop-blur border border-border">
        <span className="text-sm font-medium tracking-wide">Buy Now</span>
        <span className="rounded-full bg-ink text-cream text-xs font-medium px-3 py-1.5 tracking-wider">INR 3999</span>
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Sky lanterns floating above a Mughal palace at dusk" width={1536} height={1920} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/40" />
        <div className="relative z-10 text-center px-6 animate-fade-up">
          <h1 className="text-display text-cream text-7xl sm:text-8xl md:text-9xl leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]">IMRAN</h1>
          <p className="text-cream/90 tracking-widest-plus text-sm md:text-base my-4">W E D S</p>
          <h1 className="text-display text-cream text-7xl sm:text-8xl md:text-9xl leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]">ZOYA</h1>
          <p className="mt-8 text-cream/80 text-script text-3xl md:text-4xl">March 2026 · Dubai</p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 text-center max-w-3xl mx-auto">
        <p className="text-4xl md:text-5xl text-ink mb-3" dir="rtl" lang="ar" style={{ fontFamily: "'Amiri', serif" }}>
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْم
        </p>
        <p className="text-script text-2xl md:text-3xl text-ember mb-16">Bismillahir Rahmanir Raheem</p>
        <p className="text-sm tracking-widest-plus text-muted-foreground mb-8">WITH THE HEAVENLY BLESSINGS OF</p>
        <p className="text-display text-2xl md:text-3xl">Mrs. Fatima Begum &amp; Mr. Zafar Ahmed</p>
        <div className="text-gold my-4">◆</div>
        <p className="text-display text-2xl md:text-3xl">Mrs. Shabana Khan &amp; Mr. Rehan Malik</p>
        <p className="text-script text-4xl md:text-5xl text-ember mt-14 mb-6">invite</p>
        <p className="text-lg text-muted-foreground">you to join us in the wedding celebrations of</p>
        <div className="my-10">
          <p className="text-display text-6xl md:text-7xl">Imran</p>
          <p className="text-script text-3xl text-gold my-2">&amp;</p>
          <p className="text-display text-6xl md:text-7xl">Zoya</p>
        </div>
        <p className="text-sm tracking-widest-plus text-muted-foreground mb-3">DAUGHTER OF</p>
        <p className="text-display text-2xl md:text-3xl">Mrs. Nida Khan &amp; Mr. Arshad Hussain</p>
        <p className="mt-16 text-lg italic text-muted-foreground">On the following events</p>
      </section>

      <section className="relative py-20 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, oklch(0.92 0.04 70) 100%)" }}>
        <div className="max-w-6xl mx-auto grid gap-14">
          {events.map((e, i) => (
            <article key={e.name} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
              <div className="[direction:ltr] relative">
                <div className="absolute -inset-4 bg-gold/10 rounded-2xl -rotate-1" />
                <img src={e.img} alt={`${e.name} celebration decor`} width={900} height={1100} loading="lazy" className="relative w-full aspect-[4/5] object-cover rounded-xl shadow-2xl" />
              </div>
              <div className="[direction:ltr] text-center md:text-left">
                <div className="text-gold text-2xl mb-3">✦</div>
                <h3 className="text-display text-5xl md:text-6xl text-ink mb-4">{e.name}</h3>
                <div className="w-16 h-px bg-gold my-5 mx-auto md:mx-0" />
                <p className="text-lg mb-1">{e.date}</p>
                <p className="text-muted-foreground mb-1">{e.venue}</p>
                <p className="text-muted-foreground italic mb-6">{e.time}</p>
                <button className="text-sm tracking-widest-plus text-ember border-b border-ember pb-1 hover:text-ink hover:border-ink transition">SEE THE ROUTE</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src={coupleImg} alt="Portrait of Imran and Zoya" width={1024} height={1400} loading="lazy" className="w-full rounded-xl shadow-xl" />
          <div>
            <p className="text-script text-4xl text-ember">meet the</p>
            <h2 className="text-display text-5xl md:text-6xl mb-8">bride &amp; groom</h2>
            <div className="w-16 h-px bg-gold mb-6" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              We are both so delighted that you will be joining us to celebrate what we hope
              will be one of the happiest days of our lives. The love and warmth shown to us
              by so many people has been incredibly moving and has touched us deeply. We would
              like to thank everyone most sincerely for their kindness and prayers. We are
              truly looking forward to seeing you at the wedding functions.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src={archImg} alt="Mughal arch at dusk" width={1024} height={1400} loading="lazy" className="w-full h-[70vh] object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="text-center text-cream">
            <p className="text-script text-5xl md:text-6xl mb-2">Please</p>
            <h2 className="text-display text-7xl md:text-8xl tracking-widest">RSVP</h2>
            <button className="mt-8 px-8 py-3 rounded-full bg-cream text-ink text-sm tracking-widest-plus hover:bg-gold transition">MESSAGE ON WHATSAPP</button>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-script text-4xl text-ember mb-2">Things</p>
          <h2 className="text-display text-5xl md:text-6xl mb-6">to know</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16">
            To help you feel at ease and enjoy every moment of the celebrations, we've gathered
            a few thoughtful details we'd love for you to know before the big day.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "#", title: "Hashtag", body: "While posting photos on social media please use the hashtag #ImranWedsZoya" },
              { icon: "☀", title: "Weather", body: "Mostly sunny with temperatures reaching up to 28°C at the venue" },
              { icon: "☾", title: "Stay", body: "We recommend the nearby Palm Jumeirah hotels for visiting guests" },
              { icon: "◈", title: "Parking", body: "Valet parking for all our guests will be available at the venue" },
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

      <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.38 0.08 250) 0%, oklch(0.55 0.12 40) 100%)" }}>
        <div className="max-w-4xl mx-auto text-center text-cream">
          <p className="text-script text-4xl mb-2">The countdown</p>
          <h2 className="text-display text-5xl md:text-6xl mb-12 tracking-wide">begins</h2>
          <div className="grid grid-cols-4 gap-3 md:gap-8 max-w-2xl mx-auto">
            {[{ v: d, l: "Days" }, { v: h, l: "Hours" }, { v: m, l: "Minutes" }, { v: s, l: "Seconds" }].map((u) => (
              <div key={u.l} className="rounded-2xl bg-cream/10 backdrop-blur border border-cream/20 p-4 md:p-6">
                <div className="text-display text-4xl md:text-6xl">{pad(u.v)}</div>
                <div className="text-xs md:text-sm tracking-widest-plus mt-2 opacity-80">{u.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-xl mx-auto italic opacity-90">
            Our families are excited that you are able to join us in celebrating what we hope
            will be one of the happiest days of our lives.
          </p>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-muted-foreground bg-cream">
        <p className="text-script text-2xl text-ember">Imran &amp; Zoya</p>
        <p className="mt-2">March 2026 · Dubai</p>
      </footer>
    </main>
  );
}
