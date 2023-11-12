import { api } from "@nextbird/fetch";

import { dataSchema } from "@/schemas";
import { Config } from "@/types";

/**
 * Either returns a health object or throws an error
 * Uses http in development and test environments such as localhost
 *
 * Uses https in production environments unless http is set to true
 */
export async function handler(config?: Config) {
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
  const res = await api(dataSchema, url);
  return res;
}
