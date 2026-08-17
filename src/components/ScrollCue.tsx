import { useEffect, useState } from "react";

/**
 * Subtle breathing chevron inviting first-time visitors to scroll.
 * Fades in after the opening text, fades out on first scroll.
 */
export function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 24) setHidden(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="scroll-cue pointer-events-none absolute inset-x-0 bottom-8 md:bottom-10 flex flex-col items-center gap-3"
      data-hidden={hidden ? "true" : "false"}
    >
      <span className="text-cream/60 text-[0.6rem] tracking-[0.35em]">SCROLL</span>
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="scroll-cue-chevron">
        <path
          d="M1 1L9 8L17 1"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-gold"
        />
      </svg>
    </div>
  );
}
