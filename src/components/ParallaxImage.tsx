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
    <div ref={ref} className={`cine-image relative overflow-hidden rounded-xl ${className}`}>
      <div className="img-parallax absolute inset-0 will-change-transform">
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
}
