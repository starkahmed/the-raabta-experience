import { useEffect, useRef, type ReactNode } from "react";

/**
 * Full-viewport chapter section. When it enters the viewport it adds
 * `.cine-in`, which triggers per-letter reveals and any child transitions
 * scoped under `.cine-chapter`. Re-triggers when scrolled back in.
 */
export function Chapter({
  id,
  className = "",
  children,
  threshold = 0.35,
  align = "center",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  threshold?: number;
  align?: "center" | "start";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) el.classList.add("cine-in");
          else el.classList.remove("cine-in");
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <section
      ref={ref}
      id={id}
      className={`cine-chapter relative min-h-screen w-full flex ${
        align === "start" ? "items-start pt-24" : "items-center"
      } justify-center px-6 ${className}`}
    >
      {children}
    </section>
  );
}
