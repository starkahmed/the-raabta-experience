import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Splits text into per-letter spans wrapped in a per-word mask so GSAP can
 * translateY the letters up from below the mask. Whitespace preserved.
 * Use className / style on the wrapper. Words don't break across lines.
 */
export function KineticText({
  text,
  as: As = "span",
  className,
  style,
  letterClassName = "cine-letter",
  baseDelay = 0,
  step = 0.03,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  letterClassName?: string;
  baseDelay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  let idx = 0;
  const nodes: ReactNode[] = [];
  words.forEach((word, wi) => {
    const letters: ReactNode[] = [];
    for (const ch of Array.from(word)) {
      const i = idx++;
      letters.push(
        <span
          key={`${wi}-${i}`}
          className={`${letterClassName} inline-block will-change-transform`}
          style={{ transitionDelay: `${baseDelay + i * step}s` }}
        >
          {ch}
        </span>
      );
    }
    nodes.push(
      <span
        key={`w-${wi}`}
        className="inline-block overflow-hidden align-bottom"
        style={{ lineHeight: 1.05 }}
      >
        {letters}
      </span>
    );
    if (wi < words.length - 1) nodes.push(<span key={`s-${wi}`}>&nbsp;</span>);
  });
  return <As className={className} style={style}>{nodes}</As>;
}
