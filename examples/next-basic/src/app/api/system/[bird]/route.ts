import { NextRequest } from "next/server";
import nextbird from "nextbird";

// ping: quick check if the server is alive
// health: check if the server is healthy
// info: get the server information
// version: get the server version and version of nextbird
// live: get a quick live update of requests, memory usage, logs etc, done in a stream.
// exposed: get the exposed routes and ports of the server
// public: get possible public settings such as PORTS, hosts, environment, etc.
const AvailableRoutes = ["ping", "health", "info", "version", "live"] as const;

const ping = async (req: NextRequest) => {
  // check if the server is alive
  return new Response(
    JSON.stringify({
      status: 200,
      data: "pong",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "x-nextbird-version": "0.0.1",
      },
    },
  );
};

const info = async (req: NextRequest) => {
  // get the server information
  const uptime = process.uptime();
  const memory = process.memoryUsage();
  const cpu = process.cpuUsage();
  const os = process.platform;
  const arch = process.arch;
  const versions = process.versions;
  const pid = process.pid;
  const ppid = process.ppid;
  const cwd = process.cwd();

  const data = {
    uptime,
    memory,
    cpu,
    os,
    arch,
    versions,
    pid,
    ppid,
    cwd,
  };

  return new Response(
    JSON.stringify({
      status: 200,
      data,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "x-nextbird-version": "0.0.1",
      },
    },
  );
};

export async function GET(
  req: NextRequest,
  options: { params: { bird: (typeof AvailableRoutes)[number] } },
) {
  try {
    switch (options.params.bird) {
      case "ping":
        return await ping(req);
      case "info":
        return info(req);
      // case "health":
      //   return health(req);
      // case "version":
      //   return version(req);
      default:
        return new Response(
          JSON.stringify({
            status: 403, // Forbidden, do not leak information or show a 404 indicating that the route exists or not.
          }),
          {
            status: 403,
            headers: {
              "Content-Type": "application/json",
              "x-nextbird-version": "0.0.1",
            },
          },
        );
    }
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: e,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "x-nextbird-version": "0.0.1",
        },
      },
    );
  }
}
