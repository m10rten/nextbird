import { api } from "@nextbird/fetch";

import { eventSchema } from "@/schemas";
import { HandlerConfig } from "@/types";

/**
 * Either returns a health object or throws an error
 * Uses http in development and test environments such as localhost
 *
 * Uses https in production environments unless http is set to true
 *
 * Throws error if:
 * - host is missing
 * - API does not return valid data
 */
export async function handler(config?: HandlerConfig) {
  const host = config?.host;
  if (!host) throw new Error("Missing host in config");
  if (host.includes("http://") || host.includes("https://"))
    throw new Error(
      "Host should not include 'http://' or 'https://', https will be added by default, if you want to use http, set `http` to `true` in config",
    );
  const path = config?.path || "api/health";
  const http =
    config?.http ||
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test" ||
    false;
  if (http && !host.includes("localhost"))
    // eslint-disable-next-line no-console
    console.warn("You are using http, this is not recommended, please use https");
  const url = `${http ? "http" : "https"}://${host}/${path}`;
  const res = await api(eventSchema, url);
  return res;
}
