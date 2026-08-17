import { useEffect, useRef, useState } from "react";
import track from "@/assets/raabta-theme.mp3.asset.json";

const TARGET_VOLUME = 0.18;

export function AmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(track.url);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    let raf = 0;
    const fadeIn = () => {
      if (audio.volume < TARGET_VOLUME) {
        audio.volume = Math.min(TARGET_VOLUME, audio.volume + 0.006);
        raf = requestAnimationFrame(fadeIn);
      }
    };

    const start = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          fadeIn();
        })
        .catch(() => {
          /* blocked until interaction */
        });
    };

    start();

    const onGesture = () => {
      if (audio.paused) start();
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    window.addEventListener("touchstart", onGesture, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = TARGET_VOLUME;
      void audio.play().then(() => setPlaying(true));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause background music" : "Play background music"}
      data-cursor="magnetic"
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-black/30 text-gold backdrop-blur-md transition-colors hover:border-gold hover:text-cream"
    >
      <span className="flex items-end gap-[2px] h-4" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-current rounded-full"
            style={{
              height: playing ? "100%" : "40%",
              animation: playing ? `equalize 1s ${i * 0.18}s ease-in-out infinite` : "none",
            }}
          />
        ))}
      </span>
    </button>
  );
}
