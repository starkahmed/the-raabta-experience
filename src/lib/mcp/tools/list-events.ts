import { defineTool } from "@lovable.dev/mcp-js";

const events = [
  {
    title: "Nikah",
    date: "26 October 2026",
    day: "Monday",
    time: "After Namaz-e-Maghrib, 6:45 PM",
    venue: "Raaga Palace, Mother Teresa Flyover, near Nathu Nadhe Corner, Vijay Nagar, Kalewadi, Pimpri-Chinchwad, Pune, Maharashtra 411017",
  },
  {
    title: "Walima",
    date: "28 October 2026",
    day: "Wednesday",
    time: "Evening, over dinner",
    venue: "MDS Banquets & Lawns, Dadasaheb Sahasrabudhe Rd, Kiwale, Ravet, Pimpri-Chinchwad, Maharashtra 412101",
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
