import { useScrollProgress } from "@/hooks/use-parallax";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Portrait image that drifts slightly slower than the page scroll.
 * The travel distance lives in `--par`, which is zeroed on mobile and
 * for reduced-motion users (see styles.css).
 */
export function ParallaxImage({ src, alt, className = "" }: Props) {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div ref={ref} className={`cine-image depth-photo relative overflow-hidden rounded-xl ${className}`}>
      <div className="depth-photo__backdrop absolute -inset-[8%] overflow-hidden" aria-hidden>
        <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <div className="depth-photo__plate absolute -inset-[7%] overflow-hidden will-change-transform" aria-hidden>
        <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <div className="depth-photo__image absolute -inset-[7%] overflow-hidden will-change-transform">
        <img
          src={src}
          alt={alt}
          width={900}
          height={1100}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 768px) 45vw, 92vw"
          className="h-full w-full object-cover"
        />
      </div>
      {/* spacer keeps the 4/5 ratio while the image is absolutely positioned */}
      <div className="w-full aspect-[4/5]" />
      <div className="depth-photo__veil pointer-events-none absolute inset-0" />
      <div className="depth-photo__edge pointer-events-none absolute inset-3 rounded-lg" />
    </div>
  );
}
