// for next.js server side components, server actions and api routes.
"use server";

/**
 * This is the file responsible for the server-side route handling
 * it should always be mounted on `/api/health/[bird]/route.ts` to ensure proper functionality
 * @packageDocumentation
 * @module nextbird/server
 * @preferred
 */
import { NextRequest } from "next/server";

import { NEXTBIRD_VERSION } from "./consts";

/**
 * This is the main function that handles the request
 * @param req The incoming request
 * @returns The response
 */

// TODO, change this to come from server.ts, same for react.tsx and client.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function handler(_req: NextRequest) {
  return new Response(
    JSON.stringify({
      status: 200,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "x-nextbird-version": NEXTBIRD_VERSION,
      },
    },
  );
}
