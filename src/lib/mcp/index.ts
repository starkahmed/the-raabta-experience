import { defineMcp } from "@lovable.dev/mcp-js";
import getWeddingDetails from "./tools/get-wedding-details";
import listEvents from "./tools/list-events";
import getRsvpInfo from "./tools/get-rsvp-info";
import getCountdown from "./tools/get-countdown";

export default defineMcp({
  name: "ahmed-nazziya-wedding-mcp",
  title: "Ahmed & Nazziya Wedding MCP",
  version: "0.1.0",
  instructions:
    "Public tools that expose Ahmed Raza & Nazziya's Nikah invitation details, event schedule, RSVP guidance, and a live countdown.",
  tools: [getWeddingDetails, listEvents, getRsvpInfo, getCountdown],
});
