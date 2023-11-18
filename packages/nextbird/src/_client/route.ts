import { HandlerConfig } from "@/types";

import { handler } from "./handler";

/**
 * The route handler for Next.js API routes such as: `/api/health/route.ts`
 * @param config The config for the handler
 *
 * @example
 * ```ts
 * import { route } from "nextbird";
 * export {GET: route().GET };
 * ```
 */
export function route(config?: HandlerConfig) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GET: async (_req?: Request) => {
      try {
        const res = await handler(config);
        if (config?.onSuccess) return config.onSuccess(res);
        return new Response(JSON.stringify(res), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        if (config?.onError) return config.onError(error);
        return new Response(JSON.stringify(error), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    },
  };
}
