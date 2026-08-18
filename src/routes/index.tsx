import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import archImg from "@/assets/mughal-arch.jpg";

import nikahAsset from "@/assets/nikah-stage-new.png.asset.json";
import walimaAsset from "@/assets/walima-stage.jpg.asset.json";
import { NightSky } from "@/components/NightSky";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/CursorGlow";
import { AmbientMusic } from "@/components/AmbientMusic";
import { Chapter } from "@/components/Chapter";
import { KineticText } from "@/components/KineticText";
import { BismillahScene } from "@/components/BismillahScene";
import { MosqueScene } from "@/components/MosqueScene";
import { ParallaxImage } from "@/components/ParallaxImage";
import { RollingDigits } from "@/components/RollingDigits";
import { CalendarButton } from "@/components/CalendarButton";

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

const mapLink =
  "inline-flex items-center justify-center min-h-11 mt-6 px-1 text-[0.7rem] sm:text-xs tracking-[0.3em] text-gold border-b border-gold/50 hover:text-cream hover:border-cream transition-colors";

function Invitation() {
  const { d, h, m, s, ready } = useCountdown(new Date("2026-10-26T19:30:00+05:30"));
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <>
      <SmoothScroll />
      <NightSky />
      <CursorGlow />
      <AmbientMusic />
      <main className="text-cream overflow-x-hidden">
        {/* Bismillah */}
        <Chapter id="bismillah" className="overflow-hidden">
          <BismillahScene />
        </Chapter>

        {/* Verse */}
        <Chapter id="verse">
          <div className="text-center max-w-3xl mx-auto">
            <KineticText
              text="And He placed between you"
              as="p"
              className="text-display italic text-cream text-2xl sm:text-3xl md:text-5xl leading-snug"
              step={0.03}
            />
            <KineticText
              text="affection and mercy."
              as="p"
              className="text-display italic text-ember text-3xl sm:text-4xl md:text-6xl leading-snug mt-2"
              step={0.035}
              baseDelay={0.4}
              data-cursor="magnetic"
            />
            <p
              className="cine-fade mt-8 md:mt-10 text-cream/70 text-[0.65rem] sm:text-xs tracking-[0.3em]"
              style={{ "--fade-delay": "1.3s" } as CSSProperties}
            >
              THE HOLY QUR&rsquo;AN · SURAH AR-RUM 30:21
            </p>
          </div>
        </Chapter>

        {/* Invitation */}
        <Chapter id="invitation">
          <div className="text-center max-w-3xl mx-auto">
            <p
              className="cine-fade text-cream/70 text-[0.65rem] sm:text-xs tracking-[0.3em] mb-8"
              style={{ "--fade-delay": "0.2s" } as CSSProperties}
            >
              WITH THE BLESSINGS OF THE ALMIGHTY
            </p>
            <KineticText
              text="Mr. & Mrs. Firoz-Uddin Shaikh"
              as="p"
              className="text-display text-cream text-lg sm:text-xl md:text-2xl"
              step={0.02}
              baseDelay={0.4}
            />
            <p className="cine-fade text-gold text-lg my-3" style={{ "--fade-delay": "1s" } as CSSProperties}>
              ◆
            </p>
            <KineticText
              text="Mr. & Mrs. Salim Saifi"
              as="p"
              className="text-display text-cream text-lg sm:text-xl md:text-2xl"
              step={0.02}
              baseDelay={1.1}
            />
            <p
              className="cine-fade text-script text-ember text-4xl sm:text-5xl md:text-7xl mt-12 md:mt-14 leading-[1.4]"
              style={{ "--fade-delay": "1.7s" } as CSSProperties}
              data-cursor="magnetic"
            >
              cordially invite you
            </p>
            <p
              className="cine-fade text-cream/80 mt-4 italic text-base sm:text-lg"
              style={{ "--fade-delay": "2.1s" } as CSSProperties}
            >
              to share in the joy of the Nikah of their children
            </p>
          </div>
        </Chapter>

        {/* Bride & Groom */}
        <Chapter id="couple">
          <div className="text-center w-full max-w-4xl mx-auto">
            <KineticText
              text="AHMED RAZA"
              as="h1"
              className="text-display text-cream text-[13vw] sm:text-7xl md:text-9xl leading-none tracking-tight"
              step={0.045}
              baseDelay={0.1}
            />
            <p
              className="cine-fade text-script text-gold text-4xl sm:text-5xl md:text-7xl my-5 md:my-6 leading-[1.4]"
              style={{ "--fade-delay": "0.9s" } as CSSProperties}
              data-cursor="magnetic"
            >
              &amp;
            </p>
            <KineticText
              text="NAZZIYA"
              as="h1"
              className="text-display text-cream text-[13vw] sm:text-7xl md:text-9xl leading-none tracking-tight"
              step={0.045}
              baseDelay={1.2}
            />
            <p
              className="cine-fade text-cream/70 text-script text-xl sm:text-2xl md:text-3xl mt-10 leading-[1.5]"
              style={{ "--fade-delay": "2s" } as CSSProperties}
            >
              26 October 2026 · Pune
            </p>
          </div>
        </Chapter>

        {/* Nikah */}
        <Chapter id="nikah" className="py-24 md:py-0">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="relative order-2 md:order-1 text-center md:text-left min-w-0">
              <p
                className="cine-fade text-gold/85 text-[0.65rem] sm:text-xs tracking-[0.3em] mb-3"
                style={{ "--fade-delay": "0.2s" } as CSSProperties}
              >
                THE SACRED VOWS
              </p>
              <KineticText
                text="Nikah"
                as="h2"
                className="text-display text-cream text-6xl sm:text-7xl md:text-8xl leading-none"
                step={0.06}
                baseDelay={0.3}
                data-cursor="magnetic"
              />
              <div
                className="cine-fade mt-7 md:mt-8 space-y-2 text-cream/85"
                style={{ "--fade-delay": "0.8s" } as CSSProperties}
              >
                <p className="text-base sm:text-lg">Monday, 26 October 2026</p>
                <p className="text-cream/65 italic">Immediately after Namaz-e-Isha</p>
                <div className="cine-rule w-16 h-px bg-gold my-5 mx-auto md:mx-0" />
                <p className="text-display text-xl sm:text-2xl">Raaga Palace</p>
                <p className="text-cream/65 text-sm leading-relaxed break-words">
                  Mother Teresa Flyover, near Nathu Nadhe Corner
                  <br />
                  Vijay Nagar, Kalewadi, Pimpri-Chinchwad
                  <br />
                  Pune, Maharashtra 411017
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Raaga+Palace+Vijay+Nagar+Kalewadi+Pimpri-Chinchwad+Pune+411017"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="magnetic"
                  className={mapLink}
                >
                  SEE THE ROUTE
                </a>
                <CalendarButton
                  event={{
                    title: "Nikah Ceremony — Ahmed Raza & Nazziya",
                    description:
                      "Join us for the Nikah ceremony of Ahmed Raza Shaikh and Nazziya. Immediately after Namaz-e-Isha.",
                    location:
                      "Raaga Palace, Mother Teresa Flyover, near Nathu Nadhe Corner, Vijay Nagar, Kalewadi, Pimpri-Chinchwad, Pune, Maharashtra 411017",
                    startDate: new Date("2026-10-26T19:30:00+05:30"),
                    endDate: new Date("2026-10-26T21:00:00+05:30"),
                  }}
                  filename="nikah-ahmed-raza-nazziya.ics"
                  className={mapLink}
                >
                  ADD TO CALENDAR
                </CalendarButton>
              </div>
            </div>
            <div className="order-1 md:order-2 relative min-w-0">
              <ParallaxImage
                src={nikahAsset.url}
                alt="Nikah stage with a white floral arch and blush roses"
              />
            </div>
          </div>
        </Chapter>

        {/* Walima */}
        <Chapter id="walima" className="py-24 md:py-0">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="relative min-w-0">
              <ParallaxImage
                src={walimaAsset.url}
                alt="Walima reception stage with illuminated white arches and florals"
              />
            </div>
            <div className="text-center md:text-left min-w-0">
              <p
                className="cine-fade text-gold/85 text-[0.65rem] sm:text-xs tracking-[0.3em] mb-3"
                style={{ "--fade-delay": "0.2s" } as CSSProperties}
              >
                THE CELEBRATION FEAST
              </p>
              <KineticText
                text="Walima"
                as="h2"
                className="text-display text-cream text-6xl sm:text-7xl md:text-8xl leading-none"
                step={0.06}
                baseDelay={0.3}
                data-cursor="magnetic"
              />
              <div
                className="cine-fade mt-7 md:mt-8 space-y-2 text-cream/85"
                style={{ "--fade-delay": "0.8s" } as CSSProperties}
              >
                <p className="text-base sm:text-lg">Wednesday, 28 October 2026</p>
                <p className="text-cream/65 italic">Evening, over dinner</p>
                <div className="cine-rule w-16 h-px bg-gold my-5 mx-auto md:mx-0" />
                <p className="text-display text-xl sm:text-2xl">MDS Banquets &amp; Lawns</p>
                <p className="text-cream/65 text-sm leading-relaxed break-words">
                  Dadasaheb Sahasrabudhe Rd, Kiwale, Ravet
                  <br />
                  Pimpri-Chinchwad, Maharashtra 412101
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=MDS+Banquets+%26+Lawns+Kiwale+Ravet+Pimpri-Chinchwad+412101"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="magnetic"
                  className={mapLink}
                >
                  SEE THE ROUTE
                </a>
              </div>
            </div>
          </div>
        </Chapter>

        {/* Mosque reveal */}
        <Chapter id="mosque" className="overflow-hidden">
          <MosqueScene />

          <div className="relative z-10 text-center px-2 max-w-3xl mx-auto">
            <KineticText
              text="Under sacred skies"
              as="p"
              className="text-script text-gold text-3xl sm:text-4xl md:text-6xl mb-4 leading-[1.4]"
              step={0.035}
              baseDelay={0.2}
            />
            <KineticText
              text="we begin forever."
              as="p"
              className="text-display italic text-cream text-2xl sm:text-3xl md:text-5xl leading-snug"
              step={0.035}
              baseDelay={0.9}
              data-cursor="magnetic"
            />
            <p
              className="cine-fade mt-8 md:mt-10 text-cream/85 tracking-[0.3em] text-[0.65rem] sm:text-xs"
              style={{ "--fade-delay": "1.7s" } as CSSProperties}
            >
              26.10.2026 · PUNE
            </p>
          </div>
        </Chapter>

        {/* Dark-to-cream blend */}
        <div
          aria-hidden
          className="relative h-40 md:h-56 w-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, oklch(0.55 0.10 60 / 0.35) 45%, var(--color-cream) 100%)",
          }}
        />

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
              decoding="async"
              sizes="100vw"
              className="w-full h-[80vh] md:h-[70vh] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-6">
              <div className="text-center text-cream w-full max-w-md">
                <p className="text-script text-4xl sm:text-5xl md:text-6xl mb-2 leading-[1.4]">Please</p>
                <h2
                  className="text-display text-6xl sm:text-7xl md:text-8xl tracking-[0.15em]"
                  data-cursor="magnetic"
                >
                  RSVP
                </h2>
                <p className="mt-6 text-cream/90 italic leading-relaxed">
                  Your presence would mean the world to us. Kindly let the families know so we can keep a
                  seat waiting for you.
                </p>
                <button
                  type="button"
                  data-cursor="magnetic"
                  onClick={() => setRsvpOpen(true)}
                  aria-expanded={rsvpOpen}
                  className="mt-8 inline-flex items-center justify-center min-h-12 px-8 rounded-full bg-cream text-ink text-xs sm:text-sm tracking-[0.2em] hover:bg-gold transition-colors"
                >
                  CONFIRM ATTENDANCE
                </button>
                {rsvpOpen && (
                  <p className="animate-fade-up mt-6 text-cream text-sm leading-relaxed border-t border-cream/30 pt-4">
                    Please reach out to the families directly to confirm your attendance. We look forward
                    to hearing from you.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* THINGS TO KNOW */}
          <section className="py-20 md:py-32 px-6 bg-cream">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-script text-3xl sm:text-4xl text-ember mb-2 leading-[1.4]">A few</p>
              <h2 className="text-display text-4xl sm:text-5xl md:text-6xl mb-12 md:mb-16">
                blessings &amp; notes
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
                {[
                  {
                    icon: "☾",
                    title: "Attire",
                    body: "Traditional dress, in whatever colours make you feel your best.",
                  },
                  {
                    icon: "◈",
                    title: "Arrival",
                    body: "The Nikah begins right after Namaz-e-Isha — please be seated a little before.",
                  },
                  {
                    icon: "✦",
                    title: "Duas",
                    body: "Your prayers are the gift we treasure most. Nothing else is needed.",
                  },
                ].map((t) => (
                  <div
                    key={t.title}
                    data-cursor="magnetic"
                    className="p-7 md:p-8 rounded-2xl bg-card border border-border/60 shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-4xl text-gold mb-4">{t.icon}</div>
                    <h3 className="text-display text-2xl mb-3">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COUNTDOWN */}
          <section
            className="relative py-20 md:py-32 px-5 sm:px-6 overflow-hidden"
            style={{ background: "linear-gradient(180deg, oklch(0.90 0.06 78) 0%, var(--color-cream) 100%)" }}
          >
            <div className="max-w-4xl mx-auto text-center text-ink">
              <p className="text-script text-3xl sm:text-4xl text-ember mb-2 leading-[1.4]">The countdown</p>
              <h2 className="text-display text-4xl sm:text-5xl md:text-6xl mb-10 md:mb-12 tracking-wide">
                to our Nikah
              </h2>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-8 max-w-2xl mx-auto">
                {[
                  { v: d, l: "Days" },
                  { v: h, l: "Hours" },
                  { v: m, l: "Mins" },
                  { v: s, l: "Secs" },
                ].map((u) => (
                  <div
                    key={u.l}
                    className="rounded-2xl bg-cream/70 backdrop-blur border border-gold/40 p-3 sm:p-4 md:p-6 shadow-sm"
                  >
                    <div
                      className="text-display text-3xl sm:text-4xl md:text-6xl tabular-nums"
                      suppressHydrationWarning
                    >
                      <RollingDigits value={ready ? pad(u.v) : "--"} />
                    </div>

                    <div className="text-[0.6rem] sm:text-xs md:text-sm tracking-[0.2em] mt-2 text-muted-foreground">
                      {u.l.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-16 md:py-20 px-6 text-center bg-cream">
            <p className="text-script text-3xl sm:text-4xl text-ember mb-3 leading-[1.4]">
              We look forward to
            </p>
            <h3 className="text-display text-2xl sm:text-3xl md:text-4xl mb-6">celebrating with you</h3>
            <div className="w-16 h-px bg-gold my-6 mx-auto" />
            <p className="max-w-xl mx-auto text-muted-foreground italic leading-relaxed">
              May Allah (SWT) bless this union with love, mercy and barakah, today and for all the years
              ahead. Ameen.
            </p>
            <p className="text-script text-2xl text-ember mt-10 leading-[1.4]">Ahmed Raza &amp; Nazziya</p>
            <p className="mt-1 text-sm text-muted-foreground">26 October 2026 · Pune</p>
          </footer>
        </div>
      </main>
    </>
  );
}
