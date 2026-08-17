import { useEffect, useRef, useState } from "react";

/**
 * Renders a two-digit value where each digit rolls vertically when it changes.
 */
export function RollingDigits({ value, className = "" }: { value: string; className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      {value.split("").map((ch, i) => (
        <RollingDigit key={i} char={ch} />
      ))}
    </div>
  );
}

function RollingDigit({ char }: { char: string }) {
  const [current, setCurrent] = useState(char);
  const [previous, setPrevious] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (char === current) return;
    setPrevious(current);
    setCurrent(char);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPrevious(null), 600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [char, current]);

  return (
    <span className="digit-roll" aria-hidden={false}>
      {previous !== null && (
        <span key={`out-${previous}`} className="digit-out">
          {previous}
        </span>
      )}
      <span key={`in-${current}`} className={previous !== null ? "digit-in" : undefined}>
        {current}
      </span>
    </span>
  );
}
