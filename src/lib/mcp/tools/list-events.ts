import { defineTool } from "@lovable.dev/mcp-js";

const events = [
  {
    title: "Nikah",
    date: "26 October 2026",
    day: "Monday",
    time: "After Namaz-e-Isha",
    venue: "Raaga Imperio, Survey No. 169, Aundh – Ravet BRTS Rd, near Tulja Bhavani Vajan Kata, Tathawade, Pune, Maharashtra 411033",
  },
  {
    title: "Walima",
    date: "19 October 2026",
    venue: "Raga Imperio, Thathwade, Pune",
  },
];

export default defineTool({
  name: "list_events",
  title: "List wedding events",
  description: "List the scheduled Nikah and Walima events with date, time, and venue.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(events, null, 2) }],
    structuredContent: { events },
  }),
});
