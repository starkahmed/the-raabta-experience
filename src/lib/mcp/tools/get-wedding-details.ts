import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const details = {
  couple: {
    groom: { name: "Ahmed Raza Shaikh", parents: "Mr. & Mrs. Firoz-Uddin Shaikh" },
    bride: { name: "Nazziya", parents: "Mr. & Mrs. Salim Saifi" },
  },
  primaryDate: "17 October 2026",
  city: "Patna",
  invitationUrl: "https://www.missingpieceinvites.com/demos/raabta",
};

export default defineTool({
  name: "get_wedding_details",
  title: "Get wedding details",
  description: "Return the couple, primary wedding date, and city for Ahmed Raza & Nazziya's Nikah.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
    structuredContent: details,
  }),
});
