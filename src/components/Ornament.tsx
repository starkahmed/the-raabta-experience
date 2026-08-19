/**
 * Single decorative motif for the whole invitation: an eight-pointed
 * Islamic star (khatam). Used standalone as a small mark, or as a
 * rule–star–rule divider. Replaces the earlier mix of ◆ / ☾ / ◈ / ✦.
 */
export function Ornament({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={`inline-block shrink-0 ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <rect x="4.6" y="4.6" width="14.8" height="14.8" />
        <rect x="4.6" y="4.6" width="14.8" height="14.8" transform="rotate(45 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

export function OrnamentDivider({
  className = "",
  width = "w-40",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-3 text-gold ${width} mx-auto ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
      <Ornament size={16} className="opacity-90" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}
