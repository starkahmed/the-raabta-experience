import { defineTool } from "@lovable.dev/mcp-js";

const rsvp = {
  title: "RSVP",
  message: "Kindly bless us with your presence and confirm your attendance.",
  note: "Please reach out to the families directly to confirm attendance.",
};

export default defineTool({
  name: "get_rsvp_info",
  title: "Get RSVP information",
  description: "Return the public RSVP message and guidance for confirming attendance.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(rsvp, null, 2) }],
    structuredContent: rsvp,
  }),
});
