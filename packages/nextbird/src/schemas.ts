import { z } from "zod";

export const dataSchema = z.object({
  health: z.boolean(),
  timestamp: z.string(),
  version: z.string(),
  os: z.string(),
  status: z.number(),
  uptime: z.number(),
  duration: z.number(),
});
