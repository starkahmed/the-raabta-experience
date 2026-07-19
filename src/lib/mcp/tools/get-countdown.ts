import { defineTool } from "@lovable.dev/mcp-js";

const targetIso = "2026-10-17T19:30:00+05:30";

export default defineTool({
  name: "get_countdown",
  title: "Get countdown to Nikah",
  description: "Return the number of days, hours, and minutes remaining until the Nikah ceremony.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: false, openWorldHint: false },
  handler: () => {
    const now = Date.now();
    const target = new Date(targetIso).getTime();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const payload = { targetIso, days, hours, minutes, hasPassed: diff === 0 };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
