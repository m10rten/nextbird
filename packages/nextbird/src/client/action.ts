import { serverAction } from "@nextbird/action";

import { Config, handler } from "@/client/handler";

/**
 * This file will include the server side action for the client of the nextbird inside Next.js, easy to include in your project.
 *
 * @example
 * ```ts
 * import { action } from "nextbird";
 * ```
 *
 * ```ts
 * export default function serverAction(){
 *  return action();
 * };
 * ```
 *
 * Or:
 * ```ts
 * export default function serverAction(){
 *  return action({ ...config });
 * };
 * ```
 *
 * Recommended:
 * ```ts
 * export default function serverAction(){
 * const result = await action({ ...config });
 * // Do something with result, like database storage.
 * return result;
 * };
 * ```
 *
 */
export default async function action(config?: Config) {
  return serverAction()(async () => await handler(config));
}
