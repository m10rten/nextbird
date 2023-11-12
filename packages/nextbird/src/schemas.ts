import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().uuid(),
  // healthy: z.boolean(), // can be computed from status
  // timestamp: z.date(),
  // version: z.string(),
  // os: z.string(),
  status: z.number(),
  // uptime: z.number(),
  duration: z.number(),

  created_at: z.date(),
  updated_at: z.date().optional(),
});

export const systemInfoSchema = z.object({
  /**
   * The operating system.
   */
  os: z.string(),
  /**
   * The version of `nextbird` that is running.
   */
  version: z.string(),
  /**
   * The uptime of the system.
   */
  uptime: z.number(),
  /**
   * The total memory of the system.
   */
  total_memory: z.number().optional(),
});

/**export type Day = {
  date: string;
  events: Event[];
  failed: number;
  uptime: number;
  note?: string;
};

export type Overview = {
  days: Day[];
  uptime: number;
  failed: number;
};
 */

export const daySchema = z.object({
  date: z.string(),
  events: z.array(eventSchema),
  average_duration: z.number(),
  failed: z.number(),
  uptime: z.number(),
  note: z.string().optional(),
});

export const overviewSchema = z.object({
  days: z.array(daySchema),
  uptime: z.number(),
  failed: z.number(),
});
