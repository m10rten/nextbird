"use client";

import { useMemo, useRef, useState } from "react";
import { type z } from "zod";

import { Action } from "@/server-action";

/**
 * Use this function inside a client-side react component to call an action easily.
 *
 * In Next.js, this means you would put this inside a component with `"use client"` at the top of the file.
 */
export function useAction<I extends z.ZodTypeAny, R>(
  action: Action<I, R>,
  options?: {
    onFetching?: () => void;
    onError?: (error: unknown) => void;
    onSuccess?: (response: R) => void;
  },
) {
  const ref = useRef(action);
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const mutate = useMemo(
    () => async (input?: z.infer<I>) => {
      setLoading(true);
      try {
        options?.onFetching?.();
        const response = await ref.current(input);
        setData(response);
        options?.onSuccess?.(response);
      } catch (err: unknown) {
        setError(err);
        options?.onError?.(err);
      } finally {
        setLoading(false);
      }
    },
    [options],
  );

  return { data, loading, error, mutate };
}
