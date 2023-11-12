/**
 * A type representing a fetcher function that can be
 * passed to createFetcher.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFetcher = (...args: any[]) => any;

/**
 * @internal
 */
export type Schema<TData> = {
  parse: (data: unknown) => TData;
};

/**
 * A type utility which represents the function returned
 * from createFetcher
 */
export type ZodFetcher<TFetcher extends AnyFetcher> = <TData>(
  schema: Schema<TData>,
  ...args: Parameters<TFetcher>
) => Promise<TData>;

/**
 * The default fetcher used by createFetcher when no
 * fetcher is provided.
 */
export const defaultFetcher: AnyFetcher = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

/**
 * Creates a `fetchWithZod` function that takes in a schema of
 * the expected response, and the arguments to fetch.
 *
 * Since you didn't provide a fetcher in `createFetcher()`,
 * we're falling back to the default fetcher.
 *
 * @example
 *
 * const fetchWithZod = createFetcher();
 *
 * const response = await fetchWithZod(
 *   z.object({
 *     hello: z.string(),
 *   }),
 *   "https://example.com",
 * );
 */
export function createFetcher(): ZodFetcher<typeof fetch>;

/**
 * Creates a `fetchWithZod` function that takes in a schema of
 * the expected response, and the arguments to the fetcher
 * you provided.
 *
 * @example
 *
 * const fetchWithZod = createFetcher((url) => {
 *   return fetch(url).then((res) => res.json());
 * });
 *
 * const response = await fetchWithZod(
 *   z.object({
 *     hello: z.string(),
 *   }),
 *   "https://example.com",
 * );
 */
export function createFetcher<TFetcher extends AnyFetcher>(
  /**
   * A fetcher function that returns the data you'd like to parse
   * with the schema.
   */
  fetcher: TFetcher,
): ZodFetcher<TFetcher>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createFetcher(fetcher: AnyFetcher = defaultFetcher): ZodFetcher<any> {
  return async (schema, ...args) => {
    const response = await fetcher(...args);
    return schema.parse(response);
  };
}
