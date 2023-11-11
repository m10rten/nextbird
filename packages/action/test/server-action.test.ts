import * as z from "zod";
import { ValidationError } from "zod-validation-error";

import { serverAction } from "@/server-action";

const noNumberRegex = /^[^0-9]*$/;

describe("serverAction", () => {
  it("should return a function", () => {
    const action = serverAction();
    expect(typeof action).toBe("function");
  });

  it("should validate input using the provided schema", async () => {
    const action = serverAction(z.object({ name: z.string().regex(noNumberRegex) }))(
      async (input) => {
        return { message: `Hello, ${input.name}!` };
      },
    );

    const validInput = { name: "Alice" };
    const invalidInput = { name: "123" };

    await expect(action(validInput)).resolves.toEqual({
      message: "Hello, Alice!",
    });
    await expect(action(invalidInput)).rejects.toThrow(ValidationError);
  });

  it("should return the result of the action function", async () => {
    const action = serverAction()(async () => {
      return { message: "Hello, world!" };
    });

    await expect(action({})).resolves.toEqual({ message: "Hello, world!" });
  });
});
