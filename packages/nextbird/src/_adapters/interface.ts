import type { Day, Event, Overview, SystemInfo } from "@/types";

type OverviewEventData = Pick<Event, "id" | "created_at" | "status" | "duration">;
type CreateEvent = Omit<Event, "id">;
type OverviewDayData = Pick<Day, "date" | "average_duration" | "failed" | "note"> & {
  count: number;
};
type Prettify<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
/**
 * @interface IAdapter
 * @description
 * Interface for adapters to store and retrieve data from a database.
 * And to get runtime information about a system.
 *
 * @example
 * ```ts
 * import { IAdapter } from "nextbird/adapters";
 *
 * export class PrismaAdapter implements IAdapter {}
 * ```
 *
 */
export interface IAdapter {
  get: (id: Event["id"]) => Promise<Event>;
  create: (data: CreateEvent) => Promise<Event["id"]>;
  all: () => Promise<OverviewEventData[]>;
  /**
   * Clears all data older then 28 days. (1month+)
   *
   * Run at your own risk.
   * Recommended to run this once a day.
   */
  purge: () => Promise<void>;
  /**
   * Returns all top-level data from the last 14 days.
   */
  last_14_days: () => Promise<OverviewEventData[]>;
  /**
   * Gets the uptime percentage from the last 14 days.
   * @returns {Promise<number>} The uptime percentage.
   * @example
   * ```ts
   * const uptime = await adapter.get_uptime();
   * // ^ number: eg: 99.99...
   * ```
   */
  get_uptime_percentage: () => Promise<number>;
  /**
   * Gets the average duration of ping-requests from the last 14 days.
   * @returns {Promise<number>} The average duration of the last 14 days.
   */
  get_average_duration: () => Promise<number>;
  /**
   * Gets the system information of the system running `nextbird`, aka the server.
   * @returns {Promise<SystemInfo>} The system information.
   */
  get_system_info: () => Promise<SystemInfo>;

  /**
   * When a user clicks/hovers on a day, this function is called to get the data for that day.
   */
  get_day_quick: (date: string) => Promise<OverviewDayData>;
  /**
   * Get the overview the user sees on the dashboard.
   * Defaults to the last 14 days.
   * @returns {Promise<Overview>} The overview.
   */
  get_overview: () => Promise<Overview>;

  /**
   * Get the overview for a specific day.
   * @returns {Promise<Day>} The day.
   */
  get_day: (date: string) => Promise<Day>;

  // get_day: (date: string) => Promise<Day>;
  // get_by_status: (status_codes: number[]) => Promise<Day[]>;
  // get_by_date: (date: string) => Promise<Day>;

  // set_note: (date: string, note: string) => Promise<void>;
}
