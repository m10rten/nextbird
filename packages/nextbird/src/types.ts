import { z } from "zod";

import { daySchema, eventSchema, overviewSchema, systemInfoSchema } from "@/schemas";

import { IAdapter } from "./_adapters/interface";

export type HandlerConfig = {
  host: string;
  path: "api/health" | string;
  http?: boolean;
  onSuccess?: (data: Event) => Promise<void> | void;
  onError?: (error: unknown) => Promise<void> | void;
  adapter?: IAdapter;
};

export type Event = z.infer<typeof eventSchema>;
export type SystemInfo = z.infer<typeof systemInfoSchema>;
export type Day = z.infer<typeof daySchema>;
export type Overview = z.infer<typeof overviewSchema>;
