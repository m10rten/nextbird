import type z from "zod";
import { fromZodError } from "zod-validation-error";

export type ActionType<I extends z.ZodTypeAny, R> = (input: z.infer<I>) => Promise<R>;

export type Action<I extends z.ZodTypeAny, R> = ActionType<I, R>;

/**
 * Use this function to create an action with a zod schema to make sure your input is valid.
 *
 * When using, please make sure to set the `"use server"` at the top of the file to make sure the server is used.
 *
 * Takes generic I: InputType, R: ReturnType
 * @example
 * ```ts
 * export default serverAction(z.object({ isTrue: z.boolean() }))(
 *  async (input) => {
 *     return { isTrue: input.isTrue };
 *    // This will throw if the input is invalid, like if you pass in a string instead of a boolean
 *   },
 * );
 * ```
 */
export function serverAction<I extends z.ZodTypeAny>(validator?: I) {
  // This is the "factory" that is created on call of zact. You pass it a "use server" function and it will validate the input before you call it
  return function <R>(action: ActionType<I, R>): Action<I, R> {
    // The wrapper that actually validates
    const validatedAction = async (input: z.infer<I>) => {
      if (validator) {
        // This will throw if the input is invalid
        const result = validator.safeParse(input);

        if (!result.success) {
          const validatedError = fromZodError(result.error);
          throw validatedError;
        }
      }
      return await action(input);
    };

    return validatedAction satisfies Action<I, R>;
  };
}
