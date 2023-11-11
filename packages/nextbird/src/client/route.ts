import { Config, handler } from "./handler";

/**
 * The route handler for Next.js API routes such as: `/api/health/route.ts`
 * @param config The config for the handler
 */
export default function route(config: Config) {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GET: async (_req: Request) => {
      // const res = await handler(config);
      return {
        body: JSON.stringify({ health: true }),
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
      };
    },
  };
}
