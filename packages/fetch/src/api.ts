import { createFetcher } from "./fetcher";

/**
 * The instance to call the API with schema validation.
 * @defaults to {GET} method
 *
 * Edit it by passing in the method property from the fetch API.
 * ```ts
 * api(z.object({ status: z.boolean() }), `${API_URL}/{path}`, { method: "POST" });
 * ```
 *
 * see the next example, that expects an object with status: string response.
 * ```ts
 * api(z.object({ world: z.string() }), `${API_URL}/hello`);
 * ```
 */
export const api = createFetcher();
