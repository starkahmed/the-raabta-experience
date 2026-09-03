import heroAsset from "@/assets/hero-mosque-lanterns.jpg.asset.json";
import { useScrollProgress } from "@/hooks/use-parallax";

/**
 * Save-the-date scene: the mosque photograph sits behind two soft
 * depth-of-field layers that drift at different scroll speeds.
 */
export function MosqueScene() {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div ref={ref} className="depth-scene absolute inset-0 overflow-hidden">
      {/* Distant atmosphere moves slower than the image plane. */}
      <img
        src={heroAsset.url}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="depth-scene__atmosphere absolute -inset-[10%] h-[120%] w-[120%] object-cover"
      />
      {/* Blurred foreground plate creates the soft depth-of-field falloff. */}
      <img
        src={heroAsset.url}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="depth-scene__blur absolute -inset-[8%] h-[116%] w-[116%] object-cover"
      />
      {/* Base photograph, sharpest layer. */}
      <img
        src={heroAsset.url}
        alt="Mosque and minarets under a night sky filled with glowing lanterns"
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="depth-scene__image absolute -inset-[7%] h-[114%] w-[114%] object-cover"
      />

      {/* warm bloom */}
      <div
        className="depth-scene__bloom absolute inset-0"
      />

      {/* legibility scrim */}
      <div
        className="depth-scene__veil pointer-events-none absolute inset-0"
      />
    </div>
  );
}
