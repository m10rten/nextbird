import { z } from "zod";

import { dataSchema } from "@/schemas";

export type Config = {
  host: string;
  path: "api/health" | string;
  http?: boolean;
  onSuccess?: (data: Data) => Promise<void> | void;
  onError?: (error: unknown) => Promise<void> | void;
};

export type Data = z.infer<typeof dataSchema>;
