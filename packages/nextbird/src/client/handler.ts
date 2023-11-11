import { api } from "@nextbird/fetch";
import { z } from "zod";

export type Config = {
  host: string;
  path: "api/health" | string;
  http?: boolean;
};

/**
 * Either returns a health object or throws an error
 */
export async function handler(config?: Config) {
  const host = config?.host;
  if (!host) throw new Error("Missing host in config");
  if (host.includes("http://") || host.includes("https://"))
    throw new Error(
      "Host should not include http:// or https://, https will be added by default, if you want to use http, set `http` to `true` in config",
    );
  const path = config?.path || "api/health";
  const http = config?.http || false;
  if (http && !host.includes("localhost"))
    // eslint-disable-next-line no-console
    console.warn("You are using http, this is not recommended, please use https");
  const url = `${http ? "http" : "https"}://${host}/${path}`;
  const res = await api(
    z.object({
      health: z.boolean(),
      timestamp: z.string(),
      version: z.string(),
      os: z.string(),
      status: z.number(),
      uptime: z.number(),
      duration: z.number(),
    }),
    url,
  );
  return res;
}
