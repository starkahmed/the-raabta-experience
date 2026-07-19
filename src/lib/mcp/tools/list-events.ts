import { defineTool } from "@lovable.dev/mcp-js";

const events = [
  {
    title: "Nikah",
    date: "17 October 2026",
    day: "Saturday",
    time: "After Namaz-e-Isha",
    venue: "Meetan Darbar, Patna City",
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
