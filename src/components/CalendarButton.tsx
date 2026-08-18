import { generateICS, downloadICS } from "@/lib/calendar";
import type { CalendarEvent } from "@/lib/calendar";

interface CalendarButtonProps {
  event: CalendarEvent;
  filename: string;
  children: React.ReactNode;
  className?: string;
}

export function CalendarButton({ event, filename, children, className = "" }: CalendarButtonProps) {
  const handleClick = () => {
    const ics = generateICS(event);
    downloadICS(filename, ics);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="magnetic"
      className={className}
      aria-label="Add event to calendar"
    >
      {children}
    </button>
  );
}
