"use client";

import React from "react";
import { useAction } from "@nextbird/action";
import { action as getStatus } from "nextbird/client";

import { Badge } from "./badge-base";
import { cn } from "./utils";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function StatusBadge(props: StatusBadgeProps) {
  const { mutate } = useAction(getStatus);
  return (
    <Badge
      {...props}
      className={cn(
        props.className,
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      )}
    />
  );
}
StatusBadge.displayName = "StatusBadge";

export default StatusBadge;
