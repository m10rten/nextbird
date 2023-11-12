import { serverAction } from "@nextbird/action";

import { handler } from "@/_client/handler";
import { HandlerConfig } from "@/types";

/**
 * This file will include the server side action for the client of the nextbird inside Next.js, easy to include in your project.
 *
 * @example
 * ```ts
 * import { action } from "nextbird";
 * ```
 *
 * ```ts
 * export default action();
 * ```
 *
 * Recommended to use:
 * ```ts
 * export default action({
 * // This will override the default response: `res`, whatever you return here will be the response from the action.
 *  onSuccess: (data) => {
 *  // Do something with data, store in database, etc.
 *  },
 * // This will override the default error catch, that being throwing the error.
 *  onError: (error) => {
 *  // Do something with error, log it, etc.
 *  }
 * })
 * ```
 *
 */
export default async function action(config?: HandlerConfig) {
  return serverAction()(async () => {
    try {
      const res = await handler(config);
      if (config?.onSuccess) return config.onSuccess(res);
      return res;
    } catch (error) {
      if (config?.onError) return config.onError(error);
      throw error;
    }
  });
}
